---
title: "Fotoğrafın Nerede Çekildiğini Bulmak: EXIF ve OSINT ile Konum Analizi"
date: 2025-11-07T12:00:00+03:00
lastmod: 2026-07-06T00:00:00+03:00
draft: false
description: "EXIF verileri, GPS koordinatları ve görsel ipuçlarıyla bir fotoğrafın nerede çekildiğini bulmak için OSINT odaklı konum analizi rehberi."
summary: "Fotoğraf konum bulma için EXIF meta verileri, GPS koordinatları, görsel ipuçları ve OSINT araçlarıyla temel analiz adımları."
categories: ["Siber Güvenlik"]
tags: ["OSINT", "EXIF", "siber güvenlik", "fotoğraf analizi"]
keywords: ["fotoğrafın nerede çekildiğini bulmak", "fotoğraf konum bulma", "EXIF analizi", "OSINT", "görsel analiz", "fotoğraf konum analizi", "siber güvenlik"]
images: ["/images/resim1.jpg"]
ShowToc: true
TocOpen: false
faqs:
  - question: "Bir fotoğrafın nerede çekildiği nasıl bulunur?"
    answer: "Fotoğrafın EXIF meta verileri, GPS koordinatları, çekim zamanı ve görsel ipuçları incelenerek konum hakkında çıkarım yapılabilir. Sosyal medya platformları çoğu zaman EXIF verilerini sildiği için çevresel ipuçları da önemlidir."
  - question: "Sosyal medyadan indirilen fotoğraflarda EXIF bilgisi kalır mı?"
    answer: "Genellikle hayır. Instagram, X, Facebook ve mesajlaşma uygulamaları yüklenen fotoğraflardaki EXIF verilerini çoğu zaman temizler. Bu durumda bina, tabela, bitki örtüsü, gölge ve benzeri görsel ipuçlarıyla analiz yapılır."
  - question: "Fotoğraf konum analizi için hangi araçlar kullanılabilir?"
    answer: "ExifTool, Identify, Google Lens, Yandex Vision, Picarta.ai ve benzeri görsel arama veya analiz araçları kullanılabilir. Araçların sonucu tek başına kesin kabul edilmemeli, farklı kaynaklarla doğrulanmalıdır."
  - question: "Fotoğraflarımdaki EXIF ve konum bilgisini nasıl temizlerim?"
    answer: "En pratik yöntem exiftool -all= dosya.jpg komutuyla tüm meta verileri tek seferde silmektir. Telefonlarda kamera ayarlarından konum etiketini (geotagging) kapatabilir, paylaşmadan önce ekran görüntüsü alarak da EXIF'i sıfırlayabilirsiniz. Yine de bina, tabela ve manzara gibi görsel ipuçlarının karede kalabileceğini unutmayın."
---

Merhabalar dostlar 👋  
Bu ilk yazım ve ilk yazımda bir fotoğrafın **hangi konumda, hangi koşullarda çekildiğini** **OSINT (Açık Kaynak İstihbaratı)** yöntemleriyle nasıl bulabileceğimizi ve elde edebildiğimiz tüm ayrıntıları ele alacağım.

---

## 🧭 Fotoğraflar bilgi taşır

Fotoğraf dosyaları; **çekim tarihi, koordinatları, odak uzaklığı, zoom**, hangi cihazla çekildiği, hangi modda çekildiği ve hangi modun açık veya kapalı olduğu gibi bilgiler içerir.  
Örnek vermek gerekirse, telefonlarda ve birçok kamerada yerleşik GPS alıcıları mevcuttur; konum servisi açıksa cihaz, fotoğraf çekilirken koordinatları **EXIF meta verisine** ekler.

---

## 🧾 EXIF örneği

