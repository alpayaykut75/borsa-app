-- S1D1 tone refresh (Moono voice, simpler examples)
-- Applies on top of 20260519173000_s1d1_20_steps_final.sql

update lesson_steps
set title = 'Ortak, Borsa Aslında Pazar Gibi',
    metadata = $${
      "text": "Ortak, borsa ilk bakışta karmaşık görünüyor olabilir; çok normal.\n\nAma özü şu: Markette domates, biber, patlıcan satılıyor; burada ise şirket ortaklığı, yani hisse satılıyor.\n\nYani burası şans masası değil, düzenli bir alışveriş alanı."
    }$$::jsonb
where lesson_id = 27 and order_index = 1;

update lesson_steps
set title = 'Fiyat Nasıl Çıkıyor?',
    metadata = $${
      "text": "Pazarda ürüne talep artarsa fiyat yukarı gider, değil mi? Borsada da mantık benzer.\n\nAlmak isteyen çoksa fiyat yukarı, satmak isteyen çoksa fiyat aşağı yöne kayar.\n\nTek fark: Burada domates değil, şirket payı alıp satıyoruz."
    }$$::jsonb
where lesson_id = 27 and order_index = 2;

update lesson_steps
set title = 'Hisse Alınca Ne Oluyor?',
    metadata = $${
      "text": "Bir hisse aldığında sadece kod almıyorsun; o şirkete ortak oluyorsun.\n\nŞirket iyi giderse senin payın da zamanla değer kazanabiliyor.\n\nBu yüzden iyi yatırımcı önce şirketin hikâyesini okur, sonra fiyata bakar."
    }$$::jsonb
where lesson_id = 27 and order_index = 3;

update lesson_steps
set title = 'Alıştırma 1',
    metadata = $${
      "question": "Borsayı en iyi anlatan cümle hangisi?",
      "options": [
        { "id": "a", "text": "Şirketle yatırımcının buluştuğu düzenli pazar" },
        { "id": "b", "text": "Sadece şansa dayalı hızlı kazanma oyunu" },
        { "id": "c", "text": "Fiyatların tek yerden dağıtıldığı sistem" }
      ],
      "correct_option_id": "a"
    }$$::jsonb
where lesson_id = 27 and order_index = 5;

update lesson_steps
set metadata = $${
      "question": "Cümleyi tamamla: Borsada hisse alan kişi şirkete ____ olur.",
      "options": [
        { "id": "a", "text": "müşteri" },
        { "id": "b", "text": "ortak" },
        { "id": "c", "text": "personel" },
        { "id": "d", "text": "tedarikçi" }
      ],
      "correct_option_id": "b"
    }$$::jsonb
where lesson_id = 27 and order_index = 6;

update lesson_steps
set title = 'Borsa Neden Gerekiyor?',
    metadata = $${
      "text": "Şirketler büyümek için para arıyor, yatırımcı da parasını boş bekletmek istemiyor.\n\nBorsa bu iki ihtiyacı aynı yerde buluşturuyor.\n\nYani hem şirket büyüyor hem yatırımcı ortaklıkla değer yakalayabiliyor."
    }$$::jsonb
where lesson_id = 27 and order_index = 7;

update lesson_steps
set title = 'Şans Değil, Plan Meselesi',
    metadata = $${
      "text": "Plansız işlem yaparsan borsa yorucu olur; bu doğru.\n\nAma bu, işin şans olduğu anlamına gelmez.\n\nAraştırma + plan + risk yönetimi = daha sağlam karar."
    }$$::jsonb
where lesson_id = 27 and order_index = 8;

update lesson_steps
set title = 'İlk Başta Neye Bakayım?',
    metadata = $${
      "text": "Başlangıçta her şeyi öğrenmeye çalışma.\n\nŞirket ne yapıyor, nasıl para kazanıyor, hacmi nasıl, genel yönü ne? Bunlar ilk etap için yeter.\n\nAz ama net göstergelerle başlamak en sağlıklısı."
    }$$::jsonb
where lesson_id = 27 and order_index = 9;

update lesson_steps
set metadata = $${
      "question": "Bir yatırımcı \"bu iş şans\" dememek için en çok ne yapmalı?",
      "options": [
        { "id": "a", "text": "Sosyal medya yorumuna göre işlem açmalı" },
        { "id": "b", "text": "Planlı gidip riski yönetmeli" },
        { "id": "c", "text": "Sürekli al-sat yapmalı" }
      ],
      "correct_option_id": "b"
    }$$::jsonb
where lesson_id = 27 and order_index = 11;

update lesson_steps
set metadata = $${
      "question": "Cümleyi tamamla: Talep satıştan güçlüyse fiyat genelde ____ yöne gider.",
      "options": [
        { "id": "a", "text": "aşağı" },
        { "id": "b", "text": "yukarı" },
        { "id": "c", "text": "sabit" },
        { "id": "d", "text": "rastgele" }
      ],
      "correct_option_id": "b"
    }$$::jsonb
where lesson_id = 27 and order_index = 12;

update lesson_steps
set title = 'Senaryo: Haber Geldi, Fiyat Fırladı',
    metadata = $${
      "text": "Şirket yeni yatırım açıkladı, fiyat hızlı yükseldi.\n\nBu iyi bir sinyal olabilir ama tek başına karar sebebi olmaz.\n\nÖnce şu soruyu sor: Bu hamle şirketin uzun vadede kasasına ne yazacak?"
    }$$::jsonb
where lesson_id = 27 and order_index = 13;

update lesson_steps
set title = 'Acele Karar Tuzağı',
    metadata = $${
      "text": "Fiyat koşunca hemen atlamak çok yaygın bir hata.\n\nKaçırıyorum hissiyle verilen kararlar genelde plansız olur.\n\nDur, sebebi anla, sonra hamle yap. Moono tarzı budur."
    }$$::jsonb
where lesson_id = 27 and order_index = 14;

update lesson_steps
set title = 'Dersin Özeti',
    metadata = $${
      "text": "Bu dersin ana fikri net: Borsa bir şans oyunu değil.\n\nPazar mantığını, ortaklık fikrini ve planlı karar verme tarzını kurduğunda oyun değişir.\n\nOrtak, bu tabanı kurarsan sonraki derslerde çok daha rahat ilerlersin."
    }$$::jsonb
where lesson_id = 27 and order_index = 15;

update lesson_steps
set metadata = $${
      "question": "Senaryoda fiyat hızlı yükselince en sağlıklı ilk adım ne?",
      "options": [
        { "id": "a", "text": "Hemen alış yapmak" },
        { "id": "b", "text": "Haberi uzun vadeli etkiyle okumak" },
        { "id": "c", "text": "Haberi tamamen yok saymak" }
      ],
      "correct_option_id": "b"
    }$$::jsonb
where lesson_id = 27 and order_index = 17;

update lesson_steps
set metadata = $${
      "question": "Cümleyi tamamla: Sağlam karar için önce ____ sonra fiyat yorumu gelir.",
      "options": [
        { "id": "a", "text": "söylenti" },
        { "id": "b", "text": "anlık korku" },
        { "id": "c", "text": "şirketin temeli" },
        { "id": "d", "text": "şans" }
      ],
      "correct_option_id": "c"
    }$$::jsonb
where lesson_id = 27 and order_index = 18;

update lesson_steps
set metadata = $${
      "text": "Ortak, bu derste pazarın mantığını kurduk. 2 dakikada hızlı bir toparlayalım, testte daha rahat edeceksin.",
      "audio_url": "https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/Moono_Ders1.mp3"
    }$$::jsonb
where lesson_id = 27 and order_index = 19;
