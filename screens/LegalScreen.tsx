import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
};

type Section = 'privacy' | 'terms' | 'disclaimer';

const SECTIONS: { key: Section; title: string; icon: string }[] = [
  { key: 'privacy', title: 'Gizlilik Politikası', icon: 'shield-checkmark-outline' },
  { key: 'terms', title: 'Kullanım Koşulları', icon: 'document-text-outline' },
  { key: 'disclaimer', title: 'Yatırım Uyarısı', icon: 'warning-outline' },
];

export default function LegalScreen({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('privacy');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yasal Bilgiler</Text>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={palette.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        {SECTIONS.map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[styles.tab, activeSection === s.key && styles.tabActive]}
            activeOpacity={0.8}
            onPress={() => setActiveSection(s.key)}
          >
            <Ionicons name={s.icon as any} size={20} color={activeSection === s.key ? palette.accent : palette.muted} />
            <Text style={[styles.tabText, activeSection === s.key && styles.tabTextActive]}>{s.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {activeSection === 'privacy' && <PrivacyPolicy />}
        {activeSection === 'terms' && <TermsOfService />}
        {activeSection === 'disclaimer' && <Disclaimer />}
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function Paragraph({ children }: { children: string }) {
  return <Text style={styles.paragraph}>{children}</Text>;
}

function LastUpdated() {
  return <Text style={styles.lastUpdated}>Son güncelleme: 14 Mayıs 2026</Text>;
}

function PrivacyPolicy() {
  return (
    <View>
      <SectionTitle>Gizlilik Politikası</SectionTitle>
      <LastUpdated />

      <Paragraph>
        Moono ("biz", "uygulama") olarak kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu politika, uygulamamızı kullanırken hangi verilerin toplandığını, nasıl kullanıldığını ve nasıl korunduğunu açıklar.
      </Paragraph>

      <SectionTitle>Toplanan Veriler</SectionTitle>
      <Paragraph>
        • E-posta adresi: Hesap oluşturma ve giriş işlemleri için{'\n'}
        • Profil bilgileri: Ad, soyad, yaş, ülke, cinsiyet (isteğe bağlı, cihazda saklanır){'\n'}
        • Ders ilerleme verileri: Tamamlanan dersler ve quiz sonuçları{'\n'}
        • Kullanım verileri: Uygulama içi etkileşimler ve oturum bilgileri
      </Paragraph>

      <SectionTitle>Verilerin Kullanım Amacı</SectionTitle>
      <Paragraph>
        • Hesabınızı oluşturmak ve yönetmek{'\n'}
        • Ders ilerlemenizi kaydetmek ve senkronize etmek{'\n'}
        • Uygulama deneyimini iyileştirmek{'\n'}
        • Teknik sorunları tespit etmek ve gidermek
      </Paragraph>

      <SectionTitle>Veri Saklama ve Güvenlik</SectionTitle>
      <Paragraph>
        Verileriniz Supabase altyapısı üzerinde, endüstri standardı şifreleme yöntemleriyle korunmaktadır. Profil bilgileri (ad, yaş vb.) yalnızca cihazınızda saklanır ve sunuculara gönderilmez.
      </Paragraph>

      <SectionTitle>Üçüncü Taraf Paylaşımı</SectionTitle>
      <Paragraph>
        Kişisel verilerinizi üçüncü taraflarla paylaşmıyoruz, satmıyoruz veya kiralamıyoruz. Yalnızca yasal zorunluluk durumlarında yetkili makamlarla paylaşılabilir.
      </Paragraph>

      <SectionTitle>Haklarınız</SectionTitle>
      <Paragraph>
        KVKK ve GDPR kapsamında verilerinize erişim, düzeltme ve silme haklarına sahipsiniz. Bu haklarınızı kullanmak için alpay.aykut@gmail.com adresinden bize ulaşabilirsiniz.
      </Paragraph>

      <SectionTitle>Hesap Silme</SectionTitle>
      <Paragraph>
        Hesabınızı ve tüm verilerinizi kalıcı olarak silmek istiyorsanız alpay.aykut@gmail.com adresine e-posta göndererek talepte bulunabilirsiniz. Talebiniz en geç 30 gün içinde işleme alınacaktır.
      </Paragraph>

      <SectionTitle>İletişim</SectionTitle>
      <Paragraph>
        Gizlilik politikamızla ilgili sorularınız için:{'\n'}
        E-posta: alpay.aykut@gmail.com
      </Paragraph>
    </View>
  );
}

function TermsOfService() {
  return (
    <View>
      <SectionTitle>Kullanım Koşulları</SectionTitle>
      <LastUpdated />

      <Paragraph>
        Moono uygulamasını kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Lütfen dikkatlice okuyunuz.
      </Paragraph>

      <SectionTitle>Hizmet Tanımı</SectionTitle>
      <Paragraph>
        Moono, finansal okuryazarlık eğitimi sunan bir mobil uygulamadır. Borsa, yatırım ve finans kavramlarını interaktif dersler aracılığıyla öğretmeyi amaçlar.
      </Paragraph>

      <SectionTitle>Kullanıcı Yükümlülükleri</SectionTitle>
      <Paragraph>
        • Kayıt sırasında doğru ve güncel bilgiler sağlamak{'\n'}
        • Hesap güvenliğini korumak ve şifrenizi paylaşmamak{'\n'}
        • Uygulamayı yasa dışı amaçlarla kullanmamak{'\n'}
        • İçerikleri izinsiz kopyalamamak veya dağıtmamak
      </Paragraph>

      <SectionTitle>Fikri Mülkiyet</SectionTitle>
      <Paragraph>
        Uygulamadaki tüm içerikler (dersler, görseller, metinler, sesler) Moono'ya aittir ve telif hakları ile korunmaktadır. İzinsiz çoğaltılması, dağıtılması veya ticari amaçla kullanılması yasaktır.
      </Paragraph>

      <SectionTitle>Sorumluluk Sınırı</SectionTitle>
      <Paragraph>
        Moono, sunulan eğitim içeriklerinin doğruluğu konusunda azami özeni gösterir, ancak içeriklerin eksiksiz veya hatasız olduğunu garanti etmez. Uygulama içerikleri yatırım tavsiyesi niteliği taşımaz.
      </Paragraph>

      <SectionTitle>Abonelik ve Ödemeler</SectionTitle>
      <Paragraph>
        Uygulamanın bazı özellikleri ücretli abonelik gerektirebilir. Abonelikler Apple App Store üzerinden işlenir ve Apple'ın ödeme koşulları geçerlidir. Abonelik iptali için Apple ayarlarınızdan işlem yapabilirsiniz.
      </Paragraph>

      <SectionTitle>Değişiklikler</SectionTitle>
      <Paragraph>
        Bu koşulları önceden bildirimde bulunarak güncelleme hakkımız saklıdır. Güncellemeler yayınlandığında uygulamayı kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.
      </Paragraph>

      <SectionTitle>İletişim</SectionTitle>
      <Paragraph>
        Kullanım koşullarıyla ilgili sorularınız için:{'\n'}
        E-posta: alpay.aykut@gmail.com
      </Paragraph>
    </View>
  );
}

function Disclaimer() {
  return (
    <View>
      <SectionTitle>Yatırım Uyarısı</SectionTitle>
      <LastUpdated />

      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          Moono bir eğitim uygulamasıdır. Yatırım tavsiyesi verme yetkim ve bilgim yoktur.
        </Text>
      </View>

      <Paragraph>
        Bu uygulamada yer alan tüm içerikler yalnızca finansal okuryazarlık eğitimi amacıyla hazırlanmıştır. Hiçbir içerik, doğrudan veya dolaylı olarak yatırım tavsiyesi, alım-satım önerisi veya finansal danışmanlık olarak değerlendirilmemelidir.
      </Paragraph>

      <SectionTitle>Önemli Hatırlatmalar</SectionTitle>
      <Paragraph>
        • Sermaye piyasalarında yapılan işlemler risk içerir ve yatırılan sermayenin kısmen veya tamamen kaybedilmesi mümkündür.{'\n\n'}
        • Geçmiş performans gelecekteki sonuçların göstergesi değildir.{'\n\n'}
        • Yatırım kararlarınızı daima kendi araştırmanıza, risk toleransınıza ve gerektiğinde lisanslı bir yatırım danışmanının görüşüne dayandırınız.{'\n\n'}
        • Moono, kullanıcıların yatırım kararları sonucunda uğrayabileceği herhangi bir zarardan sorumlu tutulamaz.
      </Paragraph>

      <SectionTitle>Yasal Dayanak</SectionTitle>
      <Paragraph>
        Bu uygulama, 6362 sayılı Sermaye Piyasası Kanunu kapsamında yatırım danışmanlığı veya portföy yönetimi hizmeti sunmamaktadır. Uygulama içerikleri tamamen eğitim amaçlıdır.
      </Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.text,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
  },
  tabActive: {
    borderColor: palette.accent + '66',
    backgroundColor: palette.accent + '15',
  },
  tabText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  tabTextActive: {
    color: palette.accent,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  lastUpdated: {
    color: palette.accent,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  warningBox: {
    backgroundColor: palette.accent + '15',
    borderWidth: 1,
    borderColor: palette.accent + '44',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  warningText: {
    color: palette.accent,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
});
