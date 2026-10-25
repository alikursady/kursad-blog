// Ana sayfa: gece, Anadolu köy evinin düz damı. Fotoğraf statik; üstündeki
// katmanlar dört feneri hafif bir esintide ipleri ucunda sallar, alevlerini
// titretir, fener ışığında toz uçurur, çok hafif bir yağmur yağdırır ve
// köyün ardındaki dağlara yıldırım düşürür.
//
// Yağmur ve yıldırım, işletim sisteminde "animasyonları azalt" açık olsa da
// çalışır (Windows'ta animasyon efektleri kapalıyken tarayıcı bunu bildirir).
// Işığa duyarlılık için bir çakmada en fazla üç parlama olur.

const HEDEF = new Date("2026-11-24T12:00:00+03:00").getTime();

// Fenerler fotoğraftan kesildi: "levha" her fenerin ipiyle birlikte kendisini
// ve arkasında kalan boşluğu dolduran parçayı (yama) taşır.
// yama/fener: [levhadaki x, y, genişlik, yükseklik, fotoğraftaki x, y]
// baglanti: ipin taşa bağlandığı nokta (fener bunun etrafında sallanır)
// alev: alevin yeri, R: fenerin yarıçapı, boy: bağlantıdan fenerin tepesine (px)
// gok: yalnızca gökyüzü; uzak: gökyüzü ve dağın yamacı (evlerin ve adamın gerisi)
// adam: adamın fotoğraftaki yatay aralığı (yıldırım onun hizasına düşmez)
// cati: damın yüzeyi [üst, alt, sol, sağ], damlaların sıçradığı yer
const SAHNELER = {
  yatay: {
    w: 2752,
    h: 1536,
    levha: "/images/tuval/tuval-yatay-fenerler.webp",
    flas: "/images/tuval/tuval-yatay-simsek.webp",
    gok: "/images/tuval/tuval-yatay-gok.png",
    uzak: "/images/tuval/tuval-yatay-uzak.png",
    // not: gökyüzündeki yazının ortası (fotoğrafa oranla) ve fotoğraf pikseliyle boyu
    not: [0.3, 0.1, 28],
    adam: [1250, 1520],
    cati: [0.47, 0.76, 0.06, 0.86],
    dam: [0.5, 0.58, 0.42],
    toz: [0.2, 0.72],
    fenerler: [
      { yama: [757, 0, 337, 490, 247, 410], fener: [1098, 0, 213, 429, 309, 439], baglanti: [396, 864], alev: [415.6, 642], R: 99.1, boy: 421.4 },
      { yama: [162, 684, 193, 280, 1088, 428], fener: [359, 684, 109, 230, 1130, 452], baglanti: [1171.1, 678], alev: [1183.4, 562.2], R: 46.8, boy: 223.4 },
      { yama: [0, 0, 454, 680, 1693, 401], fener: [458, 0, 295, 594, 1773, 442], baglanti: [1818.9, 1032], alev: [1898.9, 755.7], R: 137.6, boy: 594.3 },
      { yama: [1315, 0, 258, 373, 2254, 404], fener: [0, 684, 158, 309, 2304, 435], baglanti: [2327.7, 740], alev: [2375, 579.1], R: 66, boy: 305.8 },
    ],
  },
  dikey: {
    w: 1536,
    h: 2752,
    levha: "/images/tuval/tuval-dikey-fenerler.webp",
    flas: "/images/tuval/tuval-dikey-simsek.webp",
    gok: "/images/tuval/tuval-dikey-gok.png",
    uzak: "/images/tuval/tuval-dikey-uzak.png",
    not: [0.5, 0.19, 34],
    adam: [730, 905],
    cati: [0.46, 0.57, 0.0, 0.97],
    dam: [0.5, 0.5, 0.55],
    toz: [0.34, 0.6],
    fenerler: [
      { yama: [508, 0, 250, 368, 0, 1036], fener: [762, 0, 150, 316, 49, 1061], baglanti: [116.6, 1373], alev: [132.1, 1205.4], R: 66, boy: 308.1 },
      { yama: [278, 481, 154, 218, 569, 1037], fener: [436, 481, 82, 171, 605, 1060], baglanti: [638.1, 1227], alev: [646.7, 1144.8], R: 36.9, boy: 163.2 },
      { yama: [0, 0, 310, 477, 1013, 1040], fener: [314, 0, 190, 407, 1073, 1074], baglanti: [1097.5, 1477], alev: [1150.5, 1279.7], R: 86, boy: 404.9 },
      { yama: [0, 481, 164, 282, 1372, 1029], fener: [168, 481, 106, 227, 1414, 1056], baglanti: [1426.2, 1279], alev: [1459.2, 1158.6], R: 46.1, boy: 223.5 },
    ],
  },
};

const DIKEY_SORGU = "(max-aspect-ratio: 4/5)";
const DERECE = Math.PI / 180;

function rastgele(a, b) {
  return a + Math.random() * (b - a);
}

function resimYukle(adres) {
  return new Promise((coz, reddet) => {
    const r = new Image();
    r.decoding = "async";
    r.onload = () => coz(r);
    r.onerror = reddet;
    r.src = adres;
  });
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

// Şimşek anında aydınlanan bulutlar için yumuşak, yatayda kendini tekrar eden doku
function bulutDokusu(gen, yuk) {
  const c = document.createElement("canvas");
  c.width = gen;
  c.height = yuk;
  const p = c.getContext("2d");
  const veri = p.createImageData(gen, yuk);
  const oktavlar = [
    [3, 0.5],
    [6, 0.26],
    [12, 0.15],
    [24, 0.09],
  ];
  const izgaralar = oktavlar.map(([n]) => {
    const gx = n;
    const gy = Math.max(2, Math.round((n * yuk) / gen) + 1);
    const a = new Float32Array(gx * (gy + 1));
    for (let i = 0; i < a.length; i++) a[i] = Math.random();
    return { gx, gy, a };
  });
  const yumusak = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < yuk; y++) {
    for (let x = 0; x < gen; x++) {
      let v = 0;
      for (let k = 0; k < izgaralar.length; k++) {
        const { gx, gy, a } = izgaralar[k];
        const fx = (x / gen) * gx;
        const fy = (y / yuk) * gy;
        const x0 = Math.floor(fx);
        const y0 = Math.floor(fy);
        const tx = yumusak(fx - x0);
        const ty = yumusak(fy - y0);
        const xa = x0 % gx;
        const xb = (x0 + 1) % gx;
        const yb = Math.min(gy, y0 + 1);
        const ust = a[y0 * gx + xa] * (1 - tx) + a[y0 * gx + xb] * tx;
        const alt = a[yb * gx + xa] * (1 - tx) + a[yb * gx + xb] * tx;
        v += oktavlar[k][1] * (ust * (1 - ty) + alt * ty);
      }
      v = Math.max(0, Math.min(1, (v - 0.32) / 0.5));
      const i = (y * gen + x) * 4;
      veri.data[i] = veri.data[i + 1] = veri.data[i + 2] = 255;
      veri.data[i + 3] = Math.round(255 * (0.16 + 0.84 * v * v));
    }
  }
  p.putImageData(veri, 0, 0);
  return c;
}

