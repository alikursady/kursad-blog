---
title: "Fotoğrafın Nerede Çekildiğini Bulmak"
date: 2025-11-06T12:00:00+03:00
draft: false
---

Merhabalar dostlar 👋  
Bu ilk yazım ve ilk yazımda bir fotoğrafın **hangi konumda, hangi koşullarda çekildiğini**, yani bir diğer deyişle **OSINT (Açık Kaynak İstihbaratı)** ve elde edebildiğimiz tüm ayrıntılarını ele alacağım.

---

### 🧭 Fotoğraflar bilgi taşır

Fotoğraf dosyaları; **çekim tarihi, koordinatları, odak uzaklığı, zoom**, hangi cihazla çekildiği, hangi modda çekildiği ve hangi modun açık veya kapalı olduğu gibi bilgiler içerir.  
Örnek vermek gerekirse, telefonlar ve kameralarda yerleşik GPS alıcıları mevcuttur ve fotoğraf çekilirken koordinatları **EXIF meta verisine** ekler.

---

### 🧾 EXIF örneği

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

### 🔒 Sosyal medya ve gizlilik

Ancak bunun da sınırlılıkları mevcuttur.  
Tüm sosyal medya ve mesajlaşma uygulamaları, güvenlik ve gizlilik gerekçesiyle kullanıcıların yüklediği fotoğrafların **EXIF verilerini otomatik olarak temizler** ve konum bilgisini siler.  
Ancak tam olarak gizlilik mümkün değildir — bunun nedenini yazının devamında anlatacağım.

---

### 🧩 Görsel içerikten analiz

Hiçbir dijital veriye dayanmadan sadece **fotoğraf içeriğinden**, çevresel ipuçlarından yararlanarak çıkarımlar da yapılabilir.  
Bina mimarisi, yazı dili, trafik işaretleri, bitki örtüsü veya coğrafi özelliklerden bahsediyorum.  
Gökyüzünün rengi ve güneş açısı dahi bizlere fikir verebilir.

---

### 🤖 Yapay zekâ destekli sistemler

Ayrıca **yapay zekâ tabanlı sistemlerden** yararlanılıp yer belirlenebilir.  
**Geospy**, **Picarta.ai**, **Google Lens** ve **Yandex Vision** benzeri genel amaçlı görsel arama AI sistemleri, fotoğraflardaki nesneleri ve yerleri tanıyıp kullanıcının arama yapmasına olanak tanır.  
Bu tür sistemlerin avantajı kolay ulaşılır olmasıdır.  
Ayrıca burada **Reddit’in WhereIsThis** topluluğunu kullanmanın konumu bulmakta fayda sağlayacağını düşünmekteyim.

---

### 🧰 Analiz araçları

**ExifTool →** “Bu fotoğraf nerede, neyle, ne zaman çekildi?”  
**Identify →** “Bu fotoğrafın içeriği ve yapısı nasıl oluşturulmuş?”

---

### 📊 Görsel İçerik Analizi (Identify’nin Ekstra Verileri)

Identify çıktısında **ExifTool’da olmayan**, doğrudan görüntünün piksel verisinden hesaplanan bilgiler vardır.

- **Channel statistics:** Her renk kanalının (R, G, B) ortalaması, sapması, eğikliği, entropisi — yani fotoğrafın kontrast ve ton dağılımını verir.  
- **Entropy:** Görseldeki bilgi yoğunluğunu ölçer. 0.9 civarı değer, orta karmaşıklıkta doğal sahne demektir.  
- **Mean / Median / Std. Deviation:** Görüntünün genel parlaklığı ve dinamik aralığı hakkında fikir verir.  
- **Gamma, Chromaticity:** Renk profili ve beyaz nokta ayarları (renk doğruluğu için önemli).  
- **Quality:** 96 — JPEG sıkıştırma kalitesi neredeyse maksimum, yani dosya neredeyse kayıpsız.  
- **Signature:** Dosyanın SHA256 benzeri benzersiz dijital parmak izi (değişirse anında tespit edilir).  
- **Rendering intent / Interlace / Sampling factor:** Görüntü tarayıcılar veya yazılımlar tarafından nasıl işleneceğini tanımlar.

🧠 *ExifTool bunları göstermez çünkü EXIF verisinde değil, dosyanın piksel katmanında saklıdır.*  
Kullanımı:   identify -verbose resim2.jpg

---

### 🕵️ Steganografi ve gizli veriler

Ek olarak `binwalk` ve `strings` gibi araçlarla görüntü dosyası içindeki gömülü metinler veya olası steganografik içerikler aranabilir.  
Örneğin, fotoğrafta **steganografi (gizli veri saklama)** şüphesi varsa `Steghide`, `zsteg` gibi programlarla dosya içinde saklı mesaj olup olmadığına bakılabilir.

---

📍 **Sonuç:**  
Bir fotoğraf yalnızca bir görüntü değildir.  
Doğru araçlar ve analiz yöntemleriyle, geçmişine dair bir **hikâye anlatır** — nerede, ne zaman, nasıl çekildiğini fısıldar.