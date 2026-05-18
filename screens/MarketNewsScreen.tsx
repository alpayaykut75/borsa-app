import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
// @ts-expect-error - types may be missing
import { Ionicons } from '@expo/vector-icons';
import TabScreenHeader from '../components/TabScreenHeader';
import { fetchMarketTurkey, type MarketQuoteCard } from '../src/services/marketTurkeyService';
import { fetchMoonoDailyBrief, type MoonoDailyBriefPayload } from '../src/services/moonoDailyBriefService';
import { MOONO_CHARACTER_AVATAR } from '../src/constants/avatars';
import {
  briefStatusHint,
  formatQuotesUpdatedTr,
  formatYmdTrLabel,
  getBriefDisplayYmd,
  getHeaderDateYmd,
  QUOTES_REFRESH_MS,
  shouldRegenerateDailyBrief,
} from '../src/utils/marketRefreshSchedule';

/** Moono / AIScreen ile aynı marka renkleri */
const DEEP_SPACE_BLACK = '#000000';
const NEON_CYAN = '#00C4CC';

const palette = {
  background: DEEP_SPACE_BLACK,
  card: '#1A1A1A',
  border: '#333333',
  accent: NEON_CYAN,
  text: '#FFFFFF',
  muted: '#888888',
  danger: '#EF4444',
  upBg: '#0D2E2A',
  downBg: '#2E1518',
};

const QUOTE_ORDER = ['bist100', 'usdtry', 'eurtry', 'gramaltin'] as const;

const MARKET_DISCLAIMER_MAIN =
  'Değerlere dayalı olarak yatırım tavsiyesi verilmiyor. Veriler gecikebilir; kaynaklara bağlı olarak hatalı olabilir.';

function buildFooterParagraph(disclaimers: string[]): string {
  let text =
    'Sabah kahvesi metninde yurtiçi gündemi, Hürriyet ile NTV ekonomi RSS başlıklarından ve Finnhub üzerinden Türkiye ile ilişkili haber özetleriyle harmanlıyoruz; yurtdışı bölümünü ise Finnhub genel finans akışından derliyoruz. ' +
    'Üstteki göstergelerde BİST 100 için önce Finnhub, gerekirse Yahoo Finance kotasyonu; Amerikan doları ve avronun Türk lirası karşılığı için Yahoo Finance; gram altın için ise uluslararası ons fiyatını (Finnhub veya Yahoo Finance) Türkiye Cumhuriyet Merkez Bankası’nın yayımladığı dolar kuruyla birleştirerek yaklaşık Türk lirası cinsinden gösteriyoruz. ' +
    'Bu ekrandaki hiçbir bilgi alım satım veya yatırım tavsiyesi değildir; kotasyonlar ve özetler gecikmeli, eksik veya kaynak hatası içerebilir. Moono özeti yapay zekâ ile oluşturulduğundan, önemli kararlarınızda başlıkları ve rakamları resmî kaynaklarla mutlaka doğrulamanızı öneririz.';

  const extras = disclaimers
    .map((d) => d.trim())
    .filter((d) => d.length > 0 && d !== MARKET_DISCLAIMER_MAIN);

  const tail: string[] = [];
  if (extras.some((e) => e.includes('TCMB / altın'))) {
    tail.push(
      'Bu oturumda Merkez Bankası veya altın tarafındaki verilerin bir kısmına ulaşılamamış olabilir; ilgili kutular o zaman boş veya kısmi görünebilir.',
    );
  }
  if (extras.some((e) => e.includes('Türkiye anahtar kelime'))) {
    tail.push(
      'Türkiye odaklı haber sayısı düşük kaldığında, kısa süreliğine daha geniş küresel finans başlıklarıyla desteklenmiş olabilirsiniz.',
    );
  }
  for (const e of extras) {
    if (e.includes('TCMB / altın') || e.includes('Türkiye anahtar kelime')) continue;
    tail.push(e);
  }
  if (tail.length > 0) {
    text += ' ' + tail.join(' ');
  }
  return text;
}

