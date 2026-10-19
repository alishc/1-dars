// ---------- Yordamchi funksiyalar ----------
const $ = (sel) => document.querySelector(sel);
const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
const fullName = (p) => `${p.brand || DEFAULT_BRAND} ${p.name}`;

function fmt(n, digits = 1) {
  const rounded = Number(n.toFixed(digits));
  return rounded.toLocaleString("ru-RU").replace(/,/g, ".");
}

// Server xonasi uchun faqat shu bo'limlar tavsiya etiladi
const SERVER_CATS = ["precision", "split", "vent"];

// Izolyatsiya va quyosh koeffitsiyentlari
const INSULATION = {
  good: { cool: 0.9, heat: 0.8 },
  mid: { cool: 1, heat: 1 },
  bad: { cool: 1.15, heat: 1.3 }
};

// ---------- Sayt ma'lumotlarini joylash ----------
function fillSiteInfo() {
  document.querySelectorAll(".site-name").forEach((el) => (el.textContent = SITE.name));
  document.querySelectorAll(".site-phone").forEach((el) => (el.textContent = SITE.phone));
  document.querySelectorAll(".site-phone-link").forEach((el) => (el.href = "tel:" + SITE.phone.replace(/\s/g, "")));
  document.querySelectorAll(".site-email").forEach((el) => (el.textContent = SITE.email));
  document.querySelectorAll(".site-email-link").forEach((el) => (el.href = "mailto:" + SITE.email));
  document.querySelectorAll(".site-telegram").forEach((el) => (el.textContent = SITE.telegram));
  document.querySelectorAll(".site-telegram-link").forEach((el) => (el.href = "https://t.me/" + SITE.telegram));
  document.querySelectorAll(".site-telegram-item").forEach((el) => (el.hidden = !SITE.telegram));
  document.querySelectorAll(".site-address").forEach((el) => (el.textContent = SITE.address));
  $("#year").textContent = new Date().getFullYear();
  $("#catCount").textContent = CATEGORIES.length;
  $("#modelCount").textContent = PRODUCTS.length;

  $("#roomType").innerHTML = Object.entries(ROOM_TYPES)
    .map(([id, r]) => `<option value="${id}">${r.name}</option>`)
    .join("");
}

// ---------- Katalog ----------
function specRows(p) {
  const rows = [];
  if (p.air) rows.push(["Havo sarfi", `${fmt(p.air, 0)} m³/soat`]);
  if (p.cool) rows.push(["Sovutish", `${fmt(p.cool)} kVt` + (p.cool < 20 ? ` (${fmt(p.cool * 3412, 0)} BTU)` : "")]);
  if (p.heat) rows.push(["Isitish", `${fmt(p.heat)} kVt`]);
  if (!p.air && (p.cool || p.heat)) {
    rows.push(["Maydon", `~${fmt(Math.max(p.cool || 0, p.heat || 0) * 10, 0)} m² gacha`]);
  }
  return rows.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");
}

function productCard(p) {
  const cat = catById[p.cat];
  return `
    <article class="product" id="p-${p.model}" style="--c:${cat.color}">
      <div class="product-top">
        <span class="product-icon"><i class="fas ${cat.icon}"></i></span>
        <span class="product-model">${p.model}</span>
      </div>
      ${p.sub ? `<span class="product-sub">${p.sub}</span>` : ""}
      <span class="product-brand">${p.brand || DEFAULT_BRAND}</span>
      <h4>${p.name}</h4>
      <table class="specs">${specRows(p)}</table>
      <ul class="features">${p.features.map((f) => `<li><i class="fas fa-check"></i> ${f}</li>`).join("")}</ul>
      <button class="btn btn-outline btn-block" data-request="${p.model}"><i class="fas fa-paper-plane"></i> Narxini so'rash</button>
    </article>`;
}

