---
title: "Fotoğrafın Nerede Çekildiğini Bulmak: EXIF ve OSINT ile Konum Analizi"
date: 2025-11-07T12:00:00+03:00
lastmod: 2026-06-29T00:00:00+03:00
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

Identify çıktısında **ExifTool’da olmayan**, doğrudan görüntünün piksel verisinden hesaplanan bilgiler vardır.

- **Channel statistics:** Her renk kanalının (R, G, B) ortalaması, sapması, eğikliği, entropisi — yani fotoğrafın kontrast ve ton dağılımını verir.  
- **Entropy:** Görseldeki bilgi yoğunluğunu ölçer. 0'a yakın değerler sade ve düz alanları, 1'e yakın değerler yüksek detay ve karmaşıklığı gösterir; 0.9 civarı bir değer, detay açısından zengin doğal bir sahne demektir.  
- **Mean / Median / Std. Deviation:** Görüntünün genel parlaklığı ve dinamik aralığı hakkında fikir verir.  
- **Gamma, Chromaticity:** Renk profili ve beyaz nokta ayarları (renk doğruluğu için önemli).  
- **Quality:** 96 — JPEG sıkıştırma kalitesi neredeyse maksimum, yani sıkıştırmadan kaynaklanan kayıp oldukça düşük.  
- **Signature:** Dosyanın piksel verisinden üretilen SHA-256 tabanlı benzersiz dijital parmak izi. Tek bir piksel bile değişse imza tamamen değişir; bu sayede görüntü üzerinde oynama yapılıp yapılmadığı anında tespit edilir.  
- **Rendering intent / Interlace / Sampling factor:** Görüntü tarayıcılar veya yazılımlar tarafından nasıl işleneceğini tanımlar.

🧠 *ExifTool bunları göstermez çünkü bu değerler EXIF verisinde saklı değildir; doğrudan görüntünün piksel verisinden hesaplanır.*  
Kullanımı: `identify -verbose resim1.jpg`

---

## 🕵️ Steganografi ve gizli veriler

Ek olarak `binwalk` ve `strings` gibi araçlarla görüntü dosyası içindeki gömülü metinler veya olası steganografik içerikler aranabilir.  
Örneğin, fotoğrafta **steganografi (gizli veri saklama)** şüphesi varsa `Steghide`, `zsteg` gibi programlarla dosya içinde saklı mesaj olup olmadığına bakılabilir.

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
