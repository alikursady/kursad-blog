// Ana sayfadaki karanlık tuval: fener ışıkları, kıvılcımlar, yağmur, kül,
// şimşek ve geri sayım. Resmin kendisi statik; bütün hareket bu katmanda.

const HEDEF = new Date("2026-11-24T12:00:00+03:00").getTime();

// Fener ve yangın konumları, resmin kendi genişlik/yüksekliğine oranla.
// [x, y, yarıçap(genişliğe oranla)]; y alevin olduğu yere, fenerin altına yakın.
const SAHNELER = {
  yatay: {
    w: 2752,
    h: 1536,
    fenerler: [
      [0.132, 0.37, 0.032],
      [0.349, 0.374, 0.018],
      [0.677, 0.429, 0.017],
      [0.877, 0.313, 0.031],
    ],
    yangin: [
      [0.38, 0.505],
      [0.444, 0.49],
      [0.551, 0.496],
    ],
    gokSiniri: 0.5,
  },
  dikey: {
    w: 1536,
    h: 2752,
    fenerler: [
      [0.247, 0.172, 0.069],
      [0.793, 0.197, 0.06],
      [0.369, 0.382, 0.024],
      [0.697, 0.359, 0.03],
    ],
    yangin: [
      [0.793, 0.55],
      [0.709, 0.551],
      [0.402, 0.544],
    ],
    gokSiniri: 0.53,
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

  const yaz = (el, deger) => {
    const metin = String(deger).padStart(2, "0");
    if (el.textContent === metin) return;
    el.textContent = metin;
    if (sakin) return;
    el.classList.remove("tv-titrek");
    // Animasyonu yeniden başlatmak için bir kare bekle.
    void el.offsetWidth;
    el.classList.add("tv-titrek");
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
  const simsekEl = kok.querySelector("[data-tv-simsek]");
  const ctx = tuval.getContext("2d");
  const sakin = window.matchMedia("(prefers-reduced-motion: reduce)");
  const dikeyMi = window.matchMedia(DIKEY_SORGU);

  let gen = 0;
  let yuk = 0;
  let oran = 1;
  let sahne = dikeyMi.matches ? SAHNELER.dikey : SAHNELER.yatay;
  // Resmin ekrandaki yerleşimi (object-fit: cover)
  let yer = { x: 0, y: 0, w: 1, h: 1 };

  const yagmur = [];
  const kivilcim = [];
  const kul = [];
  let simsek = null;
  let sonrakiSimsek = performance.now() + rastgele(3500, 6000);
  let sarsinti = 0;

  // Hazır çizilmiş kıvılcım parıltısı
  const parilti = document.createElement("canvas");
  parilti.width = parilti.height = 32;
  {
    const p = parilti.getContext("2d");
    const g = p.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,236,190,1)");
    g.addColorStop(0.18, "rgba(255,170,80,0.95)");
    g.addColorStop(0.45, "rgba(230,70,25,0.35)");
    g.addColorStop(1, "rgba(160,20,10,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, 32, 32);
  }

  // Fener ışığının üç katmanı bir kez çizilir, her karede yalnızca kopyalanır.
  function katman(boyut, boya) {
    const c = document.createElement("canvas");
    c.width = c.height = boyut;
    boya(c.getContext("2d"), boyut / 2);
    return c;
  }
  // Geniş kızıl hale: taşlara ve göğe vuran ışık (kutu = 13R)
  const hale = katman(256, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, "rgba(220,46,18,0.2)");
    g.addColorStop(0.35, "rgba(150,22,10,0.09)");
    g.addColorStop(1, "rgba(80,8,4,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Kağıdın içten aydınlanması (kutu = 3R)
  const govde = katman(128, (p, m) => {
    const R = m / 1.5;
    const g = p.createRadialGradient(m, m + R * 0.25, 0, m, m, R * 1.45);
    g.addColorStop(0, "rgba(255,110,50,0.26)");
    g.addColorStop(0.6, "rgba(220,46,18,0.12)");
    g.addColorStop(1, "rgba(160,20,10,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });
  // Ağızdaki alev (kutu = 2R)
  const alevIsigi = katman(64, (p, m) => {
    const g = p.createRadialGradient(m, m, 0, m, m, m * 0.75);
    g.addColorStop(0, "rgba(255,205,140,0.5)");
    g.addColorStop(0.4, "rgba(255,120,50,0.22)");
    g.addColorStop(1, "rgba(200,40,16,0)");
    p.fillStyle = g;
    p.fillRect(0, 0, m * 2, m * 2);
  });

  // Her fenerin kendi titreme ritmi
  const fenerRitim = [0, 1, 2, 3].map(() => ({
    a: rastgele(0, 6.28),
    b: rastgele(0, 6.28),
    c: rastgele(0, 6.28),
    hiz: rastgele(0.85, 1.25),
    sonme: 0,
  }));

  function yerlesimiHesapla() {
    const s = Math.max(gen / sahne.w, yuk / sahne.h);
    const w = sahne.w * s;
    const h = sahne.h * s;
    yer = { x: (gen - w) / 2, y: (yuk - h) / 2, w, h };
  }

  function ekrana(px, py) {
    return [yer.x + px * yer.w, yer.y + py * yer.h];
  }

  function boyutla() {
    // Dönüşümden etkilenmeyen yerleşim boyutu; resimle aynı kutu.
    gen = Math.max(1, tuval.clientWidth);
    yuk = Math.max(1, tuval.clientHeight);
    // Işık ve parçacıklar yumuşak; büyük ekranda retina çözünürlüğüne gerek yok.
    oran = Math.min(window.devicePixelRatio || 1, gen > 1100 ? 1 : 1.5);
    tuval.width = Math.round(gen * oran);
    tuval.height = Math.round(yuk * oran);
    ctx.setTransform(oran, 0, 0, oran, 0, 0);
    sahne = dikeyMi.matches ? SAHNELER.dikey : SAHNELER.yatay;
    yerlesimiHesapla();

    const alan = gen * yuk;
    const kucuk = gen < 700;
    const yagmurSayisi = Math.round(Math.min(kucuk ? 180 : 420, alan / (kucuk ? 2200 : 4200)));
    yagmur.length = 0;
    for (let i = 0; i < yagmurSayisi; i++) yagmur.push(yeniDamla(true));
    kul.length = 0;
    const kulSayisi = kucuk ? 26 : 54;
    for (let i = 0; i < kulSayisi; i++) kul.push(yeniKul(true));
  }

  function yeniDamla(ilk) {
    return {
      x: rastgele(-0.2, 1.1) * gen,
      y: ilk ? rastgele(-0.1, 1) * yuk : rastgele(-0.25, -0.02) * yuk,
      uzunluk: rastgele(10, 34),
      hiz: rastgele(900, 1500),
      alfa: rastgele(0.06, 0.26),
      kalinlik: Math.random() < 0.85 ? 0.7 : 1.3,
    };
  }

  function yeniKul(ilk) {
    return {
      x: rastgele(0, 1) * gen,
      y: ilk ? rastgele(0, 1) * yuk : rastgele(-0.1, 0) * yuk,
      boy: rastgele(0.8, 2.4),
      hiz: rastgele(12, 42),
      salinim: rastgele(0, 6.28),
      alfa: rastgele(0.12, 0.38),
      donus: rastgele(0, 6.28),
    };
  }

  function kivilcimDok(x, y, yaricap, adet, kaynak) {
    for (let i = 0; i < adet; i++) {
      kivilcim.push({
        x: x + rastgele(-yaricap, yaricap),
        y: y + rastgele(-yaricap * 0.6, yaricap * 0.4),
        vx: rastgele(-12, 12),
        vy: kaynak === "yangin" ? rastgele(-55, -20) : rastgele(-38, -8),
        omur: 0,
        sure: rastgele(1.8, kaynak === "yangin" ? 5.5 : 4),
        boy: rastgele(4, kaynak === "fener" ? 10 : 13),
        isi: rastgele(0.5, 1),
        faz: rastgele(0, 6.28),
      });
    }
  }

  // Rüzgâr: yavaş bir taban, üstüne ani sağanaklar
  let sagnak = 0;
  let sagnakHedef = 0;
  let sonrakiSagnak = performance.now() + rastgele(2000, 5000);
  function ruzgar(t, simdi) {
    if (simdi > sonrakiSagnak) {
      sagnakHedef = rastgele(0.6, 1.6) * (Math.random() < 0.8 ? 1 : -0.6);
      sonrakiSagnak = simdi + rastgele(2500, 7000);
      window.setTimeout(() => {
        sagnakHedef = 0;
      }, rastgele(700, 1800));
    }
    sagnak += (sagnakHedef - sagnak) * 0.04;
    return 0.42 + 0.18 * Math.sin(t * 0.23) + 0.1 * Math.sin(t * 0.71 + 1.3) + sagnak;
  }

  function simsekYarat(simdi) {
    const ustX = rastgele(0.12, 0.88);
    const altX = ustX + rastgele(-0.16, 0.16);
    const [x0, y0] = ekrana(ustX, rastgele(0.0, 0.08));
    const [x1, y1] = ekrana(altX, sahne.gokSiniri * rastgele(0.78, 1));
    const ana = kirikCizgi(x0, y0, x1, y1, 6);
    const dallar = [];
    const dalSayisi = Math.floor(rastgele(1, 4));
    for (let i = 0; i < dalSayisi; i++) {
      const bas = ana[Math.floor(rastgele(ana.length * 0.2, ana.length * 0.7))];
      const uz = rastgele(0.08, 0.22) * yer.h;
      const aci = rastgele(-1, 1);
      dallar.push(kirikCizgi(bas[0], bas[1], bas[0] + Math.sin(aci) * uz, bas[1] + Math.cos(aci) * uz * 0.8, 4));
    }
    simsek = { ana, dallar, bas: simdi, sure: rastgele(520, 900) };
    sarsinti = 1;
    const yuzde = Math.round(((x0 + x1) / 2 / gen) * 100);
    simsekEl.style.setProperty("--tv-simsek-x", yuzde + "%");
    simsekEl.animate(
      [
        { opacity: 0 },
        { opacity: 0.85, offset: 0.06 },
        { opacity: 0.12, offset: 0.18 },
        { opacity: 0.65, offset: 0.3 },
        { opacity: 0.08, offset: 0.5 },
        { opacity: 0.3, offset: 0.58 },
        { opacity: 0 },
      ],
      { duration: simsek.sure + 300, easing: "linear" }
    );
    resim.animate(
      [
        { filter: "brightness(1) contrast(1)" },
        { filter: "brightness(1.75) contrast(1.15) saturate(0.7)", offset: 0.07 },
        { filter: "brightness(1.05)", offset: 0.2 },
        { filter: "brightness(1.5) contrast(1.1) saturate(0.8)", offset: 0.32 },
        { filter: "brightness(1)" },
      ],
      { duration: simsek.sure + 200, easing: "linear" }
    );
    sonrakiSimsek = simdi + rastgele(5500, 15000);
    // Bazen ikinci bir çakma hemen arkasından gelir.
    if (Math.random() < 0.3) sonrakiSimsek = simdi + rastgele(1100, 1900);
  }

  function kirikCizgi(x0, y0, x1, y1, derinlik) {
    let noktalar = [
      [x0, y0],
      [x1, y1],
    ];
    let sapma = Math.hypot(x1 - x0, y1 - y0) * 0.22;
    for (let d = 0; d < derinlik; d++) {
      const yeni = [noktalar[0]];
      for (let i = 0; i < noktalar.length - 1; i++) {
        const [ax, ay] = noktalar[i];
        const [bx, by] = noktalar[i + 1];
        yeni.push([(ax + bx) / 2 + rastgele(-sapma, sapma), (ay + by) / 2 + rastgele(-sapma, sapma) * 0.35]);
        yeni.push([bx, by]);
      }
      noktalar = yeni;
      sapma *= 0.55;
    }
    return noktalar;
  }

  function cizgiCiz(noktalar) {
    ctx.beginPath();
    ctx.moveTo(noktalar[0][0], noktalar[0][1]);
    for (let i = 1; i < noktalar.length; i++) ctx.lineTo(noktalar[i][0], noktalar[i][1]);
    ctx.stroke();
  }

  function fenerleriCiz(t, r, sabit) {
    let toplam = 0;
    sahne.fenerler.forEach(([fx, fy, fr], i) => {
      const ritim = fenerRitim[i];
      let isik = 0.82;
      if (!sabit) {
        const tt = t * ritim.hiz;
        isik =
          0.74 +
          0.11 * Math.sin(tt * 7.1 + ritim.a) +
          0.07 * Math.sin(tt * 13.7 + ritim.b) +
          0.05 * Math.sin(tt * 23.3 + ritim.c) -
          0.12 * Math.max(0, r - 0.9);
        // Rüzgârda alev bir an yatar
        if (ritim.sonme <= 0 && Math.random() < 0.004 + Math.max(0, r - 1) * 0.02) ritim.sonme = rastgele(0.12, 0.35);
        if (ritim.sonme > 0) {
          isik *= 0.55;
          ritim.sonme -= 1 / 60;
        }
      }
      isik = Math.max(0.25, Math.min(1, isik));
      toplam += isik;
      const [x, y] = ekrana(fx, fy);
      const R = fr * yer.w;
      const salla = sabit ? 0 : Math.sin(t * 3.1 + ritim.a) * R * 0.06 * r;

      // Fenerin gövdesi alevin biraz üstünde
      const gx = x + salla;
      const gy = y - R * 0.85;

      // Hazır ışık katmanları, alevin gücüyle saydamlaşarak
      ctx.globalAlpha = isik;
      ctx.drawImage(hale, gx - R * 6.5, gy - R * 6.5, R * 13, R * 13);
      ctx.drawImage(govde, gx - R * 1.5, gy - R * 1.5, R * 3, R * 3);
      ctx.drawImage(alevIsigi, gx - R, y - R, R * 2, R * 2);
      ctx.globalAlpha = 1;

      if (!sabit && Math.random() < 0.08 + Math.max(0, r - 0.8) * 0.15) kivilcimDok(x, y - R * 0.3, R * 0.5, 1, "fener");
    });
    return toplam / sahne.fenerler.length;
  }

  let onceki = performance.now();
  let calisiyor = false;
  let kare = 0;
  let fareX = 0;
  let fareY = 0;
  let kayX = 0;
  let kayY = 0;

  function ciz(simdi) {
    if (!calisiyor) return;
    kare = requestAnimationFrame(ciz);
    const dt = Math.min(0.05, (simdi - onceki) / 1000);
    onceki = simdi;
    const t = simdi / 1000;
    const r = ruzgar(t, simdi);

    // Ağır ağır nefes alan tuval + fareye hafif tepki + şimşek sarsıntısı
    kayX += (fareX - kayX) * 0.03;
    kayY += (fareY - kayY) * 0.03;
    const olcek = 1.035 + 0.02 * Math.sin(t * 0.09);
    let sx = kayX * -14;
    let sy = kayY * -9;
    if (sarsinti > 0.01) {
      sx += rastgele(-4, 4) * sarsinti;
      sy += rastgele(-3, 3) * sarsinti;
      sarsinti *= 0.86;
    }
    sahneEl.style.transform = `translate3d(${sx.toFixed(2)}px, ${sy.toFixed(2)}px, 0) scale(${olcek.toFixed(4)})`;

    ctx.clearRect(0, 0, gen, yuk);

    // Kül
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgb(150,140,130)";
    for (const k of kul) {
      k.x += (r * 70 + Math.sin(t * 0.8 + k.salinim) * 14) * dt;
      k.y += k.hiz * dt;
      k.donus += dt * 2;
      if (k.y > yuk + 10 || k.x > gen + 20) Object.assign(k, yeniKul(false), { x: rastgele(-0.3, 0.9) * gen });
      ctx.globalAlpha = k.alfa;
      ctx.fillRect(k.x, k.y, k.boy * (0.6 + 0.4 * Math.abs(Math.sin(k.donus))), k.boy);
    }

    // Yağmur
    const egim = 0.18 + r * 0.32;
    ctx.strokeStyle = "rgb(205,198,190)";
    for (const d of yagmur) {
      const hiz = d.hiz * dt;
      d.x += hiz * egim;
      d.y += hiz;
      if (d.y > yuk + 40 || d.x > gen + 60) Object.assign(d, yeniDamla(false));
      ctx.globalAlpha = d.alfa;
      ctx.lineWidth = d.kalinlik;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.uzunluk * egim, d.y - d.uzunluk);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Işık katmanları toplanarak çizilir
    ctx.globalCompositeOperation = "lighter";
    const alev = fenerleriCiz(t, r, false);
    kok.style.setProperty("--tv-alev", alev.toFixed(3));

    // Ufuktaki yangından yükselen kıvılcımlar
    for (const [yx, yy] of sahne.yangin) {
      if (Math.random() < 0.22) {
        const [x, y] = ekrana(yx, yy);
        kivilcimDok(x, y, yer.w * 0.02, 1, "yangin");
      }
    }
    if (Math.random() < 0.18) kivilcimDok(rastgele(0, gen), yuk + 5, 4, 1, "yangin");

    for (let i = kivilcim.length - 1; i >= 0; i--) {
      const k = kivilcim[i];
      k.omur += dt;
      if (k.omur > k.sure) {
        kivilcim.splice(i, 1);
        continue;
      }
      k.vx += (r * 85 - k.vx) * dt * 0.9 + rastgele(-40, 40) * dt;
      k.vy += rastgele(-30, 26) * dt;
      k.x += k.vx * dt;
      k.y += k.vy * dt;
      const yas = k.omur / k.sure;
      const parla = (1 - yas) * (0.55 + 0.45 * Math.sin(t * 17 + k.faz)) * k.isi;
      if (parla <= 0.02) continue;
      ctx.globalAlpha = Math.min(1, parla);
      const b = k.boy * (1 - yas * 0.5);
      ctx.drawImage(parilti, k.x - b / 2, k.y - b / 2, b, b);
    }
    if (kivilcim.length > 420) kivilcim.splice(0, kivilcim.length - 420);
    ctx.globalAlpha = 1;

    // Şimşek
    if (simdi > sonrakiSimsek) simsekYarat(simdi);
    if (simsek) {
      const gecen = (simdi - simsek.bas) / simsek.sure;
      if (gecen > 1) {
        simsek = null;
      } else {
        const yanip = gecen < 0.08 || (gecen > 0.25 && gecen < 0.36) || (gecen > 0.52 && gecen < 0.58) ? 1 : 0.18;
        const a = (1 - gecen) * yanip;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(190,190,255,0.9)";
        ctx.shadowBlur = 22;
        ctx.strokeStyle = `rgba(200,200,255,${0.35 * a})`;
        ctx.lineWidth = 7;
        cizgiCiz(simsek.ana);
        ctx.shadowBlur = 8;
        ctx.strokeStyle = `rgba(245,242,255,${0.95 * a})`;
        ctx.lineWidth = 1.8;
        cizgiCiz(simsek.ana);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(230,228,255,${0.6 * a})`;
        simsek.dallar.forEach(cizgiCiz);
        ctx.shadowBlur = 0;
      }
    }
    ctx.globalCompositeOperation = "source-over";
  }

  function sakinCiz() {
    ctx.clearRect(0, 0, gen, yuk);
    ctx.globalCompositeOperation = "lighter";
    fenerleriCiz(0, 0.4, true);
    ctx.globalCompositeOperation = "source-over";
    sahneEl.style.transform = "scale(1.02)";
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
    kare = requestAnimationFrame(ciz);
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

  // Tuval karanlıktan yavaşça aydınlanır; sonra efektler başlar.
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