function renderCatalog() {
  $("#catNav").innerHTML = CATEGORIES.map(
    (c) => `<a href="#cat-${c.id}" style="--c:${c.color}"><i class="fas ${c.icon}"></i> ${c.short}</a>`
  ).join("");

  $("#catalogSections").innerHTML = CATEGORIES.map((c) => {
    const items = PRODUCTS.filter((p) => p.cat === c.id);
    const areaText = c.only ? "Server xonalari va data-markazlar" : `Tavsiya etilgan maydon: ${fmt(c.area[0], 0)} – ${fmt(c.area[1], 0)} m²`;
    return `
      <section class="cat-section" id="cat-${c.id}" style="--c:${c.color}">
        <div class="cat-head">
          <span class="cat-icon"><i class="fas ${c.icon}"></i></span>
          <div>
            <h3>${c.name}</h3>
            <p>${c.desc}</p>
            <span class="cat-area"><i class="fas fa-vector-square"></i> ${areaText}</span>
          </div>
        </div>
        <div class="product-grid">${items.map(productCard).join("")}</div>
      </section>`;
  }).join("");
}

// ---------- Hisoblash ----------
function calculate({ area, height, roomType, insulation, sunny }) {
  const room = ROOM_TYPES[roomType];
  const hf = height / 2.7;
  const ins = INSULATION[insulation];
  const cool = (area * room.cool * hf * ins.cool * (sunny ? 1.15 : 1)) / 1000;
  const heat = (area * room.heat * hf * ins.heat) / 1000;
  const air = Math.max(50, area * height * room.ach);
  return { cool, heat, air };
}

// Bo'lim ichidan kerakli quvvatga eng mos modelni (va sonini) tanlash
function pickProduct(item, need, area, roomType) {
  const cat = catById[item.cat];
  if (need <= 0) return null;
  if (cat.only && !cat.only.includes(roomType)) return null;
  if (roomType === "server" && !SERVER_CATS.includes(cat.id)) return null;
  if (area < cat.area[0] || area > cat.area[1]) return null;

  const list = PRODUCTS
    .filter((p) => p.cat === cat.id && (!item.sub || p.sub === item.sub) && p[item.metric])
    .sort((a, b) => a[item.metric] - b[item.metric]);
  if (!list.length) return null;

  const largest = list[list.length - 1][item.metric];
  const units = Math.ceil((need * 0.95) / largest);
  if (units > cat.maxUnits) return null;

  const product = list.find((p) => p[item.metric] * units >= need * 0.95);
  const total = product[item.metric] * units;
  const ideal = area >= cat.ideal[0] && area <= cat.ideal[1];
  return { cat, product, units, total, ideal, metric: item.metric };
}

const METRIC_UNIT = { cool: "kVt", heat: "kVt", air: "m³/soat" };
const METRIC_LABEL = { cool: "Sovutish", heat: "Isitish", air: "Havo sarfi" };

function resultCard(r, need) {
  const { cat, product: p, units, total, metric } = r;
  const unit = METRIC_UNIT[metric];
  const coverage = Math.round((total / need) * 100);
  return `
    <article class="result-card${r.ideal ? " is-ideal" : ""}" style="--c:${cat.color}">
      ${r.ideal ? `<span class="badge"><i class="fas fa-star"></i> Eng mos</span>` : ""}
      <div class="result-head">
        <span class="product-icon"><i class="fas ${cat.icon}"></i></span>
        <div>
          <span class="result-cat">${cat.name}${p.sub ? " · " + p.sub : ""}</span>
          <h4>${units > 1 ? `<span class="units">${units} ×</span> ` : ""}${fullName(p)}</h4>
        </div>
      </div>
      <div class="result-meta">
        <div><span>${METRIC_LABEL[metric]}</span><strong>${fmt(total, metric === "air" ? 0 : 1)} ${unit}</strong></div>
        <div><span>Qoplash</span><strong>${coverage}%</strong></div>
        <div><span>Model</span><strong>${p.model}</strong></div>
      </div>
      <div class="result-actions">
        <a href="#p-${p.model}" class="btn btn-ghost" data-goto="${p.model}">Batafsil</a>
        <button class="btn btn-primary" data-request="${p.model}" data-units="${units}">So'rov</button>
      </div>
    </article>`;
}

let lastCalc = null;

