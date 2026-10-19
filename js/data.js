// Sayt sozlamalari: aloqa ma'lumotlarini o'zingiznikiga almashtiring
const SITE = {
  name: "IqlimTex",
  phone: "+998 90 000 00 00",
  email: "info@iqlimtex.uz",
  telegram: "iqlimtex",
  address: "Toshkent sh."
};

// Bo'limlar (kategoriyalar)
// metric: tanlashda qaysi ko'rsatkich ishlatiladi (cool / heat / air)
// area: qaysi maydonlar uchun mos (m²), ideal: eng mos keladigan oraliq
// maxUnits: katta maydon uchun nechta qurilma birlashtirilishi mumkin
const CATEGORIES = [
  {
    id: "split",
    name: "Split konditsionerlar",
    short: "Split",
    icon: "fa-snowflake",
    color: "#2f80ed",
    desc: "Devorga o'rnatiladigan inverterli split tizimlar. Xonadon, ofis va kichik do'konlar uchun sovutish va isitish rejimi bilan.",
    area: [10, 150], ideal: [10, 70], maxUnits: 2
  },
  {
    id: "multisplit",
    name: "Multi-split tizimlar",
    short: "Multi-split",
    icon: "fa-th-large",
    color: "#1c9fd6",
    desc: "Bitta tashqi blokka 2 tadan 5 tagacha ichki blok ulanadi. Bir nechta xonali kvartira va kottejlar uchun qulay yechim.",
    area: [30, 200], ideal: [50, 150], maxUnits: 1
  },
  {
    id: "vrf",
    name: "VRF / VRV tizimlar",
    short: "VRF",
    icon: "fa-building",
    color: "#6c5ce7",
    desc: "O'zgaruvchan sovutgich oqimli markaziy tizimlar. Bitta tashqi blokka o'nlab ichki blok ulanadi: ofis markazlari, mehmonxonalar, savdo majmualari uchun.",
    area: [80, 8000], ideal: [150, 3000], maxUnits: 6
  },
  {
    id: "chiller",
    name: "Chillerlar",
    short: "Chiller",
    icon: "fa-industry",
    color: "#0f4c81",
    desc: "Suv sovutish mashinalari (havo va suv bilan sovutiladigan, scroll, vintli, markazdan qochma). Fankoyllar va AHU bilan birga katta binolarni sovutadi.",
    area: [400, 60000], ideal: [1500, 60000], maxUnits: 6
  },
  {
    id: "ahu",
    name: "AHU — havo tayyorlash qurilmalari",
    short: "AHU",
    icon: "fa-wind",
    color: "#27ae60",
    desc: "Markaziy pritochno-vityajka qurilmalari: filtrlash, rekuperatsiya, isitish va sovutish batareyalari bilan. Havo hajmi bo'yicha tanlanadi.",
    area: [150, 60000], ideal: [400, 60000], maxUnits: 6
  },
  {
    id: "precision",
    name: "Pretsizion konditsionerlar",
    short: "Pretsizion",
    icon: "fa-server",
    color: "#eb5757",
    desc: "Server xonalari, data-markazlar va laboratoriyalar uchun 24/7 ishlaydigan, harorat va namlikni aniq ushlab turuvchi konditsionerlar.",
    area: [5, 2000], ideal: [5, 2000], maxUnits: 6, only: ["server"]
  },
  {
    id: "heatpump",
    name: "Issiqlik nasoslari (Heat Pump)",
    short: "Heat Pump",
    icon: "fa-sync-alt",
    color: "#f2994a",
    desc: "Havo-suv issiqlik nasoslari: qishda isitish, yozda sovutish va issiq suv. Gazga nisbatan 3–4 baravar tejamkor.",
    area: [30, 1500], ideal: [60, 400], maxUnits: 4
  },
  {
    id: "kotyol",
    name: "Gaz kotyollari",
    short: "Kotyol",
    icon: "fa-fire",
    color: "#e67e22",
    desc: "Devorga osiladigan va polga o'rnatiladigan bir va ikki konturli kotyollar. Uy va ofislarni isitish hamda issiq suv bilan ta'minlash.",
    area: [20, 1200], ideal: [40, 350], maxUnits: 3
  },
  {
    id: "boiler",
    name: "Sanoat qozonlari (Boylerlar)",
    short: "Boyler",
    icon: "fa-burn",
    color: "#c0392b",
    desc: "Katta binolar, korxonalar va qozonxonalar uchun yuqori quvvatli gaz/dizel suv isitish qozonlari.",
    area: [600, 60000], ideal: [2000, 60000], maxUnits: 6
  },
  {
    id: "vent",
    name: "Ventilyatsiya jihozlari",
    short: "Ventilyatsiya",
    icon: "fa-fan",
    color: "#16a085",
    desc: "Rekuperatorlar, kanal va tom ventilyatorlari. Toza havo almashinuvi va issiqlikni qaytarish orqali energiya tejash.",
    area: [5, 3000], ideal: [20, 400], maxUnits: 4
  }
];

