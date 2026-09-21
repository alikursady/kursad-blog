---
title: "Kılavuzdan Diş Frezesine CNC Kesici Takımlar"
date: 2026-09-21T12:00:00+03:00
lastmod: 2026-09-21T12:00:00+03:00
draft: false
description: "CNC talaşlı imalatta kullanılan kılavuz, freze, matkap, rayba ve tutucuların ne işe yaradığını, hangi malzemede hangisinin seçildiğini ve takımhanede nasıl kodlanacağını en baştan anlattım."
summary: "Kılavuz tipleri, parmak ve küresel freze, matkap ve punta, rayba, ER pens. Ağız sayısı, helis açısı, tolerans ve takım kodlaması hiçbir terim bilinmiyor varsayılarak."
categories: ["İmalat"]
tags: ["CNC", "talaşlı imalat", "kesici takım", "kılavuz", "freze", "matkap", "rayba", "takımhane"]
keywords: ["cnc kesici takımlar", "kılavuz çeşitleri", "parmak freze ağız sayısı", "kör delik kılavuz", "spiral point kılavuz", "rayba nedir", "ER pens tablosu", "takım kodlama sistemi", "helicoil kılavuz"]
images: ["/images/takim/freze-cesitleri.jpg"]
ShowToc: true
TocOpen: false
faqs:
  - question: "Kör delikte hangi kılavuz kullanılır?"
    answer: "Spiral kanallı, yani helis kanallı kılavuz kullanılır. Kanalları sarmal olduğu için talaşı geriye, kılavuzun girdiği yönden dışarı taşır. Kör delikte talaşın gidecek başka yolu yoktur. Düz kanallı kılavuz kullanırsanız talaş dipte sıkışır ve kılavuz kırılır."
  - question: "Kılavuz öncesi matkap çapı nasıl hesaplanır?"
    answer: "Metrik dişlerde ana çaptan hatveyi çıkarmak yeterli. M6x1.0 için 6 eksi 1 yani 5,0 mm. M8x1.25 için 6,8 mm, M10x1.5 için 8,5 mm. Bu hesap yaklaşık yüzde 75 diş dolgusu verir. Paslanmaz ve titanyum gibi zor malzemelerde deliği biraz büyük açıp dolguyu yüzde 60 ile 70 arasına düşürmek kılavuz ömrünü uzatır."
  - question: "Alüminyumda neden az ağızlı freze kullanılıyor?"
    answer: "Alüminyum yumuşak ve yapışkan bir talaş verir. Ağız sayısı azaldıkça ağızlar arasındaki boşluk büyür, talaş rahat çıkar ve takıma yapışmaz. Çelikte talaş kısa ve sert olduğu için boşluğa değil, yükü daha çok ağza bölmeye ihtiyaç duyulur. Bu yüzden dört ve üzeri ağızlı takımlar tercih edilir."
  - question: "Rayba ne işe yarar, matkaptan farkı nedir?"
    answer: "Matkap deliği açar, rayba açılmış deliği son ölçüsüne getirir. Raybanın işi malzeme kaldırmak değil, çapı ve yüzeyi düzeltmek. Çapın yüzde iki üç kadarı kadar paso bırakılır. Önemli bir sınırı var, rayba deliğin yerini düzeltmez, mevcut deliği takip eder. Delik yanlış yerdeyse rayba onu yerine getirmez."
  - question: "ER pens numarası ne anlama geliyor?"
    answer: "Numara pensin dış çapını mm olarak verir. ER32 pensin dış çapı 32 mm demektir. Her pens 1 mm daralma aralığına sahiptir, yani ER32 10-9 yazan bir pens 9 ile 10 mm arası sap çaplarını tutar. Tek bir pens her takımı tutmaz, sap çapına uygun olanı seçmek gerekir."
---

Bir atölyede en çok kırılan takım kılavuzdur. Kırılma sebebi de çoğu zaman aynıdır, kör deliğe delik boyu kılavuzu girmiştir. O iki kılavuz rafta yan yana durur ve dışarıdan bakınca ikisi de birbirinin aynısı görünür.

Burada talaşlı imalatta kullanılan kesici takımları sırayla anlattım. Kılavuz, freze, matkap, rayba ve tutucular. Hiçbir terimi bildiğinizi varsaymadım, geçtiği yerde hepsini kısaca açıkladım.

## Önce birkaç kelime

Aşağıdaki kelimeler yazı boyunca sürekli geçiyor. Hepsi kolay şeyler ama bilinmeyince cümleler havada kalıyor.

Talaş, kesici takımın parçadan kopardığı metal parçası. Tezgahın tablasına dolan kıvrım kıvrım şeyler. Kesme işi aslında talaş üretme işi ve bir takımın iyi çalışıp çalışmadığı büyük ölçüde o talaşı ortadan kaldırabilmesine bağlı. Talaş çıkamadığı yerde birikir, ısınır, sıkışır ve takımı kırar. Bu yazının yarısı bu cümlenin etrafında dönüyor.

Ağız, takımın kesen kenarı. Bir frezenin kaç ağzı olduğu Z harfiyle yazılır. Z2 iki ağızlı, Z4 dört ağızlı demek. Ağızların arasında kalan boşluğa talaş cebi deniyor, talaş oradan dışarı atılıyor.

Helis, takımın gövdesine sarmal biçimde açılmış oluk. Bir vidanın dişinin gövdeye dolanması gibi düşünün. Bu oluğun ne kadar yatık olduğuna helis açısı deniyor. Oluk ne kadar eğimliyse talaş o kadar hızlı yukarı, yani takımın sapına doğru tırmanır. Düz kanallı takımda böyle bir sarmal yok, o yüzden talaş yukarı çıkmaz.