function splitParas(s: string): string[] {
  return s
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function sortQuotes(list: MarketQuoteCard[]): MarketQuoteCard[] {
  const rank = (id: string) => {
    const i = (QUOTE_ORDER as readonly string[]).indexOf(id);
    return i === -1 ? 999 : i;
  };
  return [...list].sort((a, b) => rank(a.id) - rank(b.id));
}

function BriefCard({
  title,
  highlight,
  titleAccent,
  children,
}: {
  title: string;
  highlight?: boolean;
  titleAccent?: boolean;
  children: ReactNode;
}) {
  return (
    <View style={[styles.briefCard, highlight && styles.briefCardHighlight]}>
      <Text style={[styles.briefCardTitle, titleAccent && styles.briefCardTitleAccent]}>{title}</Text>
      {children}
    </View>
  );
}

function BriefParas({ text }: { text: string }) {
  return (
    <>
      {splitParas(text).map((p, i) => (
        <Text key={i} style={styles.briefBody}>
          {p}
        </Text>
      ))}
    </>
  );
}

function MetricTile({ item }: { item: MarketQuoteCard }) {
  const up = item.up;
  const cardBg =
    up === true ? palette.upBg : up === false ? palette.downBg : palette.card;

  const displayValue = (() => {
    const raw = item.value.replace(',', '.');
    const n = Number(raw);
    if (!Number.isFinite(n)) return item.value;
    if (item.id === 'usdtry' || item.id === 'eurtry') {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    }
    if (item.id === 'gramaltin') {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  })();

  return (
    <View
      style={[
        styles.metricTile,
        { backgroundColor: cardBg, borderLeftColor: palette.accent, borderLeftWidth: 4 },
      ]}
    >
      <Text style={[styles.metricLabel, { color: palette.accent }]}>{item.label}</Text>
      <Text style={styles.metricValue}>{displayValue}</Text>
      {item.changeText ? (
        <Text
          style={[
            styles.metricChange,
            up === true ? styles.upTxt : up === false ? styles.downTxt : styles.mutedTxt,
          ]}
          numberOfLines={2}
        >
          {up === true ? '▲ ' : up === false ? '▼ ' : ''}
          {item.changeText}
        </Text>
      ) : null}
    </View>
  );
}

export default function MarketNewsScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<MarketQuoteCard[]>([]);
  const [disclaimers, setDisclaimers] = useState<string[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [moono, setMoono] = useState<MoonoDailyBriefPayload | null>(null);
  const [moonoError, setMoonoError] = useState<string | null>(null);
  /** Gece 00:00 ve 08:30 tarih geçişleri için (dakikada bir). */
  const [clockTick, setClockTick] = useState(0);

  const sortedQuotes = useMemo(() => sortQuotes(quotes), [quotes]);

  const footerParagraph = useMemo(() => buildFooterParagraph(disclaimers), [disclaimers]);

  useEffect(() => {
    const id = setInterval(() => setClockTick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const headerDateLabel = useMemo(
    () => formatYmdTrLabel(getHeaderDateYmd()),
    [clockTick],
  );
  const briefCardDateLabel = useMemo(
    () => formatYmdTrLabel(getBriefDisplayYmd(moono?.briefDate)),
    [moono?.briefDate, clockTick],
  );
  const quotesUpdatedLabel = useMemo(() => formatQuotesUpdatedTr(fetchedAt), [fetchedAt]);
  const briefStatus = useMemo(() => briefStatusHint(moono?.briefDate), [moono?.briefDate, clockTick]);

  const refreshQuotes = useCallback(async (silent = false) => {
    if (!silent) setError(null);
    try {
      const marketRes = await fetchMarketTurkey();
      if (!marketRes.ok) {
        if (!silent) {
          setError(marketRes.error ?? 'Göstergeler yüklenemedi');
          setQuotes([]);
          setDisclaimers([]);
        }
        return;
      }
      setQuotes(marketRes.quotes ?? []);
      setDisclaimers(marketRes.disclaimers ?? []);
      setFetchedAt(marketRes.fetchedAt ?? null);
    } catch {
      if (!silent) setError('Bağlantı hatası.');
    }
  }, []);

  const refreshBrief = useCallback(async () => {
    setMoonoError(null);
    try {
      let moonoRes = await fetchMoonoDailyBrief();
      if (
        moonoRes.ok &&
        shouldRegenerateDailyBrief(moonoRes.briefDate)
      ) {
        const regenerated = await fetchMoonoDailyBrief({ forceRegenerate: true });
        if (regenerated.ok) moonoRes = regenerated;
      }
      if (moonoRes.ok) {
        setMoono(moonoRes);
      } else {
        setMoono(null);
        setMoonoError(moonoRes.error ?? 'Özet yüklenemedi.');
      }
    } catch {
      setMoono(null);
      setMoonoError('Bağlantı hatası.');
    }
  }, []);

  const load = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      await Promise.all([refreshQuotes(!isRefresh), refreshBrief()]);
      setLoading(false);
      setRefreshing(false);
    },
    [refreshQuotes, refreshBrief],
  );

  useEffect(() => {
    load();
  }, [load]);

  /** Göstergeler: 15 dakikada bir (sessiz; tam ekran yükleme yok). */
  useEffect(() => {
    const id = setInterval(() => {
      refreshQuotes(true);
    }, QUOTES_REFRESH_MS);
    return () => clearInterval(id);
  }, [refreshQuotes]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <StatusBar style="light" />
        <ActivityIndicator color={palette.accent} size="large" />
        <Text style={styles.stateText}>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="light" />
      <TabScreenHeader
        title="Sabah Kahvesi"
        subtitle={headerDateLabel || undefined}
        hint={briefStatus ?? undefined}
        avatarImage={MOONO_CHARACTER_AVATAR}
        moonoAvatarCrop
        trailing={
          <TouchableOpacity onPress={() => load(false)} accessibilityLabel="Yenile" style={styles.iconBtn}>
            <Ionicons name="refresh" size={22} color={palette.accent} />
          </TouchableOpacity>
        }
      />

      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={palette.accent} />
        }
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metricsGrid}>
          {sortedQuotes.length > 0 ? (
            sortedQuotes.map((q) => <MetricTile key={q.id} item={q} />)
          ) : !error ? (
            <Text style={styles.placeholder}>Gösterge verisi yok.</Text>
          ) : null}
        </View>

        {quotesUpdatedLabel ? (
          <Text style={styles.quotesUpdated}>{quotesUpdatedLabel}</Text>
        ) : null}

        {moono?.ok && moono.format === 2 && moono.opening ? (
          <View style={[styles.briefCard, styles.briefCardHighlight]}>
            {briefCardDateLabel ? (
              <Text style={styles.briefDateLine}>Özet · {briefCardDateLabel}</Text>
            ) : null}
            <BriefParas text={moono.opening} />
            <Text style={styles.briefSectionLabel}>Yurtiçi</Text>
            <BriefParas text={moono.domestic ?? ''} />
            <Text style={styles.briefSectionLabel}>Yurtdışı</Text>
            <BriefParas text={moono.international ?? ''} />
          </View>
        ) : moono?.ok && moono.format === 1 && moono.fullText ? (
          <>
            <BriefCard title="Özet" highlight>
              <BriefParas text={moono.fullText} />
            </BriefCard>
            <View style={styles.briefCard}>
              <Text style={styles.briefMeta}>
                Uygulamayı güncelle veya özetin yeni formatta üretilmesi için sunucuda yeniden dağıtım yap.
              </Text>
            </View>
          </>
        ) : (
          <View style={[styles.briefCard, { marginHorizontal: 20 }]}>
            <Text style={styles.moonoFallback}>{moonoError ?? 'Özet hazırlanıyor.'}</Text>
          </View>
        )}

        <Text style={styles.footerDisclaimerPlain}>{footerParagraph}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  center: { justifyContent: 'center', alignItems: 'center' },
  stateText: { marginTop: 12, color: palette.muted, fontSize: 14 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 0, paddingBottom: 120 },
  briefDateLine: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.muted,
    marginBottom: 14,
  },
  iconBtn: { padding: 8, marginRight: -4 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 4,
    paddingHorizontal: 20,
  },
  quotesUpdated: {
    fontSize: 11,
    color: palette.muted,
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 4,
  },
  metricTile: {
    width: '48%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: palette.border,
    minHeight: 96,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: palette.text,
  },
  metricChange: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 6,
    lineHeight: 14,
  },
  upTxt: { color: '#34D399' },
  downTxt: { color: '#F87171' },
  mutedTxt: { color: palette.muted },
  /** Ders kartları (UnitPathItem) ile aynı çerçeve / radius; metin biraz daha büyük */
  briefCard: {
    marginTop: 14,
    backgroundColor: palette.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
  },
  briefCardHighlight: {
    borderColor: palette.accent,
    borderWidth: 2,
  },
  briefCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 12,
  },
  briefCardTitleAccent: {
    color: palette.accent,
  },
  briefBody: {
    fontSize: 16,
    lineHeight: 26,
    color: palette.text,
    fontWeight: '400',
    marginBottom: 14,
  },
  briefMeta: {
    fontSize: 12,
    lineHeight: 18,
    color: palette.muted,
    fontWeight: '500',
  },
  briefSectionLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: palette.accent,
    marginTop: 18,
    marginBottom: 10,
  },
  footerDisclaimerPlain: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 32,
    fontSize: 11,
    lineHeight: 18,
    color: palette.muted,
  },
  moonoFallback: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  placeholder: { color: palette.muted, fontSize: 13, marginBottom: 8, paddingHorizontal: 20 },
  errorBanner: {
    marginHorizontal: 16,
    marginBottom: 6,
    padding: 12,
    backgroundColor: palette.downBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
  },
  errorText: { color: palette.danger, fontWeight: '700', fontSize: 13 },
});
