import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { FREE_LESSONS_IN_FIRST_UNIT } from '../src/constants/premium';

const palette = {
  accent: '#00C4CC',
  card: '#1A1A1A',
  border: '#333333',
  text: '#FFFFFF',
  muted: '#888888',
};

type Props = {
  onPremiumPress?: () => void;
  compact?: boolean;
};

export default function FreeTierInfoCard({ onPremiumPress, compact = false }: Props) {
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <View style={styles.headerRow}>
        <Ionicons name="gift-outline" size={22} color={palette.accent} />
        <Text style={styles.title}>Ücretsiz sürüm</Text>
      </View>
      <Text style={styles.body}>
        İlk {FREE_LESSONS_IN_FIRST_UNIT} ders bedava — Seviye 1&apos;de rahatça başla. Devam etmek ve tüm
        içeriği açmak için Premium&apos;a geçebilirsin.
      </Text>
      {onPremiumPress ? (
        <TouchableOpacity style={styles.linkBtn} activeOpacity={0.85} onPress={onPremiumPress}>
          <Text style={styles.linkText}>Premium&apos;a geç</Text>
          <Ionicons name="chevron-forward" size={18} color={palette.accent} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 196, 204, 0.35)',
    padding: 16,
    gap: 10,
  },
  cardCompact: {
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.accent,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: palette.muted,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.accent,
  },
});