![Üç farklı boyda düz kanallı metrik kılavuz](/images/takim/kilavuz-takimlari.jpg)

Kör delik, dibi kapalı olan delik. Delik boyu ise parçanın bir yüzünden girip öbür yüzünden çıkan delik. Talaşın nereye gideceğini belirlediği için bu ayrım hemen her takım seçiminde karşınıza çıkıyor.

Hatve, vida dişlerinin arasındaki mesafe. M8x1.25 yazan bir vidada hatve 1,25 mm, yani vida her tam turda 1,25 mm ilerliyor.

Paso, takımın bir geçişte kaldırdığı malzeme. Tolerans ise bir ölçünün ne kadar sapabileceği. H7 gibi kodlar delikler için belirlenmiş standart aralıkları gösteriyor. Ø10 H7 bir delik, 10,000 ile 10,015 mm arasında kalmalı demek.

Salgı, İngilizcesiyle runout, takım tezgaha takılıp döndüğünde merkezinden ne kadar kaçtığı. Mikron mertebesinde ölçülüyor ve takım ömrünü doğrudan etkiliyor.

Rijit, yük altında esnemeyen demek. Bir tezgaha rijit denmesi, gövdesinin ve millerinin kesme kuvveti altında kıpırdamadığı anlamına geliyor. Konik ise koni biçiminde, bir uca doğru incelen demek.

HSS, İngilizce High Speed Steel'in kısaltması, Türkçesi yüksek hız çeliği. Bu isim icat edildiği döneme ait; o güne kadarki takım çeliklerinden çok daha hızlı kesebildiği için böyle anılmış. Ucuzdur, kırılmaya karşı esnektir ve körelince tekrar bilenebilir. Karbür ise tungsten karbür tozunun preslenip fırınlanmasıyla yapılan çok sert bir malzeme. HSS'ten kat kat hızlı çalışır ama cam gibi kırılgandır, sağlam tezgah ve düzgün bağlama ister.

Kaplama, takımın üstüne fabrikada geçirilen çok ince bir sertlik tabakası. Gözle görülen tek farkı rengi.

![Kaplamalı ve kaplamasız karbür kesici uçlar](/images/takim/kaplamali-uclar.jpg)

Fotoğraftaki üç uç da karbür ama renkleri birbirini tutmuyor. Soldaki koyu gri, ortadaki bronz tonlu, sağdaki ise altın sarısı TiN kaplamayla kaplanmış. Sağdaki ucun yan yüzündeki gri şerit, kaplamanın taşlanıp kaldırıldığı yer. Karbürün kendi rengi işte o gri. Kaplamaların adı içindeki maddelerin simgelerinden geliyor. TiN'deki Ti titanyum, N azot demek. AlTiN ve TiAlN de aynı mantıkla alüminyum, titanyum ve azottan oluşuyor. Bu ikisi yüksek sıcaklığa dayandığı için çelik işleyen takımlarda kullanılıyor. ZrN'deki Zr ise zirkonyum, o kaplama daha çok alüminyumda yapışmayı azaltmak için tercih ediliyor.

ERP, işletmenin stok, sipariş, üretim ve muhasebe kayıtlarını tek bir yazılımda toplayan sistem. Açılımı Enterprise Resource Planning, Türkçesi kurumsal kaynak planlaması. Takımhane açısından anlamı şu. Hangi takımdan kaç tane var, hangi işte kullanılıyor, ne zaman bitecek, bunların cevabı orada tutulur.

Bir de üç kısaltma var. Kesme hızı Vc, takımın kesme noktasındaki hızı, dakikada metre olarak yazılır. Diş başına ilerleme fz, her bir ağzın bir turda kaç mm ilerlediği. İkisini birleştiren formül de şöyle.

```text
Vf = n x fz x Z
```

Buradaki n devir sayısı, Z ağız sayısı, Vf ise tezgaha verdiğiniz dakikadaki ilerleme. Ağız sayısını artırdığınızda ilerlemenin de artması bu yüzden.

## Kılavuzlar

Kılavuz, açılmış bir deliğin içine vida dişi kesen takım. Parçanın kendisini somun haline getiriyor diyebiliriz.

### Kanal tipini delik tipi belirler

Kılavuz seçerken sorulacak ilk soru, deliğin dibinin kapalı olup olmadığı.

Spiral kanallı kılavuz, yani helis kanallı olan, kör delikler için. Kanallar sarmal olduğundan talaşı geriye ve yukarı, kılavuzun girdiği yönden dışarı taşıyor. Kör delikte talaşın gidecek başka yolu yok.

![Spiral point kılavuzun ucundaki öne eğimli taşlama](/images/takim/spiral-point-kilavuz.jpg)

Spiral point kılavuzun kanalları düz. Ama fotoğrafta görüldüğü gibi ucunda öne doğru eğimli bir taşlama var ve o eğim talaşı geri değil ileri, deliğin dibinden dışarı itiyor. Gövdesi daha kalın olduğu için dayanıklı, yüksek devirde rahat çalışıyor. Atölyede gun tap diye de anılıyor. Kör delikte kullanırsanız ittiği talaş dipte birikir ve kılavuz kırılır.

Düz kanallı standart kılavuz kısa talaş veren malzemelerde, mesela dökme demirde işe yarar. Hangisini alacağınızdan emin değilseniz spiral kanallı kılavuz her iki delikte de çalışır.

### Kılavuz öncesi delik çapı

Kılavuz boş deliğe diş açar, o yüzden deliğin doğru çapta olması gerekiyor. Metrik dişlerde hesap kolay, ana çaptan hatveyi çıkarıyorsunuz.

