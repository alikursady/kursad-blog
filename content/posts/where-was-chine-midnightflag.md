---
title: "Midnightflag - Where_Was_chine OSINT Writeup"
date: 2025-01-27T12:00:00+03:00
draft: false
tags: []
---

Soru : Where_Was_chine 379
"A Chinese student who had been living in France for a year to study French recently returned to her home country for a short one-week vacation. A few days later, her body was found lifeless in a park in China. Local authorities are struggling to understand what happened to her. Before her disappearance, the young woman was very active on social media. Your mission is to retrace her steps and discover which park her body was found in. The victim’s name was Lin Xiayu, and she used the username LinXiayu35170 on social media. Flag format: MCTF{Xxxx_Xxxxx}"

Türkçe karşılığı : Fransızca öğrenmek için bir yıldır Fransa’da yaşayan Çinli bir öğrenci, kısa süreli bir haftalık tatil için kısa süre önce ülkesine geri döndü. Birkaç gün sonra, Çin’de bir parkta cansız bedeni bulundu. Yerel yetkililer, ona ne olduğunu anlamakta zorlanıyor. Genç kadın kaybolmadan önce sosyal medyada oldukça aktifti. Senin görevin, onun izini yeniden sürmek ve cesedinin hangi parkta bulunduğunu keşfetmek. Kurbanın adı Lin Xiayu’ydu ve sosyal medyada "LinXiayu35170" kullanıcı adını kullanıyordu.

Soruyu okuyunca ilk olarak sosyal medya hesaplarını araştırmaya başladım kullanıcı adı elimdeydi. Akabinde x hesabını buldum.
Kullanıcı adı: @LinXiayu35170
Hesap katılım tarihi: Şubat 2026
Gönderiler Fransızca
İçerik tonu: Fransa’da yaşayan, Fransızca öğrenen biri gibi bi izlenim veriyordu. Profil fotoğrafına baktım ama sonrasında fark ettiğim birşey daha vardı. Profil fotoğrafında "this-person-does-not-exist" yazıyordu. Fotoğrafı boşverdim. Takipçilerine uzun bir süre bakmadım çünkü herkese açık olduğu için başkalarının takip etmesine açıktı orada boşa zaman kaybetmek istemedim. 
Ama çoğu şeye bakmama rağmen halen elle tutulur birşey yoktu ve takipçilerine bakayım dedim. Ve "Lucas Juillet / @heaprunner" isimli x profilini buldum. “Observer suffit. Les gens révèlent tout sans s’en rendre compte.” “Sadece gözlemlemek yeter. İnsanlar fark etmeden her şeyi açığa vurur.” bu attığı tweet çoğu şeyi açıkladı. Başka bir tweetinde "18h37. Toujours la même heure.” geçiyordu. Baya bi zaman da burada kaybettim çünkü boşa yazdığını düşünmüyordum ama bunda da birşey çıkmadı. 

Netflix'i takip ediyordu acaba bir dizinin veya film'in kurgusal karakterleri mi diye de araştırma yaptım ancak yine elle tutulur birşey çıkmadı. Çince yazımının aramalarını bile yaptım ancak burdan da bir sonuç çıkmadı. Douyin'de çokca zaman harcadım burdan da bir sonuç çıkmadı. 

Sonra sakinleşip bir sigara yaktım @heaprunner hesabı önümde açıktı herşeye baktım ama neden profilinde "Mr.Robot" var diye düşündüm. Ve github'da nicki arattım. Ve 3 hafta önce açılmış bir hesaba denk geldim. Takip ettiği vs. birşeyi yoktu. Sadece ["pattern-analysis" ](https://github.com/heaprunner/pattern-analysis) bu vardı. .py dosyalarını incelemeye başladım ve pattern_model.py dosyasında içindeki örnek veri üretiminde kullanılan koordinatlar 36.61, 114.49. Bu koordinatlar internette Handan, Çin civarıyla eşleşiyordu aha dedim bingo. 

Ve flag'i buldum : MCTF{Zhaoyuan_Park}
