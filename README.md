# 1-dars — IqlimTex HVAC sayti

HVAC jihozlari katalogi va maydon bo'yicha jihoz tanlash kalkulyatori (HTML + CSS + JavaScript, server shart emas).

## Bo'limlar
Split konditsionerlar, Multi-split, VRF/VRV, Chiller, AHU, Pretsizion konditsionerlar,
Issiqlik nasoslari (Heat Pump), Gaz kotyollari, Sanoat qozonlari (Boyler), Ventilyatsiya jihozlari.

## Kalkulyator
Mijoz maydonni (m²), shift balandligini, bino turini, izolyatsiya va quyosh tomonini kiritadi.
Sayt sovutish (kVt), isitish (kVt) va havo almashinuvi (m³/soat) quvvatini hisoblab,
har bir bo'limdan mos model va kerakli sonini ko'rsatadi.

## Fayllar
- `index.html` — sahifa
- `css/style.css` — dizayn
- `js/data.js` — **telefon, email, Telegram**, bo'limlar, mahsulotlar va hisob koeffitsiyentlari (shu yerda tahrirlang)
- `js/app.js` — katalog, kalkulyator va so'rov formasi
- `js/illustrations.js` — har bir jihoz turi uchun SVG chizmalar
- `img/` — haqiqiy mahsulot rasmlari uchun papka: rasmni shu yerga qo'ying va `js/data.js` da mahsulotga `image: "img/fayl.jpg"` qo'shing — chizma o'rniga rasm chiqadi
- `dars-1/` — oldingi dars sahifasi

Ishga tushirish: `index.html` faylini brauzerda oching yoki GitHub Pages orqali joylang.
