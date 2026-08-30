(function () {
  const page = document.body.getAttribute("data-page") || "";
  const MAPS = "https://www.google.com/maps/search/?api=1&query=PTAK+STOMATOLOGIA+Ady+Sari+38+Wadowice";
  const FB = "https://www.facebook.com/PTAKStomatologia/";
  const GOOGLE = "https://www.google.com/search?q=PTAK+STOMATOLOGIA+Wadowice";
  const TEL = "tel:+48664065582";
  const WA = "https://wa.me/48664065582";

  const nav = [
    { href: "index.html", id: "home", label: "Strona główna" },
    { href: "godziny.html", id: "godziny", label: "Godziny" },
    { href: "zespol.html", id: "zespol", label: "Zespół" },
    { href: "oferta.html", id: "oferta", label: "Oferta" },
    { href: "pracownia-rtg.html", id: "rtg", label: "RTG" },
    { href: "galeria.html", id: "galeria", label: "Galeria" },
    { href: "cennik.html", id: "cennik", label: "Cennik" },
    { href: "kontakt.html", id: "kontakt", label: "Kontakt" },
  ];

  const tabLinks = nav
    .map(
      (item) =>
        `<li><a href="${item.href}" class="${page === item.id ? "is-active" : ""}">${item.label}</a></li>`
    )
    .join("");
  const mobileLinks = nav
    .map((item) => `<a href="${item.href}" class="${page === item.id ? "is-active" : ""}">${item.label}</a>`)
    .join("");
  const footerTabs = nav.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <header class="masthead">
        <div class="wrap masthead-row">
          <a href="index.html" aria-label="PTAK STOMATOLOGIA">
            <img class="logo" src="assets/logo.svg" alt="PTAK STOMATOLOGIA" width="220" height="87" />
          </a>
          <nav aria-label="Zakładki"><ul class="tabs">${tabLinks}</ul></nav>
          <div class="masthead-cta">
            <a class="phone" href="${TEL}">664 06 55 82</a>
            <a class="btn btn-fill" href="${page === "home" || page === "kontakt" ? "#umow" : "index.html#umow"}">Umów wizytę</a>
            <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div class="mobile-nav" hidden>${mobileLinks}<a href="${WA}" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-fill" href="${TEL}">Zadzwoń</a></div>
      </header>
    `;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <footer class="foot">
        <div class="wrap foot-grid">
          <div>
            <a href="index.html"><img class="logo" src="assets/logo.svg" alt="PTAK STOMATOLOGIA" width="180" height="72" /></a>
            <p>Klinika stomatologiczna w Wadowicach. Implantologia, mikroskop, ortodoncja, diagnostyka 3D.</p>
          </div>
          <div>
            <h3>Placówka</h3>
            <p>PTAK STOMATOLOGIA sp. z o.o.<br>
            <a href="${MAPS}" target="_blank" rel="noopener">ul. Ady Sari 38<br>34-100 Wadowice</a></p>
            <p>NIP 5512657728 · REGON 523848403</p>
          </div>
          <div>
            <h3>Godziny</h3>
            <p><a href="godziny.html">Pn–Pt 9:00–20:00</a><br>Rejestracja do 17:00<br>Weekend zamknięty</p>
          </div>
          <div>
            <h3>Kontakt</h3>
            <p><a href="${TEL}">664 06 55 82</a><br>
            <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a><br>
            <a href="${FB}" target="_blank" rel="noopener">Facebook</a> ·
            <a href="${GOOGLE}" target="_blank" rel="noopener">Google</a><br>
            <a href="pierwsza-wizyta.html">Pierwsza wizyta</a></p>
          </div>
        </div>
        <div class="wrap foot-tabs">${footerTabs}</div>
        <div class="wrap foot-bottom">
          <p>© 2026 PTAK STOMATOLOGIA. Informacje na stronie nie zastępują konsultacji lekarskiej.</p>
        </div>
      </footer>
      <div class="sticky-bar" role="navigation" aria-label="Szybki kontakt">
        <a href="${TEL}">Zadzwoń</a>
        <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="${page === "home" || page === "kontakt" ? "#umow" : "index.html#umow"}">Umów</a>
      </div>
    `;
  }

  const btn = document.querySelector(".menu-btn");
  const mobile = document.querySelector(".mobile-nav");
  if (btn && mobile) {
    btn.addEventListener("click", () => {
      const open = !mobile.hasAttribute("hidden");
      if (open) {
        mobile.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      } else {
        mobile.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  }

  document.querySelectorAll("[data-lightbox]").forEach((img) => {
    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.innerHTML = `<img src="${img.getAttribute("src")}" alt="${img.getAttribute("alt") || ""}" />`;
      overlay.addEventListener("click", () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  const status = document.getElementById("hours-status");
  if (status) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Warsaw",
      weekday: "short",
      hour: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const weekday = parts.find((p) => p.type === "weekday").value;
    const hour = Number(parts.find((p) => p.type === "hour").value);
    const openDesk = !["Sat", "Sun"].includes(weekday) && hour >= 9 && hour < 17;
    status.textContent = openDesk
      ? "Rejestracja jest czynna. Najszybszy kontakt: telefon."
      : "Rejestracja jest nieczynna. Prosimy o wiadomość — oddzwonimy w godzinach 9:00–17:00.";
  }

  const form = document.getElementById("book-form");
  const thanks = document.getElementById("book-thanks");
  if (form && thanks) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const msg = [
        "Proszę o kontakt w sprawie wizyty.",
        "Imię: " + data.imie,
        "Telefon: " + data.tel,
        "Usługa: " + data.usluga,
        "Preferowana pora: " + data.pora,
      ].join("\n");
      window.open("https://wa.me/48664065582?text=" + encodeURIComponent(msg), "_blank", "noopener");
      form.hidden = true;
      thanks.hidden = false;
    });
  }
})();
