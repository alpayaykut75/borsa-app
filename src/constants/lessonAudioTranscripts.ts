// Sesli özet adımları için altyazı / transkript yedekleri.
// Kalıcı kaynak: lesson_steps.metadata.transcript veya metadata.captions (canlı DB).
// Ses dosyası hazır ama DB'ye henüz yazılmamış dersler burada tutulur.

/** Tüm derslerde aynı — metadata.text yerine bu gösterilir. */
export const AUDIO_STEP_HEADLINE = 'Hadi bu dersin özetini dinleyelim.';
export const AUDIO_STEP_SUBLINE = 'Sessiz ortamdaysan altyazı otomatik açılır.';

/** Altyazı kutusunda aynı anda görünen kelime sayısı (kaydırma derdi olmasın). */
export const AUDIO_CAPTION_WINDOW_WORDS = 40;

export const LESSON_AUDIO_TRANSCRIPTS: Record<number, string> = {
  // Ders 1 — lesson_id 27 (Şirket ve Ortaklık)
  // Not: uygulamadaki örnek ses hâlâ eski Moono_Ders1.mp3; aşağıdaki metin yeni seslendirme için.
  27: `Ortak, ilk dersi tamamladın. Şimdi kısaca toparlayalım.

Bu derste tek bir fikri konuştuk: ortaklık.

Mahalledeki fırınla başladık. Tek kişinin işlettiği bir yer büyümek istediğinde önünde iki yol vardı. Ya borç alacak ve faiziyle geri ödeyecek, ya da yanına ortak alacak.

Bu ikisi birbirine hiç benzemez. Borç geri ödenir ve iş yine tamamen sahibinde kalır. Ortaklıkta ise geri ödeme yoktur; onun yerine işin bir bölümü kalıcı olarak ortağa geçer.

Peki o bölüm ne kadar? Bunu ölçmek için işletmeyi eşit parçalara böleriz. Bir milyon liralık fırını bin parçaya bölersek her parça bin lira eder. Bu parçaların her birine pay diyoruz. Elli pay alan kişi işletmenin yüzde beşine sahip olur.

Pay sahibi olmanın üç karşılığı var. Kâr dağıtıldığında payın oranında alırsın. Genel kurulda oy kullanırsın. Ve payını istediğinde satabilirsin.

Ama madalyonun bir de öbür yüzü var. Şirket kâr edemezse kâr payı dağıtılmaz. İşler kötüye giderse payının değeri düşer. Şirket batarsa payın değersiz kalabilir. Ortak, iyi günde kazanca ortak olduğu gibi kötü günde kayba da ortaktır.

Yalnız burada önemli bir koruma var: sınırlı sorumluluk. Anonim şirketlerde pay sahibi, şirketin borçlarından yalnızca paylarına ödediği tutar kadar sorumludur. Şirket milyonlarca lira borçla kapansa bile senin evine ya da maaşına kimse dokunamaz.

Ve son olarak: bir şirket paylarını çok küçük parçalara bölerse binlerce kişiden sermaye toplayabilir. Sıradan birinin dev bir şirkete ortak olabilmesi işte bu sayede mümkün olur.

Şimdi sana neden "ortak" dediğimizi biliyorsun. İlk adımı mühürledin. Bir sonraki derste bir şirkete ortak olmakla o şirkete borç vermenin farkına bakacağız.`,

  // Ders 2 — lesson_id 28 (Ortak mı, Alacaklı mı?) — ses kaydı gelince açılacak
  28: `Ortak, ikinci dersi de bitirdin. Kısaca toparlayalım.

Geçen derste fırının önünde iki yol vardı: borç almak ya da ortak almak. Bu derste aynı manzaraya parayı veren kişinin yerinden baktık.

Çünkü bir şirkete para verirken iki farklı konuma geçebilirsin. Ya alacaklısı olursun, ya ortağı.

Alacaklı olmak şu demek: şirkete borç verirsin. Bunun için çıkardığı belgeye tahvil denir. Belirlenen faizi alırsın ve vade sonunda anaparanı geri istersin. Elinde bir takvim ve bir rakam vardır.

Ortak olmak ise şu demek: işletmenin bir dilimi senin olur. Vade yoktur, geri ödeme sözü yoktur. Elinde bir oran ve bir belirsizlik vardır.

Kazanç tarafında da ayrılırlar. Alacaklının getirisi baştan bellidir ve bir tavanı vardır; şirket tarihinin en iyi yılını yaşasa bile sözleşmede yazandan fazlasını alamaz. Ortağın getirisinde ise böyle bir tavan yoktur.

Ama asıl kritik fark işler kötüye gittiğinde ortaya çıkar. Bir şirket kapandığında varlıkları belirli bir sıraya göre dağıtılır. Önce çalışanlar ve devlet, sonra bankalar ve tahvil sahipleri. Pay sahipleri bu sıranın en sonundadır. Yani ortak, herkes ödendikten sonra geriye ne kaldıysa onu alır. Çoğu zaman geriye bir şey kalmaz.

Burada bir yanılgıya düşme: tahvil risksiz değildir. Alacaklının elindeki bir sözdür, garanti değil. Şirket gerçekten batarsa ödeme yapılamayabilir. Sırada önde olmak riski azaltır, ortadan kaldırmaz.

Yani ikisi rakip değil, farklı ihtiyaçlara verilmiş farklı cevaplardır. Bizim ana konumuz olan pay, ortaklık tarafında durur.

İkinci adımı da mühürledin. Bir sonraki derste şirketlerin bu payları neden binlerce kişiye açtığına, yani halka arza bakacağız.`,

  // Ders 3 — lesson_id 29 (Şirketler Neden Halka Açılır?) — ses kaydı gelince açılacak
  29: `Ortak, üçüncü dersi tamamladın. Kısaca toparlayalım.

Fırın büyüdü ve artık tanıdık çevrenin toplayabileceğinden çok daha fazla paraya ihtiyacı var. Bankanın da bir sınırı var. Peki hiç tanımadığı binlerce insandan nasıl ortak bulacak?

Cevap halka arz. Şirket paylarının bir bölümünü belirlenen bir fiyattan herkese satışa çıkarır. Alan kişi kim olursa olsun aldığı pay oranında ortak olur ve bu paylar sonrasında borsada işlem görmeye başlar.

Şirket bundan üç şey kazanır. Geri ödemesi ve faizi olmayan bir sermaye. Adının duyulmasıyla gelen tanınırlık. Ve mevcut ortakları için bir çıkış kapısı.

Ama bu kapı tek yönlü açılmaz. Şirket artık finansal tablolarını düzenli olarak açıklamak zorundadır. Önemli her gelişmeyi herkesin aynı anda öğrenmesi için duyurur. SPK'nın kurallarına uyar ve bağımsız denetimden geçer. Yani halka arz bir takastır: sermaye alınır, şeffaflık ve denetim kabul edilir.

Bir de çoğu kişinin atladığı bir ayrım var. Bazı halka arzlarda şirket yeni paylar çıkarır ve para doğrudan şirkete girer. Bazılarında ise mevcut ortaklar kendi paylarını satar ve para şirkete değil, satan kişiye gider. "Şirket halka açıldı" cümlesi bunu söylemez; bunu ayrıca öğrenmen gerekir.

Nerede yazar? İzahnamede. Şirketin ne iş yaptığı, finansal durumu, paranın nereye gideceği, kimin ne kadar sattığı ve şirketin gördüğü riskler hep orada. SPK bu belgeyi onaylar ama bu onay "iyi bir yatırımdır" demek değildir; bilgilerin usulüne uygun sunulduğu anlamına gelir.

Son olarak şunu aklında tut: halka arz kendiliğinden bir fırsat değildir. Sadece bir kapının açıldığı andır. İçeri girip girmemek ayrı bir karar.

Üçüncü adımı da mühürledin. Bir sonraki derste bu payların alınıp satıldığı yere, yani borsanın kendisine bakacağız.`,

  // Ders 5 — lesson_id 31 (Borsa İstanbul'a Giriş) — ses kaydı gelince açılacak
  31: `Ortak, beşinci dersi tamamladın. Kısaca toparlayalım.

Geçen derste borsanın ne işe yaradığını konuştuk. Bu derste Türkiye'de bu işin nerede yapıldığına baktık: Borsa İstanbul.

Bugünkü adını 2013'te aldı. O tarihte İMKB, İstanbul Altın Borsası ve Vadeli İşlem ve Opsiyon Borsası tek çatı altında birleştirildi. Ama kökleri çok daha eski; 1866'da kurulan Dersaadet Tahvilat Borsası'na kadar uzanıyor.

Borsa İstanbul'da yalnızca şirket payları işlem görmez. Pay Piyasası bizim ana konumuz. Borçlanma Araçları Piyasası'nda tahviller var, yani Ders 2'de konuştuğumuz alacaklı tarafı. VİOP'ta türev ürünler işlem görüyor. Bir de kıymetli madenlerin bölümü var.

Şirketler borsada tam unvanlarıyla değil, beş harflik kodlarla anılır. Türk Hava Yolları için THYAO gibi. Buna BIST kodu diyoruz ve bir hisseyi takip etmeye önce kodunu öğrenerek başlarsın.

Pay Piyasası kendi içinde de pazarlara ayrılır. Yıldız Pazar'da büyük ve yoğun işlem gören şirketler var. Ana Pazar'da orta ölçekliler. Alt Pazar'da daha küçük şirketler. Bir de Yakın İzleme Pazarı var; finansal yapısında bozulma ya da denetim sorunu görülen şirketler oraya alınır. Bir hisseye bakarken hangi pazarda olduğunu görmek, saniyelik ama işe yarar bir uyarıdır.

Burada bir yanılgıya düşme: Yıldız Pazar'da olmak "iyi yatırım" demek değildir. Pazar ayrımı büyüklüğe ve işlem ölçütlerine bakar; şirketin kârlı ya da iyi yönetilen bir şirket olup olmadığına bakmaz. Onu ölçmeyi Analist seviyesinde öğreneceğiz.

Beşinci adımı da mühürledin. Bir sonraki derste şu soruya döneceğiz: borsada bir pay aldığında para gerçekte kime gidiyor?`,

  // Ders 4 — lesson_id 30 (Borsa Ne İşe Yarar?) — ses kaydı gelince açılacak
  30: `Ortak, dördüncü dersi tamamladın. Kısaca toparlayalım.

Geçen derste fırın halka açıldı ve sen paylarından aldın. Ama şöyle bir soru kaldı: bir gün paraya ihtiyacın olursa bu payı kime satacaksın?

Borsa olmasaydı alıcıyı kendin bulacaktın. Tanıdıklarına soracak, aylarca bekleyecek, fiyat için tek tek pazarlık edecektin. Üstelik karşı tarafın parayı gerçekten ödeyeceğine güvenmek zorunda kalacaktın. Satamadığın bir pay, elinde donmuş bir varlıktır.

Borsa tam olarak bu üç sorunu çözer. Alıcıyla satıcıyı aynı yerde buluşturur. Herkesin gördüğü tek bir fiyat oluşmasını sağlar. Ve işlemin kurallara göre tamamlanacağını güvence altına alır.

Buradaki en değerli şeyin adı likidite. Yani bir varlığı istediğinde makul bir fiyattan nakde çevirebilme kolaylığı. Bir daireyi satmak aylar sürebilir; borsada işlem gören bir pay için saniyeler yeter. Likidite bir getiri değildir, bir çıkış kapısıdır.

İkinci işlev şeffaflık. Bir payın son fiyatı, kim bakarsa baksın aynıdır. Kimse özel fiyat alamaz, kimse önceden öğrenemez.

Burada sık yapılan bir hataya dikkat: fiyatı borsa belirlemez. Fiyat, alıcı ve satıcıların emirlerinin karşılaşmasından çıkar. Borsa sadece bu karşılaşmanın kurallarını işletir ve sonucu ilan eder.

Ve en önemlisi: borsa alıcı bulmayı kolaylaştırır, iyi bir fiyattan satacağını garanti etmez. Panik anlarında herkes aynı anda satmak isteyebilir, fiyatlar hızla düşebilir. Borsanın güvencesi işlemin kendisinedir, sonucuna değil.

Dördüncü adımı da mühürledin. Bir sonraki derste Türkiye'nin borsasına, yani Borsa İstanbul'a bakacağız.`,

  // Ders 6 — lesson_id 53 (Birincil ve İkincil Piyasa) — ses kaydı gelince açılacak
  53: `Ortak, altıncı dersi tamamladın. Kısaca toparlayalım.

Dördüncü derste bir soruyu askıda bırakmıştık: borsadan hisse aldığında ödediğin para nereye gidiyor? Bu derste cevapladık.

İki farklı durum var. Birincisinde pay ilk kez satılıyordur. Şirket yeni paylar çıkarır ve satar; bu halka arzda olabilir, sonradan yapılan bir sermaye artırımında da olabilir. Böyle bir işlemde ödediğin para doğrudan şirkete girer ve yatırıma dönüşür. Buna birincil piyasa diyoruz.

İkincisinde ise pay zaten birinin elindedir. Borsadan hisse aldığında onu şirketten değil, o payı elinde tutan başka bir yatırımcıdan alırsın. Paran o kişinin hesabına geçer. Şirket işlemin tarafı bile değildir; sadece ortak listesinde isim değişir. Buna ikincil piyasa diyoruz ve borsa tam olarak burasıdır.

Peki şirket para almıyorsa fiyatı neden takip eder? Çünkü bugünkü fiyat yarınki sermayenin fiyatıdır. Şirket ileride yeni pay çıkarıp para toplamak isterse borsadaki fiyata yakın bir seviyeden yapar.

Bir de şunu unutma: ikisi birbirine bağlıdır. Kimse çıkışı olmayan bir yere para koymak istemez. İkincil piyasa var olduğu için insanlar birincil piyasaya güvenle katılır.

Son olarak çok yaygın bir yanılgı: "Bu hisseyi alarak şirkete destek oluyorum" cümlesi doğru değildir. Borsadan hisse almak şirkete para vermek değildir; sadece o payı satan yatırımcıya ödeme yapmış olursun. Şirkete doğrudan sermaye koymanın yolu halka arza ya da sermaye artırımına katılmaktır.

Altıncı adımı da mühürledin. Bir sonraki derste ekrandaki o rakamın nasıl oluştuğuna bakacağız.`,

  // Ders 7 — lesson_id 54 (Fiyat Nasıl Oluşur?) — ses kaydı gelince açılacak
  54: `Ortak, yedinci dersi tamamladın. Kısaca toparlayalım.

Bir hisseye baktın ve yanında bir rakam var. Bu rakam şirketin resmi açıklaması değil, borsanın belirlediği bir liste fiyatı da değil. Çok daha basit bir şeyi gösteriyor: en son gerçekleşen alım satımın fiyatını. Yani bir değerleme değil, bir anlaşma kaydı.

Borsaya iki kalabalık olarak bakmak gerekir. Bir tarafta almak isteyenler var; her biri ödemeye razı olduğu en yüksek fiyatı belirtir, buna talep diyoruz. Diğer tarafta satmak isteyenler var; her biri kabul edeceği en düşük fiyatı belirtir, buna da arz. Bir alıcının kabul ettiği fiyat bir satıcının kabul ettiği fiyata ulaştığı anda işlem olur ve o rakam ekrana yazılır.

Peki fiyat neden değişir? Değişen şey insanların beklentisidir. Yeni bir bilgi geldiğinde kimi "bu şirket daha değerli" deyip almak ister, kimi "riskler arttı" deyip satmak. Emirler değişir, denge kayar, yeni fiyat oluşur.

Burada çok önemli bir ayrım var. Fiyat, en son kimin kaça anlaştığıdır; gözlemlenir. Değer ise şirketin gerçekte ne ettiğidir; hesaplanır ve herkes farklı sonuca varabilir. İkisi çoğu zaman yakın seyreder ama her zaman eşit olmaz.

Bir de likiditenin etkisi var. Çok işlem gören bir payda büyük bir emir bile fiyatı fazla oynatmaz. Az işlem gören bir payda ise tek bir işlem fiyatı çok sert hareket ettirebilir.

Son olarak yeni başlayanların en sık düştüğü tuzak: pay fiyatına bakıp "ucuz" demek. Beş liralık pay, beş yüz liralık paydan ucuz değildir. Önemli olan şirketin toplam değeridir; buna piyasa değeri diyoruz ve pay fiyatı ile toplam pay sayısını çarparak buluyoruz.

Yedinci adımı da mühürledin. Bir sonraki derste tek bir şirketten çıkıp bütün piyasaya bakacağız: endeksler.`,

  // Ders 8 — Endeks Nedir? — lesson_id 55 — ses kaydı gelince açılacak
  55: `Ortak, sekizinci dersi tamamladın. Kısaca toparlayalım.

Haberlerde "borsa bugün yüzde 2 yükseldi" cümlesini duyuyorsun. Ama borsada yüzlerce şirket var; bazıları yükselmiş, bazıları düşmüştür. Bu yüzlerce sonucu tek bir rakama indiren araca endeks diyoruz.

Endeksi bir sepet gibi düşün. Belirli ölçütlere göre seçilmiş payları sepete koyarsın ve sepetin toplam değerinin nasıl değiştiğini izlersin. Endeks bir şirket değildir, doğrudan satın alabileceğin bir şey de değildir; sadece bir hesaplamadır. Termometre gibi: havayı değiştirmez, ölçer.

Türkiye'de en çok izlenen sepet BIST 100. İçinde yüz pay var. Bir de BIST 30 var; oradaki otuz pay BIST 100'ün de bir parçası ve en büyük şirketleri temsil ediyor. Sektörlere özel endeksler de mevcut.

Burada bilinmesi gereken bir ayrıntı var: endekste her şirketin ağırlığı aynı değil. Şirketler piyasa değerlerine göre ağırlıklandırılır. Yani çok büyük bir şirketin küçük bir hareketi, küçük bir şirketin büyük hareketinden daha etkili olabilir. Endeks yüz şirketin düz ortalaması değil, büyüklerin sesinin daha çok çıktığı bir ortalamadır.

Ne işe yarar? Üç şey. Kendi sonucunu piyasayla kıyaslarsın. Piyasanın genel yönünü tek bakışta görürsün. Ve bazı fonlar bir endeksi taklit edecek şekilde kurulur.

İki de sınırını unutma. Birincisi: endeks yükseldiğinde her pay yükselmiş olmaz. Senin hissen düşerken endeks artabilir; bu bir çelişki değil, ortalamanın doğası. İkincisi: endekse girmek "iyi yatırım" demek değildir. Endeks bir alışveriş listesi değil, bir ölçüm çerçevesidir.

Sekizinci adımı da mühürledin. Bir sonraki derste bu fiyatları oluşturan insanlara bakacağız: piyasadaki oyuncular kimler?`,

  // Ders 9 — Piyasadaki Oyuncular — lesson_id 56 — ses kaydı gelince açılacak
  56: `Ortak, dokuzuncu dersi tamamladın. Kısaca toparlayalım.

Geçen derste fiyatın alıcı ve satıcıların karşılaşmasından doğduğunu öğrendik. Bu derste o alıcı ve satıcıların kim olduğuna baktık.

Birinci grup bireysel yatırımcılar, yani sen. Kendi paranı yönetirsin, kimseye hesap vermezsin. Küçük tutarlarla çalışırsın ama istediğin kadar bekleyebilirsin. Bu esneklik göründüğünden daha değerli bir avantaj.

İkinci grup kurumsal yatırımcılar. Yatırım fonları, emeklilik fonları, sigorta şirketleri. Büyük tutarlarla çalışırlar, analiz ekipleri vardır. Ama yönettikleri paranın sahiplerine düzenli hesap verirler; yani sabretmek onlar için her zaman bir seçenek değildir.

Üçüncü grup yabancı yatırımcılar. Büyük tutarlarla çalıştıkları için toplu giriş çıkışları fiyatta hissedilir. Bu yüzden yakından takip edilirler.

Dördüncü grup ise şirketin kendisi ve büyük ortakları. Şirket kendi paylarını geri alabilir. Ama burada sıkı bir kural var: yöneticiler ve içeriden bilgiye erişenler, henüz açıklanmamış bilgiyi kullanarak işlem yapamaz. Buna içeriden öğrenenlerin ticareti denir ve yasaktır.

Bu oyuncuları birbirinden ayıran en önemli şey zaman ufku. Biri bir saat sonrasını düşünüyor, biri üç ayı, bir emeklilik fonu on beş yılı. Üçü de aynı hisseye aynı fiyattan girebilir ama üçünün başarı tanımı farklıdır.

Son olarak yaygın bir yanılgı: "Büyükler aldıysa vardır bir bildikleri." Kurumsalların daha çok kaynağı var, bu doğru. Ama daha fazla bilgiye erişimleri yok; çünkü şirketler önemli gelişmeleri KAP üzerinden herkese aynı anda duyurmak zorunda. Üstelik büyük olmak yanılmamak demek değil.

Dokuzuncu adımı da mühürledin. Bir sonraki derste Çaylak seviyesini kapatıyoruz ve her şeyi tek bir kuralda birleştiriyoruz: risk ile getiri.`,

  // Ders 10 — Risk ve Getiri İlişkisi — lesson_id 57 — ses kaydı gelince açılacak
  57: `Ortak, Çaylak seviyesinin son dersini tamamladın. Toparlayalım.

Bu ders yeni bir konu değildi; dokuz dersin ortak paydasıydı. Tek bir kural: getiri beklentisi ile belirsizlik birbirinden ayrılamaz.

Önce bir yanlış anlamayı düzelttik. Risk "kaybetmek" demek değil, sonucun önceden bilinememesi demek. Yani belirsizlik. Risk bir tehlike değil, bir aralık; aralık genişledikçe hem yukarısı hem aşağısı uzuyor.

Sonra en önemli mantık zincirine geldik. Gerçekten risksiz ve yüksek getirili bir fırsat olsaydı ne olurdu? Herkes oraya yönelirdi, fiyat yükselirdi, getiri düşerdi. Yani fırsat herkes fark ettiği anda kendini yok eder. Yüksek getirinin ayakta kalmasının tek yolu, insanların ondan çekinmesidir. Çekindikleri şey de risktir. Risk, yüksek getirinin bekçisidir.

Bir merdiven çizdik. En altta getirisi belli araçlar, sonra tahviller, sonra paylar, en üstte kaldıraçlı türevler. Her basamakta beklenti biraz artıyor, belirsizlik de biraz artıyor.

Ama merdivenin en altında durmanın da bir bedeli var. Parayı hiç değerlendirmezsen sayı olarak kaybetmezsin, ama enflasyon alım gücünü zamanla azaltır. Yani riske girmemek diye bir seçenek yok; hangi riski taşıyacağını seçmek var. Bu seçim kişiye göre değişir ve doğru cevabı ancak sen verebilirsin.

Bir de karşına çıkacak bir teklif var: "Aylık yüzde 20, garantili." Artık biliyorsun. Böyle bir şey mümkün olsaydı o kişinin seni araması gerekmezdi. Garanti getiri ifadesi bir fırsat işareti değil, uyarı işaretidir.

Son olarak doğru soru. "Bu yatırım ne kadar kazandırır" sorusunu kimse cevaplayamaz. Ama "işler kötüye giderse ne kadar kayba dayanabilirim" sorusunu sen cevaplayabilirsin. İyi yatırımcı geleceği daha iyi tahmin eden değil, kendi sınırlarını daha iyi bilen kişidir.

Çaylak seviyesini tamamladın ortak. Şirketten paya, halka arzdan borsaya, fiyattan riske kadar geldik. Şimdi ekrana geçiyoruz: hesap nasıl açılır, emir nasıl verilir, o ekranda ne yazar. Çırak seviyesinde görüşürüz.`,
};
