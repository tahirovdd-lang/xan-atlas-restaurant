"use client";

import { FormEvent, useState } from "react";

type Lang = "ru" | "uz" | "en";
type Category = "pasta" | "soups" | "lunch";

type Dish = {
  name: string;
  description?: string;
  price: number;
  weight: number;
};

const languageOptions: { code: Lang; flag: string; label: string }[] = [
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "uz", flag: "🇺🇿", label: "UZ" },
  { code: "en", flag: "🇬🇧", label: "EN" },
];

const copy = {
  ru: {
    nav: ["О ресторане", "Меню", "Галерея", "Бронирование", "Доставка", "Контакты"],
    eyebrow: "Ресторан национальной кухни · Самарканд",
    brand: "XAN ATLAS",
    title: "Вкус Востока\nв сердце Самарканда",
    text: "Аутентичная кухня, уютная атмосфера и безупречный сервис для вашего отдыха.",
    book: "Забронировать стол",
    menu: "Смотреть меню",
    menuHeading: "Наше меню",
    menuSub: "Лучшие блюда восточной и европейской кухни",
    categoryCount: { pasta: "4 блюда", soups: "6 блюд", lunch: "8 сетов" },
    aboutTitle: "Восточное гостеприимство в каждой детали",
    aboutText: "В Xan Atlas вы сможете в полной мере оценить традиции гостеприимства солнечного Узбекистана. Национальные блюда, восточная музыка и интерьер в традиционном стиле создают тёплую атмосферу, в которую хочется возвращаться.",
    galleryTitle: "Атмосфера Xan Atlas",
    galleryText: "Национальные орнаменты, керамика, мягкий свет и просторные залы создают особое пространство для семейных встреч, праздников и деловых ужинов.",
    foodTitle: "Полное меню",
    foodText: "Выберите категорию, чтобы посмотреть блюда, вес и цены.",
    categories: { pasta: "Паста", soups: "Супы", lunch: "Бизнес-ланч" },
    deliveryTitle: "Любимые блюда — с доставкой",
    deliveryText: "Заказы принимаются ежедневно. Для оформления доставки свяжитесь с рестораном.",
    contactsTitle: "Контакты",
    address: "Самарканд, ул. Махмуда Кашгари, 92",
    hours: "Ежедневно · 11:00–23:00",
    delivery: "Доставка по Самарканду",
    route: "Построить маршрут",
    reserveTitle: "Бронирование столика",
    reserveText: "Оставьте данные. Администратор подтвердит бронь по телефону.",
    name: "Ваше имя",
    phone: "Номер телефона",
    date: "Дата",
    time: "Время",
    guests: "Количество гостей",
    comment: "Комментарий",
    submit: "Подготовить заявку",
    ready: "Заявка подготовлена",
    readyText: "Для подтверждения бронирования позвоните в ресторан.",
    close: "Закрыть",
  },
  uz: {
    nav: ["Restoran haqida", "Menyu", "Galereya", "Band qilish", "Yetkazib berish", "Aloqa"],
    eyebrow: "Milliy taomlar restorani · Samarqand",
    brand: "XAN ATLAS",
    title: "Sharq ta’mi\nSamarqand qalbida",
    text: "Haqiqiy taomlar, shinam muhit va mukammal xizmat.",
    book: "Stol band qilish",
    menu: "Menyuni ko‘rish",
    menuHeading: "Bizning menyu",
    menuSub: "Sharq va Yevropa oshxonasining eng yaxshi taomlari",
    categoryCount: { pasta: "4 taom", soups: "6 taom", lunch: "8 set" },
    aboutTitle: "Har bir detalda sharqona mehmondo‘stlik",
    aboutText: "Xan Atlas restoranida O‘zbekiston mehmondo‘stligi, milliy taomlar, sharqona musiqa va an’anaviy interyer uyg‘unlashadi.",
    galleryTitle: "Xan Atlas muhiti",
    galleryText: "Milliy naqshlar, kulolchilik buyumlari, iliq yorug‘lik va keng zallar o‘ziga xos muhit yaratadi.",
    foodTitle: "To‘liq menyu",
    foodText: "Taomlar, vazn va narxlarni ko‘rish uchun bo‘limni tanlang.",
    categories: { pasta: "Pasta", soups: "Sho‘rvalar", lunch: "Biznes-lanch" },
    deliveryTitle: "Sevimli taomlaringiz — yetkazib berish bilan",
    deliveryText: "Buyurtmalar har kuni qabul qilinadi. Yetkazib berish uchun restoranga murojaat qiling.",
    contactsTitle: "Aloqa",
    address: "Samarqand, Mahmud Qoshg‘ari ko‘chasi, 92",
    hours: "Har kuni · 11:00–23:00",
    delivery: "Samarqand bo‘ylab yetkazib berish",
    route: "Yo‘nalish ochish",
    reserveTitle: "Stol band qilish",
    reserveText: "Ma’lumotlarni qoldiring. Administrator telefon orqali tasdiqlaydi.",
    name: "Ismingiz",
    phone: "Telefon raqami",
    date: "Sana",
    time: "Vaqt",
    guests: "Mehmonlar soni",
    comment: "Izoh",
    submit: "Arizani tayyorlash",
    ready: "Ariza tayyorlandi",
    readyText: "Bandni tasdiqlash uchun restoranga qo‘ng‘iroq qiling.",
    close: "Yopish",
  },
  en: {
    nav: ["About", "Menu", "Gallery", "Reservation", "Delivery", "Contacts"],
    eyebrow: "National cuisine restaurant · Samarkand",
    brand: "XAN ATLAS",
    title: "The taste of the East\nin the heart of Samarkand",
    text: "Authentic cuisine, a warm atmosphere and impeccable service.",
    book: "Book a table",
    menu: "View menu",
    menuHeading: "Our menu",
    menuSub: "The best of Eastern and European cuisine",
    categoryCount: { pasta: "4 dishes", soups: "6 dishes", lunch: "8 sets" },
    aboutTitle: "Eastern hospitality in every detail",
    aboutText: "At Xan Atlas, Uzbek hospitality, national cuisine, Eastern music and traditional interiors come together in one welcoming experience.",
    galleryTitle: "The Xan Atlas atmosphere",
    galleryText: "Traditional patterns, ceramics, warm lighting and spacious halls create a distinctive setting.",
    foodTitle: "Full menu",
    foodText: "Choose a category to view dishes, weights and prices.",
    categories: { pasta: "Pasta", soups: "Soups", lunch: "Business lunch" },
    deliveryTitle: "Your favourite dishes, delivered",
    deliveryText: "Orders are accepted daily. Contact the restaurant to arrange delivery.",
    contactsTitle: "Contacts",
    address: "92 Mahmud Kashgari Street, Samarkand",
    hours: "Daily · 11:00–23:00",
    delivery: "Delivery across Samarkand",
    route: "Get directions",
    reserveTitle: "Table reservation",
    reserveText: "Leave your details. The administrator will confirm by phone.",
    name: "Your name",
    phone: "Phone number",
    date: "Date",
    time: "Time",
    guests: "Number of guests",
    comment: "Comment",
    submit: "Prepare request",
    ready: "Request prepared",
    readyText: "Call the restaurant to confirm your booking.",
    close: "Close",
  },
};

