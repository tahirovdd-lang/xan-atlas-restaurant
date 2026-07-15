import { NextResponse } from "next/server";

type ReservationPayload = {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string | number;
  comment?: string;
  language?: string;
};

type TelegramErrorResponse = {
  ok?: boolean;
  error_code?: number;
  description?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  console.info("Reservation API: POST received");

  try {
    const payload = (await request.json()) as ReservationPayload;
    const name = payload.name?.trim();
    const phone = payload.phone?.trim();
    const date = payload.date?.trim();
    const time = payload.time?.trim();
    const guests = String(payload.guests ?? "").trim();
    const comment = payload.comment?.trim() || "Не указан";

    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { ok: false, error: "Заполните обязательные поля" },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID?.trim();

    if (!botToken || !adminChatId) {
      console.error("Reservation API: Telegram environment variables are not configured");
      return NextResponse.json(
        { ok: false, error: "Переменные Telegram не настроены в Vercel" },
        { status: 503 },
      );
    }

    const message = [
      "🏛 <b>НОВАЯ БРОНЬ — XAN ATLAS</b>",
      "",
      `👤 <b>Имя:</b> ${escapeHtml(name)}`,
      `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
      `📅 <b>Дата:</b> ${escapeHtml(date)}`,
      `🕐 <b>Время:</b> ${escapeHtml(time)}`,
      `👥 <b>Гостей:</b> ${escapeHtml(guests)}`,
      `💬 <b>Комментарий:</b> ${escapeHtml(comment)}`,
      `🌐 <b>Язык сайта:</b> ${escapeHtml(payload.language || "ru")}`,
    ].join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: adminChatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      },
    );

    const telegramResult = (await telegramResponse.json().catch(() => ({}))) as TelegramErrorResponse;

    if (!telegramResponse.ok || telegramResult.ok === false) {
      const description = telegramResult.description || `Telegram HTTP ${telegramResponse.status}`;
      console.error("Reservation API: Telegram API error:", description);
      return NextResponse.json(
        { ok: false, error: `Telegram: ${description}` },
        { status: 502 },
      );
    }

    console.info("Reservation API: booking delivered to Telegram");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
