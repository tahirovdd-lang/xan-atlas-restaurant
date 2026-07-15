import type { Metadata } from "next";
import "./globals.css";
import "./reservation.css";
import "./logo-language-overrides.css";
import TelegramBookingClient from "./telegram-booking-client";

export const metadata: Metadata = {
  title: "Xan Atlas Restaurant | Самарканд",
  description:
    "Xan Atlas — ресторан национальной узбекской кухни в Самарканде. Бронирование столиков и доставка.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <TelegramBookingClient />
      </body>
    </html>
  );
}
