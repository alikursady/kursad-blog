---
title: "Fotoğrafın Nerede Çekildiğini Bulmak, EXIF ve OSINT ile Konum Analizi"
date: 2025-11-07T12:00:00+03:00
lastmod: 2026-09-21T12:00:00+03:00
draft: false
description: "Bir fotoğrafın nerede çekildiğini EXIF verileri ve GPS koordinatlarıyla nasıl bulabileceğinizi, EXIF silindiğinde karede geriye ne kaldığını anlatıyorum."
summary: "Fotoğraf konum bulma, EXIF meta verileri, GPS koordinatları, görsel ipuçları ve OSINT araçlarıyla bir karenin nerede çekildiğini çıkarmanın adımları."
categories: ["Siber Güvenlik"]
tags: ["OSINT", "EXIF", "siber güvenlik", "fotoğraf analizi"]
keywords: ["fotoğrafın nerede çekildiğini bulmak", "fotoğraf konum bulma", "EXIF analizi", "OSINT", "fotoğraf konum analizi", "EXIF temizleme"]
images: ["/images/resim1.jpg"]
ShowToc: true
TocOpen: false
faqs:
  - question: "Bir fotoğrafın nerede çekildiği nasıl bulunur?"
    answer: "Dosyanın EXIF verisi duruyorsa GPS koordinatı doğrudan orada yazar. exiftool ile okuyup Google Haritalar'a yapıştırmanız yeterli. EXIF silinmişse tabelalar, mimari, bitki örtüsü ve gölgelerin açısı gibi görsel ipuçlarından çıkarım yapılır."
  - question: "Sosyal medyadan indirilen fotoğraflarda EXIF bilgisi kalır mı?"
    answer: "Genelde kalmaz. Instagram, X, Facebook ve mesajlaşma uygulamaları yüklenen görseli yeniden işlerken EXIF bloğunu da temizler. Bu durumda geriye karenin kendisi kalır ve analiz bina, tabela, bitki örtüsü, gölge gibi ipuçları üzerinden yürür."
  - question: "Fotoğraf konum analizi için hangi araçlar kullanılabilir?"
    answer: "Terminalde exiftool ve identify, tarayıcıda exif.tools gibi kurulum gerektirmeyen görüntüleyiciler, görsel arama tarafında ise Google Lens, Yandex Vision ve Picarta.ai işe yarar. Hiçbirinin çıktısını tek başına kesin kabul etmeyin, en az iki ayrı kaynakla doğrulayın."
  - question: "Fotoğraflarımdaki EXIF ve konum bilgisini nasıl temizlerim?"
    answer: "En pratik yol exiftool -all= dosya.jpg komutuyla tüm meta veriyi tek seferde silmek. Telefonlarda kamera ayarlarından konum etiketini kapatabilir, paylaşmadan önce ekran görüntüsü alarak da EXIF'i sıfırlayabilirsiniz. Ama bina, tabela ve manzara karede kalmaya devam eder."
---

Bir fotoğrafın nerede çekildiğini bulmak dışarıdan bakınca dizi işi gibi görünür. Gerçekte çoğu zaman tek satırlık bir komutla biter. Asıl iş, o komut hiçbir şey döndürmediğinde başlar.

Bu ilk yazımda OSINT tarafında en sık sorulan şeylerden birini anlatmak istiyorum, bir fotoğrafın konumunu çıkarmayı. OSINT açık kaynak istihbaratı demek, yani herkese açık verilerden bilgi toplama işi. Önce dosyanın içinde kendiliğinden duran veriye bakacağız, sonra o veri silindiğinde karede geriye ne kaldığına.

## Bir fotoğraf dosyası ne kadar bilgi taşır

JPEG dosyası sadece piksel yığını değil. Çekim tarihi, koordinat, odak uzaklığı, zoom oranı, cihaz modeli, hangi modun açık hangisinin kapalı olduğu gibi onlarca alan görüntünün hemen başında durur. Bu alanların tamamına EXIF deniyor.

Telefonların ve çoğu fotoğraf makinesinin içinde GPS alıcısı var. Konum servisi açıkken deklanşöre bastığınız anda cihaz koordinatı da bu bloğa yazıyor. Kimse size ayrıca sormuyor, çoğu cihazda varsayılan olarak açık geliyor.

