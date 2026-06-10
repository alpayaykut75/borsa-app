import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../App';
import TabScreenHeader from '../components/TabScreenHeader';
import { MOONO_CHARACTER_AVATAR } from '../src/constants/avatars';
import {
  fetchExtraPracticeSet,
  fetchLearningHubSnapshot,
  recordExtraPracticeAnswer,
  submitDailyQuizAnswer,
  type DailyQuizPayload,
  type ReinforcementCard,
} from '../src/services/learningHubService';
import { neutrals, spacing, typography } from '../src/constants/theme';
import { useSfx } from '../src/hooks/useSfx';
import ScalePressable from '../components/ScalePressable';
import AppButton from '../components/AppButton';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'GrowthCenter'>;

const palette = {
  bg: '#000000',
  border: '#333333',
  text: '#FFFFFF',
  muted: '#8A8A8A',
  accent: '#00C4CC',
  success: '#16A34A',
  danger: '#DC2626',
};

export default function GrowthCenterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { playSound } = useSfx();
  const [quiz, setQuiz] = useState<DailyQuizPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlot, setActiveSlot] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [extraCards, setExtraCards] = useState<ReinforcementCard[] | null>(null);
  const [extraSlot, setExtraSlot] = useState(1);
  const [extraSubmitting, setExtraSubmitting] = useState(false);
  const [extraLoading, setExtraLoading] = useState(false);
  const [extraError, setExtraError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const introOverlayOpacity = useRef(new Animated.Value(0)).current;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const snapshot = await fetchLearningHubSnapshot();
    if (!snapshot.dailyQuiz.ok) {
      setQuiz(null);
      setError(snapshot.dailyQuiz.error ?? 'Günlük quiz yüklenemedi.');
      setLoading(false);
      return;
    }
    const sortedCards = (snapshot.dailyQuiz.cards ?? []).slice().sort((a, b) => a.slotIndex - b.slotIndex);
    const firstUnanswered = sortedCards.find((c) => !c.answered);
    setActiveSlot(firstUnanswered?.slotIndex ?? sortedCards[0]?.slotIndex ?? 1);
    setExtraCards(null);
    setExtraSlot(1);
    setExtraError(null);
    setShowIntro(true);
    setQuiz(snapshot.dailyQuiz);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const cards = useMemo(
    () => (quiz?.cards ?? []).slice().sort((a, b) => a.slotIndex - b.slotIndex),
    [quiz?.cards],
  );
  const current = cards.find((c) => c.slotIndex === activeSlot) ?? cards[0] ?? null;
  const dailyCompleted = quiz?.status === 'completed';
  const isExtraMode = !!extraCards;
  const currentExtra = (extraCards ?? []).find((c) => c.slotIndex === extraSlot) ?? (extraCards ?? [])[0] ?? null;

  const onSubmit = async (selectedOptionId: string) => {
    if (!current || current.answered || submitting) return;
    setSubmitting(true);
    const payload = await submitDailyQuizAnswer({
      slotIndex: current.slotIndex,
      selectedOptionId,
    });
    if (!payload.ok) {
      setError(payload.error ?? 'Cevap kaydedilemedi.');
      setSubmitting(false);
      return;
    }
    const isCorrect = selectedOptionId === current.correctOptionId;
    if (isCorrect) {
      if (payload.status === 'completed') {
        playSound('complete', { volume: 0.34 });
      } else {
        playSound('correct', { volume: 0.3, maxDurationMs: 240 });
      }
    } else {
      playSound('error', { volume: 0.32, maxDurationMs: 250 });
    }
    setQuiz(payload);
    setSubmitting(false);
  };

  const goNext = () => {
    if (!current || !current.answered) return;
    const next = cards.find((card) => card.slotIndex > current.slotIndex && !card.answered);
    if (next) setActiveSlot(next.slotIndex);
  };

  const startExtraPractice = async () => {
    if (!quiz || extraLoading) return;
    setExtraLoading(true);
    setExtraError(null);
    const payload = await fetchExtraPracticeSet({
      count: 2,
      excludeQuestionIds: (quiz.cards ?? []).map((card) => card.id),
    });
    if (!payload.ok || !payload.cards || payload.cards.length === 0) {
      setExtraError(payload.error ?? 'Ekstra pekiştirme şu an hazır değil.');
      setExtraLoading(false);
      return;
    }
    const sorted = payload.cards.slice().sort((a, b) => a.slotIndex - b.slotIndex);
    setExtraCards(sorted);
    setExtraSlot(sorted[0]?.slotIndex ?? 1);
    setExtraLoading(false);
  };

  const submitExtra = async (selectedOptionId: string) => {
    if (!currentExtra || currentExtra.answered || extraSubmitting) return;
    setExtraSubmitting(true);
    const isCorrect = selectedOptionId === currentExtra.correctOptionId;
    const updatedCards = (extraCards ?? []).map((card) =>
      card.id === currentExtra.id
        ? {
            ...card,
            selectedOptionId,
            answered: isCorrect,
            isCorrect,
            explanation: isCorrect ? 'Doğru cevap.' : null,
          }
        : card,
    );
    if (isCorrect) {
      const allDoneAfterAnswer = updatedCards.length > 0 && updatedCards.every((card) => card.answered);
      if (allDoneAfterAnswer) {
        playSound('complete', { volume: 0.34 });
      } else {
        playSound('correct', { volume: 0.3, maxDurationMs: 240 });
      }
    } else {
      playSound('error', { volume: 0.32, maxDurationMs: 250 });
    }
    setExtraCards(updatedCards);
    await recordExtraPracticeAnswer({
      questionId: currentExtra.id,
      topicKey: currentExtra.topicKey,
      selectedOptionId,
      correctOptionId: currentExtra.correctOptionId,
    });
    setExtraSubmitting(false);
  };

  const goNextExtra = () => {
    if (!currentExtra || !currentExtra.answered) return;
    const next = (extraCards ?? []).find((card) => card.slotIndex > currentExtra.slotIndex && !card.answered);
    if (next) setExtraSlot(next.slotIndex);
  };

  const extraProgress = useMemo(() => {
    const cardsList = extraCards ?? [];
    const answered = cardsList.filter((card) => card.answered).length;
    return {
      total: cardsList.length,
      completed: cardsList.length > 0 && answered >= cardsList.length,
    };
  }, [extraCards]);

  useEffect(() => {
    const shouldShowIntroOverlay = showIntro && !dailyCompleted && !isExtraMode;
    if (!shouldShowIntroOverlay) return;
    introOverlayOpacity.setValue(0);
    Animated.timing(introOverlayOpacity, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [dailyCompleted, introOverlayOpacity, isExtraMode, showIntro]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <TabScreenHeader
          title="Gelişim Merkezi"
          subtitle="Hatalarını güce çevirelim"
          avatarImage={MOONO_CHARACTER_AVATAR}
          moonoAvatarCrop
          trailing={(
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={palette.text} />
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={palette.accent} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <AppButton title="Tekrar Dene" onPress={load} style={styles.ctaButton} />
        </View>
      ) : !current ? (
        <View style={styles.center}>
          <Text style={styles.muted}>Bugünlük quiz hazır değil.</Text>
        </View>
      ) : showIntro && !dailyCompleted && !isExtraMode ? (
        <Animated.View style={[styles.overlay, { opacity: introOverlayOpacity }]}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>Hazır mısın ortak?</Text>
            <Text style={styles.overlayBody}>
              Bugüne kadar yaptığın hatalardan mini bir pekiştirme testi hazırladım.
            </Text>
            <AppButton
              title="Hazırım, başlayalım"
              onPress={() => setShowIntro(false)}
              variant="secondary"
              style={styles.overlayPrimaryBtn}
            />
            <AppButton
              title="Şimdi değil"
              onPress={() => navigation.goBack()}
              variant="ghost"
              style={styles.overlayGhostBtn}
            />
          </View>
        </Animated.View>
      ) : dailyCompleted && !isExtraMode ? (
        <View style={styles.body}>
          <View style={[styles.heroCard, styles.heroCardPremium]}>
            <Text style={styles.heroTitle}>Bugünlük tamamlandı</Text>
            <Text style={styles.summaryText}>
              3 soruyu tamamladın. İstersen iki ek soruyla pekiştirebiliriz.
            </Text>
            {!!extraError && <Text style={[styles.error, styles.heroInlineError]}>{extraError}</Text>}
            <AppButton
              title={extraLoading ? 'Hazırlanıyor...' : '+2 Ekstra Pekiştirme'}
              onPress={startExtraPractice}
              disabled={extraLoading}
              style={styles.heroPrimaryBtn}
            />
          </View>
        </View>
      ) : isExtraMode && currentExtra ? (
        <View style={styles.body}>
          <View style={styles.questionWrap}>
            <Text style={styles.questionIndex}>
              Ekstra {Math.min(currentExtra.slotIndex, extraProgress.total)}/{extraProgress.total}
            </Text>
            <Text style={styles.questionText}>{currentExtra.prompt}</Text>
          </View>

          <View style={styles.optionsWrap}>
            {currentExtra.options.map((option) => {
              const isAnswered = currentExtra.answered;
              const isSelectedOpen = !isAnswered && currentExtra.selectedOptionId === option.id;
              const isSelectedFinal = isAnswered && currentExtra.selectedOptionId === option.id;
              const isOpenWrong = isSelectedOpen && currentExtra.isCorrect === false;
              const isGreen = isSelectedFinal && currentExtra.isCorrect;
              const isRed = isSelectedFinal && currentExtra.isCorrect === false;
              return (
                <ScalePressable
                  key={option.id}
                  disabled={isAnswered || extraSubmitting}
                  onPress={() => submitExtra(option.id)}
                  style={[
                    styles.optionCard,
                    isSelectedOpen && styles.optionSelected,
                    isOpenWrong && styles.optionWrong,
                    isGreen && styles.optionCorrect,
                    isRed && styles.optionWrong,
                  ]}
                >
                  <Text style={styles.optionText}>{option.text}</Text>
                </ScalePressable>
              );
            })}
          </View>

          {extraProgress.completed ? (
            <>
              <View style={styles.heroCard}>
                <Text style={styles.heroTitle}>Ekstra tur tamamlandı</Text>
                <Text style={styles.summaryText}>Harika, tüm soruları tamamladın.</Text>
              </View>
              <AppButton title="Bitir" onPress={() => navigation.goBack()} style={styles.ctaButton} />
            </>
          ) : currentExtra.answered ? (
            <AppButton title="Sonraki Soru" onPress={goNextExtra} style={styles.ctaButton} />
          ) : null}
        </View>
      ) : (
        <View style={styles.body}>
          <View style={styles.questionWrap}>
            <Text style={styles.questionIndex}>Soru {current.slotIndex}/3</Text>
            <Text style={styles.questionText}>{current.prompt}</Text>
          </View>

          <View style={styles.optionsWrap}>
            {current.options.map((option) => {
              const isAnswered = current.answered;
              const isSelectedOpen = !isAnswered && current.selectedOptionId === option.id;
              const isSelectedFinal = isAnswered && current.selectedOptionId === option.id;
              const isOpenWrong = isSelectedOpen && current.isCorrect === false;
              const isGreen = isSelectedFinal && current.isCorrect;
              const isRed = isSelectedFinal && current.isCorrect === false;
              return (
                <ScalePressable
                  key={option.id}
                  disabled={isAnswered || submitting}
                  onPress={() => onSubmit(option.id)}
                  style={[
                    styles.optionCard,
                    isSelectedOpen && styles.optionSelected,
                    isOpenWrong && styles.optionWrong,
                    isGreen && styles.optionCorrect,
                    isRed && styles.optionWrong,
                  ]}
                >
                  <Text style={styles.optionText}>{option.text}</Text>
                </ScalePressable>
              );
            })}
          </View>

          {current.answered ? (
            <AppButton title="Sonraki Soru" onPress={goNext} style={styles.ctaButton} />
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.bg },
  headerWrap: { marginBottom: -6 },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  error: { color: palette.danger, textAlign: 'center' },
  muted: { ...typography.body, color: palette.muted },
  body: { flex: 1, paddingHorizontal: spacing.md, paddingBottom: spacing.lg },
  heroCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: neutrals.borderStrong,
    backgroundColor: '#101214',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  heroCardPremium: {
    borderColor: 'rgba(38, 214, 222, 0.45)',
    shadowColor: '#00C4CC',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },
  heroTitle: { ...typography.h2, color: palette.text, marginBottom: spacing.xs },
  summaryText: { ...typography.body, color: neutrals.textSoft, lineHeight: 22 },
  heroInlineError: { marginTop: spacing.xs, marginBottom: 2 },
  heroPrimaryBtn: { marginTop: spacing.sm },
  questionWrap: {
    borderWidth: 1,
    borderColor: neutrals.borderStrong,
    borderRadius: 14,
    backgroundColor: '#121416',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  questionIndex: { ...typography.caption, color: palette.accent, marginBottom: spacing.xs },
  questionText: {
    color: palette.text,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  optionsWrap: { gap: spacing.xs, marginBottom: spacing.sm },
  optionCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: neutrals.borderSoft,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  optionSelected: { borderColor: palette.accent, backgroundColor: '#0E2C2E' },
  optionCorrect: { borderColor: palette.success, backgroundColor: '#133520' },
  optionWrong: { borderColor: palette.danger, backgroundColor: '#391B1B' },
  optionText: { ...typography.body, color: palette.text },
  ctaButton: {},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    zIndex: 30,
  },
  overlayCard: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: neutrals.borderStrong,
    backgroundColor: '#101214',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  overlayTitle: {
    color: '#FFFFFF',
    ...typography.h1,
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  overlayBody: {
    ...typography.body,
    color: neutrals.textOverlay,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  overlayPrimaryBtn: {
    alignSelf: 'stretch',
    marginBottom: spacing.xs,
  },
  overlayGhostBtn: {
    alignSelf: 'stretch',
    marginTop: spacing.xs,
  },
});
