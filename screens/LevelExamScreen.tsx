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
  1: 'Çırak',
  2: 'Analist',
  3: 'Stratejist',
  4: 'Usta',
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
        questions,
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