function renderResults(input) {
  const need = calculate(input);
  lastCalc = { input, need };
  const room = ROOM_TYPES[input.roomType];

  $("#resultsSummary").textContent =
    `${room.name}, ${fmt(input.area, 0)} m², shift ${fmt(input.height)} m`;

  $("#needs").innerHTML = `
    <div class="need need-cool"><i class="fas fa-snowflake"></i><span>Sovutish quvvati</span><strong>${fmt(need.cool)} kVt</strong><small>${fmt(need.cool * 3412, 0)} BTU/soat</small></div>
    <div class="need need-heat"><i class="fas fa-fire"></i><span>Isitish quvvati</span><strong>${need.heat > 0 ? fmt(need.heat) + " kVt" : "—"}</strong><small>${need.heat > 0 ? fmt(need.heat * 860, 0) + " kkal/soat" : "talab etilmaydi"}</small></div>
    <div class="need need-air"><i class="fas fa-wind"></i><span>Havo almashinuvi</span><strong>${fmt(need.air, 0)} m³/soat</strong><small>${room.ach} marta/soat</small></div>`;

  $("#resultGroups").innerHTML = RESULT_GROUPS.map((g) => {
    const groupNeed = need[g.need];
    const picks = g.items
      .map((item) => pickProduct(item, groupNeed, input.area, input.roomType))
      .filter(Boolean)
      .sort((a, b) => b.ideal - a.ideal);

    let body;
    if (groupNeed <= 0) {
      body = `<p class="empty">Bu turdagi xona uchun isitish talab etilmaydi.</p>`;
    } else if (!picks.length) {
      body = `<p class="empty">Bu maydon uchun individual loyiha kerak — biz bilan bog'laning.</p>`;
    } else {
      body = `<div class="result-grid">${picks.map((r) => resultCard(r, groupNeed)).join("")}</div>`;
    }
    return `
      <div class="result-group group-${g.id}">
        <h3><i class="fas ${g.icon}"></i> ${g.title}</h3>
        ${body}
      </div>`;
  }).join("");

  $("#results").hidden = false;
  $("#results").scrollIntoView({ behavior: "smooth" });
}

// ---------- So'rov (aloqa formasi) ----------
function requestProduct(model, units) {
  const p = PRODUCTS.find((x) => x.model === model);
  let msg = `Assalomu alaykum! Menga ${units > 1 ? units + " × " : ""}${fullName(p)} (${p.model}) narxi kerak.`;
  if (lastCalc) {
    const { input, need } = lastCalc;
    msg += `\nMaydon: ${input.area} m², ${ROOM_TYPES[input.roomType].name}.` +
      ` Hisob: sovutish ${fmt(need.cool)} kVt, isitish ${fmt(need.heat)} kVt, havo ${fmt(need.air, 0)} m³/soat.`;
  }
  $("#cMessage").value = msg;
  $("#contact").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("#cName").focus({ preventScroll: true }), 500);
}

function highlightProduct(model) {
  const el = document.getElementById("p-" + model);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
}

// ---------- Hodisalar ----------
function bindEvents() {
  $("#calcForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const area = parseFloat($("#area").value);
    const height = parseFloat($("#height").value) || 2.7;
    const err = $("#calcError");
    if (!area || area < 5 || area > 60000) {
      err.textContent = "Iltimos, maydonni 5 dan 60 000 m² gacha kiriting.";
      err.hidden = false;
      $("#area").focus();
      return;
    }
    if (height < 2 || height > 20) {
      err.textContent = "Shift balandligi 2 dan 20 m gacha bo'lishi kerak.";
      err.hidden = false;
      return;
    }
    err.hidden = true;
    renderResults({
      area,
      height,
      roomType: $("#roomType").value,
      insulation: $("#insulation").value,
      sunny: $("#sun").value === "1"
    });
  });

  document.addEventListener("click", (e) => {
    const req = e.target.closest("[data-request]");
    if (req) {
      requestProduct(req.dataset.request, parseInt(req.dataset.units || "1", 10));
      return;
    }
    const go = e.target.closest("[data-goto]");
    if (go) {
      e.preventDefault();
      highlightProduct(go.dataset.goto);
    }
  });

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cName").value.trim();
    const phone = $("#cPhone").value.trim();
    const body = `Ism: ${name}\nTelefon: ${phone}\n\n${$("#cMessage").value}`;
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent("Saytdan so'rov: " + name)}&body=${encodeURIComponent(body)}`;
  });

  const menuBtn = $(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("menu-open"))
  );
}

fillSiteInfo();
renderCatalog();
bindEvents();
