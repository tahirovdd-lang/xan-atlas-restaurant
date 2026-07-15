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
    aboutText: "В ресторане Xan Atlas вы сможете в полной мере оценить традиции гостеприимства солнечного Узбекистана. Здесь подают национальные узбекские блюда под чарующие звуки восточной классической музыки. Интерьер оформлен в национальном стиле, а тёплая и спокойная атмосфера помогает почувствовать себя как дома.",
    galleryTitle: "Атмосфера Xan Atlas",
    galleryText: "Национальные орнаменты, керамика, мягкий свет и просторные залы создают особую атмосферу для семейных встреч, праздников и деловых ужинов.",
    menuTitle: "Национальная кухня с современной подачей",
    menuText: "Полное меню будет добавлено следующим этапом. Здесь появятся категории блюд, фотографии, состав, вес и цены.",
    deliveryTitle: "Любимые блюда — с доставкой",
    deliveryText: "Принимаем заказы ежедневно с 11:00 до 23:00. Для оформления доставки позвоните в ресторан.",
    call: "Позвонить",
    route: "Построить маршрут",
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
    aboutText: "Xan Atlas restoranida quyoshli O‘zbekistonning mehmondo‘stlik an’analarini to‘liq his qilasiz. Milliy taomlar sharq klassik musiqasi sadolari ostida tortiladi. Milliy uslubdagi interyer va sokin muhit o‘zingizni uydagidek his qilishingizga yordam beradi.",
    galleryTitle: "Xan Atlas muhiti",
    galleryText: "Milliy naqshlar, kulolchilik buyumlari, iliq yorug‘lik va keng zallar oilaviy uchrashuvlar, bayramlar va ish uchrashuvlari uchun o‘ziga xos muhit yaratadi.",
    menuTitle: "Zamonaviy taqdimotdagi milliy taomlar",
    menuText: "To‘liq menyu keyingi bosqichda qo‘shiladi. Bu yerda kategoriyalar, rasmlar, tarkib, og‘irlik va narxlar bo‘ladi.",
    deliveryTitle: "Sevimli taomlaringiz — yetkazib berish bilan",
    deliveryText: "Buyurtmalar har kuni 11:00 dan 23:00 gacha qabul qilinadi. Yetkazib berish uchun restoranga qo‘ng‘iroq qiling.",
    call: "Qo‘ng‘iroq qilish",
    route: "Yo‘nalish ochish",
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
    aboutText: "At Xan Atlas you can fully experience the hospitality traditions of sunny Uzbekistan. National dishes are served to the sounds of Eastern classical music. The traditional interior and calm atmosphere make every guest feel at home.",
    galleryTitle: "The Xan Atlas atmosphere",
    galleryText: "Traditional patterns, ceramics, warm lighting and spacious halls create a distinctive setting for family gatherings, celebrations and business dinners.",
    menuTitle: "National cuisine with a modern presentation",
    menuText: "The full menu will be added next with categories, photography, ingredients, weights and prices.",
    deliveryTitle: "Your favourite dishes, delivered",
    deliveryText: "Orders are accepted daily from 11:00 to 23:00. Call the restaurant to arrange delivery.",
    call: "Call us",
    route: "Get directions",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = copy[lang];

  return (
    <main>
      <section className="hero" id="home">
        <div className="shade" />
        <header className="header shell">
          <a className="brand" href="#home" aria-label="Xan Atlas">
            <img src="/logo.webp" alt="Xan Atlas Restaurant" />
          </a>
          <nav>{t.nav.map((item, index) => <a key={item} href={`#${["about","gallery","menu","delivery","contacts"][index]}`}>{item}</a>)}</nav>
          <div className="languages">{(["ru", "uz", "en"] as Lang[]).map((item) => <button className={lang === item ? "active" : ""} key={item} onClick={() => setLang(item)}>{item.toUpperCase()}</button>)}</div>
        </header>

        <div className="heroContent shell">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="lead">{t.text}</p>
          <div className="actions"><a className="primary" href="tel:+998662331831">{t.book}</a><a className="secondary" href="#menu">{t.menu}</a></div>
        </div>

        <div className="infoBar shell">
          <div><small>LOCATION</small><strong>{t.address}</strong></div>
          <div><small>HOURS</small><strong>{t.hours}</strong></div>
          <div><small>SERVICE</small><strong>{t.delivery}</strong></div>
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="aboutVisual"><img src="/about.webp" alt="Интерьер ресторана Xan Atlas" /></div>
        <div className="aboutCopy"><p className="sectionLabel">XAN ATLAS · SAMARKAND</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="contactButtons"><a href="tel:+998662331831">+998 66 233-18-31</a><a target="_blank" rel="noreferrer" href="https://www.instagram.com/xan_atlas_restaurant/">@xan_atlas_restaurant</a></div></div>
      </section>

      <section className="gallerySection" id="gallery">
        <div className="shell sectionHead"><div><p className="sectionLabel">GALLERY</p><h2>{t.galleryTitle}</h2></div><p>{t.galleryText}</p></div>
        <div className="galleryGrid shell">
          <figure className="galleryCard card1"><img src="/gallery-1.webp" alt="Главный зал Xan Atlas" /></figure>
          <figure className="galleryCard card2"><img src="/gallery-2.webp" alt="Национальный интерьер Xan Atlas" /></figure>
          <figure className="galleryCard card3"><img src="/about.webp" alt="Зал ресторана Xan Atlas" /></figure>
          <figure className="galleryCard card4"><img src="/hero.webp" alt="Атмосфера Xan Atlas" /></figure>
        </div>
      </section>

      <section className="menuSection shell" id="menu"><div><p className="sectionLabel">MENU</p><h2>{t.menuTitle}</h2><p>{t.menuText}</p><a className="secondary inlineButton" href="tel:+998662331831">{t.call}</a></div><div className="menuOrnament"><img src="/logo.webp" alt="Xan Atlas" /></div></section>

      <section className="deliverySection" id="delivery"><div className="deliveryOverlay" /><div className="shell deliveryInner"><div><p className="sectionLabel">DELIVERY</p><h2>{t.deliveryTitle}</h2><p>{t.deliveryText}</p></div><a className="primary" href="tel:+998662331831">+998 66 233-18-31</a></div></section>

      <section className="contacts shell" id="contacts"><div><p className="sectionLabel">CONTACTS</p><h2>{t.address}</h2></div><div className="contactList"><a href="tel:+998662331831">+998 66 233-18-31</a><span>11:00–23:00</span><a target="_blank" rel="noreferrer" href="https://www.instagram.com/xan_atlas_restaurant/">Instagram</a><a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Samarkand%20Mahmud%20Kashgari%2092">{t.route}</a></div></section>

      <footer><div className="shell footerInner"><img src="/logo.webp" alt="Xan Atlas" /><div><a href="tel:+998662331831">+998 66 233-18-31</a><span>{t.address}</span></div></div></footer>
    </main>
  );
}