| Diş | Matkap çapı | Hesap |
|---|---|---|
| M4x0.7 | 3,3 mm | 4 - 0,7 |
| M5x0.8 | 4,2 mm | 5 - 0,8 |
| M6x1.0 | 5,0 mm | 6 - 1,0 |
| M8x1.25 | 6,8 mm | 8 - 1,25 |
| M10x1.5 | 8,5 mm | 10 - 1,5 |
| M12x1.75 | 10,2 mm | 12 - 1,75 |

Bu hesap yaklaşık yüzde 75 diş dolgusu verir, yani dişin teorik derinliğinin dörtte üçü kesilir. Tam derinlikte diş açmak mukavemete sadece yüzde 5 ile 10 arası katkı yapar ama yaklaşık üç kat tork ister ve kılavuzu hızla bitirir. Paslanmaz, titanyum ve sertleştirilmiş çelik gibi zor malzemelerde deliği biraz büyük açıp dolguyu yüzde 60 ile 70 arasına indirmek kırılmaları gözle görülür biçimde azaltıyor. Alüminyum ve pirinçte yüzde 75 rahatça kullanılabilir.

### Kılavuzun üstündeki tolerans işareti

Kılavuzun gövdesinde ISO2 ya da 6H gibi bir işaret görürsünüz. Bu, açacağı dişin tolerans sınıfı.

6H normal geçmedir, en yaygın kullanılan sınıf. 6G daha gevşek geçme sağlar; parçaya kaplama yapılacaksa kaplama kalınlığına yer bırakmak için tercih edilir. Aşındırıcı malzemelerde ve talaşsız kılavuzlarda 6HX ya da 6GX gibi daha geniş toleranslı sınıflar kullanılıyor.

Kutunun üstündeki DIN numaraları ise sapın kalınlığıyla ilgili. DIN 371 kalın saplı makine kılavuzu, pratikte M10 ve altında yaygın. DIN 376 ince saplı, genelde M12 ve üzeri için. DIN 374 de ince hatveli dişlerde, mesela M8x1.0 gibi bir dişte kullanılıyor.

### Helicoil kılavuzu

Helicoil, alüminyum gibi yumuşak malzemede açılan dişin zamanla sıyrılmasını önlemek için deliğe yerleştirilen yaylı tel takviye. Bu telin gireceği delik normal dişten büyük olmak zorunda, çünkü telin kendi kalınlığı da yer kaplıyor.

Bu yüzden Helicoil takılacak deliğe normal kılavuz değil, STI kılavuzu çekilir. STI, screw thread insert kısaltması, yani vida dişi takviyesi demek. M6 Helicoil için M6 kılavuz kullanamazsınız, M6 STI kılavuzu gerekir ve öncesinde açılacak delik de yaklaşık 6,3 mm olur. Takviye boyları çapın katı olarak verilir, 1D, 1.5D, 2D gibi. Alüminyumda genelde 2D tercih ediliyor.

Kesin çap değerleri üreticiye ve ana malzemeye göre biraz oynuyor, o yüzden takviyeyi aldığınız firmanın kendi tablosuna bakmakta fayda var.

### Talaşsız kılavuz ve diğerleri

Talaşsız kılavuz diş kesmiyor. Malzemeyi soğuk şekillendirerek dişi bastırıyor, yani metali kesip almak yerine ittirip yerine oturtuyor. Hiç talaş üretmediği için kör delikte büyük avantaj sağlıyor, daha pürüzsüz ve daha sağlam bir diş veriyor, daha uzun ömürlü. Buna karşılık yüksek tork istiyor ve kırılgan malzemede kullanılamıyor. Alüminyum, bakır ve yumuşak çelikte ilk tercih.

NPT ve BSP boru kılavuzları konik diş açar, sızdırmazlık gereken bağlantılarda kullanılır. Bir de sol diş kılavuzlar var, tezgahta G74 çevrimiyle çekiliyorlar. Normal diş için G84 kullanılıyor.

### Kılavuz çekerken ilerleme

Kılavuzda ilerleme değeri tartışmaya açık değil, diş adımının kendisi. M8x1.25 çekiyorsanız kılavuz her turda tam 1,25 mm ilerlemek zorunda. Rijit kılavuz çekme modunda tezgah mil devriyle Z ilerlemesini senkron tutuyor. Bunu yapamayan tezgahlarda kompanzasyonlu, yani yüzer kılavuz tutucu kullanılır. Tutucunun aşağı yukarı birkaç milimetre oynayabilmesi küçük farkları toparlayıp dişin bozulmasını engelliyor.

## Frezeler

### Parmak freze

En çok kullanılan takım. Yanal ve alından kesebilir, kanal açar, cep boşaltır, kontur işler.

![Parmak frezenin sapı, kanalı, ağzı ve helis açısı](/images/takim/parmak-freze-anatomi.png)

Görseldeki shank sap, yani tezgaha bağlanan düz kısım. Flute kanal, talaşın çıktığı oluk. Tooth ağız, yani kesen kenar. Helix angle da helis açısı. Bir parmak frezeyi tarif ederken kullanacağınız ölçüler de bunların üzerinden gidiyor. Sap çapı, kesme çapı, kesici boy, toplam boy ve ağız sayısı.

### Alüminyum frezesiyle çelik frezesi neden ayrı

Atölyelerde en çok karıştırılan konu bu. İki takım dışarıdan benzer görünür ama tamamen farklı işler için tasarlanmıştır.

![İki ağızlı, dört ağızlı ve küresel uçlu frezeler yan yana](/images/takim/freze-cesitleri.jpg)

