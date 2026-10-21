// Ana sayfa: zifiri, rüzgârsız bir gecede taş evin damı. Fotoğraf statik;
// üstündeki katman fenerlerin alevini titretir, sahnedeki ışığı onlarla
// birlikte nefes aldırır ve arada bir yukarı süzülen kıvılcımlar ekler.

const HEDEF = new Date("2026-11-24T12:00:00+03:00").getTime();

// Fener alevlerinin yeri, fotoğrafın genişlik/yüksekliğine oranla:
// [x, y, fenerin yarıçapı (genişliğe oranla)]. y alevin olduğu nokta.
const SAHNELER = {
  yatay: {
    w: 2752,
    h: 1536,
    fenerler: [
      [0.152, 0.41, 0.036],
      [0.43, 0.366, 0.017],
      [0.69, 0.485, 0.05],
      [0.863, 0.375, 0.024],
    ],
    // Fener ışığının düştüğü alanın ortası ve yarıçapı (dam)
    dam: [0.5, 0.58, 0.42],
  },
  dikey: {
    w: 1536,
    h: 2752,
    fenerler: [
      [0.088, 0.437, 0.043],
      [0.421, 0.415, 0.024],
      [0.75, 0.462, 0.056],
      [0.95, 0.419, 0.03],
    ],
    dam: [0.5, 0.5, 0.55],
  },
};

const DIKEY_SORGU = "(max-aspect-ratio: 4/5)";

function rastgele(a, b) {
  return a + Math.random() * (b - a);
}

function sayaciKur(kok) {
  const alanlar = {
    gun: kok.querySelector("[data-countdown-days]"),
    saat: kok.querySelector("[data-countdown-hours]"),
    dakika: kok.querySelector("[data-countdown-minutes]"),
    saniye: kok.querySelector("[data-countdown-seconds]"),
  };
  const izgara = kok.querySelector("[data-tv-izgara]");
  const bitti = kok.querySelector("[data-tv-bitti]");
  const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let zamanlayici = 0;

  // Her rakam kendi kutusunda; yalnızca değişen rakam usulca belirir.
  const yaz = (el, deger) => {
    const metin = String(deger).padStart(2, "0");
    let haneler = el.querySelectorAll(".tv-hane");
    if (haneler.length !== metin.length) {
      el.textContent = "";
      for (let i = 0; i < metin.length; i++) {
        const h = document.createElement("span");
        h.className = "tv-hane";
        el.appendChild(h);
      }
      haneler = el.querySelectorAll(".tv-hane");
    }
    for (let i = 0; i < metin.length; i++) {
      const h = haneler[i];
      if (h.textContent === metin[i]) continue;
      const ilk = h.textContent === "";
      h.textContent = metin[i];
      if (sakin || ilk) continue;
      h.classList.remove("tv-yeni");
      void h.offsetWidth;
      h.classList.add("tv-yeni");
    }
  };

  const guncelle = () => {
    const kalan = HEDEF - Date.now();
    if (kalan <= 0) {
      izgara.hidden = true;
      bitti.hidden = false;
      window.clearInterval(zamanlayici);
      return;
    }
    yaz(alanlar.gun, Math.floor(kalan / 86400000));
    yaz(alanlar.saat, Math.floor((kalan % 86400000) / 3600000));
    yaz(alanlar.dakika, Math.floor((kalan % 3600000) / 60000));
    yaz(alanlar.saniye, Math.floor((kalan % 60000) / 1000));
  };

  guncelle();
  // Saniye sınırına hizalanarak çalışsın ki rakamlar düzensiz atlamasın.
  window.setTimeout(() => {
    guncelle();
    zamanlayici = window.setInterval(guncelle, 1000);
  }, 1000 - (Date.now() % 1000) + 5);
}

