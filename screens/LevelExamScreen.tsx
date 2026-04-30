import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '../lib/supabase';
import { markLevelExamPassed } from '../lib/runtimeProgress';
import type { RootStackParamList } from '../App';
import { useSfx } from '../src/hooks/useSfx';

type Props = NativeStackScreenProps<RootStackParamList, 'LevelExam'>;

type ExamOption = { id: 'a' | 'b' | 'c'; text: string };
type ExamQuestion = {
  question: string;
  options: ExamOption[];
  correct_option_id: 'a' | 'b' | 'c';
  explanation?: string;
};

type LevelExam = {
  id: string;
  level_code: string;
  title: string;
  intro_text: string;
  pass_threshold: number;
  questions: ExamQuestion[];
};

const NEXT_LEVEL_TITLES: Record<number, string> = {
  1: 'Çaylak',
  2: 'Analist',
  3: 'Stratejist',
  4: 'Profesyonel',
  5: 'Usta',
};

const trNormalize = (value: string) =>
  value
    .replace(/Cok/g, 'Çok')
    .replace(/cok/g, 'çok')
    .replace(/guzel/g, 'güzel')
    .replace(/ilerledin/g, 'ilerledin')
    .replace(/sinav/g, 'sınav')
    .replace(/Sinav/g, 'Sınav')
    .replace(/ogrendiklerini/g, 'öğrendiklerini')
    .replace(/olcecek/g, 'ölçecek')
    .replace(/Toplam/g, 'Toplam')
    .replace(/soru var/g, 'soru var')
    .replace(/gecmek/g, 'geçmek')
    .replace(/Gecmek/g, 'Geçmek')
    .replace(/icin/g, 'için')
    .replace(/en az/g, 'en az')
    .replace(/dogru/g, 'doğru')
    .replace(/yapman gerekiyor/g, 'yapman gerekiyor')
    .replace(/bir sonraki seviyeye/g, 'bir sonraki seviyeye');