Fotoğraftaki üç takıma yukarıdan bakınca fark net. Soldaki iki ağızlı, ortadaki dört ağızlı, sağdaki ise ucu yuvarlak olan küresel freze.

| Özellik | Alüminyum frezesi | Çelik frezesi |
|---|---|---|
| Ağız sayısı | 2 veya 3 | 4 ve üzeri |
| Helis açısı | 35 ile 45 derece | 30 ile 45 derece |
| Talaş cebi | Geniş | Dar, gövde sağlamlığı önce gelir |
| Kanal yüzeyi | Polisajlı | Standart |
| Kaplama | Kaplamasız ya da ZrN | AlTiN veya TiAlN |
| Asıl sorun | Yapışma | Isı ve aşınma |

Alüminyum düşük sıcaklıkta yumuşayıp eriyen bir metal. Kesme sırasında oluşan sürtünme ısısı talaşın kesici kenara yapışmasına yol açıyor, buna yığma talaş deniyor. Yapışan malzeme hem parçanın yüzeyini bozuyor hem takımı körleştiriyor. Çözüm de talaşı hiç bekletmemekten geçiyor. Az ağız, geniş boşluk, keskin ve aynalı kanal. Aynalı derken kanalın iç yüzeyinin parlatıldığını kastediyorum, pürüzsüz yüzeye talaş tutunamıyor. Alüminyum için yapılmış takımlarda çoğu zaman kaplama bile yoktur, çünkü kaplama kenarı bir miktar körleştirir.

Çelikte problem tam tersi. Talaş kısa ve sert, asıl düşman ısı ve aşınma. Burada ağız sayısını artırmak işe yarıyor. Her ağza düşen yük azalıyor, titreşim düşüyor, yüzey düzeliyor. Üstüne de ısıya dayanıklı AlTiN gibi bir kaplama ekleniyor.

Yani Z2 ile Z3 arası alüminyum, Z4 ve üzeri çelik demek. Bu sadece alışkanlık değil, talaşın tahliyesi ve kesme kuvvetinin dağılımıyla ilgili bir tercih.

### Küresel uçlu freze

Ucu yarım küre biçiminde olan freze. Kalıpçılıkta, üç boyutlu yüzeylerde ve kontur bitirmede kullanılıyor. Düz bir yüzeyi düzgün işleyemez, o iş parmak frezenin.

Burada bir devir hesabı tuzağı var. Kesme derinliği top yarıçapından küçükse takım, üstünde yazan çapla kesmiyor. Sadece ucunun küçük bir bölgesi malzemeye değdiği için o an gerçekten kesen çap daha küçük. Devri takımın üstünde yazan çaptan hesaplarsanız gerçek kesme hızınız hedefin çok altında kalıyor. Sığ pasolarda aradaki fark yüzde kırka kadar çıkabiliyor.

Bir de küresel takım yüzeyde küçük tarak izleri bırakır. Yan yana iki paso arasındaki mesafeyi azalttıkça bu izler küçülür. Bitirme pasolarında yan adım genelde çapın yüzde 5 ile 15'i arasında tutuluyor. Yüzde 20'yi geçtikten sonra yüzey belirgin şekilde bozulmaya başlıyor.

### Köşe radyüslü freze

Düz köşeli parmak frezenin köşesine küçük bir yuvarlaklık eklenmiş hali. R0.5 ya da R1 gibi.

Keskin köşe, kesme kuvvetinin tek bir noktada yığıldığı yerdir ve takımlar genellikle oradan kırılır. Radyüs bu yükü daha geniş bir yaya yayıyor, kenar da çok daha dayanıklı oluyor. Zor malzemelerde ve takımın parça içinde sürekli dairesel hareketle ilerlediği stratejilerde neredeyse standart hale geldi.

### Mikro freze

Genelde Ø3 mm altındaki takımlara deniyor ve kendine has kuralları var.

En önemlisi salgı. Büyük bir takımda 10 mikron salgı tolere edilirken mikro takımda aynı değer bir ağza düşen yükü katlayıp takımı anında kırıyor. Toplam sistem salgısının 3 ile 5 mikron altında kalması gerekiyor, bu da standart ER pensle çoğu zaman mümkün olmuyor. Sıcak geçme ya da hidrolik tutucu şart.

Devirler yüksek. Ø0.5 mm altı için 20.000 ile 50.000 devir tipik, Ø0.2 mm altında 60.000 devri geçiyor. Diş başına ilerleme çok düşük, 0,002 ile 0,005 mm arası. Bir de şu var. Talaş kalınlığı kesici kenarın yuvarlaklığından inceyse takım kesmiyor, malzemeyi ezip sürtüyor. Bu hem yüzeyi bozuyor hem takımı bitiriyor.

### Tarama frezesi

Yüzey almak için kullanılan, değiştirilebilir uçlu büyük çaplı kafa.

![Değiştirilebilir uçlu tarama frezesi kafası](/images/takim/tarama-freze.png)

Gövde aşınmıyor, aşınan sadece kenarlara vidalanmış küçük uçlar. Uç körelince sökülüp döndürülüyor ya da yenisi takılıyor, pahalı gövde yerinde kalıyor.

Alüminyumda elmas ya da yüzeyi parlatılmış keskin uçlar, çelikte kaplamalı karbür uçlar kullanılır. Uçların parçaya giriş açısı da önemli. 45 derece dengelidir ve titreşimi düşük tutar, 90 derece dik duvar bırakır, yuvarlak uçlar ise yüksek ilerleme içindir.