## EXIF örneği ve fotoğrafın GPS konumunu bulma

`resim1.jpg` dosyasının EXIF çıktısı şöyle görünüyor.

![Xiaomi Redmi Note 9 ile çekilmiş resim1.jpg fotoğrafının EXIF verileri ve GPS konum bilgisi](/images/resim1.jpg)

Fotoğraf bir Xiaomi Redmi Note 9 ile çekilmiş. Çekim tamamen otomatik modda yapılmış, HDR kapalı bırakılmış.

| Alan | Değer |
|---|---|
| Koordinatlar | 37°33'11.74" N, 36°55'12.27" E |
| Diyafram | f/1.8 |
| Enstantane | 1/428 sn |
| Odak uzaklığı | 4,7 mm (35 mm karşılığı 28 mm) |
| Beyaz dengesi | otomatik |
| Pozlama modu | otomatik |
| Ölçüm modu | merkez ağırlıklı |
| Dijital zoom | 1x |
| HDR | kapalı |
| Çekim zamanı | 13 Aralık 2021, 16.23 (yerel saat) |
| Çözünürlük | 4000 × 2992 piksel |

İlk satır tek başına işi bitiriyor. O koordinatı Google Haritalar'ın arama kutusuna yapıştırdığınızda fotoğrafın çekildiği noktayı harita üzerinde görüyorsunuz. Sokak Görünümü'ne geçip karedeki binayla, ağaçla, yolun kıvrımıyla karşılaştırmak da doğrulamanın en hızlı yolu.

Geri kalan satırlar da boş değil. Enstantane 1/428 saniye ve diyafram f/1.8 ise ortada bol ışık var demektir. Aralık ayında akşamüstü çekilmiş, yani günün son ışığına yetişmiş bir açık hava karesi. Odak uzaklığının 4,7 mm ve dijital zoomun 1x olması da karenin geniş açıyla, hiç yakınlaştırılmadan çekildiğini söylüyor. Yani çerçevede gördüğünüz şey cihazın durduğu yere gerçekten yakın. Tek bir alana bakıp karar vermek yerine alanları birbirine bakarak okumak gerekiyor.

Bu verilere ulaşmak için özel bir yazılım gerekmiyor.

```bash
exiftool resim1.jpg
```

Çıktı uzun olur. Yalnızca konumla ilgileniyorsanız daraltın.

```bash
exiftool -gpslatitude -gpslongitude -gpsposition resim1.jpg
```

