"use client";

import { useState } from "react";

type Lang = "ru" | "uz" | "en";

const copy = {
  ru: {
    nav: ["О ресторане", "Галерея", "Меню", "Доставка", "Контакты"],
    eyebrow: "Ресторан национальной кухни · Самарканд",
    title: "Вкус традиций.\nАтмосфера Востока.",
    text: "Xan Atlas — место, где узбекская кухня, музыка и гостеприимство создают настоящее путешествие в культуру Востока.",
    book: "Забронировать стол",
    menu: "Посмотреть меню",
    address: "Самарканд, ул. Махмуда Кашгари, 92",
    hours: "Ежедневно · 11:00–23:00",
    delivery: "Доставка по Самарканду",
    aboutTitle: "Восточное гостеприимство в каждой детали",
    aboutText: "Интерьер ресторана объединяет национальные орнаменты, изделия ручной работы, традиционные музыкальные инструменты и тёплый свет. Здесь можно провести семейный ужин, праздник или деловую встречу.",
    call: "Позвонить",
    instagram: "Instagram",
  },
  uz: {
    nav: ["Restoran haqida", "Galereya", "Menyu", "Yetkazib berish", "Aloqa"],
    eyebrow: "Milliy taomlar restorani · Samarqand",
    title: "An’analar ta’mi.\nSharqona muhit.",
    text: "Xan Atlas — o‘zbek taomlari, musiqa va mehmondo‘stlik Sharq madaniyatiga haqiqiy sayohat yaratadigan maskan.",
    book: "Stol band qilish",
    menu: "Menyuni ko‘rish",
    address: "Samarqand, Mahmud Qoshg‘ari ko‘chasi, 92",
    hours: "Har kuni · 11:00–23:00",
    delivery: "Samarqand bo‘ylab yetkazib berish",
    aboutTitle: "Har bir detalda sharqona mehmondo‘stlik",
    aboutText: "Restoran interyeri milliy naqshlar, qo‘l mehnati buyumlari, an’anaviy musiqa asboblari va iliq yorug‘likni birlashtiradi. Oilaviy kecha, bayram yoki ish uchrashuvi uchun qulay joy.",
    call: "Qo‘ng‘iroq qilish",
    instagram: "Instagram",
  },
  en: {
    nav: ["About", "Gallery", "Menu", "Delivery", "Contacts"],
    eyebrow: "National cuisine restaurant · Samarkand",
    title: "A taste of tradition.\nThe spirit of the East.",
    text: "Xan Atlas is where Uzbek cuisine, music and hospitality become an authentic journey into Eastern culture.",
    book: "Book a table",
    menu: "View menu",
    address: "92 Mahmud Kashgari Street, Samarkand",
    hours: "Daily · 11:00–23:00",
    delivery: "Delivery across Samarkand",
    aboutTitle: "Eastern hospitality in every detail",
    aboutText: "The restaurant combines national ornaments, handcrafted décor, traditional musical instruments and warm lighting. A welcoming setting for family dinners, celebrations and business meetings.",
    call: "Call us",
    instagram: "Instagram",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = copy[lang];

  return (
    <main>
      <section className="hero" id="home">
        <div className="heroPattern" />
        <div className="shade" />
        <header className="header shell">
          <a className="brand" href="#home" aria-label="Xan Atlas">
            <span className="brandMark">XA</span>
            <span><b>XAN ATLAS</b><small>RESTAURANT</small></span>
          </a>
          <nav>{t.nav.map((item, index) => <a key={item} href={`#${["about","gallery","menu","delivery","contacts"][index]}`}>{item}</a>)}</nav>
          <div className="languages">{(["ru", "uz", "en"] as Lang[]).map((item) => <button className={lang === item ? "active" : ""} key={item} onClick={() => setLang(item)}>{item.toUpperCase()}</button>)}</div>
        </header>

        <div className="heroContent shell">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="lead">{t.text}</p>
          <div className="actions">
            <a className="primary" href="tel:+998662331831">{t.book}</a>
            <a className="secondary" href="#menu">{t.menu}</a>
          </div>
        </div>

        <div className="infoBar shell">
          <div><small>LOCATION</small><strong>{t.address}</strong></div>
          <div><small>HOURS</small><strong>{t.hours}</strong></div>
          <div><small>SERVICE</small><strong>{t.delivery}</strong></div>
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="aboutVisual"><div className="arch"><span>XAN<br/>ATLAS</span></div></div>
        <div className="aboutCopy">
          <p className="sectionLabel">XAN ATLAS · SAMARKAND</p>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="contactButtons">
            <a href="tel:+998662331831">{t.call}: +998 66 233-18-31</a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/xan_atlas_restaurant/">{t.instagram}: @xan_atlas_restaurant</a>
          </div>
        </div>
      </section>

      <section className="coming shell" id="menu">
        <p className="sectionLabel">MENU · DELIVERY · RESERVATION</p>
        <h2>Следующий этап — фотографии, логотип и меню</h2>
        <p>Структура уже готова. Далее подключим реальные фотографии ресторана, вырезанный логотип, галерею, каталог блюд и оформление заказа на доставку.</p>
      </section>

      <footer id="contacts">
        <div className="shell footerInner">
          <div><b>XAN ATLAS</b><span>{t.address}</span></div>
          <div><a href="tel:+998662331831">+998 66 233-18-31</a><span>11:00–23:00</span></div>
        </div>
      </footer>
    </main>
  );
}