// Mahsulotlar: cool / heat — kVt, air — m³/soat
const PRODUCTS = [
  // Split
  { cat: "split", model: "IT-SP07", name: "Split 07 Inverter", cool: 2.1, heat: 2.3, features: ["A++ energiya sinfi", "Shovqin 21 dB", "Wi-Fi boshqaruv"] },
  { cat: "split", model: "IT-SP09", name: "Split 09 Inverter", cool: 2.6, heat: 2.8, features: ["A++ energiya sinfi", "Shovqin 22 dB", "Wi-Fi boshqaruv"] },
  { cat: "split", model: "IT-SP12", name: "Split 12 Inverter", cool: 3.5, heat: 3.8, features: ["A++ energiya sinfi", "-15°C da isitish", "Wi-Fi boshqaruv"] },
  { cat: "split", model: "IT-SP18", name: "Split 18 Inverter", cool: 5.3, heat: 5.6, features: ["A+ energiya sinfi", "-15°C da isitish", "Ionizator"] },
  { cat: "split", model: "IT-SP24", name: "Split 24 Inverter", cool: 7.0, heat: 7.3, features: ["A+ energiya sinfi", "-15°C da isitish", "Ionizator"] },
  { cat: "split", model: "IT-SP36", name: "Split 36 Inverter", cool: 10.5, heat: 11.0, features: ["Kolonna yoki kassetali", "Katta zallar uchun", "3D havo oqimi"] },

  // Multi-split
  { cat: "multisplit", model: "IT-MS2", name: "Multi-split 2 xonali", cool: 4.1, heat: 4.4, features: ["2 ta ichki blok", "Inverter kompressor", "Bitta tashqi blok"] },
  { cat: "multisplit", model: "IT-MS3", name: "Multi-split 3 xonali", cool: 6.2, heat: 6.8, features: ["3 ta ichki blok", "Inverter kompressor", "Har xonada alohida pult"] },
  { cat: "multisplit", model: "IT-MS4", name: "Multi-split 4 xonali", cool: 8.2, heat: 9.0, features: ["4 ta ichki blok", "Inverter kompressor", "Devor/kanal/kassetali bloklar"] },
  { cat: "multisplit", model: "IT-MS5", name: "Multi-split 5 xonali", cool: 12.1, heat: 13.0, features: ["5 ta ichki blok", "Inverter kompressor", "Uzun magistral (70 m)"] },

  // VRF
  { cat: "vrf", model: "IT-VRF4", name: "Mini VRF 4 HP", cool: 12.1, heat: 14.0, features: ["7 tagacha ichki blok", "1 fazali", "Kottej va kichik ofis"] },
  { cat: "vrf", model: "IT-VRF6", name: "Mini VRF 6 HP", cool: 15.5, heat: 18.0, features: ["9 tagacha ichki blok", "1 fazali", "DC inverter"] },
  { cat: "vrf", model: "IT-VRF8", name: "VRF 8 HP", cool: 22.4, heat: 25.0, features: ["13 tagacha ichki blok", "3 fazali", "Modulli ulash"] },
  { cat: "vrf", model: "IT-VRF10", name: "VRF 10 HP", cool: 28.0, heat: 31.5, features: ["16 tagacha ichki blok", "3 fazali", "Modulli ulash"] },
  { cat: "vrf", model: "IT-VRF12", name: "VRF 12 HP", cool: 33.5, heat: 37.5, features: ["20 tagacha ichki blok", "3 fazali", "Modulli ulash"] },
  { cat: "vrf", model: "IT-VRF16", name: "VRF 16 HP", cool: 45.0, heat: 50.0, features: ["26 tagacha ichki blok", "Issiqlikni qayta tiklash", "BMS integratsiya"] },
  { cat: "vrf", model: "IT-VRF20", name: "VRF 20 HP", cool: 56.0, heat: 63.0, features: ["33 tagacha ichki blok", "Issiqlikni qayta tiklash", "BMS integratsiya"] },
  { cat: "vrf", model: "IT-VRF24", name: "VRF 24 HP", cool: 68.0, heat: 76.5, features: ["39 tagacha ichki blok", "Ikki modulli", "BMS integratsiya"] },
  { cat: "vrf", model: "IT-VRF32", name: "VRF 32 HP", cool: 90.0, heat: 100.0, features: ["53 tagacha ichki blok", "Ikki modulli", "BMS integratsiya"] },
  { cat: "vrf", model: "IT-VRF48", name: "VRF 48 HP", cool: 135.0, heat: 150.0, features: ["64 tagacha ichki blok", "Uch modulli", "BMS integratsiya"] },

  // Chiller
  { cat: "chiller", model: "IT-CH30", name: "Havo sovutishli chiller (scroll) 30 kVt", cool: 30, heat: 32, features: ["Issiqlik nasosi rejimi", "Gidromodul bilan", "R410A / R32"] },
  { cat: "chiller", model: "IT-CH65", name: "Havo sovutishli chiller (scroll) 65 kVt", cool: 65, heat: 70, features: ["Issiqlik nasosi rejimi", "Gidromodul bilan", "2 kompressor"] },
  { cat: "chiller", model: "IT-CH130", name: "Havo sovutishli chiller (scroll) 130 kVt", cool: 130, heat: 140, features: ["Issiqlik nasosi rejimi", "4 kompressor", "Modbus/BACnet"] },
  { cat: "chiller", model: "IT-CH260", name: "Havo sovutishli chiller (vintli) 260 kVt", cool: 260, features: ["Vintli kompressor", "Free-cooling opsiyasi", "Modbus/BACnet"] },
  { cat: "chiller", model: "IT-CH420", name: "Havo sovutishli chiller (vintli) 420 kVt", cool: 420, features: ["Vintli kompressor", "Free-cooling opsiyasi", "Past shovqinli"] },
  { cat: "chiller", model: "IT-CH700", name: "Suv sovutishli chiller (vintli) 700 kVt", cool: 700, features: ["Gradirnya bilan ishlaydi", "Yuqori EER", "Ichki o'rnatish"] },
  { cat: "chiller", model: "IT-CH1200", name: "Markazdan qochma chiller 1200 kVt", cool: 1200, features: ["Magnit podshipnikli", "Moysiz kompressor", "Juda yuqori samaradorlik"] },
  { cat: "chiller", model: "IT-CH2000", name: "Markazdan qochma chiller 2000 kVt", cool: 2000, features: ["Magnit podshipnikli", "Moysiz kompressor", "Data-markaz va zavodlar"] },

  // AHU
  { cat: "ahu", model: "IT-AHU1", name: "AHU 1 000 m³/soat", air: 1000, cool: 7, heat: 10, features: ["Plastinali rekuperator", "F7 filtr", "EC ventilyatorlar"] },
  { cat: "ahu", model: "IT-AHU2", name: "AHU 2 000 m³/soat", air: 2000, cool: 14, heat: 20, features: ["Plastinali rekuperator", "F7 filtr", "EC ventilyatorlar"] },
  { cat: "ahu", model: "IT-AHU3", name: "AHU 3 500 m³/soat", air: 3500, cool: 24, heat: 35, features: ["Rotorli rekuperator", "Suv/freon batareya", "Avtomatika shkafi"] },
  { cat: "ahu", model: "IT-AHU5", name: "AHU 5 000 m³/soat", air: 5000, cool: 35, heat: 50, features: ["Rotorli rekuperator", "Suv/freon batareya", "Avtomatika shkafi"] },
  { cat: "ahu", model: "IT-AHU8", name: "AHU 8 000 m³/soat", air: 8000, cool: 56, heat: 80, features: ["Rotorli rekuperator", "Namlantirgich opsiyasi", "Avtomatika shkafi"] },
  { cat: "ahu", model: "IT-AHU12", name: "AHU 12 000 m³/soat", air: 12000, cool: 84, heat: 120, features: ["Rotorli rekuperator", "Namlantirgich opsiyasi", "BMS integratsiya"] },
  { cat: "ahu", model: "IT-AHU20", name: "AHU 20 000 m³/soat", air: 20000, cool: 140, heat: 200, features: ["Gigiyenik bajarilish", "Namlantirgich", "BMS integratsiya"] },
  { cat: "ahu", model: "IT-AHU30", name: "AHU 30 000 m³/soat", air: 30000, cool: 210, heat: 300, features: ["Gigiyenik bajarilish", "Namlantirgich", "BMS integratsiya"] },

  // Pretsizion
  { cat: "precision", model: "IT-PR7", name: "Pretsizion 7 kVt", cool: 7, features: ["±0.5°C aniqlik", "Namlik nazorati", "24/7 ishlash"] },
  { cat: "precision", model: "IT-PR12", name: "Pretsizion 12.5 kVt", cool: 12.5, features: ["±0.5°C aniqlik", "Namlik nazorati", "24/7 ishlash"] },
  { cat: "precision", model: "IT-PR20", name: "Pretsizion 20 kVt", cool: 20, features: ["Pastga havo berish", "EC ventilyator", "Rotatsiya va zaxira"] },
  { cat: "precision", model: "IT-PR35", name: "Pretsizion 35 kVt", cool: 35, features: ["Pastga havo berish", "EC ventilyator", "Rotatsiya va zaxira"] },
  { cat: "precision", model: "IT-PR45", name: "Pretsizion 45 kVt", cool: 45, features: ["Inverter kompressor", "Free-cooling", "SNMP monitoring"] },
  { cat: "precision", model: "IT-PR60", name: "Pretsizion 60 kVt", cool: 60, features: ["Inverter kompressor", "Free-cooling", "SNMP monitoring"] },
  { cat: "precision", model: "IT-PR90", name: "Pretsizion 90 kVt", cool: 90, features: ["Data-markazlar uchun", "Free-cooling", "SNMP monitoring"] },

  // Heat Pump
  { cat: "heatpump", model: "IT-HP6", name: "Issiqlik nasosi 6 kVt", cool: 5.5, heat: 6, features: ["Havo-suv monoblok", "-25°C gacha ishlaydi", "Issiq suv (GVS)"] },
  { cat: "heatpump", model: "IT-HP9", name: "Issiqlik nasosi 9 kVt", cool: 8, heat: 9, features: ["Havo-suv monoblok", "-25°C gacha ishlaydi", "Issiq suv (GVS)"] },
  { cat: "heatpump", model: "IT-HP12", name: "Issiqlik nasosi 12 kVt", cool: 11, heat: 12, features: ["Havo-suv split", "-25°C gacha ishlaydi", "Issiq pol uchun"] },
  { cat: "heatpump", model: "IT-HP16", name: "Issiqlik nasosi 16 kVt", cool: 14, heat: 16, features: ["Havo-suv split", "-25°C gacha ishlaydi", "Issiq pol uchun"] },
  { cat: "heatpump", model: "IT-HP22", name: "Issiqlik nasosi 22 kVt", cool: 19, heat: 22, features: ["3 fazali", "COP 4.6 gacha", "Kaskad ulash"] },
  { cat: "heatpump", model: "IT-HP30", name: "Tijorat issiqlik nasosi 30 kVt", cool: 27, heat: 30, features: ["3 fazali", "Kaskad ulash", "Modbus"] },
  { cat: "heatpump", model: "IT-HP60", name: "Tijorat issiqlik nasosi 60 kVt", cool: 55, heat: 60, features: ["3 fazali", "Kaskad ulash", "Modbus"] },

  // Kotyol
  { cat: "kotyol", model: "IT-K12", name: "Devoriy gaz kotyoli 12 kVt", heat: 12, features: ["Ikki konturli", "Yopiq kamera", "Turbo"] },
  { cat: "kotyol", model: "IT-K18", name: "Devoriy gaz kotyoli 18 kVt", heat: 18, features: ["Ikki konturli", "Yopiq kamera", "Turbo"] },
  { cat: "kotyol", model: "IT-K24", name: "Devoriy gaz kotyoli 24 kVt", heat: 24, features: ["Ikki konturli", "Issiq suv 11 l/min", "Past bosimda ishlaydi"] },
  { cat: "kotyol", model: "IT-K32", name: "Devoriy kondensatsion kotyol 32 kVt", heat: 32, features: ["Kondensatsion, 108% FIK", "Ikki konturli", "Ob-havo avtomatikasi"] },
  { cat: "kotyol", model: "IT-K45", name: "Pol kotyoli 45 kVt", heat: 45, features: ["Cho'yan issiqlik almashtirgich", "Bir konturli", "Boyler ulash imkoniyati"] },
  { cat: "kotyol", model: "IT-K70", name: "Pol kotyoli 70 kVt", heat: 70, features: ["Cho'yan issiqlik almashtirgich", "Bir konturli", "Kaskad ulash"] },
  { cat: "kotyol", model: "IT-K100", name: "Pol kotyoli 100 kVt", heat: 100, features: ["Kondensatsion", "Kaskad ulash", "Ob-havo avtomatikasi"] },

  // Boyler (sanoat qozonlari)
  { cat: "boiler", model: "IT-B150", name: "Suv isitish qozoni 150 kVt", heat: 150, features: ["Gaz / dizel gorelka", "FIK 93%", "Po'lat korpus"] },
  { cat: "boiler", model: "IT-B300", name: "Suv isitish qozoni 300 kVt", heat: 300, features: ["Gaz / dizel gorelka", "FIK 93%", "Po'lat korpus"] },
  { cat: "boiler", model: "IT-B500", name: "Suv isitish qozoni 500 kVt", heat: 500, features: ["Uch yo'lli tutun yo'li", "Modulyatsiyali gorelka", "Avtomatika"] },
  { cat: "boiler", model: "IT-B750", name: "Suv isitish qozoni 750 kVt", heat: 750, features: ["Uch yo'lli tutun yo'li", "Modulyatsiyali gorelka", "Avtomatika"] },
  { cat: "boiler", model: "IT-B1000", name: "Suv isitish qozoni 1 000 kVt", heat: 1000, features: ["Blok-modulli qozonxona", "Ekonomayzer", "Dispetcherlik"] },
  { cat: "boiler", model: "IT-B2000", name: "Suv isitish qozoni 2 000 kVt", heat: 2000, features: ["Blok-modulli qozonxona", "Ekonomayzer", "Dispetcherlik"] },
  { cat: "boiler", model: "IT-B3000", name: "Suv isitish qozoni 3 000 kVt", heat: 3000, features: ["Sanoat korxonalari uchun", "Ekonomayzer", "Dispetcherlik"] },

  // Ventilyatsiya
  { cat: "vent", sub: "Rekuperator", model: "IT-R150", name: "Rekuperator 150 m³/soat", air: 150, features: ["Issiqlik qaytarish 90%", "Devorga o'rnatiladi", "Kvartira uchun"] },
  { cat: "vent", sub: "Rekuperator", model: "IT-R350", name: "Rekuperator 350 m³/soat", air: 350, features: ["Issiqlik qaytarish 88%", "Shiftga o'rnatiladi", "G4+F7 filtr"] },
  { cat: "vent", sub: "Rekuperator", model: "IT-R600", name: "Rekuperator 600 m³/soat", air: 600, features: ["Issiqlik qaytarish 85%", "EC ventilyatorlar", "G4+F7 filtr"] },
  { cat: "vent", sub: "Rekuperator", model: "IT-R1000", name: "Rekuperator 1 000 m³/soat", air: 1000, features: ["Issiqlik qaytarish 85%", "EC ventilyatorlar", "Elektr isitgich"] },
  { cat: "vent", sub: "Rekuperator", model: "IT-R2000", name: "Rekuperator 2 000 m³/soat", air: 2000, features: ["Issiqlik qaytarish 82%", "EC ventilyatorlar", "Suv isitgich"] },
  { cat: "vent", sub: "Kanal ventilyatori", model: "IT-F300", name: "Kanal ventilyatori 300 m³/soat", air: 300, features: ["Dumaloq kanal Ø125", "Past shovqin", "Tezlik regulyatori"] },
  { cat: "vent", sub: "Kanal ventilyatori", model: "IT-F800", name: "Kanal ventilyatori 800 m³/soat", air: 800, features: ["Dumaloq kanal Ø200", "Past shovqin", "Tezlik regulyatori"] },
  { cat: "vent", sub: "Kanal ventilyatori", model: "IT-F1500", name: "Kanal ventilyatori 1 500 m³/soat", air: 1500, features: ["To'g'ri burchakli kanal", "EC motor", "Tezlik regulyatori"] },
  { cat: "vent", sub: "Kanal ventilyatori", model: "IT-F3000", name: "Tom ventilyatori 3 000 m³/soat", air: 3000, features: ["Tomga o'rnatiladi", "Tutun chiqarish opsiyasi", "IP54"] },
  { cat: "vent", sub: "Kanal ventilyatori", model: "IT-F6000", name: "Tom ventilyatori 6 000 m³/soat", air: 6000, features: ["Tomga o'rnatiladi", "Tutun chiqarish opsiyasi", "IP54"] }
];

