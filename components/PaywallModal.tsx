import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { FREE_LESSONS_IN_FIRST_UNIT } from '../src/constants/premium';

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
  danger: '#EF4444',
};

type Props = {
  visible: boolean;
  title?: string;
  subtitle?: string;
  priceString: string | null;
  purchaseError: string | null;
  isPurchasing: boolean;
  onClose: () => void;
  onPurchase: () => void;
  onRestore: () => void;
};

const BENEFITS = [
  'Tüm seviye ve derslere erişim',
  'Moono yapay zeka asistanı',
  'Seviye geçiş sınavları',
  'Tek ödeme — ömür boyu',
];

export default function PaywallModal({
  visible,
  title,
  subtitle,
  priceString,
  purchaseError,
  isPurchasing,
  onClose,
  onPurchase,
  onRestore,
}: Props) {
  const displayTitle = title ?? 'Premium';
  const displaySubtitle =
    subtitle ??
    `İlk ${FREE_LESSONS_IN_FIRST_UNIT} ders ücretsiz. Devam etmek için Premium al.`;
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={28} color={palette.muted} />
          </TouchableOpacity>

          <View style={styles.hero}>
            <View style={styles.iconCircle}>
              <Ionicons name="diamond" size={36} color={palette.accent} />
            </View>
            <Text style={styles.title}>{displayTitle}</Text>
            <Text style={styles.subtitle}>{displaySubtitle}</Text>
          </View>

          <View style={styles.benefits}>
            {BENEFITS.map((item) => (
              <View key={item} style={styles.benefitRow}>
                <Ionicons name="checkmark-circle" size={22} color={palette.accent} />
                <Text style={styles.benefitText}>{item}</Text>
              </View>
            ))}
          </View>

          {purchaseError ? <Text style={styles.errorText}>{purchaseError}</Text> : null}

          <TouchableOpacity
            style={[styles.purchaseBtn, isPurchasing && styles.btnDisabled]}
            activeOpacity={0.85}
            onPress={onPurchase}
            disabled={isPurchasing}
          >
            {isPurchasing ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text style={styles.purchaseBtnText}>
                {priceString ? `${priceString} — Satın Al` : 'Satın Al'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreBtn}
            activeOpacity={0.7}
            onPress={onRestore}
            disabled={isPurchasing}
          >
            <Text style={styles.restoreText}>Satın Alımları Geri Yükle</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  container: { flex: 1, paddingHorizontal: 24, paddingBottom: 24 },
  closeBtn: { alignSelf: 'flex-end', padding: 8, marginTop: 8 },
  hero: { alignItems: 'center', marginTop: 8, marginBottom: 32 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,196,204,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,196,204,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 32, fontWeight: '800', color: palette.accent, marginBottom: 10 },
  subtitle: {
    fontSize: 16,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  benefits: { gap: 14, marginBottom: 28 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  benefitText: { flex: 1, fontSize: 16, color: palette.text },
  errorText: {
    color: palette.danger,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  purchaseBtn: {
    backgroundColor: palette.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  purchaseBtnText: { color: '#000', fontSize: 17, fontWeight: '700' },
  btnDisabled: { opacity: 0.6 },
  restoreBtn: { alignItems: 'center', paddingVertical: 12 },
  restoreText: { color: palette.muted, fontSize: 15, fontWeight: '600' },
});
