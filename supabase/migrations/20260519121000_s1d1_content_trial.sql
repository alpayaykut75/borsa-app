-- S1D1 (lesson_id: 27) trial content refresh
-- Scope: step 1-11 only. Keep audio/final quiz intact.

update lesson_steps
set title = 'Hook',
    metadata = '{
      "text": "Borsa karmasik bir ekran degil; alici ile saticinin bulustugu modern bir pazar. Fark su: domates degil, sirket ortakligi alip satiliyor."
    }'::jsonb
where lesson_id = 27 and order_index = 1;

update lesson_steps
set title = 'Pazar Mantigi',
    metadata = '{
      "text": "Pazarda fiyat nasil olusuyorsa borsada da oyle olusur: Talep artarsa fiyat yukselir, talep azalirsa geriler. Mantik basit, olculebilir ve takip edilebilirdir."
    }'::jsonb
where lesson_id = 27 and order_index = 2;

update lesson_steps
set title = 'Ortaklik Mantigi',
    metadata = '{
      "text": "Bir hisse aldiginda sadece bir kod almazsin; sirketin kucuk de olsa ortagi olursun. Sirket buyudukce payinin degeri artabilir."
    }'::jsonb
where lesson_id = 27 and order_index = 3;

update lesson_steps
set title = 'Mini Quiz 1',
    metadata = '{
      "question": "Borsa mantik olarak en cok neye benzer?",
      "options": [
        { "id": "a", "text": "Pazar yerine" },
        { "id": "b", "text": "Sans oyununa" },
        { "id": "c", "text": "Kapali kutuya" }
      ],
      "correct_option_id": "a",
      "explanation": "Dogru. Borsa, alici ve saticinin bulustugu organize bir pazardir."
    }'::jsonb
where lesson_id = 27 and order_index = 4;

update lesson_steps
set title = 'Borsa Neden Var?',
    metadata = '{
      "text": "Sirketler buyumek icin fon bulur, yatirimci da birikimini calistirir. Borsa bu iki ihtiyaci ayni zeminde bulusturdugu icin ekonomi icin kritik bir koprudur."
    }'::jsonb
where lesson_id = 27 and order_index = 5;

update lesson_steps
set title = 'Yanlis Inanc',
    metadata = '{
      "text": "\"Borsa oyundur\" algisi yanilticidir. Plansiz hareket risklidir; ama bilgi, disiplin ve surec takibiyle borsa ogrenilebilir bir karar ortamidir."
    }'::jsonb
where lesson_id = 27 and order_index = 6;

update lesson_steps
set title = 'Mini Quiz 2',
    metadata = '{
      "question": "Borsanin temel islevi nedir?",
      "options": [
        { "id": "a", "text": "Sadece fiyat gostermek" },
        { "id": "b", "text": "Sirket ve yatirimciyi bulusturmak" },
        { "id": "c", "text": "Sadece bankalara hizmet etmek" }
      ],
      "correct_option_id": "b",
      "explanation": "Evet. Sirket fon bulur, yatirimci ise ortak olur."
    }'::jsonb
where lesson_id = 27 and order_index = 7;

update lesson_steps
set title = 'Ilk Bakista Ne Takip Edilir?',
    metadata = '{
      "text": "Ilk adimda her seyi ogrenmeye calisma. Sirket adi, fiyat, hacim ve genel trendi takip et. Baslangicta az metrikle net gorus almak daha sagliklidir."
    }'::jsonb
where lesson_id = 27 and order_index = 8;

update lesson_steps
set title = 'Kelime Karti',
    metadata = '{
      "front_text": "Hisse Senedi",
      "back_text": "Bir sirketin ortaklik payini temsil eden finansal varliktir. Alan kisi o sirkete ortak olur."
    }'::jsonb
where lesson_id = 27 and order_index = 9;

update lesson_steps
set title = 'Ornek Senaryo',
    metadata = '{
      "text": "Bir sirketin yeni yatirim haberi geldiginde talep artabilir. Talep yukselince hisseye ilgi artar ve fiyat yukari hareket edebilir. Haber, beklenti ve talep birlikte fiyati etkiler."
    }'::jsonb
where lesson_id = 27 and order_index = 10;

update lesson_steps
set title = 'Mini Quiz 3',
    metadata = '{
      "question": "Talep arttiginda fiyat genelde ne olur?",
      "options": [
        { "id": "a", "text": "Sabit kalir" },
        { "id": "b", "text": "Yukselme egilimine girer" },
        { "id": "c", "text": "Her zaman duser" }
      ],
      "correct_option_id": "b",
      "explanation": "Genel piyasa mantiginda artan talep, fiyati yukari iter."
    }'::jsonb
where lesson_id = 27 and order_index = 11;