Terminalle uğraşmak istemiyorsanız tarayıcıda çalışan araçlar da var. [exif.tools](https://exif.tools/) gibi sitelere fotoğrafı sürükleyip bırakıyorsunuz, kurulum yok. Yalnız hassas bir fotoğrafı tanımadığınız bir siteye yüklemeden önce bir düşünün, o dosya artık sizin makinenizde değil.

## Sosyal medyaya yüklenen fotoğrafta EXIF kalır mı

Büyük ölçüde kalmıyor. Instagram, X, Facebook, WhatsApp, hepsi yüklediğiniz görseli yeniden işliyor ve bu sırada EXIF bloğunu da siliyor. Gerekçe olarak gizliliği gösteriyorlar ve bu doğru bir hamle.

Ama mesele burada bitmiyor. Meta veriyi silmek, fotoğrafın kendisini susturmuyor.

## EXIF silindiğinde görsel ipuçlarıyla konum analizi

Koordinat gitse bile kare yerinde duruyor ve içinde konuşan çok şey var. Bina mimarisi, tabeladaki dil, trafik işaretleri, bitki örtüsü, arazinin şekli. Gökyüzünün rengi ve gölgelerin açısı bile bir yere oturuyor.

Tabelalar ve yazılar genelde en hızlı sonucu veriyor. Dükkân isimleri, sokak levhaları, plakalar, kullanılan alfabe, bunlar ülkeyi ve çoğu zaman şehri daraltıyor. Bir tabeladaki telefon numarasının alan kodu bile tek başına ili verebiliyor.

Mimari ve altyapı daha sessiz ama daha güvenilir. Çatı biçimleri, balkon tipleri, elektrik direklerinin şekli, bariyerler, yol çizgilerinin rengi ülkeden ülkeye gözle görülür biçimde değişir. Tabela değişir, elektrik direği kolay kolay değişmez.

Bitki örtüsü enlem ve mevsim hakkında fikir verir. Kar var mı, ağaçlar yapraklı mı, zeytin mi çam mı, kuraklık izi var mı.

Gölgeler saati ele veriyor. Gölgenin yönü ve uzunluğu, çekimin kabaca hangi saatte yapıldığını gösterir. SunCalc gibi araçlarla belirli bir tarih ve konum için güneşin açısını hesaplayıp karedeki gölgeyle karşılaştırabilirsiniz. Tutuyorsa elinizde ikinci bir doğrulama olur.

Tek bir ipucuyla karar vermeyin. Bu işin mantığı küçük parçaları üst üste koyup birbirine doğrulatmak. Üç ayrı ipucu aynı yeri gösteriyorsa konuşabilirsiniz. Sadece biri gösteriyorsa hâlâ tahmin yapıyorsunuzdur.

## Yapay zekâ destekli görsel arama araçları

Geospy, Picarta.ai, Google Lens ve Yandex Vision gibi araçlar karedeki nesneleri ve yerleri tanıyıp benzer görseller üzerinden tahmin üretiyor. En büyük avantajları erişilebilir olmaları, tarayıcıya fotoğrafı atıp sonucu görüyorsunuz.

Çıktılarına olduğu gibi güvenmemek gerekiyor. Bu araçlar bazen şaşırtıcı isabetle doğru sokağı buluyor, bazen hiç alakasız bir ülkeyi gösteriyor ve ikisini de aynı kendinden emin tonla söylüyor. Verdiği yeri başka bir kaynakla doğrulamadan not almayın.

İnsan gözünün hâlâ öne geçtiği yer de burası. Reddit'teki WhereIsThis topluluğu bu yüzden işe yarıyor. Bir fotoğrafı oraya bırakıp bu işi meraktan yapan yüzlerce göze açmak, çoğu araçtan daha hızlı sonuç verebiliyor.

## ExifTool ve Identify aynı soruyu sormuyor

İki araç arasındaki farkı tek cümleyle söyleyebilirim. ExifTool'a "bu dosya ne diyor?" diye sorarsınız, Identify'a "görüntünün kendisi ne söylüyor?" diye.

ExifTool dosyanın içindeki etiketleri okur. Nerede, neyle, ne zaman çekilmiş. Identify ise etiketlere hiç bakmadan piksellerin kendisini ölçer ve dosyanın nasıl kaydedildiğine dair bilgileri çıkarır. Sosyal medyadan indirilmiş, EXIF'i silinmiş bir fotoğrafta ilk araç susar, ikincisi konuşmaya devam eder.

## Identify'ın gösterdiği, EXIF'te olmayan veriler

Identify çıktısında ExifTool'da hiç göremeyeceğiniz iki tür bilgi var ve hiçbiri EXIF etiketi değil. Bir kısmı doğrudan piksellerden hesaplanıyor, bir kısmı da dosyanın nasıl kodlandığından okunuyor.

Piksellerden hesaplananlar şunlar.

| Alan | Ne söyler |
|---|---|
| Channel statistics | Her renk kanalının (R, G, B) ortalaması, standart sapması, çarpıklığı ve entropisi. Görüntünün kontrastı ve ton dağılımı hakkında fikir verir |
| Entropy | Bilgi yoğunluğunu ölçer. 0'a yakın değerler düz ve sade alanları, 1'e yakın değerler yüksek detayı gösterir. 0,9 civarı bir değer detay açısından zengin doğal bir sahne demektir |
| Mean, median, standard deviation | Görüntünün genel parlaklığı ve dinamik aralığı |
| Signature | Piksel verisinden üretilen SHA-256 tabanlı parmak izi. Tek bir piksel değişse imza tamamen değişir, dosyanın üzerinde oynanıp oynanmadığını anlamanın en hızlı yolu budur |

Dosyanın yapısından okunanlar da bunlar.

| Alan | Ne söyler |
|---|---|
| Quality | JPEG'in niceleme tablolarından tahmin edilen sıkıştırma kalitesi. Örnekte 96 çıkıyor, yani görece az sıkıştırılmış bir dosya |
| Sampling factor, interlace | Renk alt örneklemesi ve satır tarama biçimi |
| Gamma, chromaticity, rendering intent | Renk profili, gama eğrisi, beyaz nokta ve renklerin farklı ekranlarda nasıl eşleneceği |

Kullanımı basit.

```bash
identify -verbose resim1.jpg
```

Kısaltılmış çıktı şuna benziyor.

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

Bu değerler OSINT tarafında da işe yarıyor. Bir fotoğrafın yeniden kaydedildiğini, düzenlendiğini ya da üretilmiş olabileceğini çoğu zaman ilk ele veren şey buradaki istatistikler oluyor. Orijinal olduğu söylenen bir karede quality değerinin beklenenden düşük çıkması, dosyanın en az bir kez daha kaydedildiğini gösterir.

## Steganografi ve gömülü veriler

Bazı dosyalarda görüntünün dışında da bir şeyler oluyor. `strings` ve `binwalk` ile dosyanın içine gömülmüş metinleri veya başka dosyaları arayabilirsiniz. CTF çözerken bu neredeyse refleks hâline geliyor.

Gizlenmiş veri şüphesi varsa `steghide` ve `zsteg` devreye giriyor. İlki JPEG ve BMP tarafında parola korumalı gömülü içeriği çıkarmaya çalışıyor, ikincisi PNG ve BMP dosyalarındaki LSB tekniklerini tarıyor. Sonuç çıkmaması içeride bir şey olmadığı anlamına gelmiyor, sadece bu araçların baktığı yerlerde olmadığı anlamına geliyor.

## Nerede durmak gerekiyor

Buraya kadar anlattıklarım kendi dijital ayak izinizi denetlemek, güvenlik araştırması yapmak, CTF çözmek veya paylaştığınız bir içeriğin ne kadar bilgi sızdırdığını görmek için değerli. Aynı teknikler bir kişiyi rızası dışında takip etmek için de kullanılabiliyor ve aradaki fark ince bir çizgi değil, kalın bir duvar.

Birinin fotoğraflarından konumunu çıkarıp o kişiyi izlemek, taciz etmek veya ifşa etmek çoğu ülkede suç. Amaç farkındalık ve savunma olmalı. Kendi fotoğraflarınızı paylaşmadan önce EXIF'i temizleyin, kameranın konum etiketini kapatın ve karede arka planda ne göründüğüne bir kez bakın.

Temizlemek için tek komut yeterli.

```bash
exiftool -all= dosya.jpg
```

Bu yazıdan tek bir şey alacaksanız şu olsun. Paylaşmadan önce kendi fotoğrafınıza bir kez `exiftool` çalıştırın. Ne kadarını gönüllü olarak verdiğinizi görmek, buradaki cümlelerin hepsinden daha ikna edici olacaktır.

## Sık sorulan sorular

### Bir fotoğrafın nerede çekildiği nasıl bulunur?

Dosyanın EXIF verisi duruyorsa GPS koordinatı doğrudan orada yazar. `exiftool` ile okuyup Google Haritalar'a yapıştırmanız yeterli. EXIF silinmişse tabelalar, mimari, bitki örtüsü ve gölgelerin açısı gibi görsel ipuçlarından çıkarım yapılır.

### Sosyal medyadan indirilen fotoğraflarda EXIF bilgisi kalır mı?

Genelde kalmaz. Instagram, X, Facebook ve mesajlaşma uygulamaları yüklenen görseli yeniden işlerken EXIF bloğunu da temizler. Bu durumda geriye karenin kendisi kalır ve analiz bina, tabela, bitki örtüsü, gölge gibi ipuçları üzerinden yürür.

### Fotoğraf konum analizi için hangi araçlar kullanılabilir?

Terminalde `exiftool` ve `identify`, tarayıcıda exif.tools gibi kurulum gerektirmeyen görüntüleyiciler, görsel arama tarafında ise Google Lens, Yandex Vision ve Picarta.ai işe yarar. Hiçbirinin çıktısını tek başına kesin kabul etmeyin, en az iki ayrı kaynakla doğrulayın.

### Fotoğraflarımdaki EXIF ve konum bilgisini nasıl temizlerim?

En pratik yol, `exiftool -all= dosya.jpg` komutuyla tüm meta veriyi tek seferde silmek. Telefonlarda kamera ayarlarından konum etiketini kapatabilir, paylaşmadan önce ekran görüntüsü alarak da EXIF'i sıfırlayabilirsiniz. Ama bina, tabela ve manzara karede kalmaya devam eder.
