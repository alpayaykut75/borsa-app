import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

/**
 * "Sıra sende" (mission) adımı — dersin 14. adımı.
 *
 * lesson_steps.metadata şeması:
 * {
 *   "variant": "pick_reason" | "scenario",
 *   "category": "Düşünce",                  // isteğe bağlı küçük etiket
 *   "prompt": "Soru metni",
 *   "options": [{ "id": "b", "title": "...", "desc": "...", "icon": "storefront-outline", "outcome_label": "..." }],
 *
 *   // variant = pick_reason
 *   "reason_prompt": "Neden? En önemli sebebini seç:",
 *   "reasons": ["...", "..."],
 *   "feedback": "Seçimden sonra çıkan not. {secim} yerine seçilen seçeneğin adı gelir.",
 *
 *   // variant = scenario
 *   "scenario_prompt": "Şimdi bir yıl ileri saralım...",
 *   "scenarios": [{ "id": "good", "label": "İyi yıl",
 *                   "outcomes": { "<optionId>": { "value": "+140.000 ₺", "note": "..." } } }],
 *   "disclaimer": "Rakamlar örnektir, gerçek bir teklif değildir.",
 *   "feedback": "İsteğe bağlı: tüm senaryolar görülünce çıkan not."
 * }
 * Doğru/yanlış cevap yoktur; adım, kullanıcı etkileşimi bitirince tamamlanır.
 */

export type MissionOption = {
  id: string;
  title: string;
  desc?: string;
  icon?: string;
  /** Senaryo sonuç kartındaki başlık (ör. "BORÇ VEREN"); yoksa title kullanılır */
  outcome_label?: string;
};
export type MissionScenario = {
  id: string;
  label: string;
  outcomes: Record<string, { value: string; note?: string }>;
};
export type MissionMetadata = {
  variant?: 'pick_reason' | 'scenario';
  category?: string;
  prompt?: string;
  options?: MissionOption[];
  reason_prompt?: string;
  reasons?: string[];
  feedback?: string;
  scenario_prompt?: string;
  scenarios?: MissionScenario[];
  disclaimer?: string;
};

type Props = {
  metadata: MissionMetadata;
  /** done: Devam Et açılsın mı; hint: kapalıyken düğmede yazacak metin */
  onStateChange: (state: { done: boolean; hint: string }) => void;
};

const c = {
  accent: '#00C4CC',
  accentDeep: '#0B3A3C',
  card: '#141616',
  cardAlt: '#1C1F1F',
  border: '#2C3030',
  text: '#F5F5F3',
  muted: '#A3A8A8',
  faint: '#8A8F8F',
};