function tuvaliKur(kok) {
  const sahneEl = kok.querySelector("[data-tv-sahne]");
  const resim = kok.querySelector("[data-tv-resim]");
  const tuval = kok.querySelector("[data-tv-efekt]");
  const ctx = tuval.getContext("2d");
  const sakin = window.matchMedia("(prefers-reduced-motion: reduce)");
  const dikeyMi = window.matchMedia(DIKEY_SORGU);

  let gen = 0;
  let yuk = 0;
  let oran = 1;
  let sahne = dikeyMi.matches ? SAHNELER.dikey : SAHNELER.yatay;
  // Fotoğrafın ekrandaki yerleşimi (object-fit: cover)
  let yer = { x: 0, y: 0, w: 1, h: 1 };
  const kivilcim = [];

  function katman(boyut, boya) {
    const c = document.createElement("canvas");
    c.width = c.height = boyut;
    boya(c.getContext("2d"), boyut / 2);
    return c;
  }
  // Fenerin çevresine yayılan yumuşak kızıllık (kutu = 9R)
  const hale = katman(256, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, "rgba(255,92,40,0.16)");
    g.addColorStop(0.4, "rgba(190,40,16,0.06)");
    g.addColorStop(1, "rgba(120,16,6,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Kâğıdın içten aydınlanması (kutu = 3R)
  const govde = katman(128, (p, m) => {
    const R = m / 1.5;
    const g = p.createRadialGradient(m, m + R * 0.3, 0, m, m, R * 1.4);
    g.addColorStop(0, "rgba(255,150,80,0.22)");
    g.addColorStop(0.6, "rgba(230,70,30,0.08)");
    g.addColorStop(1, "rgba(160,30,10,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Alevin kendisi (kutu = 2R)
  const alev = katman(64, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m * 0.6);
    g.addColorStop(0, "rgba(255,226,170,0.55)");
    g.addColorStop(0.45, "rgba(255,150,70,0.18)");
    g.addColorStop(1, "rgba(220,70,20,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Kıvılcım
  const parilti = katman(32, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, "rgba(255,236,196,1)");
    g.addColorStop(0.2, "rgba(255,170,90,0.9)");
    g.addColorStop(0.5, "rgba(230,80,30,0.25)");
    g.addColorStop(1, "rgba(160,30,10,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });

  // Her fenerin kendi alev ritmi
  const ritimler = [0, 1, 2, 3].map(() => ({
    a: rastgele(0, 6.28),
    b: rastgele(0, 6.28),
    c: rastgele(0, 6.28),
    hiz: rastgele(0.8, 1.2),
    dusus: 0,
  }));

  function yerlesimiHesapla() {
    // Yatay: object-fit: cover. Dikey: genişliğe oturur, dikeyde ortalanır.
    const s = sahne === SAHNELER.dikey ? gen / sahne.w : Math.max(gen / sahne.w, yuk / sahne.h);
    const w = sahne.w * s;
    const h = sahne.h * s;
    yer = { x: (gen - w) / 2, y: (yuk - h) / 2, w, h };
  }

  function ekrana(px, py) {
    return [yer.x + px * yer.w, yer.y + py * yer.h];
  }

  function boyutla() {
    // Dönüşümden etkilenmeyen yerleşim boyutu; fotoğrafla aynı kutu.
    gen = Math.max(1, tuval.clientWidth);
    yuk = Math.max(1, tuval.clientHeight);
    oran = Math.min(window.devicePixelRatio || 1, gen > 1100 ? 1 : 1.5);
    tuval.width = Math.round(gen * oran);
    tuval.height = Math.round(yuk * oran);
    ctx.setTransform(oran, 0, 0, oran, 0, 0);
    sahne = dikeyMi.matches ? SAHNELER.dikey : SAHNELER.yatay;
    yerlesimiHesapla();
  }

  // Alev: yavaş bir dalga, üstüne hızlı küçük titremeler, arada kısa düşüşler
  function alevGucu(i, t, sabit) {
    if (sabit) return 0.85;
    const r = ritimler[i];
    const tt = t * r.hiz;
    let g =
      0.82 +
      0.07 * Math.sin(tt * 2.3 + r.a) +
      0.05 * Math.sin(tt * 7.9 + r.b) +
      0.035 * Math.sin(tt * 17.3 + r.c);
    if (r.dusus <= 0 && Math.random() < 0.0025) r.dusus = rastgele(0.08, 0.22);
    if (r.dusus > 0) {
      g *= 0.72;
      r.dusus -= 1 / 60;
    }
    return Math.max(0.4, Math.min(1, g));
  }

  function kivilcimBirak(x, y, R) {
    kivilcim.push({
      x: x + rastgele(-R * 0.25, R * 0.25),
      y: y - R * 0.2,
      vx: rastgele(-4, 4),
      vy: rastgele(-26, -12),
      omur: 0,
      sure: rastgele(1.4, 3.2),
      boy: rastgele(3, 7),
      faz: rastgele(0, 6.28),
    });
  }

  function ciz(t, sabit, dt) {
    ctx.clearRect(0, 0, gen, yuk);
    let toplam = 0;
    const gucler = sahne.fenerler.map((_, i) => {
      const g = alevGucu(i, t, sabit);
      toplam += g;
      return g;
    });
    const ortalama = toplam / gucler.length;

    // Damdaki ışık fenerlerle birlikte hafifçe artıp azalır.
    const [dx, dy, dr] = sahne.dam;
    const [mx, my] = ekrana(dx, dy);
    const yaricap = dr * yer.w;
    const fark = (ortalama - 0.82) * 1.6;
    if (!sabit && Math.abs(fark) > 0.002) {
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, yaricap);
      if (fark > 0) {
        ctx.globalCompositeOperation = "lighter";
        g.addColorStop(0, `rgba(255,90,40,${0.1 * fark})`);
        g.addColorStop(1, "rgba(255,90,40,0)");
      } else {
        ctx.globalCompositeOperation = "source-over";
        g.addColorStop(0, `rgba(0,0,0,${0.7 * -fark})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.fillStyle = g;
      ctx.fillRect(mx - yaricap, my - yaricap, yaricap * 2, yaricap * 2);
    }

    ctx.globalCompositeOperation = "lighter";
    sahne.fenerler.forEach(([fx, fy, fr], i) => {
      const [x, y] = ekrana(fx, fy);
      const R = fr * yer.w;
      const gy = y - R * 0.8;
      ctx.globalAlpha = gucler[i];
      ctx.drawImage(hale, x - R * 4.5, gy - R * 4.5, R * 9, R * 9);
      ctx.drawImage(govde, x - R * 1.5, gy - R * 1.5, R * 3, R * 3);
      ctx.drawImage(alev, x - R, y - R, R * 2, R * 2);
      if (!sabit && Math.random() < 0.012) kivilcimBirak(x, y, R);
    });
    ctx.globalAlpha = 1;

    // Rüzgâr yok: kıvılcımlar dümdüz, yavaşça yükselip söner.
    for (let i = kivilcim.length - 1; i >= 0; i--) {
      const k = kivilcim[i];
      k.omur += dt;
      if (k.omur > k.sure) {
        kivilcim.splice(i, 1);
        continue;
      }
      k.vx += rastgele(-10, 10) * dt;
      k.vy *= 0.995;
      k.x += k.vx * dt;
      k.y += k.vy * dt;
      const yas = k.omur / k.sure;
      const parla = (1 - yas) * (0.6 + 0.4 * Math.sin(t * 13 + k.faz));
      if (parla <= 0.02) continue;
      ctx.globalAlpha = parla;
      const b = k.boy * (1 - yas * 0.6);
      ctx.drawImage(parilti, k.x - b / 2, k.y - b / 2, b, b);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  let onceki = performance.now();
  let calisiyor = false;
  let kare = 0;
  let fareX = 0;
  let fareY = 0;
  let kayX = 0;
  let kayY = 0;

  function dongu(simdi) {
    if (!calisiyor) return;
    kare = requestAnimationFrame(dongu);
    const dt = Math.min(0.05, (simdi - onceki) / 1000);
    onceki = simdi;
    const t = simdi / 1000;

    // Çok yavaş bir nefes ve fareye hafif tepki
    kayX += (fareX - kayX) * 0.025;
    kayY += (fareY - kayY) * 0.025;
    const olcek = 1.025 + 0.012 * Math.sin(t * 0.07);
    sahneEl.style.transform = `translate3d(${(kayX * -10).toFixed(2)}px, ${(kayY * -6).toFixed(2)}px, 0) scale(${olcek.toFixed(4)})`;

    ciz(t, false, dt);
  }

  function sakinCiz() {
    sahneEl.style.transform = "scale(1.02)";
    ciz(0, true, 0);
  }

  function basla() {
    if (sakin.matches) {
      calisiyor = false;
      cancelAnimationFrame(kare);
      sakinCiz();
      return;
    }
    if (calisiyor) return;
    calisiyor = true;
    onceki = performance.now();
    kare = requestAnimationFrame(dongu);
  }

  function dur() {
    calisiyor = false;
    cancelAnimationFrame(kare);
  }

  boyutla();
  let boyutZamani = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(boyutZamani);
    boyutZamani = window.setTimeout(() => {
      boyutla();
      if (sakin.matches) sakinCiz();
    }, 120);
  });
  dikeyMi.addEventListener("change", () => {
    boyutla();
    if (sakin.matches) sakinCiz();
  });
  sakin.addEventListener("change", () => {
    dur();
    basla();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) dur();
    else basla();
  });
  window.addEventListener(
    "pointermove",
    (e) => {
      fareX = e.clientX / window.innerWidth - 0.5;
      fareY = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true }
  );

  // Fotoğraf karanlıktan yavaşça belirir; sonra fenerler canlanır.
  const yak = () => {
    kok.classList.add("tv-yandi");
    basla();
  };
  if (resim.complete && resim.naturalWidth) {
    requestAnimationFrame(yak);
  } else {
    resim.addEventListener("load", yak, { once: true });
    resim.addEventListener("error", yak, { once: true });
  }
}

const kok = document.getElementById("tuval");
if (kok) {
  sayaciKur(kok);
  try {
    tuvaliKur(kok);
  } catch (hata) {
    kok.classList.add("tv-yandi");
    console.error(hata);
  }
}
