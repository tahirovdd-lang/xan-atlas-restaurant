"use client";

import { useEffect } from "react";

export default function TelegramBookingClient() {
  useEffect(() => {
    async function handleSubmit(event: Event) {
      const form = event.target as HTMLFormElement | null;
      if (!form?.classList.contains("bookingForm")) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      const originalText = submitButton?.textContent ?? "Отправить";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Отправляем…";
      }

      try {
        const data = new FormData(form);
        const response = await fetch("/api/reservation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: String(data.get("name") ?? "").trim(),
            phone: String(data.get("phone") ?? "").trim(),
            date: String(data.get("date") ?? "").trim(),
            time: String(data.get("time") ?? "").trim(),
            guests: String(data.get("guests") ?? "").trim(),
            comment: String(data.get("comment") ?? "").trim(),
            language: document.documentElement.lang || "ru",
          }),
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result?.error || "Не удалось отправить бронирование");
        }

        form.reset();
        window.alert("Заявка на бронирование отправлена. Администратор свяжется с вами по телефону.");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Ошибка отправки";
        window.alert(`${message}. Попробуйте ещё раз или позвоните в ресторан.`);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    }

    document.addEventListener("submit", handleSubmit, true);
    return () => document.removeEventListener("submit", handleSubmit, true);
  }, []);

  return null;
}
