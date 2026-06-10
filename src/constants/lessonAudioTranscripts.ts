// Sesli özet adımları için altyazı / transkript yedekleri.
// Kalıcı kaynak: lesson_steps.metadata.transcript veya metadata.captions (canlı DB).
// Ses dosyası hazır ama DB'ye henüz yazılmamış dersler burada tutulur.

/** Tüm derslerde aynı — metadata.text yerine bu gösterilir. */
export const AUDIO_STEP_HEADLINE = 'Hadi bu dersin özetini dinleyelim.';
export const AUDIO_STEP_SUBLINE = 'Sessiz ortamdaysan altyazı otomatik açılır.';

/** Altyazı kutusunda aynı anda görünen kelime sayısı (kaydırma derdi olmasın). */
export const AUDIO_CAPTION_WINDOW_WORDS = 28;

export const LESSON_AUDIO_TRANSCRIPTS: Record<number, string> = {
  // Ders 1 — lesson_id 27 ("Borsa Nedir?") — Moono_Ders1.mp3 transkripti
  27: `Selam ortak! Moono'ya, yani finansal özgürlük yolculuğuna hoş geldin. Ben senin dijital rehberinim. Bugün, borsa denilince aklına gelen o karmaşık ekranları, bağıran insanları ve eski filmleri bir kenara bırakıyoruz. Çünkü borsa, aslında sandığından çok daha şeffaf ve kuralları olan profesyonel bir pazardır. Hazırsan, ilk dersimize 'Borsa Nedir?' sorusuyla başlayalım.

Borsayı devasa, kurallı bir pazar yeri gibi düşünebilirsin. Bu pazarın raflarında Türkiye'nin önde gelen üretim ve hizmet şirketlerinin payları duruyor. Bir şirket büyümek istediğinde, bankadan kredi çekmek yerine bizlere, yani yatırımcılara bir teklifte bulunur. Der ki: 'Gel bana ortak ol, sermaye ver; ben büyüdükçe sen de bu büyümeden payını al.' İşte borsa, bu şeffaf ortaklıkların kurulduğu güvenli bir platformdur.

Peki, Param güvende mi? diye sorduğunu duyar gibiyim. Kesinlikle evet. Borsa İstanbul'da attığın her adım, Sermaye Piyasası Kurulu'nun sıkı denetimi altındadır. Borsa İstanbul'un yapay zeka destekli gözetim sistemleri her an piyasayı izlerken, nakit varlıkların Takasbank güvencesinde, hisselerin ise MKK nezdinde dijital bir zırhla korunur. Burada gizli saklı yok; her şey şeffaf ve kurallara uygun şekilde işler.

Ekranda gördüğün rakamlar sadece matematiksel veriler değil ortak. Satın aldığın her bir parça ile aslında yollarda gördüğün o araçların motoruna, telefonundaki yazılımın koduna veya her gün önünden geçtiğin o fabrikanın tuğlasına ortak oluyorsun. Dijital bir hızla işlem yapsak da sahip olduğun haklar son derece somuttur.

Özetle borsa; bir oyun alanı değil, geleceğini inşa ettiğin bir değer biriktirme platformudur. Sabırlı ve bilinçli olduğunda, paran sadece enflasyona karşı korunmakla kalmaz, seninle birlikte büyür. İlk dersin sonuna geldik, öğrendiklerini test etme vakti! Hadi, şimdi şu 10 soruluk kısa sınava gir ve Çıraklık bilgilerini kanıtla, ardından 'Hisse Senedi Nedir?' dersine geçelim!`,
};