**resim1.jpg** dosyasında çıkan EXIF verileri:
![Exif verisi örneği](/images/resim1.jpg)
Bu fotoğraf **Xiaomi Redmi Note 9** cihazı ile çekilmiş.  
EXIF verileri, çekimin tamamen **otomatik modda** gerçekleştirildiğini ve **HDR özelliğinin kapalı** olduğunu gösteriyor.

**Teknik Veriler:**
- Koordinatlar: 37°33'11.74" N, 36°55'12.27" E  
- Diyafram: f/1.8  
- Enstantane: 1/428 sn  
- Odak Uzaklığı: 4.7 mm (35mm karşılığı: 28 mm)  
- Beyaz Dengesi: Otomatik  
- Pozlama Modu: Otomatik  
- Ölçüm Modu: Merkez ağırlıklı  
- Dijital Zoom: 1x  
- HDR: Kapalı  
- Çekim Zamanı: 13 Aralık 2021, saat 16:23 (yerel saat)  
- Çözünürlük: 4000 × 2992 piksel  

📍 *Google Haritalar kullanılarak fotoğrafın çekildiği tam konumu görebiliriz.*

Bu verilere ulaşmak için özel bir yazılıma gerek yok; terminalde tek satır yeterli. EXIF'in tamamını dökmek için:

```bash
exiftool resim1.jpg
```

Yalnızca konumla ilgileniyorsanız çıktıyı GPS alanlarına daraltabilirsiniz:

```bash
exiftool -gpslatitude -gpslongitude -gpsposition resim1.jpg
```

Elde ettiğiniz koordinatları doğrudan **Google Haritalar** arama kutusuna yapıştırdığınızda cihazın fotoğrafı çektiği noktayı harita üzerinde görebilir, **Sokak Görünümü** ile çevreyi karşılaştırarak konumu bir kez daha doğrulayabilirsiniz.

---

## 🔒 Sosyal medya ve gizlilik

Ancak bunun da sınırlılıkları mevcuttur.  
Sosyal medya ve mesajlaşma uygulamalarının neredeyse tamamı, güvenlik ve gizlilik gerekçesiyle kullanıcıların yüklediği fotoğrafların **EXIF verilerini otomatik olarak temizler** ve konum bilgisini siler.  
Yine de tam bir gizlilik mümkün değildir — bunun nedenini yazının devamında anlatacağım.

---

## 🧩 Görsel içerikten analiz

İşte az önce bahsettiğim nokta tam olarak bu: EXIF verileri silinse bile fotoğrafın kendisi konuşmaya devam eder.  
Hiçbir dijital veriye dayanmadan sadece **fotoğraf içeriğinden**, çevresel ipuçlarından yararlanarak çıkarımlar da yapılabilir.  
Bina mimarisi, yazı dili, trafik işaretleri, bitki örtüsü veya coğrafi özelliklerden bahsediyorum.  
Gökyüzünün rengi ve güneş açısı dahi bizlere fikir verebilir.

Bu ipuçlarını biraz somutlaştırayım:

- **Tabela ve yazılar:** Dükkân isimleri, sokak levhaları, plakalar ve kullanılan dil/alfabe ülkeyi, hatta şehri daraltır. Bir telefon numarasının alan kodu bile ipucu olabilir.
- **Mimari ve altyapı:** Çatı biçimleri, balkonlar, elektrik direkleri, bariyerler ve yol çizgileri ülkeden ülkeye belirgin biçimde değişir.
- **Bitki örtüsü ve iklim:** Ağaç türleri; kuraklık, kar veya tropik bitkiler enlem ve mevsim hakkında fikir verir.
- **Gölge ve güneş açısı:** Gölgenin yönü ve uzunluğu, çekimin kabaca saatini ve yönünü ele verir. **SunCalc** gibi araçlarla belirli bir tarihte güneşin konumunu hesaplayıp sahnedeki gölgelerle karşılaştırarak zamanı doğrulayabilirsiniz.

Tek bir ipucu genelde yeterli olmaz; asıl güç, bu küçük parçaların hepsini üst üste koyup birbirini doğrulatmaktan gelir.