Kafa çapı, işlenen yüzeyin genişliğinin 1,25 ile 1,5 katı olsun ve kafayı parçanın tam ortasına değil biraz kaçık konumlandırın. Bu, ucun parçadan çıkarken aldığı darbeyi ve çıkıştaki çapağı azaltıyor.

### Diş frezesi

Kılavuza alternatif bir yöntem. Takım deliğin içinde daire çizerken aynı anda aşağı iniyor ve bu hareketle dişi kesiyor.

Kılavuza göre üstün olduğu yerler var. En önemlisi kırıldığında deliği bozmaması. Kopan parça küçük bir karbür parçasıdır, kolayca çıkar. Pahalı bir titanyum parçanın içinde kırılan kılavuz çoğu zaman parçayı hurdaya çıkarır, diş frezesinde böyle bir risk yok. Ayrıca aynı hatveye sahip farklı çaplarda tek takımla çalışabiliyorsunuz ve kör delikte dişi dibe kadar indirebiliyorsunuz.

Buna karşılık programlaması karmaşık, tezgahın rijitliğine ve salgıya duyarlı. Yumuşak malzemede yüksek adetli işlerde kılavuz hâlâ üç beş kat hızlı.

### Kanal testeresi

İnce kanal açmak ve parça kesmek için kullanılan disk biçimli takım.

![Farklı kalınlıklarda HSS kanal testeresi](/images/takim/kanal-testeresi.jpg)

Fotoğraftaki testerelerin üzerinde yazan 20x2.0x5 gibi değerler sırasıyla dış çap, kalınlık ve ortadaki delik çapı. Seçerken işin izin verdiği en kalın ve en küçük çaplı testereyi alın. İnce ve büyük çaplı testere esner, titrer ve kapar. Kaptığında da sert kapar.

Alüminyumda ayrıca dikkat gerekiyor. Kanalın içinde ısınan malzeme genleşip testereyi sıkıştırabiliyor, bol soğutma şart.

## Matkaplar

### Punta

Matkap parçaya ilk değdiği anda kaymaya, yani yürümeye meyillidir. Bunu önlemek için önce küçük bir merkez izi açılır ve bu işe punta deniyor.

![Farklı boylarda DIN 333 punta matkapları](/images/takim/punta-matkap.jpg)

Burada sık karıştırılan iki ayrı takım var. Fotoğraftaki DIN 333 punta matkapları 60 derecelik konik yuva açar ve asıl işleri torna puntasının oturacağı yuvayı hazırlamaktır. CNC'de matkaba yol açmak için kullanılan NC punta ise farklı bir takım ve uç açısı 90, 120 ya da 142 derece olur.

Aradaki kuralı aklınızda tutun. Punta ucunun açısı, ardından gelecek matkabın uç açısından geniş olmalı. Böylece matkap deliğe önce tam merkezinden değer. Dar açılı bir punta izine geniş açılı matkap girerse matkabın kenarları merkezinden önce temas eder, takım sapar ya da kırılır. 60 derecelik torna puntası bu yüzden CNC'de merkezleme için uygun değil.

### HSS mi karbür mü

![Morse koniği saplı HSS matkap](/images/takim/matkap-morse.jpg)

| | HSS matkap | Karbür matkap |
|---|---|---|
| Çelikte kesme hızı | 20 ile 30 m/dak | 80 ile 150 m/dak |
| Delik hassasiyeti | Orta | Yüksek |
| Tezgah beklentisi | Toleranslı | Rijit tezgah, iyi soğutma |
| Maliyet | Ucuz | Pahalı |
| Bileme | Kolay | Zor, elmas taş gerekir |

Arada bir sınıf daha var, HSS-Co. Sondaki Co kobalt demek, yani çeliğin içine kobalt karıştırılmış. Kobaltın yaptığı iş şu. Kesme sırasında takımın ucu kızarır, sıradan çelik o sıcaklıkta yavaş yavaş yumuşar ve körelir. Kobalt bu yumuşamayı geciktiriyor, takım sertliğini daha uzun süre koruyor. Paslanmaz ve sert alaşımlarda düz HSS'ten gözle görülür biçimde iyi sonuç veriyor, fiyatı da karbürün çok altında.

Uç açısına gelince, 118 derece genel amaçlı kabul edilir. 135 derece kendinden merkezlemelidir, sert çelikte ve derin deliklerde tercih edilir ve çoğu zaman ayrıca punta atmanıza gerek kalmaz. Karbür matkaplarda 140 derece yaygın.

### Derin delikler

Matkabın delebileceği derinlik, çapının katı olarak yazılır. 3xD, 5xD, 8xD, 12xD gibi. Ø10 bir matkapta 5xD, 50 mm derinlik demek.

![İçten soğutma delikleri olan karbür matkabın ucu](/images/takim/icten-sogutma.jpg)

Derinlik arttıkça talaşı dışarı çıkarmak zorlaşıyor. Bunun için iki yöntem var. Gagalama, matkabı belli aralıklarla geri çekip talaşı boşaltmak. İçten soğutma ise fotoğrafta görülen o iki küçük delikten soğutma sıvısını doğrudan kesme noktasına basmak. Sıvı hem soğutuyor hem talaşı yukarı süpürüyor. 5xD üzerinde içten soğutma neredeyse zorunlu.

### U-Drill

Büyük çaplı deliklerde masif matkap yerine kullanılan, değiştirilebilir uçlu matkap. Sertleştirilmiş çelik bir gövdeye genelde iki adet karbür uç vidalanıyor, biri merkezi, diğeri çevreyi kesiyor.