const menuData: Record<Category, Dish[]> = {
  pasta: [
    { name: "Альфредо из курицы", price: 79000, weight: 300 },
    { name: "Паста Фетучини с соусом песто", price: 82000, weight: 310 },
    { name: "Спагетти Болоньезе из говядины", description: "Сочная говядина, лук, густой томатный соус и свежий базилик.", price: 90000, weight: 300 },
    { name: "Фетучини с креветками", description: "Фетучини с креветками в нежном сливочном соусе.", price: 160000, weight: 350 },
  ],
  soups: [
    { name: "Борщ с говядиной", price: 38000, weight: 280 },
    { name: "Грибной крем-суп", description: "Нежный крем-суп с насыщенным грибным вкусом.", price: 41000, weight: 300 },
    { name: "Мастава из говядины", price: 41000, weight: 300 },
    { name: "Окрошка овощная", price: 35000, weight: 300 },
    { name: "Суп из пельменей", price: 40000, weight: 300 },
    { name: "Ун оши из говядины", price: 40000, weight: 300 },
  ],
  lunch: [
    { name: "Сет говяжий", price: 70000, weight: 350 },
    { name: "Сет казан кабоб из говядины", price: 75000, weight: 440 },
    { name: "Сет киевский", price: 60000, weight: 350 },
    { name: "Сет куриный", price: 60000, weight: 350 },
    { name: "Сет курица карри", price: 65000, weight: 350 },
    { name: "Сет микс", price: 67000, weight: 350 },
    { name: "Сет тефтели", price: 74000, weight: 350 },
    { name: "Туй кабоб", price: 75000, weight: 400 },
  ],
};