// Xona turlari: sovutish va isitish uchun W/m² (shift balandligi 2.7 m da), havo almashinuvi (marta/soat)
const ROOM_TYPES = {
  home:       { name: "Turar joy (kvartira, uy)", cool: 100, heat: 100, ach: 1 },
  office:     { name: "Ofis", cool: 120, heat: 90, ach: 3 },
  shop:       { name: "Do'kon / savdo zali", cool: 150, heat: 90, ach: 3 },
  restaurant: { name: "Restoran / kafe", cool: 180, heat: 90, ach: 6 },
  gym:        { name: "Sport zal", cool: 140, heat: 80, ach: 4 },
  industry:   { name: "Ishlab chiqarish / sklad", cool: 130, heat: 110, ach: 3 },
  server:     { name: "Server xonasi", cool: 350, heat: 0, ach: 1 }
};

// Natijalar guruhlari: qaysi bo'lim qaysi ko'rsatkich bo'yicha tanlanadi
const RESULT_GROUPS = [
  {
    id: "cooling", title: "Sovutish jihozlari", icon: "fa-snowflake", need: "cool",
    items: [
      { cat: "split", metric: "cool" },
      { cat: "multisplit", metric: "cool" },
      { cat: "vrf", metric: "cool" },
      { cat: "chiller", metric: "cool" },
      { cat: "precision", metric: "cool" },
      { cat: "heatpump", metric: "cool" }
    ]
  },
  {
    id: "heating", title: "Isitish jihozlari", icon: "fa-fire", need: "heat",
    items: [
      { cat: "kotyol", metric: "heat" },
      { cat: "heatpump", metric: "heat" },
      { cat: "boiler", metric: "heat" },
      { cat: "vrf", metric: "heat" },
      { cat: "split", metric: "heat" }
    ]
  },
  {
    id: "vent", title: "Ventilyatsiya jihozlari", icon: "fa-wind", need: "air",
    items: [
      { cat: "vent", metric: "air", sub: "Rekuperator" },
      { cat: "vent", metric: "air", sub: "Kanal ventilyatori" },
      { cat: "ahu", metric: "air" }
    ]
  }
];