Mantığı tarama frezesindekiyle aynı. Aşınan ucu değiştiriyorsunuz, pahalı gövde yerinde kalıyor. Ø12 mm üzerinde ekonomik hale geliyor, Ø16 üzerinde açık ara avantajlı. Masif matkaptan iki üç kat hızlı deliyor.

Birkaç şartı var. İçten yüksek basınçlı soğutma zorunlu, susuz çalıştırırsanız takımı bozarsınız. Delik hassasiyeti masif karbür kadar iyi değil, çap toleransı 0,25 mm civarında kalıyor. Genelde 3xD'yi geçmiyor ve deliğin dibini düz bırakıyor. Kesme kuvveti de dengesiz olduğu için tezgahtan hem güç hem rijitlik istiyor.

Hassas bir delik gerekiyorsa doğru sıra şöyle. U-Drill ile kaba delip ardından rayba ya da bara çekmek. Bara, deliğin içine sokulup tek ağızla çevresini kazıyarak çapı büyüten takım; hem ölçüyü hem deliğin yerini düzeltebiliyor.

## Rayba

Rayba, önceden delinmiş bir deliği son ölçüsüne getiren bitirme takımı.

![Morse koniği saplı helis kanallı makine raybası](/images/takim/rayba-makine.jpg)

İşi malzeme kaldırmak değil, çapı ve yüzeyi düzeltmek. Ø10 H7 bir rayba deliği 10,000 ile 10,015 mm aralığına getirir ve yüzeyi matkabın bırakacağından çok daha pürüzsüz olur.

Önemli bir sınırı var ve atölyede sık sık unutuluyor. Rayba deliğin konumunu düzeltmez, mevcut deliği takip eder. Delik yanlış yerdeyse rayba onu doğru yere taşımaz, sadece yanlış yerdeki deliği güzelleştirir. Konum hassasiyeti isteniyorsa önce düzgün puntalama, gerekirse bara çekmek gerekiyor.

Rayba için bırakılacak paso genel olarak çapın yüzde 2 ile 3'ü kadar. Küçük çaplarda 0,1 ile 0,2 mm, büyük çaplarda 0,3 ile 0,5 mm. Ø10 H7 bir delik için Ø9,8 matkapla delmek uygun. Az paso bırakırsanız rayba kesmez, sürter ve körelir. Çok paso bırakırsanız zorlanır ve çap büyür.

Çalışma şekli de kendine has. Düşük devir ve yüksek ilerleme ister, devir genelde delme hızının yarısı civarında tutulur. Bir de asla geri döndürülmez. Mil ters yöne dönerken rayba çıkarılırsa kesici kenarlar yeni açılmış yüzeye sürtünür ve takım bozulur. Mil ileri dönerken, bol soğutmayla çıkarmak gerekiyor.

Rayba tarafında hem takım malzemesi hem işlenen malzeme ayrımı yapılıyor. HSS rayba genel işler için, HSS-Co paslanmaz ve sert alaşımlar için, masif karbür rayba ise uzun ömür ve yüksek aşınma direnci gereken seri işler için. Stok kartında bu ikisini karıştırmamak önemli, çünkü aynı harfle iki ayrı şey kastedilebiliyor.

## Tutucular

Takım ne kadar iyi olursa olsun tezgaha nasıl bağlandığı sonucu doğrudan etkiliyor.

### ER pens

En yaygın sistem. Konik ve yarıklı bir kovan, takımın sapını çepeçevre sıkıyor.

![ER32 pens, üzerinde 10-9 sıkma aralığı yazıyor](/images/takim/er-pens.jpg)

Fotoğraftaki pensin üstünde ER32 ve 10-9 yazıyor. ER32 pensin dış çapının 32 mm olduğunu, 10-9 ise 9 ile 10 mm arası sap çaplarını tuttuğunu söylüyor. Her pens 1 mm'lik bir daralma aralığına sahip. Bu yüzden tek bir pensle bütün takımları tutamazsınız, sap çapına uygun olanı seçmeniz gerekiyor.

| Pens | Sıkma aralığı |
|---|---|
| ER11 | 0,5 ile 7 mm |
| ER16 | 0,5 ile 10 mm |
| ER20 | 1 ile 13 mm |
| ER25 | 1 ile 16 mm |
| ER32 | 2 ile 20 mm |
| ER40 | 3 ile 26 mm |

Pratikte mikro frezeler ER11, genel parmak frezeler ER16 ve ER32, büyük matkaplar ER32 penslerde tutuluyor.

Küçük ama pahalıya mal olan bir ayrıntı var. Pens önce somunun içindeki halkaya yan yatırılıp klik sesiyle oturtulur, sonra takım pensin içine geçirilir. Ters sırayla, yani pensi takıma geçirip sonra somuna vidalarsanız pens bozulur.

Standart pensler 10 ile 15 mikron arası salgı verir. Hassas sınıf pensler 3 mikronun altına iniyor ama fiyatı ciddi biçimde artıyor.

### ER yetmediğinde

Sıcak geçme tutucu, takımı ısıtılıp genleştirilmiş bir yuvaya geçirip soğuyunca sıkıştırma mantığıyla çalışıyor. En düşük salgıyı veriyor, gövdesi ince olduğu için dar yerlere giriyor. Yüksek devirli bitirme işlerinde ve mikro takımlarda tercih ediliyor.

Hidrolik tutucu da düşük salgı verir ve ek olarak titreşimi sönümler. Bitirme pasolarında yüzey kalitesine katkısı belli oluyor.

Weldon tipi, yani yandan vidayla sıkan tutucular en yüksek torku iletir ve kaba işlerde takımın çekilip çıkmasını engeller. Buna karşılık salgısı yüksektir, hassas iş için uygun değil.