const categoryImages: Record<Category, string> = {
  pasta: "/gallery-1.webp",
  soups: "/gallery-2.webp",
  lunch: "/about.webp",
};

const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price);

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const [activeCategory, setActiveCategory] = useState<Category>("pasta");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = copy[lang];

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function closeBooking() {
    setBookingOpen(false);
    setSubmitted(false);
  }

  return (
    <main>
      <section className="hero" id="home">
        <div className="shade" />
        <header className="header shell">
          <a className="animatedLogo" href="#home" aria-label="Xan Atlas">
            <span className="logoGlow" />
            <img src="/logo-xan-atlas.svg" alt="Xan Atlas Restaurant" />
          </a>
          <nav>{t.nav.map((item, index) => <a key={item} href={`#${["about","menu","gallery","reservation","delivery","contacts"][index]}`}>{item}</a>)}</nav>
          <div className="languages">{languageOptions.map((item) => <button className={lang === item.code ? "active" : ""} key={item.code} onClick={() => setLang(item.code)}><span>{item.flag}</span><b>{item.label}</b></button>)}</div>
        </header>

        <div className="heroContent shell">
          <p className="eyebrow">{t.eyebrow}</p>
          <div className="heroBrand">{t.brand}</div>
          <h1>{t.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <div className="goldDivider"><span /></div>
          <p className="lead">{t.text}</p>
          <div className="actions">
            <button className="primary" onClick={() => setBookingOpen(true)}>▣ {t.book}</button>
            <a className="secondary" href="#menu">▤ {t.menu}</a>
          </div>
        </div>
      </section>

      <section className="menuPreview" id="menu">
        <div className="shell">
          <div className="centerTitle"><p className="sectionLabel">XAN ATLAS</p><h2>{t.menuHeading}</h2><p>{t.menuSub}</p></div>
          <div className="categoryCards">
            {(["pasta", "soups", "lunch"] as Category[]).map((category) => (
              <button className="categoryCard" key={category} onClick={() => { setActiveCategory(category); document.getElementById("full-menu")?.scrollIntoView({ behavior: "smooth" }); }}>
                <img src={categoryImages[category]} alt={t.categories[category]} />
                <span className="categoryOverlay" />
                <span className="categoryIcon">✦</span>
                <strong>{t.categories[category]}</strong>
                <small>{t.categoryCount[category]}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="aboutVisual"><img src="/about.webp" alt="Интерьер Xan Atlas" /></div>
        <div className="aboutCopy"><p className="sectionLabel">XAN ATLAS · SAMARKAND</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p></div>
      </section>

      <section className="foodMenu" id="full-menu">
        <div className="shell">
          <div className="menuHeader"><p className="sectionLabel">MENU</p><h2>{t.foodTitle}</h2><p>{t.foodText}</p></div>
          <div className="categoryTabs">{(["pasta", "soups", "lunch"] as Category[]).map((category) => <button className={activeCategory === category ? "active" : ""} key={category} onClick={() => setActiveCategory(category)}>{t.categories[category]}</button>)}</div>
          <div className="dishGrid">{menuData[activeCategory].map((dish) => <article className="dishCard" key={dish.name}><div className="dishTop"><h3>{dish.name}</h3><strong>{formatPrice(dish.price)} <small>сум</small></strong></div>{dish.description && <p>{dish.description}</p>}<span>{dish.weight} г</span></article>)}</div>
        </div>
      </section>

      <section className="gallerySection" id="gallery"><div className="shell sectionHead"><div><p className="sectionLabel">GALLERY</p><h2>{t.galleryTitle}</h2></div><p>{t.galleryText}</p></div><div className="galleryGrid shell"><figure className="galleryCard card1"><img src="/gallery-1.webp" alt="Главный зал Xan Atlas" /></figure><figure className="galleryCard card2"><img src="/gallery-2.webp" alt="Национальный интерьер Xan Atlas" /></figure><figure className="galleryCard card3"><img src="/about.webp" alt="Зал Xan Atlas" /></figure><figure className="galleryCard card4"><img src="/hero.webp" alt="Атмосфера Xan Atlas" /></figure></div></section>

      <section className="reservationStrip" id="reservation"><div className="shell"><div><p className="sectionLabel">RESERVATION</p><h2>{t.reserveTitle}</h2></div><button className="primary" onClick={() => setBookingOpen(true)}>{t.book}</button></div></section>

      <section className="deliverySection" id="delivery"><div className="deliveryOverlay" /><div className="shell deliveryInner"><div><p className="sectionLabel">DELIVERY</p><h2>{t.deliveryTitle}</h2><p>{t.deliveryText}</p></div><a className="primary" href="tel:+998662331831">+998 66 233-18-31</a></div></section>

      <section className="contacts shell" id="contacts"><div><p className="sectionLabel">CONTACTS</p><h2>{t.contactsTitle}</h2><p className="contactsAddress">{t.address}</p></div><div className="contactList"><span>{t.hours}</span><span>{t.delivery}</span><a href="tel:+998662331831">+998 66 233-18-31</a><a target="_blank" rel="noreferrer" href="https://www.instagram.com/xan_atlas_restaurant/">@xan_atlas_restaurant</a><a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Samarkand%20Mahmud%20Kashgari%2092">{t.route}</a></div></section>

      <footer><div className="shell footerInner"><img src="/logo-xan-atlas.svg" alt="Xan Atlas" /><span>© 2026 Xan Atlas Restaurant</span></div></footer>

      {bookingOpen && <div className="modalBackdrop" role="presentation" onMouseDown={closeBooking}><div className="bookingModal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}><button className="modalClose" aria-label={t.close} onClick={closeBooking}>×</button>{submitted ? <div className="bookingSuccess"><p className="sectionLabel">XAN ATLAS</p><h2 id="booking-title">{t.ready}</h2><p>{t.readyText}</p><a className="primary" href="tel:+998662331831">+998 66 233-18-31</a></div> : <><p className="sectionLabel">RESERVATION</p><h2 id="booking-title">{t.reserveTitle}</h2><p className="modalIntro">{t.reserveText}</p><form className="bookingForm" onSubmit={submitBooking}><label><span>{t.name}</span><input name="name" required autoComplete="name" /></label><label><span>{t.phone}</span><input name="phone" type="tel" required placeholder="+998" autoComplete="tel" /></label><div className="formRow"><label><span>{t.date}</span><input name="date" type="date" required /></label><label><span>{t.time}</span><input name="time" type="time" min="11:00" max="23:00" required /></label></div><label><span>{t.guests}</span><select name="guests" defaultValue="2">{Array.from({ length: 12 }, (_, index) => index + 1).map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label><span>{t.comment}</span><textarea name="comment" rows={3} /></label><button className="primary submitButton" type="submit">{t.submit}</button></form></>}</div></div>}
    </main>
  );
}