export default function MissionStep({ metadata, onStateChange }: Props) {
  const variant = metadata.variant === 'scenario' ? 'scenario' : 'pick_reason';
  const options = Array.isArray(metadata.options) ? metadata.options : [];
  const reasons = Array.isArray(metadata.reasons) ? metadata.reasons : [];
  const scenarios = Array.isArray(metadata.scenarios) ? metadata.scenarios : [];

  const [choice, setChoice] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [tab, setTab] = useState<string | null>(scenarios[0]?.id ?? null);
  const [seen, setSeen] = useState<Record<string, boolean>>({});

  const picked = options.find((o) => o.id === choice);
  const allSeen = scenarios.length > 0 && scenarios.every((s) => seen[s.id]);

  const { done, hint } = useMemo(() => {
    if (variant === 'scenario') {
      if (!choice) return { done: false, hint: 'Bir seçenek seç' };
      if (!allSeen) return { done: false, hint: `${scenarios.length > 1 ? 'Tüm senaryolara' : 'Senaryoya'} bak` };
      return { done: true, hint: '' };
    }
    if (!choice) return { done: false, hint: 'Seçimini yap' };
    if (reasons.length > 0 && !reason) return { done: false, hint: 'Bir sebep seç' };
    return { done: true, hint: '' };
  }, [variant, choice, reason, allSeen, reasons.length, scenarios.length]);

  useEffect(() => {
    onStateChange({ done, hint });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, hint]);

  const pickOption = (id: string) => {
    setChoice(id);
    if (variant === 'scenario' && tab) setSeen((prev) => ({ ...prev, [tab]: true }));
  };

  const pickTab = (id: string) => {
    setTab(id);
    setSeen((prev) => ({ ...prev, [id]: true }));
  };

  const feedbackText = (metadata.feedback ?? '').replace(/\{secim\}/g, picked?.title ?? '');
  const showPickFeedback = variant === 'pick_reason' && done && feedbackText.length > 0;
  const showScenarioFeedback = variant === 'scenario' && done && feedbackText.length > 0;
  const activeScenario = scenarios.find((s) => s.id === tab);

  return (
    <View style={styles.wrap}>
      <View style={styles.badgeRow}>
        <Ionicons name="locate-outline" size={18} color={c.accent} />
        <Text style={styles.badge}>SIRA SENDE</Text>
      </View>
      <Text style={styles.badgeSub}>
        Pratik zamanı{metadata.category ? ` · ${metadata.category}` : ''}
      </Text>
      {!!metadata.prompt && <Text style={styles.prompt}>{metadata.prompt}</Text>}

      {variant === 'pick_reason' ? (
        <View style={styles.optionList}>
          {options.map((o) => {
            const on = choice === o.id;
            return (
              <TouchableOpacity
                key={o.id}
                style={[styles.optionCard, on && styles.optionCardOn]}
                activeOpacity={0.85}
                onPress={() => pickOption(o.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
              >
                <View style={[styles.iconBox, on && styles.iconBoxOn]}>
                  <Ionicons name={o.icon || 'ellipse-outline'} size={26} color={on ? '#000000' : c.accent} />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{o.title}</Text>
                  {!!o.desc && <Text style={styles.optionDesc}>{o.desc}</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.optionGrid}>
          {options.map((o) => {
            const on = choice === o.id;
            return (
              <TouchableOpacity
                key={o.id}
                style={[styles.gridCard, on && styles.gridCardOn]}
                activeOpacity={0.85}
                onPress={() => pickOption(o.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
              >
                <Ionicons name={o.icon || 'ellipse-outline'} size={26} color={on ? c.accent : c.text} />
                <Text style={styles.gridTitle}>{o.title}</Text>
                {!!o.desc && <Text style={styles.gridDesc}>{o.desc}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {variant === 'pick_reason' && !!choice && reasons.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{metadata.reason_prompt || 'Neden? En önemli sebebini seç:'}</Text>
          <View style={styles.chipRow}>
            {reasons.map((r) => {
              const on = reason === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.chip, on && styles.chipOn]}
                  activeOpacity={0.85}
                  onPress={() => setReason(r)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                >
                  <Text style={[styles.chipText, on && styles.chipTextOn]}>{r}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {variant === 'scenario' && !!choice && scenarios.length > 0 && (
        <View style={styles.section}>
          {!!metadata.scenario_prompt && <Text style={styles.sectionLabel}>{metadata.scenario_prompt}</Text>}
          <View style={styles.tabs}>
            {scenarios.map((s) => {
              const on = tab === s.id;
              return (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.tab, on && styles.tabOn]}
                  activeOpacity={0.85}
                  onPress={() => pickTab(s.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: on }}
                >
                  <Text style={[styles.tabText, on && styles.tabTextOn]}>{s.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.outcomeList}>
            {options.map((o) => {
              const out = activeScenario?.outcomes?.[o.id];
              if (!out) return null;
              const on = choice === o.id;
              return (
                <View key={o.id} style={[styles.outcome, on ? styles.outcomeOn : styles.outcomeOff]}>
                  <Text style={styles.outcomeLabel}>{(o.outcome_label || o.title).toLocaleUpperCase('tr-TR')}</Text>
                  <Text style={styles.outcomeValue}>{out.value}</Text>
                  {!!out.note && <Text style={styles.outcomeNote}>{out.note}</Text>}
                </View>
              );
            })}
          </View>
          {!!metadata.disclaimer && <Text style={styles.disclaimer}>{metadata.disclaimer}</Text>}
        </View>
      )}

      {(showPickFeedback || showScenarioFeedback) && (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>{feedbackText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 4, paddingBottom: 12 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  badge: { fontSize: 14, fontWeight: '800', letterSpacing: 1.8, color: c.accent },
  badgeSub: { fontSize: 12, color: c.muted, textAlign: 'center', marginTop: 4, fontWeight: '600' },
  prompt: {
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 27,
    color: c.text,
    textAlign: 'center',
    marginTop: 12,
  },
  optionList: { gap: 10, marginTop: 18 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 18,
    backgroundColor: c.card,
    borderWidth: 2,
    borderColor: c.border,
  },
  optionCardOn: { borderColor: c.accent },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: c.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxOn: { backgroundColor: c.accent },
  optionText: { flex: 1, minWidth: 0 },
  optionTitle: { fontSize: 17, fontWeight: '700', color: c.text },
  optionDesc: { fontSize: 13, color: c.muted, marginTop: 3, lineHeight: 18 },
  optionGrid: { flexDirection: 'row', gap: 10, marginTop: 16 },
  gridCard: {
    flex: 1,
    padding: 14,
    minHeight: 132,
    borderRadius: 18,
    backgroundColor: c.card,
    borderWidth: 2,
    borderColor: c.border,
  },
  gridCardOn: { backgroundColor: c.accentDeep, borderColor: c.accent },
  gridTitle: { fontSize: 16, fontWeight: '800', color: c.text, marginTop: 8 },
  gridDesc: { fontSize: 13, color: c.text, opacity: 0.85, marginTop: 4, lineHeight: 18 },
  section: { marginTop: 18 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: c.muted, lineHeight: 20 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  chip: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: c.card,
    borderWidth: 1,
    borderColor: c.border,
    justifyContent: 'center',
  },
  chipOn: { backgroundColor: c.accent, borderColor: c.accent },
  chipText: { fontSize: 14, fontWeight: '600', color: c.text },
  chipTextOn: { color: '#000000' },
  tabs: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
    backgroundColor: c.card,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 16,
    padding: 4,
  },
  tab: { flex: 1, minHeight: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabOn: { backgroundColor: c.accent },
  tabText: { fontSize: 14, fontWeight: '700', color: c.text },
  tabTextOn: { color: '#000000' },
  outcomeList: { gap: 8, marginTop: 12 },
  outcome: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 16, backgroundColor: c.card, borderWidth: 2 },
  outcomeOn: { borderColor: c.accent },
  outcomeOff: { borderColor: c.border, opacity: 0.7 },
  outcomeLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1, color: c.muted },
  outcomeValue: { fontSize: 18, fontWeight: '800', color: c.text, marginTop: 4 },
  outcomeNote: { fontSize: 13, color: c.muted, marginTop: 2, lineHeight: 18 },
  disclaimer: { fontSize: 12, color: c.faint, marginTop: 8 },
  feedback: {
    marginTop: 16,
    backgroundColor: c.accentDeep,
    borderWidth: 1,
    borderColor: c.accent,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  feedbackText: { fontSize: 15, lineHeight: 22, color: c.text },
});