const FIXED_TR_QUESTIONS: Array<{ question: string; options: string[] }> = [
  {
    question: "Borsa İstanbul'da işlemlerin güvenle sonuçlanmasını sağlayan (takas/saklama) kurum hangisidir?",
    options: ['Takasbank', 'SPK', 'İMKB'],
  },
  {
    question: 'Bir hisse senedi aldığınızda teknik olarak ne yapmış olursunuz?',
    options: [
      'Şirkete kredi açmış olursunuz',
      'Şirketin kârına ve varlıklarına ortak olursunuz',
      'Şirket yönetimine dahil olursunuz',
    ],
  },
  {
    question: 'Enflasyonun birikimler üzerindeki en temel olumsuz etkisi nedir?',
    options: ['Hisse fiyatlarının düşmesi', 'Paranın alım gücünün erimesi', 'Bankadaki hesap numarasının değişmesi'],
  },
  {
    question: 'Borsada "Sistemik Risk" neyi ifade eder?',
    options: [
      'Tüm piyasayı etkileyen genel kriz durumlarını',
      'Sadece teknoloji hisselerindeki düşüşü',
      'Şirket içindeki özel yönetici hatalarını',
    ],
  },
  {
    question: 'Borsa İstanbul için "şeffaflık" ilkesi neden kritiktir?',
    options: [
      'Şirketlerin vergi borçlarını silmek için',
      'Bilginin tüm yatırımcılara aynı anda ulaşması için',
      'Borsa binasını korumak için',
    ],
  },
  {
    question: '"Boğa Piyasası" hangi piyasa ruh halini temsil eder?',
    options: ['İyimserlik, yükseliş ve coşku', 'Karamsarlık, düşüş ve korku', 'Yatay seyir'],
  },
  {
    question: 'Bir hissenin fiyatı arz ve talep dengesinde ne zaman yükselir?',
    options: ['Arz talepten büyük olduğunda', 'İşlem hacmi azaldığında', 'Talep arzdan büyük olduğunda'],
  },
  {
    question: '"Trader" ile "Yatırımcı" arasındaki en önemli fark nedir?',
    options: [
      'Traderların zenginliği',
      'Hedeflenen zaman dilimi ve piyasaya ayrılan mesai',
      'Yatırımcıların borsa binasına girme zorunluluğu',
    ],
  },
  {
    question: 'Yatırım fonlarının (hazır sepetlerin) en büyük kolaylığı nedir?',
    options: ['Kazanç garantisi', 'Tek işlemle birçok şirkete ortak olma imkanı', 'Hiçbir ücret almamaları'],
  },
  {
    question: 'Hisse senedi fiyatının temel dayanağı nedir?',
    options: ['Sadece ekranın rengi', 'Şirketin kârlılığı, büyümesi ve potansiyeli', 'Devletin belirlediği sabit fiyat'],
  },
  {
    question: '"Çeşitlendirme" (sepet yapmak) neyi hedefler?',
    options: ['Daha fazla vergi ödemeyi', 'Tek şirketten çok kâr etmeyi', 'Tek varlıktaki riski dengelemeyi'],
  },
  {
    question: 'Borsa İstanbul\'daki "Gözetim Sistemleri"nin asıl görevi nedir?',
    options: [
      'Kurallara aykırı veya manipülatif işlemleri tespit etmek',
      'Yatırımcıların kişisel bilgilerini paylaşmak',
      'Şirketlerin ürün fiyatlarını belirlemek',
    ],
  },
  {
    question: '"Temettü" dağıtımı yatırımcıya ne sağlar?',
    options: [
      'Şirketin tüm borçlarını üstlenme sorumluluğu',
      'Elde edilen kârdan pay alma imkanı',
      'Şirketin yönetim kuruluna ömür boyu üyelik',
    ],
  },
  {
    question: 'Yatırım yaparken "borç" kullanılmaması neden önemlidir?',
    options: [
      'Borçlu kişilerin borsaya girişi yasak olduğu için',
      'Geri ödeme baskısıyla panik kararlar almamak için',
      'Borç paranın borsada değer taşımaması',
    ],
  },
  {
    question: 'Hisse senedi fiyatı neden anlık değişir?',
    options: [
      'Borsa binasındaki ışıklar değiştikçe',
      'Bilgi ve beklentiler güncellendikçe',
      'Şirketler her saniye yeni hisse bastığı için',
    ],
  },
  {
    question: 'Bilinçli bir yatırımcı için "Risk" kavramı nasıl tanımlanır?',
    options: [
      'Borsanın bir oyun alanı olması',
      'Öngörülemeyen sonuçların ihtimalidir',
      'Borsanın sadece çok zenginlere uygun olması',
    ],
  },
  {
    question: 'Yatırımcının en büyük dostu hangisidir?',
    options: ['Hızlı al-sat yapmak', 'Zaman ve disiplin', 'Şans faktörü'],
  },
  {
    question: '"Ayı Piyasası"nda bir yatırımcının en büyük hatası nedir?',
    options: [
      'Şirketine güvenip planına sadık kalması',
      'Sepetini kontrol etmesi',
      'Korkuyla hisseyi zararına satıp kaçması',
    ],
  },
  {
    question: "Borsa İstanbul'daki bir şirket neden halka arz olur?",
    options: ['İsimlerini daha popüler yapmak için', 'Yatırımcıdan sermaye alarak büyümek için', 'Vergi ödemelerini tamamen durdurmak için'],
  },
  {
    question: 'Seviye 1\'in sonunda ulaşılan "yatırımcı zihniyeti" nedir?',
    options: [
      'En çok hisseyi alanın kazandığı bir yarış',
      'Şansına güvenip zenginleşme çabası',
      'Değer üreten yapılara ortak olup disiplinle beklemek',
    ],
  },
];

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
  success: '#16A34A',
  danger: '#DC2626',
};