function tuvaliKur(kok) {
  const sahneEl = kok.querySelector("[data-tv-sahne]");
  const resim = kok.querySelector("[data-tv-resim]");
  const yamaTuval = kok.querySelector("[data-tv-yama]");
  const flasTuval = kok.querySelector("[data-tv-flas]");
  const tuval = kok.querySelector("[data-tv-efekt]");
  const ctx = tuval.getContext("2d");
  const yctx = yamaTuval.getContext("2d");
  const fctx = flasTuval.getContext("2d");
  const sakinSorgu = window.matchMedia("(prefers-reduced-motion: reduce)");
  const dikeyMi = window.matchMedia(DIKEY_SORGU);

  let gen = 0;
  let yuk = 0;
  let oran = 1;
  let sahne = dikeyMi.matches ? SAHNELER.dikey : SAHNELER.yatay;
  let yer = { x: 0, y: 0, w: 1, h: 1, s: 1 };
  // Yüklenen görseller, sahneye göre
  const varlik = { yatay: {}, dikey: {} };
  let kucuk = false;

  function katman(boyut, boya) {
    const c = document.createElement("canvas");
    c.width = c.height = boyut;
    boya(c.getContext("2d"), boyut / 2);
    return c;
  }
  // Fenerin çevresine yayılan yumuşak kızıllık (kutu = 9R)
  const hale = katman(256, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, "rgba(255,92,40,0.15)");
    g.addColorStop(0.4, "rgba(190,40,16,0.055)");
    g.addColorStop(1, "rgba(120,16,6,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Kâğıdın içten aydınlanması (kutu = 3R)
  const govde = katman(128, (p, m) => {
    const R = m / 1.5;
    const g = p.createRadialGradient(m, m + R * 0.3, 0, m, m, R * 1.4);
    g.addColorStop(0, "rgba(255,150,80,0.16)");
    g.addColorStop(0.6, "rgba(230,70,30,0.06)");
    g.addColorStop(1, "rgba(160,30,10,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Alevin kendisi (kutu = 2R)
  const alevIsigi = katman(64, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m * 0.6);
    g.addColorStop(0, "rgba(255,226,170,0.5)");
    g.addColorStop(0.45, "rgba(255,150,70,0.16)");
    g.addColorStop(1, "rgba(220,70,20,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Kıvılcım ve ışıkta görünen toz
  const parilti = katman(32, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, "rgba(255,236,196,1)");
    g.addColorStop(0.2, "rgba(255,170,90,0.9)");
    g.addColorStop(0.5, "rgba(230,80,30,0.25)");
    g.addColorStop(1, "rgba(160,30,10,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  const zerre = katman(16, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, "rgba(255,214,170,1)");
    g.addColorStop(0.35, "rgba(255,170,110,0.5)");
    g.addColorStop(1, "rgba(255,120,60,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  const bulut = bulutDokusu(256, 96);

  // Her fenerin kendi ipi, kendi salınımı ve kendi alev ritmi
  const fenerDurum = [0, 1, 2, 3].map(() => ({
    aci: 0,
    hiz: 0,
    faz: rastgele(0, 100),
    egim: rastgele(2.1, 2.8) * DERECE,
    a: rastgele(0, 6.28),
    b: rastgele(0, 6.28),
    c: rastgele(0, 6.28),
    ritim: rastgele(0.8, 1.2),
    dusus: 0,
  }));

  function yerlesimiHesapla() {
    // Dikey: genişliğe oturur. Yatay: ekranı doldurur ama kenardaki fenerler
    // kesilmesin diye fotoğrafın en az %86'sı yatayda görünür kalır (4:3 tablet).
    let s;
    if (sahne === SAHNELER.dikey) {
      s = gen / sahne.w;
    } else {
      s = Math.min(Math.max(gen / sahne.w, yuk / sahne.h), gen / (0.86 * sahne.w));
    }
    const w = sahne.w * s;
    const h = sahne.h * s;
    yer = { x: (gen - w) / 2, y: (yuk - h) / 2, w, h, s };
    // Fotoğraf da tuvallerle aynı kutuya otursun
    Object.assign(resim.style, {
      position: "absolute",
      left: `${yer.x}px`,
      top: `${yer.y}px`,
      width: `${w}px`,
      height: `${h}px`,
      maxWidth: "none",
      maxHeight: "none",
      objectFit: "fill",
      translate: "none",
    });
  }

  // Gökyüzündeki not: fotoğrafla birlikte yerleşir, ekrandan taşmaz
  const notEl = kok.querySelector("[data-tv-not]");
  let notIsik = 0;

  function notuYerlestir() {
    if (!notEl) return;
    const [fx, fy, f] = sahne.not;
    const boy = Math.max(12, Math.min(19, f * yer.s));
    notEl.style.fontSize = `${boy.toFixed(1)}px`;
    const w = notEl.offsetWidth;
    const h = notEl.offsetHeight;
    // Sahne ekrandan biraz büyük ve hafifçe ölçekleniyor; kenarda kesilmesin
    const kenarX = 0.057 * gen + 10 + Math.max(14, boy);
    const kenarY = 0.04 * yuk + 6 + Math.max(14, boy);
    let x = yer.x + fx * yer.w;
    let y = yer.y + fy * yer.h;
    x = Math.max(kenarX + w / 2, Math.min(gen - kenarX - w / 2, x));
    y = Math.max(kenarY + h / 2, y);
    notEl.style.left = `${x.toFixed(1)}px`;
    notEl.style.top = `${y.toFixed(1)}px`;
  }

  function notuAydinlat() {
    if (!notEl) return;
    const v = Math.round(Math.min(1, flasGucu) * 40) / 40;
    if (v === notIsik) return;
    notIsik = v;
    notEl.style.setProperty("--tv-not-isik", String(v));
  }

  function ekrana(px, py) {
    return [yer.x + px * yer.s, yer.y + py * yer.s];
  }

  // ---- Rüzgâr ----------------------------------------------------------
  const ruzgar = { sagnak: 0, hedef: 0, bitis: 0, sonraki: performance.now() + rastgele(4000, 8000), giris: 0 };

  function ruzgarHesapla(t, simdi, dt) {
    if (simdi > ruzgar.sonraki) {
      ruzgar.hedef = rastgele(0.35, 0.85);
      ruzgar.bitis = simdi + rastgele(1400, 3600);
      ruzgar.sonraki = simdi + rastgele(7000, 17000);
    }
    if (simdi > ruzgar.bitis) ruzgar.hedef = 0;
    // Sağanak çabuk gelir, yavaş diner
    const hiz = ruzgar.hedef > ruzgar.sagnak ? 1.1 : 0.4;
    ruzgar.sagnak += (ruzgar.hedef - ruzgar.sagnak) * Math.min(1, hiz * dt);
    ruzgar.giris = Math.min(1, ruzgar.giris + dt / 4);
    const taban = 0.3 + 0.1 * Math.sin(t * 0.11) + 0.06 * Math.sin(t * 0.29 + 1.3);
    const girdap = 0.07 * Math.sin(t * 1.7) * Math.sin(t * 0.53 + 2.1);
    return Math.max(0, (taban + ruzgar.sagnak + girdap) * ruzgar.giris);
  }

  // İpin ucundaki fener: yaylı sarkaç. Uzun ipli fener daha yavaş salınır.
  function fenerleriSalla(r, t, dt, carpan) {
    sahne.fenerler.forEach((f, i) => {
      const d = fenerDurum[i];
      const w0 = 2 * Math.PI * (0.55 - 0.25 * Math.min(1, f.boy / 600));
      const burgu = 0.25 * Math.sin(t * 1.3 + d.faz) * Math.sin(t * 0.47 + d.faz * 2);
      const hedef = d.egim * carpan * (r + burgu * (0.35 + r));
      const ivme = -w0 * w0 * (d.aci - hedef) - 2 * 0.16 * w0 * d.hiz;
      d.hiz += ivme * dt;
      d.aci += d.hiz * dt;
      const sinir = 5.5 * DERECE;
      if (Math.abs(d.aci) > sinir) {
        d.aci = Math.sign(d.aci) * sinir;
        d.hiz *= 0.5;
      }
    });
  }

  // Bir fenerin o anki alev noktası (sallanmayla birlikte döner)
  function alevYeri(f, aci) {
    const [ax, ay] = f.baglanti;
    const dx = f.alev[0] - ax;
    const dy = f.alev[1] - ay;
    const c = Math.cos(aci);
    const s = Math.sin(aci);
    return ekrana(ax + dx * c - dy * s, ay + dx * s + dy * c);
  }

  function alevGucu(i, t, r, sabit) {
    if (sabit) return 0.85;
    const d = fenerDurum[i];
    const tt = t * d.ritim;
    let g =
      0.82 +
      0.07 * Math.sin(tt * 2.3 + d.a) +
      0.05 * Math.sin(tt * 7.9 + d.b) +
      0.035 * Math.sin(tt * 17.3 + d.c) -
      0.12 * Math.max(0, r - 0.65);
    if (d.dusus <= 0 && Math.random() < 0.0025 + Math.max(0, r - 0.7) * 0.012) d.dusus = rastgele(0.08, 0.22);
    if (d.dusus > 0) {
      g *= 0.72;
      d.dusus -= 1 / 60;
    }
    return Math.max(0.4, Math.min(1, g));
  }

  // ---- Toz ve kıvılcım --------------------------------------------------
  const toz = [];
  const kivilcim = [];

  function tozDiz() {
    toz.length = 0;
    const adet = kucuk ? 42 : 80;
    for (let i = 0; i < adet; i++) toz.push(yeniToz(true));
  }

  function yeniToz(ilk) {
    const [ust, alt] = sahne.toz;
    return {
      x: ilk ? rastgele(0, gen) : rastgele(-30, -5),
      y: yer.y + rastgele(ust, alt) * yer.h,
      hiz: rastgele(0.6, 1.4),
      boy: rastgele(1.2, 2.6) * (kucuk ? 0.85 : 1),
      faz: rastgele(0, 6.28),
    };
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

  // ---- Şimşek ve yıldırım ----------------------------------------------
  // Fotoğrafa göre her sütunda: gökyüzünün bittiği yer (dağ sırtı) ve uzak
  // kısmın bittiği yer (dağın yamacı biter, evler başlar).
  let gokSirt = null;
  let uzakAlt = null;
  let maskeTuval = null; // gökyüzü maskesi, ekran yerleşimine göre (yarım çözünürlük)
  let uzakTuval = null; // gökyüzü + dağ yamacı maskesi, aynı şekilde
  let gokKatman = null; // ışıyan gök, yarım çözünürlükte
  let yildirimTuval = null; // o çakmanın yıldırımı, bir kez çizilip her karede kullanılır
  let simsek = null;
  let sonrakiSimsek = performance.now() + rastgele(4500, 6500);
  // Bu karedeki gök parlaklığı; yağmur da bununla aydınlanır
  let flasGucu = 0;

  function profilCikar(maske) {
    const c = document.createElement("canvas");
    c.width = maske.naturalWidth;
    c.height = maske.naturalHeight;
    const p = c.getContext("2d");
    p.drawImage(maske, 0, 0);
    const v = p.getImageData(0, 0, c.width, c.height).data;
    const profil = new Float32Array(c.width);
    for (let x = 0; x < c.width; x++) {
      let y = 0;
      while (y < c.height && v[(y * c.width + x) * 4 + 3] > 127) y++;
      profil[x] = y / c.height;
    }
    return profil;
  }

  function ekranMaskesi(eski, resimEl, mg, my) {
    const c = eski || document.createElement("canvas");
    c.width = mg;
    c.height = my;
    const p = c.getContext("2d");
    p.clearRect(0, 0, mg, my);
    // Fotoğrafın üstünde kalan siyah boşluk da gökyüzünün devamı
    p.fillStyle = "#fff";
    p.fillRect(0, 0, mg, Math.max(0, yer.y / 2) + 1);
    p.drawImage(resimEl, yer.x / 2, yer.y / 2, yer.w / 2, yer.h / 2);
    return c;
  }

  function maskeHazirla() {
    const v = varlik[sahneAdi()];
    if (!v.gok || !v.uzak) {
      maskeTuval = null;
      uzakTuval = null;
      return;
    }
    const mg = Math.ceil(gen / 2);
    const my = Math.ceil(yuk / 2);
    maskeTuval = ekranMaskesi(maskeTuval, v.gok, mg, my);
    uzakTuval = ekranMaskesi(uzakTuval, v.uzak, mg, my);
    gokKatman = gokKatman || document.createElement("canvas");
    gokKatman.width = mg;
    gokKatman.height = my;
  }

  function profilDegeri(profil, fx) {
    return profil[Math.max(0, Math.min(profil.length - 1, Math.round(fx * (profil.length - 1))))];
  }

  function kirikCizgi(x0, y0, x1, y1, derinlik, puruz = 0.2) {
    let noktalar = [
      [x0, y0],
      [x1, y1],
    ];
    let sapma = Math.hypot(x1 - x0, y1 - y0) * puruz;
    // Sapma çizgiye dik yönde; dikey bir yıldırım sağa sola kırılır
    const uz = Math.hypot(x1 - x0, y1 - y0) || 1;
    const nx = -(y1 - y0) / uz;
    const ny = (x1 - x0) / uz;
    for (let d = 0; d < derinlik; d++) {
      const yeni = [noktalar[0]];
      for (let i = 0; i < noktalar.length - 1; i++) {
        const [ax, ay] = noktalar[i];
        const [bx, by] = noktalar[i + 1];
        const s = rastgele(-sapma, sapma);
        const b = rastgele(-sapma, sapma) * 0.25;
        yeni.push([(ax + bx) / 2 + nx * s + (ny * b), (ay + by) / 2 + ny * s - nx * b]);
        yeni.push([bx, by]);
      }
      noktalar = yeni;
      sapma *= 0.55;
    }
    return noktalar;
  }

  function olcu() {
    return Math.max(0.8, Math.min(1.5, Math.min(gen, yuk) / 650));
  }

  // Yıldırımın düşeceği yer: üstünde gök görünen, fenerlerin ve adamın hizasında
  // olmayan bir nokta. Çoğu zaman köyün ardındaki dağın yamacına, bazen de
  // dağın arkasına düşer.
  function hedefSec(sirt, alt, k) {
    const engeller = sahne.fenerler.map((f) => [f.fener[4] - 60, f.fener[4] + f.fener[2] + 60]);
    engeller.push(sahne.adam);
    const isikYaricap = 30 * k;
    for (let deneme = 0; deneme < 40; deneme++) {
      const x = rastgele(0.14, 0.86) * gen;
      const fx = (x - yer.x) / yer.w;
      if (fx < 0.02 || fx > 0.98) continue;
      const px = fx * sahne.w;
      if (engeller.some(([a, b]) => px > a && px < b)) continue;
      const sY = yer.y + profilDegeri(sirt, fx) * yer.h;
      if (sY < 0.09 * yuk) continue;
      const aY = yer.y + profilDegeri(alt, fx) * yer.h;
      const pay = aY - 1.4 * isikYaricap - sY;
      if (pay > 26 * k && Math.random() < 0.7) {
        return { x, sY, y: sY + rastgele(0.4, 0.95) * pay, onde: true };
      }
      return { x, sY, y: sY + 6, onde: false };
    }
    return null;
  }

  function yildirimUret(h, k) {
    const ustY = -0.03 * yuk;
    const boy = h.y - ustY;
    const ustX = h.x + rastgele(-0.12, 0.12) * boy;
    const ana = kirikCizgi(ustX, ustY, h.x, h.y, 7, 0.14);
    const dallar = [];
    const adet = Math.floor(rastgele(2, 6));
    for (let i = 0; i < adet; i++) {
      const j = Math.floor(rastgele(0.08, 0.72) * (ana.length - 1));
      const [bx, by] = ana[j];
      const uz = rastgele(0.12, 0.34) * boy * (1 - (0.5 * j) / ana.length);
      const aci = (Math.random() < 0.5 ? -1 : 1) * rastgele(0.35, 0.95);
      const dal = kirikCizgi(bx, by, bx + Math.sin(aci) * uz, by + Math.cos(aci) * uz, 5, 0.2);
      dallar.push({ yol: dal, kalin: rastgele(0.4, 0.6) });
      if (Math.random() < 0.45) {
        const [cx, cy] = dal[Math.floor(dal.length * rastgele(0.25, 0.6))];
        const uz2 = uz * rastgele(0.3, 0.55);
        const aci2 = aci + rastgele(-0.6, 0.6);
        dallar.push({ yol: kirikCizgi(cx, cy, cx + Math.sin(aci2) * uz2, cy + Math.cos(aci2) * uz2, 4, 0.22), kalin: 0.3 });
      }
    }
    return { ana, dallar, ustY, boy, k };
  }

  // Kanal bir kez çizilir: geniş soluk hale, mavimsi parıltı ve beyaz çekirdek.
  // Sonra evlerin ve adamın önüne geçmesin diye uzak maskesiyle kırpılır.
  const KANAL = [
    [15, 110, 125, 255, 0.07],
    [6.5, 150, 165, 255, 0.17],
    [2.7, 210, 218, 255, 0.6],
    [1.2, 255, 255, 255, 0.97],
  ];

  function yildirimHazirla(y) {
    yildirimTuval = yildirimTuval || document.createElement("canvas");
    const c = yildirimTuval;
    c.width = tuval.width;
    c.height = tuval.height;
    const p = c.getContext("2d");
    p.setTransform(oran, 0, 0, oran, 0, 0);
    p.lineCap = "round";
    p.lineJoin = "round";
    p.globalCompositeOperation = "lighter";
    for (const [w, r, g, b, a] of KANAL) {
      p.strokeStyle = `rgba(${r},${g},${b},${a})`;
      p.lineWidth = w * y.k;
      cizgi(p, y.ana);
    }
    // Dallar ana kanaldan uzaklaştıkça söner
    for (const d of y.dallar) {
      const [sx, sy] = d.yol[0];
      const [ex, ey] = d.yol[d.yol.length - 1];
      for (const [w, r, g, b, a] of KANAL) {
        const grad = p.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, `rgba(${r},${g},${b},${a * 0.85})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        p.strokeStyle = grad;
        p.lineWidth = Math.max(0.5, w * y.k * d.kalin);
        cizgi(p, d.yol);
      }
    }
    p.setTransform(1, 0, 0, 1, 0, 0);
    p.globalCompositeOperation = "destination-in";
    p.drawImage(uzakTuval, 0, 0, c.width, c.height);
    p.globalCompositeOperation = "source-over";
  }

  function simsekBaslat(simdi) {
    const ad = sahneAdi();
    const sirt = gokSirt && gokSirt[ad];
    const alt = uzakAlt && uzakAlt[ad];
    if (!sirt || !alt || !maskeTuval || !uzakTuval) {
      sonrakiSimsek = simdi + 1500;
      return;
    }
    const k = olcu();
    // Çoğu çakmada yıldırım yere iner; arada bir de yalnızca bulutlar aydınlanır
    const hedef = Math.random() < 0.82 ? hedefSec(sirt, alt, k) : null;
    let x;
    let sY;
    let yildirim = null;
    let onder = 0;
    if (hedef) {
      x = hedef.x;
      sY = hedef.sY;
      yildirim = yildirimUret(hedef, k);
      yildirim.hedef = hedef;
      yildirimHazirla(yildirim);
      // Önce ince öncü kanal basamak basamak iner, sonra asıl parlama
      onder = rastgele(90, 140);
    } else {
      let fx = 0.5;
      for (let deneme = 0; deneme < 20; deneme++) {
        fx = rastgele(0.08, 0.92);
        if (profilDegeri(sirt, fx) > 0.08) break;
      }
      x = ekrana(fx * sahne.w, 0)[0];
      sY = yer.y + profilDegeri(sirt, fx) * yer.h;
    }
    // En fazla üç parlama, aralarında en az ~130 ms
    const darbeler = [{ t: onder, sure: rastgele(80, 120), guc: rastgele(0.85, 1) }];
    darbeler.push({ t: onder + rastgele(130, 220), sure: rastgele(55, 85), guc: rastgele(0.45, 0.75) });
    if (Math.random() < 0.55) darbeler.push({ t: onder + rastgele(380, 560), sure: rastgele(90, 150), guc: rastgele(0.5, 0.85) });
    simsek = { bas: simdi, x: x / 2, y: sY / 2, darbeler, yildirim, onder, bulutlar: bulutKatmani() };
    flasTuval.style.visibility = "visible";
    sonrakiSimsek = simdi + rastgele(7000, 16000);
  }

  // Bu çakmada görünecek bulutlar: gökyüzü boyunca, en alçak sırtın biraz altına kadar
  let bulutTuval = null;
  function bulutKatmani() {
    const gw = gokKatman.width;
    const gh = gokKatman.height;
    bulutTuval = bulutTuval || document.createElement("canvas");
    bulutTuval.width = gw;
    bulutTuval.height = gh;
    const p = bulutTuval.getContext("2d");
    p.clearRect(0, 0, gw, gh);
    const sirt = gokSirt[sahneAdi()];
    let enAlt = 0;
    for (let i = 0; i < sirt.length; i++) enAlt = Math.max(enAlt, sirt[i]);
    const alt = Math.min(gh, (yer.y + enAlt * yer.h) / 2 + gh * 0.03);
    const bulutGen = gw * 1.6;
    const kay = -rastgele(0, 1) * bulutGen;
    p.drawImage(bulut, kay, 0, bulutGen, alt);
    p.drawImage(bulut, kay + bulutGen, 0, bulutGen, alt);
    p.fillStyle = "#fff";
    p.fillRect(0, alt, gw, gh - alt);
    return bulutTuval;
  }

  // Gökyüzünün ve köyün aydınlanması
  function simsekGucu(gecen) {
    let toplam = 0;
    for (const d of simsek.darbeler) {
      const u = gecen - d.t;
      if (u < 0) continue;
      toplam += d.guc * (u < 14 ? u / 14 : Math.exp(-(u - 14) / (d.sure * 0.6)));
    }
    return Math.min(1, toplam);
  }

  // Kanalın kendi parlaklığı ve öncü inerken ne kadarının göründüğü
  function kanalGucu(gecen) {
    if (gecen < simsek.onder) {
      const f = gecen / simsek.onder;
      return [0.22 + 0.2 * f, Math.ceil(f * 7) / 7];
    }
    let g = 0;
    for (const d of simsek.darbeler) {
      const u = gecen - d.t;
      if (u < 0) continue;
      g = Math.max(g, d.guc * Math.exp(-u / (d.sure * 0.8)));
    }
    // Kanal bir süre sönük bir iz olarak kalır
    g = Math.max(g, 0.16 * Math.exp(-(gecen - simsek.onder) / 300));
    return [Math.min(1, g * 1.1), 1];
  }

  function simsekBitir() {
    simsek = null;
    flasGucu = 0;
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.clearRect(0, 0, flasTuval.width, flasTuval.height);
    flasTuval.style.visibility = "hidden";
  }

  // Gök ve köy (flaş katmanı). Yıldırımın kendisi efekt katmanına çizilir.
  function simsekCiz(simdi) {
    const gecen = simdi - simsek.bas;
    const son = simsek.darbeler[simsek.darbeler.length - 1].t;
    if (gecen > son + 950) {
      simsekBitir();
      return;
    }
    const a = simsekGucu(gecen);
    flasGucu = a;
    const fo = flasTuval.width / gen;
    fctx.setTransform(fo, 0, 0, fo, 0, 0);
    fctx.clearRect(0, 0, gen, yuk);
    if (a < 0.003) return;

    // Gök: yıldırımın düştüğü yerden yayılan soğuk ışık, bulutların arasından
    const g = gokKatman.getContext("2d");
    const gw = gokKatman.width;
    const gh = gokKatman.height;
    g.globalCompositeOperation = "source-over";
    g.globalAlpha = 1;
    g.clearRect(0, 0, gw, gh);
    const yar = Math.max(gw, gh) * 0.75;
    const isik = g.createRadialGradient(simsek.x, simsek.y, 0, simsek.x, simsek.y, yar);
    isik.addColorStop(0, "rgba(225,228,255,1)");
    isik.addColorStop(0.22, "rgba(170,178,228,0.75)");
    isik.addColorStop(0.55, "rgba(105,110,160,0.3)");
    isik.addColorStop(1, "rgba(50,50,80,0)");
    g.fillStyle = isik;
    g.fillRect(0, 0, gw, gh);
    // Bulut dokusu tek katmanda: destination-in her çizimde katmanın dışını siler
    g.globalCompositeOperation = "destination-in";
    g.drawImage(simsek.bulutlar, 0, 0);
    // Dağlar önü kapatsın
    g.drawImage(maskeTuval, 0, 0);

    fctx.globalCompositeOperation = "source-over";
    // Köy bir anlığına soğuk bir ışıkla görünür
    const flas = varlik[sahneAdi()].flas;
    if (flas) {
      fctx.globalAlpha = a * (simsek.yildirim ? 0.7 : 0.55);
      fctx.drawImage(flas, yer.x, yer.y, yer.w, yer.h);
    }
    fctx.globalAlpha = Math.min(1, a * 1.05);
    fctx.drawImage(gokKatman, 0, 0, gen, yuk);
    fctx.globalAlpha = 1;
  }

  // Yıldırım kanalı ve düştüğü yerdeki parlama (efekt katmanı, fenerlerin arkasında)
  function yildirimCiz(simdi) {
    const y = simsek && simsek.yildirim;
    if (!y || !yildirimTuval) return;
    const gecen = simdi - simsek.bas;
    const [parla, acilim] = kanalGucu(gecen);
    if (parla < 0.01) return;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = parla;
    if (acilim >= 1) {
      ctx.drawImage(yildirimTuval, 0, 0, gen, yuk);
    } else {
      // Öncü kanal yukarıdan aşağı basamak basamak iner
      const inis = Math.max(1, y.ustY + acilim * (y.hedef.y - y.ustY) + 4);
      const kaynak = Math.min(yildirimTuval.height, Math.round(inis * oran));
      if (kaynak > 0) ctx.drawImage(yildirimTuval, 0, 0, yildirimTuval.width, kaynak, 0, 0, gen, kaynak / oran);
    }
    // Yamaçta, yıldırımın değdiği yer bir an parlar (yere yayılan, yassı bir ışık)
    if (acilim >= 1 && y.hedef.onde) {
      const R = 30 * y.k;
      const { x, y: hy } = y.hedef;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
      g.addColorStop(0, "rgba(235,238,255,0.8)");
      g.addColorStop(0.25, "rgba(170,180,255,0.3)");
      g.addColorStop(1, "rgba(120,130,255,0)");
      ctx.save();
      ctx.translate(x, hy);
      ctx.scale(1, 0.5);
      ctx.globalAlpha = parla * 0.7;
      ctx.fillStyle = g;
      ctx.fillRect(-R, -R, R * 2, R * 2);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  // ---- Yağmur --------------------------------------------------------------
  // Çok hafif bir yağmur: ince, eğik çizgiler. Karanlıkta zor seçilir; fenerlerin
  // yakınında kızıl, şimşek çaktığında soğuk bir beyazla görünür. Fenerlerin
  // aydınlattığı damda damlalar küçük sıçramalar yapar.
  const damlalar = [];
  const sicramalar = [];
  let yagmurGiris = 0;
  const IZ = 0.024; // çizginin boyu: düşüş hızı × bu süre (objektifin pozlaması gibi)
  const DAMLA_KATLARI = [
    // [yakınlık alt, üst, saydamlık, kalınlık]
    [0, 0.58, 0.065, 0.6],
    [0.58, 0.8, 0.095, 0.8],
    [0.8, 2, 0.13, 1.05],
  ];

  function yagmurDiz() {
    damlalar.length = 0;
    sicramalar.length = 0;
    const adet = Math.round(Math.max(40, Math.min(150, (gen * yuk) / 12000)));
    for (let i = 0; i < adet; i++) damlalar.push(yeniDamla(true));
  }

  function yeniDamla(ilk) {
    const z = 0.35 + 0.65 * Math.pow(Math.random(), 0.8);
    const d = {
      x: rastgele(-0.3 * yuk, gen),
      y: ilk ? rastgele(-0.1 * yuk, yuk) : rastgele(-0.3 * yuk, -0.03 * yuk),
      z,
      hiz: yuk * (0.55 + 0.6 * z) * rastgele(0.92, 1.08),
      vx: 0,
      son: Infinity,
    };
    // Uzaktaki damlaların bir kısmı dama iner
    if (z < 0.8 && Math.random() < 0.5) {
      const [ust, alt] = sahne.cati;
      d.son = yer.y + rastgele(ust, alt) * yer.h;
    }
    return d;
  }

  function fenerIsigi(x, y, alevler, yayilim) {
    let isik = 0;
    for (const [ax, ay, R] of alevler) {
      const ux = (x - ax) / (R * yayilim);
      const uy = (y - (ay - R * 0.8)) / (R * yayilim);
      isik += Math.exp(-(ux * ux + uy * uy));
    }
    return isik;
  }

  function yagmurCiz(t, dt, r, alevler) {
    yagmurGiris = Math.min(1, yagmurGiris + dt / 5);
    const yogun = yagmurGiris * (0.85 + 0.15 * Math.sin(t * 0.045 + 1.7));
    if (yogun <= 0.01) return;
    const egim = Math.tan(0.07 + 0.11 * Math.min(1.4, r));
    const [, , sol, sag] = sahne.cati;
    const catiSol = yer.x + sol * yer.w;
    const catiSag = yer.x + sag * yer.w;

    for (let i = 0; i < damlalar.length; i++) {
      const d = damlalar[i];
      d.vx = d.hiz * egim * (0.85 + 0.3 * d.z);
      d.x += d.vx * dt;
      d.y += d.hiz * dt;
      if (d.y >= d.son) {
        if (d.x > catiSol && d.x < catiSag && sicramalar.length < 24) {
          const isik = fenerIsigi(d.x, d.y, alevler, 4.2);
          if (isik > 0.06) sicramalar.push({ x: d.x, y: d.y, z: d.z, omur: 0, isik: Math.min(1, isik) });
        }
        damlalar[i] = yeniDamla(false);
        continue;
      }
      if (d.y - d.hiz * IZ > yuk + 4 || d.x > gen + 60) damlalar[i] = yeniDamla(false);
    }

    // Karanlıkta zor seçilen soğuk çizgiler
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "rgb(196,206,222)";
    ctx.lineCap = "butt";
    for (const [z0, z1, alfa, kalin] of DAMLA_KATLARI) {
      ctx.beginPath();
      for (const d of damlalar) {
        if (d.z < z0 || d.z >= z1) continue;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.vx * IZ, d.y - d.hiz * IZ);
      }
      ctx.globalAlpha = alfa * yogun;
      ctx.lineWidth = kalin;
      ctx.stroke();
    }

    // Fenerin ışığına giren damlalar kızıl parlar
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "rgb(255,176,124)";
    for (const d of damlalar) {
      const isik = fenerIsigi(d.x, d.y - d.hiz * IZ * 0.5, alevler, 3.4);
      if (isik < 0.04) continue;
      ctx.globalAlpha = Math.min(0.6, isik * 0.7) * (0.45 + 0.55 * d.z) * yogun;
      ctx.lineWidth = 0.6 + 0.6 * d.z;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.vx * IZ, d.y - d.hiz * IZ);
      ctx.stroke();
    }

    // Şimşek çakınca bütün damlalar bir anlığına görünür
    if (flasGucu > 0.02) {
      ctx.strokeStyle = "rgb(214,222,255)";
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (const d of damlalar) {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.vx * IZ, d.y - d.hiz * IZ);
      }
      ctx.globalAlpha = Math.min(1, flasGucu) * 0.36 * yogun;
      ctx.stroke();
    }

    // Damdaki küçük sıçramalar
    for (let i = sicramalar.length - 1; i >= 0; i--) {
      const s = sicramalar[i];
      s.omur += dt;
      const p = s.omur / 0.16;
      if (p >= 1) {
        sicramalar.splice(i, 1);
        continue;
      }
      const g = s.isik * yogun;
      const b = 1.1 + 1.3 * s.z;
      if (p < 0.35) {
        ctx.globalAlpha = (1 - p / 0.35) * 0.55 * g;
        ctx.drawImage(zerre, s.x - b * 1.4, s.y - b * 0.7, b * 2.8, b * 1.4);
      }
      ctx.globalAlpha = (1 - p) * 0.8 * g;
      const yuks = 5 * s.z * Math.sin(Math.PI * p);
      const yan = (2 + 6 * p) * s.z;
      ctx.drawImage(zerre, s.x - yan - b / 2, s.y - yuks - b / 2, b, b);
      ctx.drawImage(zerre, s.x + yan - b / 2, s.y - yuks * 0.8 - b / 2, b, b);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  function cizgi(p, noktalar) {
    p.beginPath();
    p.moveTo(noktalar[0][0], noktalar[0][1]);
    for (let i = 1; i < noktalar.length; i++) p.lineTo(noktalar[i][0], noktalar[i][1]);
    p.stroke();
  }

  // ---- Katmanlar ---------------------------------------------------------
  function sahneAdi() {
    return sahne === SAHNELER.dikey ? "dikey" : "yatay";
  }

  function yamalariCiz() {
    const yo = yamaTuval.width / gen;
    yctx.setTransform(yo, 0, 0, yo, 0, 0);
    yctx.clearRect(0, 0, gen, yuk);
    const levha = varlik[sahneAdi()].levha;
    if (!levha) return;
    for (const f of sahne.fenerler) {
      const [sx, sy, sw, sh, dx, dy] = f.yama;
      const [x, y] = ekrana(dx, dy);
      yctx.drawImage(levha, sx, sy, sw, sh, x, y, sw * yer.s, sh * yer.s);
    }
  }

  function boyutla() {
    // Dönüşümden etkilenmeyen yerleşim boyutu; fotoğrafla aynı kutu.
    gen = Math.max(1, tuval.clientWidth);
    yuk = Math.max(1, tuval.clientHeight);
    kucuk = Math.min(gen, yuk) < 700;
    const dpr = window.devicePixelRatio || 1;
    // Her karede yeniden çizilen katman için piksel bütçesi; yamalar bir kez
    // çizildiği için fotoğrafla aynı keskinlikte kalır.
    oran = Math.min(dpr, 2, Math.sqrt(2.2e6 / (gen * yuk)));
    const yamaOran = Math.min(dpr, 2);
    for (const [c, o] of [
      [tuval, oran],
      [yamaTuval, yamaOran],
      [flasTuval, Math.min(dpr, 1)],
    ]) {
      c.width = Math.round(gen * o);
      c.height = Math.round(yuk * o);
    }
    ctx.setTransform(oran, 0, 0, oran, 0, 0);
    ctx.imageSmoothingQuality = "high";
    yctx.imageSmoothingQuality = "high";
    sahne = dikeyMi.matches ? SAHNELER.dikey : SAHNELER.yatay;
    yerlesimiHesapla();
    notuYerlestir();
    yamalariCiz();
    maskeHazirla();
    tozDiz();
    yagmurDiz();
    // Yarıda kalan çakma eski boyuta göre çizilmişti
    if (simsek) simsekBitir();
    varliklariYukle();
  }

  // Fener levhası önce, şimşek görselleri sonra ve yalnızca gerektiğinde
  function varliklariYukle() {
    const ad = sahneAdi();
    const v = varlik[ad];
    const s = SAHNELER[ad];
    if (!v.istendi) {
      v.istendi = true;
      resimYukle(s.levha)
        .then((r) => {
          v.levha = r;
          if (sahneAdi() === ad) yamalariCiz();
        })
        .catch(() => {});
      window.setTimeout(() => {
        Promise.all([resimYukle(s.gok), resimYukle(s.uzak), resimYukle(s.flas)])
          .then(([gok, uzak, flas]) => {
            v.gok = gok;
            v.uzak = uzak;
            v.flas = flas;
            gokSirt = gokSirt || {};
            uzakAlt = uzakAlt || {};
            gokSirt[ad] = profilCikar(gok);
            uzakAlt[ad] = profilCikar(uzak);
            if (sahneAdi() === ad) maskeHazirla();
          })
          .catch(() => {});
      }, 1500);
    }
  }

  // ---- Döngü -------------------------------------------------------------
  let onceki = performance.now();
  let calisiyor = false;
  let kare = 0;
  let fareX = 0;
  let fareY = 0;
  let kayX = 0;
  let kayY = 0;

  function ciz(t, simdi, dt, sakin) {
    const r = ruzgarHesapla(t, simdi, dt);
    const levha = varlik[sahneAdi()].levha;
    fenerleriSalla(r, t, dt, sakin ? 0.6 : 1);

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, gen, yuk);

    // Şimşek: gök ve köy flaş katmanında, yıldırım kanalı bu katmanda en arkada
    if (!simsek && simdi > sonrakiSimsek) simsekBaslat(simdi);
    if (simsek) simsekCiz(simdi);
    if (simsek) yildirimCiz(simdi);
    notuAydinlat();

    // Fenerler, ipleriyle birlikte bağlandıkları taşın etrafında
    if (levha) {
      sahne.fenerler.forEach((f, i) => {
        const [sx, sy, sw, sh, dx, dy] = f.fener;
        const [ax, ay] = f.baglanti;
        const [x, y] = ekrana(ax, ay);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(fenerDurum[i].aci);
        ctx.drawImage(levha, sx, sy, sw, sh, (dx - ax) * yer.s, (dy - ay) * yer.s, sw * yer.s, sh * yer.s);
        ctx.restore();
      });
    }

    // Alevler ve damdaki ışık
    const gucler = sahne.fenerler.map((_, i) => alevGucu(i, t, r, false));
    const ortalama = gucler.reduce((a, b) => a + b, 0) / gucler.length;
    const [dx, dy, dr] = sahne.dam;
    const [mx, my] = ekrana(dx * sahne.w, dy * sahne.h);
    const yaricap = dr * yer.w;
    const fark = (ortalama - 0.82) * 1.6;
    if (Math.abs(fark) > 0.002) {
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
    const alevler = [];
    sahne.fenerler.forEach((f, i) => {
      const [x, y] = alevYeri(f, levha ? fenerDurum[i].aci : 0);
      const R = f.R * yer.s;
      alevler.push([x, y, R]);
      const gy = y - R * 0.8;
      ctx.globalAlpha = gucler[i];
      ctx.drawImage(hale, x - R * 4.5, gy - R * 4.5, R * 9, R * 9);
      ctx.drawImage(govde, x - R * 1.5, gy - R * 1.5, R * 3, R * 3);
      ctx.drawImage(alevIsigi, x - R, y - R, R * 2, R * 2);
      if (Math.random() < 0.01 + Math.max(0, r - 0.6) * 0.02) kivilcimBirak(x, y, R);
    });

    // Fener ışığına giren toz zerreleri rüzgârla geçer
    const tozHizi = 16 + 95 * r;
    for (const z of toz) {
      z.x += tozHizi * z.hiz * dt;
      z.y += (Math.sin(t * 0.9 + z.faz) * 7 - (r - 0.4) * 3) * dt;
      if (z.x > gen + 10) Object.assign(z, yeniToz(false));
      let isik = 0;
      for (const [ax, ay, R] of alevler) {
        const ux = (z.x - ax) / (R * 3.2);
        const uy = (z.y - ay) / (R * 3.2);
        isik += Math.exp(-(ux * ux + uy * uy));
      }
      if (isik < 0.02) continue;
      ctx.globalAlpha = Math.min(0.85, isik) * (0.45 + 0.35 * Math.sin(t * 2.7 + z.faz));
      ctx.drawImage(zerre, z.x - z.boy, z.y - z.boy, z.boy * 2, z.boy * 2);
    }

    // Kıvılcımlar yükselirken rüzgârla sürüklenir
    for (let i = kivilcim.length - 1; i >= 0; i--) {
      const k = kivilcim[i];
      k.omur += dt;
      if (k.omur > k.sure) {
        kivilcim.splice(i, 1);
        continue;
      }
      k.vx += ((12 + 70 * r) - k.vx) * dt * 0.8 + rastgele(-12, 12) * dt;
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

    // En önde, objektife en yakın katman: yağmur
    yagmurCiz(t, dt, r, alevler);
  }

  function dongu(simdi) {
    if (!calisiyor) return;
    kare = requestAnimationFrame(dongu);
    const dt = Math.min(0.05, (simdi - onceki) / 1000);
    onceki = simdi;
    const t = simdi / 1000;
    const sakin = sakinSorgu.matches;

    if (sakin) {
      sahneEl.style.transform = "scale(1.02)";
    } else {
      // Çok yavaş bir nefes ve fareye hafif tepki
      kayX += (fareX - kayX) * 0.025;
      kayY += (fareY - kayY) * 0.025;
      const olcek = 1.025 + 0.012 * Math.sin(t * 0.07);
      sahneEl.style.transform = `translate3d(${(kayX * -10).toFixed(2)}px, ${(kayY * -6).toFixed(2)}px, 0) scale(${olcek.toFixed(4)})`;
    }
    ciz(t, simdi, dt, sakin);
  }

  function basla() {
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
  // Yazı tipi geç gelirse notun genişliği değişir
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(notuYerlestir).catch(() => {});
  let boyutZamani = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(boyutZamani);
    boyutZamani = window.setTimeout(boyutla, 120);
  });
  dikeyMi.addEventListener("change", boyutla);
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