Senkron kılavuz çekemeyen tezgahlarda ise kompanzasyonlu kılavuz tutucu kullanılıyor, yukarıda bahsetmiştim.

### Salgı neden bu kadar önemli

Takım merkezinden kaçık dönüyorsa ağızlar eşit yük almaz. Bir ağız her turda fazladan kesme yapar, diğerleri boşta kalır. Fazla yük alan ağız erken aşınır, sonra kırılır, arkasından takımın tamamı gider.

Bir de takımın tutucudan ne kadar dışarı çıktığı var. Çıkıntı arttıkça takım eğilmeye ve titremeye yatkın hale geliyor. İşin izin verdiği en kısa boy, en büyük çap.

### Tutucunun tezgaha bağlandığı yer

![HSK saplı tutucular ve bara kafası](/images/takim/hsk-tutucu.jpg)

Tutucunun tezgah miline oturduğu kısma arayüz deniyor ve bu kısım tezgaha özeldir, markalar birbirine karışmaz. BT30 ve BT40 Japon standardı, CAT Amerikan, SK ise Alman standardı. Bunların hepsi uca doğru incelen tek bir konik yüzeyle mile oturuyor.

HSK ise kısa ve içi boş bir konik. Fotoğrafta soldaki tutucunun sapına bakarsanız görürsünüz, koniğin hemen arkasında geniş ve düz bir halka var. Mile hem koniğin yan yüzünden hem de o halkadan, yani iki ayrı yüzeyden birden tutunuyor. Yüksek devirde dönen parçayı dışarı doğru iten kuvvet koniği bir miktar genişletir, o düz halka sayesinde HSK bu durumda bile yerinden oynamaz.

## Takımhane kodlaması

Bu kadar çeşidi rafta tutmak bir şey, hangisinin nerede olduğunu bilmek başka bir şey. Burada işe yarayan yöntem, her takıma üç parçalı sabit bir kod vermek.

Birinci alan takımın tipini gösteriyor.

| Kısaltma | Takım |
|---|---|
| PF | Parmak freze |
| KF | Küresel freze |
| RF | Radius freze |
| TR | Tarama frezesi |
| MF | Mikro freze |
| DF | Diş frezesi |
| MK | Matkap |
| PN | Punta |
| KL | Kılavuz |
| RY | Rayba |
| TS | Testere |

İkinci alan malzemeyi ya da uygulamayı söylüyor. AL alüminyum, CE çelik, PS paslanmaz, TI titanyum, HC Helicoil, KRB karbür, HSS yüksek hız çeliği.

Üçüncü alan ölçüyü taşıyor. Çap, kesici boy, ağız sayısı, köşe radyüsü. Kılavuzda diş ölçüsü.

Birkaç örnek.

```text
PF-AL-06x18-Z3       Ø6 alüminyum parmak freze, 18 mm kesici boy, 3 ağız
PF-CE-10x30-Z4-R0.5  Ø10 çelik parmak freze, 4 ağız, R0.5 köşe radyüslü
KF-CE-08xR4-Z2       Ø8 küresel freze, R4 top, 2 ağız
KL-HC-M6x1.0         M6 Helicoil kılavuzu
KL-CE-M6x1.0-6H      M6 normal kılavuz, 6H tolerans
MK-KRB-08-5xD        Ø8 karbür matkap, 5xD derinlik
RY-HSS-10-H7         Ø10 HSS rayba, H7 tolerans
TR-AL-63-Z5          Ø63 alüminyum tarama kafası, 5 uç
```

Kodun ikinci alanını ISO 513 malzeme gruplarına bağlarsanız sistem uluslararası standartla da konuşmaya başlıyor. ISO, uluslararası standartları belirleyen kuruluş; 513 numaralı standardı da iş parçası malzemelerini altı renkli gruba ayırıyor. Bu renkleri bütün büyük üreticiler uç kutularının üstüne basıyor.

| Grup | Renk | Malzeme |
|---|---|---|
| P | Mavi | Çelik |
| M | Sarı | Paslanmaz |
| K | Kırmızı | Dökme demir |
| N | Yeşil | Alüminyum, bakır, pirinç |
| S | Turuncu | Titanyum ve ısıya dayanıklı alaşımlar |
| H | Gri | Sertleştirilmiş çelik |

Yani AL kodu N grubuna, CE kodu P grubuna, PS kodu M grubuna, TI kodu S grubuna denk geliyor.

ERP tarafında stok kartına koyulacak alanlar da şunlar. Kod, ISO grubu, çap ve kesici boy, ağız sayısı, köşe radyüsü, kaplama, önerilen devir ve ilerleme aralığı, bağlı olduğu pens ya da tutucu, tedarikçi. Bunun üstüne takım ömrü sayacı ve kırılan takımların kayda geçirilmesi eklendiğinde hangi takımın gerçekten para kazandırdığını görmeye başlıyorsunuz.

Tek şartı kodun tekil olması. Aynı takıma iki ayrı kod verildiği anda sistem sayı tutmayı bırakır.

## Başlangıç kesme parametreleri

Aşağıdaki değerler karbür takım ve bol soğutma varsayımıyla verilmiş, temkinli başlangıç aralıkları. Kaplama, ağız sayısı, paso derinliği ve tezgahın rijitliği bunları epey değiştirebiliyor, o yüzden üreticinin kendi verisiyle doğrulamadan üretim değeri olarak kullanmayın.