---

## 🤖 Yapay zekâ destekli sistemler

Ayrıca **yapay zekâ tabanlı sistemlerden** yararlanılıp yer belirlenebilir.  
**Geospy**, **Picarta.ai**, **Google Lens** ve **Yandex Vision** benzeri genel amaçlı görsel arama AI sistemleri, fotoğraflardaki nesneleri ve yerleri tanıyıp kullanıcının arama yapmasına olanak tanır.  
Bu tür sistemlerin avantajı kolay ulaşılır olmasıdır.  
Ayrıca burada **Reddit’in WhereIsThis** topluluğunu kullanmanın konumu bulmakta fayda sağlayacağını düşünmekteyim.

---

## 🧰 Analiz araçları

**ExifTool →** “Bu fotoğraf nerede, neyle, ne zaman çekildi?”  
**Identify →** “Bu fotoğrafın içeriği ve yapısı nasıl oluşturulmuş?”

---

## 📊 Görsel İçerik Analizi (Identify’nin Ekstra Verileri)

Identify çıktısında **ExifTool’da olmayan**, iki farklı türde bilgi bulunur ve bunların hiçbiri EXIF etiketi değildir. Bir bölümü doğrudan görüntünün piksel verisinden **hesaplanır** (istatistikler); bir bölümü ise dosyanın nasıl kaydedildiğini anlatan **kodlama bilgileridir**.

- **Channel statistics:** Her renk kanalının (R, G, B) ortalaması, standart sapması, çarpıklığı (skewness) ve entropisi — yani görüntünün kontrast ve ton dağılımı. *(piksellerden hesaplanır)*  
- **Entropy:** Görseldeki bilgi yoğunluğunu ölçer. 0'a yakın değerler sade ve düz alanları, 1'e yakın değerler yüksek detay ve karmaşıklığı gösterir; 0.9 civarı bir değer, detay açısından zengin doğal bir sahne demektir.  
- **Mean / Median / Std. Deviation:** Görüntünün genel parlaklığı ve dinamik aralığı hakkında fikir verir.  
- **Signature:** Görüntünün piksel verisinden üretilen SHA-256 tabanlı benzersiz dijital parmak izi. Tek bir piksel bile değişse imza tamamen değişir; bu sayede görüntü üzerinde oynama yapılıp yapılmadığı anında tespit edilir. *(piksellerden hesaplanır)*
- **Quality:** 96 — JPEG'in niceleme (quantization) tablolarından **tahmin edilen** sıkıştırma kalitesi. Yüksek değer, görece az sıkıştırma demektir. *(dosya yapısından okunur)*
- **Sampling factor / Interlace:** Renk alt örneklemesi (ör. `2x2,1x1,1x1` = 4:2:0) ve satır tarama biçimi; görüntünün nasıl kodlandığını gösterir. *(dosya yapısından okunur)*
- **Gamma / Chromaticity / Rendering intent:** Renk profili, gama eğrisi, beyaz nokta ve renklerin farklı ekranlarda nasıl eşleneceği — renk doğruluğu için önemli. *(dosya yapısından okunur)*

🧠 *ExifTool bunları göstermez çünkü hiçbiri EXIF etiketi değildir: kanal istatistikleri, entropy ve signature doğrudan **piksellerden hesaplanır**; quality, sampling factor, interlace, gamma ve chromaticity ise görüntünün **kodlama/yapı bilgisinden** okunur. Kısacası ExifTool "dosya ne diyor?" sorusuna, Identify ise "görüntünün kendisi ne söylüyor?" sorusuna yanıt verir.*

Kullanımı:

```bash
identify -verbose resim1.jpg
```

Kısaltılmış bir çıktı şuna benzer:

```text
Image: resim1.jpg
  Format: JPEG (Joint Photographic Experts Group JFIF format)
  Geometry: 4000x2992+0+0
  Colorspace: sRGB
  Channel statistics:
    Red:   mean: 118.4  standard deviation: 61.2  entropy: 0.94
    Green: mean: 121.0  standard deviation: 58.7  entropy: 0.93
    Blue:  mean: 109.6  standard deviation: 63.1  entropy: 0.92
  Quality: 96
  Sampling factor: 2x2,1x1,1x1
  Interlace: None
  Signature: 9e2f1c…c4a7
```

Bu değerler OSINT açısından da önemlidir: bir fotoğrafın yeniden kaydedildiğini (yeniden sıkıştırıldığını), düzenlendiğini veya yapay zekâ ile üretilmiş olabileceğini çoğu zaman ilk olarak buradaki istatistikler ele verir.

---

## 🕵️ Steganografi ve gizli veriler

Ek olarak `binwalk` ve `strings` gibi araçlarla görüntü dosyası içindeki gömülü metinler veya olası steganografik içerikler aranabilir.  
Örneğin, fotoğrafta **steganografi (gizli veri saklama)** şüphesi varsa `Steghide`, `zsteg` gibi programlarla dosya içinde saklı mesaj olup olmadığına bakılabilir.

---

## ⚖️ Yasal ve etik çerçeve

Bu yöntemler; kendi dijital ayak izinizi denetlemek, siber güvenlik araştırması yapmak, CTF çözmek veya paylaştığınız içeriklerin ne kadar bilgi sızdırdığını görmek gibi meşru amaçlar için son derece değerlidir. Ne var ki aynı teknikler, bir kişiyi rızası dışında takip etmek için de kullanılabilir.

Birinin fotoğraflarından konumunu çıkarıp onu izlemek, taciz etmek veya ifşa etmek çoğu ülkede suçtur ve etik dışıdır. Amaç her zaman **farkındalık ve savunma** olmalı: Kendi fotoğraflarınızı paylaşmadan önce EXIF verilerini temizleyin, konum etiketlerini kapatın ve karede arka planda hangi ipuçlarının göründüğünü bir kez düşünün.

---

Bir fotoğraf yalnızca bir görüntü değildir.  
Doğru araçlar ve analiz yöntemleriyle, geçmişine dair bir **hikâye anlatır** — nerede, ne zaman, nasıl çekildiğini fısıldar.

## Sık sorulan sorular

### Bir fotoğrafın nerede çekildiği nasıl bulunur?

Fotoğrafın EXIF meta verileri, GPS koordinatları, çekim zamanı ve görsel ipuçları incelenerek konum hakkında çıkarım yapılabilir. Sosyal medya platformları çoğu zaman EXIF verilerini sildiği için çevresel ipuçları da önemlidir.

### Sosyal medyadan indirilen fotoğraflarda EXIF bilgisi kalır mı?

Genellikle hayır. Instagram, X, Facebook ve mesajlaşma uygulamaları yüklenen fotoğraflardaki EXIF verilerini çoğu zaman temizler. Bu durumda bina, tabela, bitki örtüsü, gölge ve benzeri görsel ipuçlarıyla analiz yapılır.

### Fotoğraf konum analizi için hangi araçlar kullanılabilir?

ExifTool, Identify, Google Lens, Yandex Vision, Picarta.ai ve benzeri görsel arama veya analiz araçları kullanılabilir. Araçların sonucu tek başına kesin kabul edilmemeli, farklı kaynaklarla doğrulanmalıdır.

### Fotoğraflarımdaki EXIF ve konum bilgisini nasıl temizlerim?

En pratik yöntem, `exiftool -all= dosya.jpg` komutuyla tüm meta verileri tek seferde silmektir. Telefonlarda kamera ayarlarından konum etiketini (geotagging) kapatabilir, paylaşmadan önce ekran görüntüsü alarak da EXIF'i sıfırlayabilirsiniz. Yine de bina, tabela ve manzara gibi görsel ipuçlarının karede kalabileceğini unutmayın.
