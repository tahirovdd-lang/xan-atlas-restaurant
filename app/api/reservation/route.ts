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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
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

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    if (!botToken || !adminChatId) {
      console.error("Telegram environment variables are not configured");
      return NextResponse.json(
        { ok: false, error: "Сервис бронирования пока не настроен" },
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
      },
    );

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text();
      console.error("Telegram API error:", details);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить бронь" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