| Malzeme | Kesme hızı (m/dak) | Diş başı ilerleme (Ø8-12) |
|---|---|---|
| Alüminyum 6061 | 250 ile 450 | 0,05 ile 0,12 mm |
| Alüminyum 7075 | 180 ile 300 | 0,05 ile 0,10 mm |
| Çelik 1040 | 120 ile 180 | 0,03 ile 0,08 mm |
| Çelik 4140 | 90 ile 150 | 0,03 ile 0,07 mm |
| Paslanmaz 304 ve 316 | 60 ile 120 | 0,03 ile 0,06 mm |
| Titanyum Ti-6Al-4V | 45 ile 60 | 0,03 ile 0,06 mm |

Zor malzemelerde birkaç ek not var. 7075 alüminyum hızlı işlenir ama yapışma riski yüksektir, keskin ve kaplamasız takımla bol soğutma gerekir. Paslanmaz ve titanyumda kesme hızı düşük tutulur, paso derinliği sabit kalmalı ve içten yüksek basınçlı soğutma neredeyse zorunlu. Titanyumda ayrıca takımı parçanın içinde durdurmamak önemli, beklerken malzeme sertleşiyor ve bir sonraki temasta takım anında köreliyor.

## Sık sorulan sorular

### Kör delikte hangi kılavuz kullanılır?

Spiral kanallı, yani helis kanallı kılavuz kullanılır. Kanalları sarmal olduğu için talaşı geriye, kılavuzun girdiği yönden dışarı taşır. Kör delikte talaşın gidecek başka yolu yoktur. Düz kanallı kılavuz kullanırsanız talaş dipte sıkışır ve kılavuz kırılır.

### Kılavuz öncesi matkap çapı nasıl hesaplanır?

Metrik dişlerde ana çaptan hatveyi çıkarmak yeterli. M6x1.0 için 6 eksi 1 yani 5,0 mm. M8x1.25 için 6,8 mm, M10x1.5 için 8,5 mm. Bu hesap yaklaşık yüzde 75 diş dolgusu verir. Paslanmaz ve titanyum gibi zor malzemelerde deliği biraz büyük açıp dolguyu yüzde 60 ile 70 arasına düşürmek kılavuz ömrünü uzatır.

### Alüminyumda neden az ağızlı freze kullanılıyor?

Alüminyum yumuşak ve yapışkan bir talaş verir. Ağız sayısı azaldıkça ağızlar arasındaki boşluk büyür, talaş rahat çıkar ve takıma yapışmaz. Çelikte talaş kısa ve sert olduğu için boşluğa değil, yükü daha çok ağza bölmeye ihtiyaç duyulur. Bu yüzden dört ve üzeri ağızlı takımlar tercih edilir.

### Rayba ne işe yarar, matkaptan farkı nedir?

Matkap deliği açar, rayba açılmış deliği son ölçüsüne getirir. Raybanın işi malzeme kaldırmak değil, çapı ve yüzeyi düzeltmek. Çapın yüzde iki üç kadarı kadar paso bırakılır. Önemli bir sınırı var, rayba deliğin yerini düzeltmez, mevcut deliği takip eder. Delik yanlış yerdeyse rayba onu yerine getirmez.

### ER pens numarası ne anlama geliyor?

Numara pensin dış çapını mm olarak verir. ER32 pensin dış çapı 32 mm demektir. Her pens 1 mm daralma aralığına sahiptir, yani ER32 10-9 yazan bir pens 9 ile 10 mm arası sap çaplarını tutar. Tek bir pens her takımı tutmaz, sap çapına uygun olanı seçmek gerekir.

## Görsel kaynakları

Yazıdaki fotoğraflar Wikimedia Commons'tan alınmıştır.

- [Kılavuz takımları](https://commons.wikimedia.org/wiki/File:ThreadingTaps.jpg), Glenn McKechnie, CC BY-SA 3.0
- [Spiral point kılavuz](https://commons.wikimedia.org/wiki/File:Spiral_point_tap.jpg), BigDumbDinosaur, CC BY 4.0
- [Kaplamalı ve kaplamasız uçlar](https://commons.wikimedia.org/wiki/File:Cutting_tools001.jpg), Solaris2006, CC BY 3.0
- [Parmak freze bölümleri](https://commons.wikimedia.org/wiki/File:End_Mill_02_labels.png), Rocketmagnet, kamu malı
- [Freze çeşitleri](https://commons.wikimedia.org/wiki/File:MillingCutterSlotEndMillBallnose.jpg), Hohum, CC BY-SA 2.0
- [Tarama frezesi](https://commons.wikimedia.org/wiki/File:Face_Mill_Index_01.png), Rocketmagnet, CC BY-SA 3.0
- [Kanal testeresi](https://commons.wikimedia.org/wiki/File:Slitting_saw_blades_OD_20_mm.jpg), GSP Zborovice, CC BY-SA 4.0
- [Punta matkapları](https://commons.wikimedia.org/wiki/File:CenterDrills123456.jpg), Hohum, CC BY-SA 2.0
- [Morse saplı matkap](https://commons.wikimedia.org/wiki/File:Drill_twist_morse.jpg), Emrys2, CC BY-SA 3.0
- [İçten soğutmalı karbür matkap](https://commons.wikimedia.org/wiki/File:Spiralbohrer_aus_Hartmetall_mit_innerer_K%C3%BChlschmiermittelzufuhr.jpg), Christian Thomma, CC BY-SA 4.0
- [Makine raybası](https://commons.wikimedia.org/wiki/File:ReamerMachineSpiral.jpg), Graibeard, CC BY-SA 2.0
- [ER pens](https://commons.wikimedia.org/wiki/File:ER_Collet.jpg), Aweber4418, CC BY-SA 4.0
- [HSK tutucular](https://commons.wikimedia.org/wiki/File:Tooling_system.jpg), Canelatools, CC BY-SA 3.0