export default function LevelExamScreen({ route, navigation }: Props) {
  const { unitId, unitTitle } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exam, setExam] = useState<LevelExam | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b' | 'c'>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { playSound } = useSfx();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const levelCode = `S${unitId}`;
      const { data, error } = await supabase
        .from('level_exams')
        .select('id, level_code, title, intro_text, metadata')
        .eq('level_code', levelCode)
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const metadata = data?.metadata as
        | { pass_threshold?: number; questions?: ExamQuestion[] }
        | undefined;
      const questions = Array.isArray(metadata?.questions) ? metadata?.questions : [];

      if (!data || questions.length === 0) {
        setError('Bu seviye icin aktif gecis sinavi bulunamadi.');
        setLoading(false);
        return;
      }

      setExam({
        id: data.id,
        level_code: data.level_code,
        title: data.title,
        intro_text: data.intro_text,
        pass_threshold: metadata?.pass_threshold ?? 15,
        questions: questions.map((q, idx) => {
          const fixed = FIXED_TR_QUESTIONS[idx];
          if (!fixed) return q;
          return {
            ...q,
            question: fixed.question,
            options: q.options.map((opt, optIdx) => ({
              ...opt,
              text: fixed.options[optIdx] ?? opt.text,
            })),
          };
        }),
      });
      setLoading(false);
    })();
  }, [unitId]);

  const score = useMemo(() => {
    if (!exam) return 0;
    return exam.questions.reduce((acc, q, index) => {
      return acc + (answers[index] === q.correct_option_id ? 1 : 0);
    }, 0);
  }, [answers, exam]);

  const answeredCount = Object.keys(answers).length;
  // unitId = tamamlanan mevcut seviye. Sonraki seviye başlığı bu map'ten gelir.
  const nextLevelTitle = NEXT_LEVEL_TITLES[unitId] || 'bir üst seviye';
  const heroTitle = `${nextLevelTitle} olmaya hazır mısın?`;
  const screenTitle = `Seviye ${unitId} Geçiş Sınavı`;
  const motivationalIntro = trNormalize(
    `Çok güzel ilerledin. Bu sınav, Seviye ${unitId} boyunca öğrendiklerini tek bir odakta birleştirmen için hazırlandı. ${exam?.questions.length ?? 20} soruda sakin kalıp doğru bildiklerine güven. ${nextLevelTitle} seviyesine geçmek için en az ${exam?.pass_threshold ?? 15} doğru yapman gerekiyor; gereken güç sende var, şimdi bunu gösterme zamanı.`
  );

  const handleFinish = () => {
    if (!exam) return;
    if (score >= exam.pass_threshold) {
      playSound('complete');
    } else {
      playSound('error');
    }
    setSubmitted(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.center}>
          <ActivityIndicator color={palette.accent} />
          <Text style={styles.muted}>Seviye sinavi yukleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !exam) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color={palette.text} />
          </TouchableOpacity>
          <View style={styles.center}>
            <Text style={styles.errorText}>{error || 'Sinav acilamadi.'}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color={palette.text} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{screenTitle}</Text>
            <Text style={styles.headerSub}>
              {hasStarted ? `${answeredCount}/${exam.questions.length} yanıt` : 'Sonraki seviyeye geçiş için son adım'}
            </Text>
          </View>
        </View>

        {!hasStarted ? (
          <View style={styles.introLayout}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '0%' }]} />
            </View>
            <View style={styles.card}>
              <Text style={styles.tag}>SEVİYE GEÇİŞ SINAVI</Text>
              <Text style={styles.hero}>{heroTitle}</Text>
              <Text style={styles.intro}>
                {motivationalIntro}
              </Text>
            </View>
            <View style={styles.introSpacer} />
            <TouchableOpacity style={[styles.primaryButton, styles.footerButton]} onPress={() => setHasStarted(true)}>
              <Text style={styles.primaryButtonText}>Sınava Başla</Text>
            </TouchableOpacity>
          </View>
        ) : submitted ? (
          <View style={styles.activeExamLayout}>
            <ScrollView style={styles.activeExamScroll} contentContainerStyle={styles.scroll}>
              <View style={styles.card}>
                <Text style={styles.tag}>SEVİYE GEÇİŞ SINAVI</Text>
                <Text style={styles.resultTitle}>Skorun: {score}/{exam.questions.length}</Text>
                <Text style={[styles.resultText, score >= exam.pass_threshold ? styles.ok : styles.no]}>
                  {score >= exam.pass_threshold
                    ? 'Tebrikler, seviye geçiş sınavını tamamladın.'
                    : `Barajı geçmek için en az ${exam.pass_threshold} doğru gerekli.`}
                </Text>
              </View>

              {exam.questions.filter((q, idx) => answers[idx] !== q.correct_option_id).length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.tag}>Yanlışların ve Doğrular</Text>
                  {exam.questions.map((q, idx) => {
                    const selected = answers[idx];
                    if (selected === q.correct_option_id) return null;
                    const selectedText = q.options.find((o) => o.id === selected)?.text ?? 'Boş';
                    const correctText = q.options.find((o) => o.id === q.correct_option_id)?.text ?? '-';
                    return (
                      <View key={`wrong-${idx}`} style={styles.wrongRow}>
                        <Text style={styles.wrongQuestion}>{idx + 1}. {q.question}</Text>
                        <Text style={styles.wrongText}>Senin cevabın: {selectedText}</Text>
                        <Text style={styles.correctText}>Doğru cevap: {correctText}</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </ScrollView>

            {score >= exam.pass_threshold ? (
              <TouchableOpacity
                style={[styles.primaryButton, styles.footerButton]}
                onPress={() => {
                  markLevelExamPassed(unitId);
                  navigation.replace('Completion', {
                    unitId,
                    unitTitle,
                    isUnitCompleted: true,
                    levelExamPassed: true,
                  });
                }}
              >
                <Text style={styles.primaryButtonText}>Seviyeyi Tamamla</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.primaryButton, styles.footerButton]}
                onPress={() => {
                  playSound('correct', { volume: 0.2, maxDurationMs: 180 });
                  setSubmitted(false);
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                }}
              >
                <Text style={styles.primaryButtonText}>Sınavı Tekrar Çöz</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.activeExamLayout}>
            <ScrollView style={styles.activeExamScroll} contentContainerStyle={styles.scroll}>
              <View style={styles.card}>
                <Text style={styles.tag}>SEVİYE GEÇİŞ SINAVI</Text>
                <Text style={styles.cardProgress}>
                  Soru {currentQuestionIndex + 1}/{exam.questions.length}
                </Text>
                <Text style={styles.question}>
                  {currentQuestionIndex + 1}. {exam.questions[currentQuestionIndex].question}
                </Text>
                {exam.questions[currentQuestionIndex].options.map((opt) => {
                  const isSelected = answers[currentQuestionIndex] === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={[styles.option, isSelected && styles.optionSelected]}
                      onPress={() => setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: opt.id }))}
                    >
                      <Text style={styles.optionText}>{opt.text}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                styles.footerButton,
                answers[currentQuestionIndex] == null && styles.disabled,
              ]}
              disabled={answers[currentQuestionIndex] == null}
              onPress={() => {
                if (currentQuestionIndex >= exam.questions.length - 1) {
                  handleFinish();
                } else {
                  playSound('correct', { volume: 0.2, maxDurationMs: 180 });
                  setCurrentQuestionIndex((prev) => prev + 1);
                }
              }}
            >
              <Text style={styles.primaryButtonText}>
                {currentQuestionIndex >= exam.questions.length - 1 ? 'Sınavı Bitir' : 'Sıradaki Soru'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  container: { flex: 1, paddingHorizontal: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { marginTop: 10, color: palette.muted },
  errorText: { color: palette.danger, textAlign: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 18 },
  headerTextContainer: { flexShrink: 1 },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: palette.accent, fontSize: 24, fontWeight: '800' },
  headerSub: { color: palette.muted, marginTop: 2 },
  scroll: { paddingBottom: 24 },
  activeExamLayout: { flex: 1 },
  activeExamScroll: { flex: 1 },
  introLayout: { flex: 1 },
  introSpacer: { flex: 1 },
  card: {
    backgroundColor: palette.card,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 26,
    marginBottom: 24,
  },
  tag: {
    color: palette.accent,
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontSize: 13,
  },
  hero: { color: palette.text, fontSize: 48, lineHeight: 54, fontWeight: '800', marginBottom: 14 },
  intro: { color: palette.text, fontSize: 17, lineHeight: 28, marginBottom: 12 },
  cardProgress: {
    fontSize: 16,
    color: palette.muted,
    fontWeight: '500',
    marginBottom: 8,
  },
  question: { color: palette.text, fontSize: 24, lineHeight: 36, fontWeight: '700', marginBottom: 10 },
  option: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    backgroundColor: '#1A1A1A',
  },
  optionSelected: { borderColor: palette.accent, backgroundColor: '#06383A' },
  optionText: { color: palette.text },
  primaryButton: {
    backgroundColor: palette.accent,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 4,
  },
  footerButton: {
    width: '100%',
    marginTop: 10,
  },
  primaryButtonText: { color: '#000', fontWeight: '800', fontSize: 16 },
  disabled: { opacity: 0.4 },
  resultTitle: { color: palette.text, fontSize: 20, fontWeight: '800', marginBottom: 8 },
  resultText: { fontSize: 15, lineHeight: 22 },
  ok: { color: palette.success },
  no: { color: palette.danger },
  wrongRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  wrongQuestion: {
    color: palette.text,
    lineHeight: 22,
  },
  wrongText: {
    marginTop: 6,
    color: '#FCA5A5',
  },
  correctText: {
    marginTop: 4,
    color: '#86EFAC',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#111111',
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: palette.accent,
  },
});
