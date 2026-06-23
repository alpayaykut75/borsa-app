import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { Paths, File } from 'expo-file-system';
import Markdown from 'react-native-markdown-display';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { supabase } from '../lib/supabase';
import type { RootStackParamList } from '../App';
import { useSfx } from '../src/hooks/useSfx';
import { usePremium } from '../src/contexts/PremiumContext';
import { HIDE_AUDIO_STEPS_TEMPORARILY, LESSONS_WITH_AUDIO_READY } from '../src/constants/devFlags';
import {
  AUDIO_CAPTION_WINDOW_WORDS,
  AUDIO_STEP_HEADLINE,
  AUDIO_STEP_SUBLINE,
  LESSON_AUDIO_TRANSCRIPTS,
} from '../src/constants/lessonAudioTranscripts';
import { isLastFreeLessonInFirstUnit } from '../src/constants/premium';

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  cardAlt: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
  success: '#16A34A',
  danger: '#DC2626',
};

const AUDIO_CAPTION_LINE_HEIGHT = 26;
const AUDIO_CAPTION_VISIBLE_LINES = 7;
/** Sabit 7 satır; flex ile büyütülmez — Devam Et ile çakışmasın. */
const AUDIO_CAPTION_CLIP_HEIGHT = AUDIO_CAPTION_LINE_HEIGHT * AUDIO_CAPTION_VISIBLE_LINES;

const { width: windowWidth } = Dimensions.get('window');
const flipCardWidth = Math.min(windowWidth - 40, 420);

type LessonStepType = 'read' | 'quiz' | 'flashcard' | 'audio' | 'final_quiz';

type QuizOption = {
  id: string;
  text: string;
};

type FinalQuizQuestion = {
  id?: string;
  question: string;
  options: QuizOption[];
  correct_option_id: string;
  explanation?: string;
};

type StepMetadata = {
  // Quiz metadata
  question?: string;
  options?: QuizOption[] | string[]; // Support both old (string[]) and new (QuizOption[]) formats
  correctAnswer?: number | string; // Legacy: Can be index (number) or option id (string)
  correct_option_id?: string; // New format: option ID (string)
  explanation?: string;
  // Flashcard metadata
  back?: string; // Legacy
  front_text?: string;
  back_text?: string;
  // Audio metadata
  audioUrl?: string; // Legacy
  audio_url?: string;
  // Final quiz metadata
  questions?: FinalQuizQuestion[];
  pass_threshold?: number;
  // Read metadata
  text?: string;
  body?: string;
  image_keyword?: string;
} | null;

type LessonStep = {
  id: number;
  lesson_id: number;
  order_index: number;
  type: LessonStepType;
  title?: string | null;
  content?: string | null; // Asıl içerik (Soru, Kart Ön Yüzü, Metin)
  metadata: StepMetadata;
};
type QuizState = {
  selectedOptionId?: string;
  selectedIndex?: number; // Keep for backward compatibility
  isCorrect?: boolean;
  feedback?: string;
};

type FinalQuizState = {
  hasStarted: boolean;
  currentQuestionIndex: number;
  selectedAnswers: Record<string, string>;
  isSubmitted: boolean;
  score: number;
};
type AudioCheckpointState = {
  visible: boolean;
  stepId: number | null;
  phase: 'choice' | 'question' | 'result';
  isCorrect: boolean | null;
};
type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

const getFinalQuestionKey = (question: FinalQuizQuestion, index: number): string =>
  question.id?.trim() || `q-${index}`;

const getEffectivePassThreshold = (rawThreshold: unknown, questionCount: number): number => {
  const defaultThreshold = 7;
  const normalizedQuestionCount = Math.max(0, questionCount);
  if (normalizedQuestionCount === 0) return defaultThreshold;

  const parsed =
    typeof rawThreshold === 'number' && Number.isFinite(rawThreshold) && rawThreshold > 0
      ? Math.floor(rawThreshold)
      : defaultThreshold;

  return Math.min(parsed, normalizedQuestionCount);
};

type AudioCaptionCue = {
  start_ms: number;
  end_ms: number;
  text: string;
};

function parseAudioCaptions(metadata: Record<string, unknown> | null | undefined): AudioCaptionCue[] {
  const raw = metadata?.captions;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const cue = item as Record<string, unknown>;
      const text = typeof cue.text === 'string' ? cue.text.trim() : '';
      const start_ms = Number(cue.start_ms ?? cue.startMs ?? 0);
      const end_ms = Number(cue.end_ms ?? cue.endMs ?? 0);
      if (!text || end_ms <= start_ms) return null;
      return { start_ms, end_ms, text };
    })
    .filter((cue): cue is AudioCaptionCue => cue !== null);
}

function resolveAudioTranscriptText(
  metadata: Record<string, unknown> | null | undefined,
  stepLessonId: number,
): string {
  return (
    (typeof metadata?.transcript === 'string' ? metadata.transcript : '') ||
    LESSON_AUDIO_TRANSCRIPTS[stepLessonId] ||
    ''
  ).trim();
}

function tokenizeTranscript(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function getVisibleWordCount(position: number, duration: number, totalWords: number): number {
  if (totalWords === 0) return 0;
  if (duration <= 0) return 0;
  const ratio = Math.min(1, Math.max(0, position / duration));
  return Math.max(1, Math.ceil(ratio * totalWords));
}

function getActiveTimedCaptionIndex(position: number, timedCaptions: AudioCaptionCue[]): number {
  const idx = timedCaptions.findIndex(
    (cue) => position >= cue.start_ms && position < cue.end_ms,
  );
  if (idx >= 0) return idx;
  if (position >= timedCaptions[timedCaptions.length - 1].end_ms) {
    return timedCaptions.length - 1;
  }
  return 0;
}

const emojiMap: Record<string, string> = {
  handshake: '🤝',
  money: '💰',
  chart: '📈',
  business: '💼',
  market: '🏪',
  trade: '📊',
  investment: '💵',
  stock: '📈',
  finance: '💳',
  economy: '🌍',
  success: '✅',
  growth: '📊',
  profit: '💎',
  partnership: '🤝',
  agreement: '📝',
};

export default function LessonScreen({ route, navigation }: Props) {
  const { lessonId, lessonTitle, unitId, unitTitle, entryStatus } = route.params;
  const [steps, setSteps] = useState<LessonStep[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({});
  const [finalQuizState, setFinalQuizState] = useState<FinalQuizState>({
    hasStarted: false,
    currentQuestionIndex: 0,
    selectedAnswers: {},
    isSubmitted: false,
    score: 0,
  });
  const { playSound } = useSfx();
  const { firstUnitId, isPremium } = usePremium();
  const [audioState, setAudioState] = useState<{
    sound: Audio.Sound | null;
    isPlaying: boolean;
    isLoading: boolean;
    position: number;
    duration: number;
  }>({
    sound: null,
    isPlaying: false,
    isLoading: false,
    position: 0,
    duration: 0,
  });
  const [audioStartedStepIds, setAudioStartedStepIds] = useState<Record<number, boolean>>({});
  const [audioRecapPassedStepIds, setAudioRecapPassedStepIds] = useState<Record<number, boolean>>({});
  const [audioCheckpoint, setAudioCheckpoint] = useState<AudioCheckpointState>({
    visible: false,
    stepId: null,
    phase: 'choice',
    isCorrect: null,
  });
  const [flashcardFlipTick, setFlashcardFlipTick] = useState(0);
  const [expandedWrongAnswers, setExpandedWrongAnswers] = useState<Record<string, boolean>>({});
  const [isCompleting, setIsCompleting] = useState(false);
  const flipAnimations = useRef<Record<number, Animated.Value>>({});
  const flippedState = useRef<Record<number, boolean>>({});
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  const loadSteps = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: supabaseError } = await supabase
      .from('lesson_steps')
      .select('id, lesson_id, order_index, type, title, content, metadata')
      .eq('lesson_id', lessonId)
      .order('order_index', { ascending: true });

    if (supabaseError) {
      setError(supabaseError.message);
      setSteps([]);
    } else {
      const normalized = (data ?? [])
        .filter((step) => {
          if (HIDE_AUDIO_STEPS_TEMPORARILY && step.type === 'audio') return false;
          const meta = (step.metadata && typeof step.metadata === 'object') ? (step.metadata as Record<string, unknown>) : null;
          const audioReady =
            step.type === 'audio' && LESSONS_WITH_AUDIO_READY.includes(lessonId);
          if (meta?.hidden_in_app === true && !audioReady) return false;
          if (step.type === 'final_quiz' && meta?.quiz_key === 'S1_LEVEL_FINAL') return false;
          return true;
        })
        .map((step) => {
        // Metadata'yı parse et (JSONB olarak geliyor)
        let parsedMetadata: StepMetadata = null;
        if (step.metadata) {
          if (typeof step.metadata === 'string') {
            try {
              parsedMetadata = JSON.parse(step.metadata);
            } catch {
              parsedMetadata = null;
            }
          } else if (typeof step.metadata === 'object') {
            parsedMetadata = step.metadata as StepMetadata;
          }
        }

        return {
          ...step,
          metadata: parsedMetadata,
        };
      });

      let lastFinalQuizIndex = -1;
      normalized.forEach((s, i) => {
        if (s.type === 'final_quiz') lastFinalQuizIndex = i;
      });
      const withoutTrailingAudio =
        lastFinalQuizIndex >= 0
          ? normalized.filter((s, i) => !(s.type === 'audio' && i > lastFinalQuizIndex))
          : normalized;

      setSteps(withoutTrailingAudio);
      setCurrentIndex(0);
      setQuizState({});
      setFinalQuizState({
        hasStarted: false,
        currentQuestionIndex: 0,
        selectedAnswers: {},
        isSubmitted: false,
        score: 0,
      });
      setExpandedWrongAnswers({});
      setAudioStartedStepIds({});
      setAudioRecapPassedStepIds({});
      setAudioCheckpoint({
        visible: false,
        stepId: null,
        phase: 'choice',
        isCorrect: null,
      });
      flipAnimations.current = {};
      flippedState.current = {};
    }
    setLoading(false);
  }, [lessonId]);

  // Audio mode setup: iOS sessiz modda bile çalması için
  useEffect(() => {
    const setupAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });
      } catch (error) {
        console.log('Audio mode setup error:', error);
      }
    };
    setupAudioMode();
  }, []);

  // Audio cleanup: Sayfadan çıkınca veya adım değişince sesi durdur
  useEffect(() => {
    return () => {
      if (audioState.sound) {
        audioState.sound.unloadAsync().catch(() => {});
      }
    };
  }, [audioState.sound]);


  // Adım değişince sesi durdur
  useEffect(() => {
    const stopAudio = async () => {
      if (audioState.sound) {
        try {
          await audioState.sound.stopAsync();
          await audioState.sound.unloadAsync();
          setAudioState({ sound: null, isPlaying: false, isLoading: false, position: 0, duration: 0 });
        } catch (error) {
          // Ignore errors
        }
      }
    };
    stopAudio();
  }, [currentIndex]);

  useEffect(() => {
    loadSteps();
  }, [loadSteps]);

  // Pulsing animation for audio icon
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnimation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const currentStep = steps[currentIndex];
  const audioCaptionData = useMemo(() => {
    if (currentStep?.type !== 'audio') return null;
    const metadata = (currentStep.metadata || {}) as Record<string, unknown>;
    const timedCaptions = parseAudioCaptions(metadata);

    if (timedCaptions.length > 0) {
      const lines = timedCaptions.map((cue) => cue.text);
      const activeIndex = getActiveTimedCaptionIndex(audioState.position, timedCaptions);
      return { mode: 'timed' as const, lines, activeIndex };
    }

    const transcriptText = resolveAudioTranscriptText(metadata, lessonId);
    const words = tokenizeTranscript(transcriptText);
    const hasStarted = audioState.isPlaying || audioState.position > 0;
    const visibleWordCount = hasStarted
      ? getVisibleWordCount(audioState.position, audioState.duration, words.length)
      : 0;

    return {
      mode: 'words' as const,
      words,
      visibleWordCount,
      activeWordIndex: Math.max(0, visibleWordCount - 1),
      hasTranscript: words.length > 0,
    };
  }, [
    currentStep,
    lessonId,
    audioState.position,
    audioState.duration,
    audioState.isPlaying,
  ]);
  const isCompleted = !loading && steps.length > 0 && currentIndex >= steps.length;
  const progress = steps.length > 0 ? (currentIndex + 1) / steps.length : 0;
  const stepHeaderText = steps.length > 0
    ? `Adım ${Math.min(currentIndex + 1, steps.length)} / ${steps.length}`
    : 'Adım 0 / 0';
  const headerSubtitleText =
    currentStep?.type === 'final_quiz' && finalQuizState.isSubmitted
      ? 'Bölüm Sonu Testi • Sonuç'
      : stepHeaderText;

  const canContinue = useMemo(() => {
    if (!currentStep) return false;
    if (currentStep.type === 'quiz') return quizState.isCorrect === true;
    if (currentStep.type === 'flashcard') return Boolean(flippedState.current[currentStep.id]);
    if (currentStep.type === 'final_quiz') {
      const metadata = currentStep.metadata || {};
      const questions = Array.isArray(metadata.questions) ? metadata.questions : [];
      if (questions.length === 0) return false;
      if (finalQuizState.isSubmitted) return true;
      if (!finalQuizState.hasStarted) return true;

      const currentQuestion = questions[finalQuizState.currentQuestionIndex];
      if (!currentQuestion) return false;
      const currentQuestionKey = getFinalQuestionKey(currentQuestion, finalQuizState.currentQuestionIndex);
      return Boolean(finalQuizState.selectedAnswers[currentQuestionKey]);
    }
    return true;
  }, [currentStep, quizState, finalQuizState, flashcardFlipTick]);

  const handleOptionSelect = (selectedOptionId: string, correctOptionId?: string) => {
    if (quizState.isCorrect) return;
    if (correctOptionId == null) {
      setQuizState({ selectedOptionId, isCorrect: false, feedback: 'Bu soru yapılandırılmamış.' });
      // Error SFX for misconfigured question
      playSound('error');
      return;
    }

    const isCorrect = selectedOptionId === correctOptionId;
    setQuizState({ selectedOptionId, isCorrect });

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('error');
    }
  };

  const handleFinalQuizOptionSelect = (questionId: string, selectedOptionId: string) => {
    if (finalQuizState.isSubmitted) return;
    setFinalQuizState((prev) => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [questionId]: selectedOptionId,
      },
    }));
  };

  const handleReviewLesson = () => {
    setCurrentIndex(0);
    setQuizState({});
    setFinalQuizState({
      hasStarted: false,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isSubmitted: false,
      score: 0,
    });
    setExpandedWrongAnswers({});
    setAudioRecapPassedStepIds({});
  };

  const completeLessonAndNavigate = useCallback(async () => {
    setIsCompleting(true);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setIsCompleting(false);
      Alert.alert('Hata', 'Kullanıcı bilgisi alınamadı. Lütfen tekrar giriş yapın.');
      return;
    }

    // Üç istek birbirinden bağımsız; paralel çalıştırarak bekleme süresini kısaltıyoruz.
    // (Tamamlanan dersler sorgusu upsert'i beklemediği için mevcut ders aşağıda elle ekleniyor.)
    const [{ error: progressError }, { data: unitLessonsData }, { data: completedLessonsData }] =
      await Promise.all([
        supabase.from('user_progress').upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            is_completed: true,
          },
          {
            onConflict: 'user_id,lesson_id',
          }
        ),
        unitId
          ? supabase.from('lessons').select('id, sort_order, title, icon_name').eq('unit_id', unitId)
          : Promise.resolve({ data: null }),
        unitId
          ? supabase.from('user_progress').select('lesson_id').eq('user_id', user.id).eq('is_completed', true)
          : Promise.resolve({ data: null }),
      ]);

    if (progressError) {
      console.warn('İlerleme kaydı hatası:', progressError.message);
    }

    let isUnitCompleted = false;
    let hasNextLessonInUnit = false;
    let showFreeTierEndPaywall = false;
    if (unitId) {
      const isCheckpointExamLesson = (lesson: { title?: string | null; icon_name?: string | null }) => {
        const title = (lesson.title || '').toLowerCase();
        return (
          title.includes('ara değerlendirme') ||
          title.includes('ara degerlendirme') ||
          lesson.icon_name === 'medal-outline' ||
          lesson.icon_name === 'document-text-outline'
        );
      };

      const sortedUnitLessons = [...(unitLessonsData ?? [])].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      );
      const unitLessonIds = sortedUnitLessons.map((lesson) => lesson.id);
      const currentLessonIndex = sortedUnitLessons.findIndex((lesson) => lesson.id === lessonId);
      hasNextLessonInUnit =
        currentLessonIndex >= 0 && currentLessonIndex < sortedUnitLessons.length - 1;

      const currentLesson = currentLessonIndex >= 0 ? sortedUnitLessons[currentLessonIndex] : null;
      const coreLessons = sortedUnitLessons.filter((lesson) => !isCheckpointExamLesson(lesson));
      const currentCoreLessonIndex = currentLesson
        ? coreLessons.findIndex((lesson) => lesson.id === currentLesson.id)
        : -1;

      showFreeTierEndPaywall =
        !isPremium &&
        currentCoreLessonIndex >= 0 &&
        isLastFreeLessonInFirstUnit(unitId, currentCoreLessonIndex, firstUnitId);

      if (unitLessonIds.length > 0) {
        const completedLessonIds = new Set((completedLessonsData ?? []).map((row) => row.lesson_id));
        completedLessonIds.add(lessonId);
        isUnitCompleted = unitLessonIds.every((id) => completedLessonIds.has(id));
      }
    }

    const forceReturnToUnitDetail = entryStatus === 'COMPLETED' && hasNextLessonInUnit;

    if (unitId && unitTitle) {
      navigation.replace('Completion', {
        unitId: unitId,
        unitTitle: unitTitle,
        isUnitCompleted,
        forceReturnToUnitDetail,
        showFreeTierEndPaywall,
      });
    } else {
      navigation.replace('Completion', {
        unitId: 0,
        unitTitle: 'Dersler',
        isUnitCompleted: false,
        forceReturnToUnitDetail,
        showFreeTierEndPaywall: false,
      });
    }
  }, [lessonId, unitId, unitTitle, entryStatus, navigation, isPremium, firstUnitId]);

  const goToNextRegularStep = async () => {
    if (currentIndex === steps.length - 1) {
      playSound('complete');
      await completeLessonAndNavigate();
      return;
    }

    playSound('correct', { volume: 0.2, maxDurationMs: 180 });
    setCurrentIndex((prev) => prev + 1);
    setQuizState({});
    setFinalQuizState({
      hasStarted: false,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isSubmitted: false,
      score: 0,
    });
  };

  const handleAudioCheckpointAnswer = (isCorrect: boolean) => {
    if (!currentStep || currentStep.type !== 'audio') return;
    setAudioRecapPassedStepIds((prev) => ({ ...prev, [currentStep.id]: true }));
    setAudioCheckpoint({
      visible: true,
      stepId: currentStep.id,
      phase: 'result',
      isCorrect,
    });
  };

  const handleAudioCheckpointContinue = async () => {
    setAudioCheckpoint({
      visible: false,
      stepId: null,
      phase: 'choice',
      isCorrect: null,
    });
    await goToNextRegularStep();
  };

  const handleNext = async () => {
    if (!currentStep || isCompleting) return;

    if (currentStep.type === 'final_quiz') {
      const metadata = currentStep.metadata || {};
      const questions = Array.isArray(metadata.questions) ? metadata.questions : [];
      const passThreshold = getEffectivePassThreshold(metadata.pass_threshold, questions.length);

      if (!finalQuizState.hasStarted) {
        setFinalQuizState((prev) => ({
          ...prev,
          hasStarted: true,
        }));
        return;
      }

      if (!finalQuizState.isSubmitted) {
        const isLastQuestion = finalQuizState.currentQuestionIndex >= questions.length - 1;
        if (!isLastQuestion) {
          setFinalQuizState((prev) => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
          }));
          return;
        }

        const score = questions.reduce((total, question, index) => {
          const questionKey = getFinalQuestionKey(question, index);
          const selected = finalQuizState.selectedAnswers[questionKey];
          return total + (selected === question.correct_option_id ? 1 : 0);
        }, 0);

        setFinalQuizState((prev) => ({
          ...prev,
          isSubmitted: true,
          score,
        }));
        setExpandedWrongAnswers({});

        if (score < passThreshold) {
          playSound('error');
        }
        return;
      }

      if (finalQuizState.score < passThreshold) {
        setFinalQuizState({
          hasStarted: true,
          currentQuestionIndex: 0,
          selectedAnswers: {},
          isSubmitted: false,
          score: 0,
        });
        return;
      }

      await completeLessonAndNavigate();
      return;
    }

    if (
      currentStep.type === 'audio' &&
      !audioStartedStepIds[currentStep.id] &&
      !audioRecapPassedStepIds[currentStep.id]
    ) {
      setAudioCheckpoint({
        visible: true,
        stepId: currentStep.id,
        phase: 'choice',
        isCorrect: null,
      });
      return;
    }

    await goToNextRegularStep();
  };

  const handleLessonBackPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setQuizState({});
      return;
    }

    navigation.goBack();
  };

  /** X: dersi kapat — Root’taki Lesson’ı stack’ten çıkar (navigate Main ile Lesson üstte kalıyordu) */
  const handleExitToUnitList = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    if (typeof unitId === 'number') {
      (navigation as unknown as { navigate: (a: string, b: object) => void }).navigate('Main', {
        screen: 'HomeStack',
        params: {
          screen: 'UnitDetail',
          params: { unitId, unitTitle: unitTitle ?? 'Seviye' },
        },
      });
    } else {
      (navigation as unknown as { navigate: (a: string, b: object) => void }).navigate('Main', {
        screen: 'HomeStack',
        params: { screen: 'Home' },
      });
    }
  }, [navigation, unitId, unitTitle]);

  const ensureAnimation = (stepId: number) => {
    if (!flipAnimations.current[stepId]) {
      flipAnimations.current[stepId] = new Animated.Value(0);
    }
    return flipAnimations.current[stepId];
  };

  const handleFlip = (stepId: number) => {
    const anim = ensureAnimation(stepId);
    const nextState = !flippedState.current[stepId];
    Animated.spring(anim, {
      toValue: nextState ? 1 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: false,
    }).start();
    flippedState.current[stepId] = nextState;
    setFlashcardFlipTick((prev) => prev + 1);
  };

  const renderStepTitle = (title?: string | null) => {
    if (!title) return null;
    return (
      <View style={styles.stepTitleContainer}>
        <Text style={styles.stepTitleLarge}>{title}</Text>
      </View>
    );
  };

  const renderReadStep = (step: LessonStep) => {
    const metadata = step.metadata || {};
    const label = 'Okuma';
    // İçerik öncelikle step.content'ten, yoksa metadata'dan
    const contentText = step.content || metadata.text || metadata.body || '';
    const markdown = contentText.replace(/\\n/g, '\n');
    const imageKeyword = metadata.image_keyword;
    const emoji = imageKeyword ? emojiMap[imageKeyword.toLowerCase()] ?? '📚' : '';

    return (
      <View style={styles.card}>
        <Text style={styles.stepTag}>{label}</Text>
        {renderStepTitle(step.title)}
        {!!emoji && (
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
        )}
        {!!markdown && <Markdown style={markdownStyles}>{markdown}</Markdown>}
      </View>
    );
  };

  const renderQuizStep = (step: LessonStep) => {
    const metadata = step.metadata || {};
    // Question comes from metadata.question
    const question = metadata.question || step.content || '';
    const rawOptions = metadata.options || [];
    // Use correct_option_id (new format) or fallback to correctAnswer (legacy)
    const correctOptionId = metadata.correct_option_id || (typeof metadata.correctAnswer === 'string' ? metadata.correctAnswer : undefined);

    // Normalize options: handle both old format (string[]) and new format (QuizOption[])
    const options = rawOptions.map((opt, index) => {
      if (typeof opt === 'string') {
        // Old format: string
        return { id: `opt-${index}`, text: opt };
      }
      // New format: { id, text }
      return opt as QuizOption;
    });

    const title = (step.title || '').toLowerCase();
    const isSentenceCompletion =
      title.includes('cümle tamamlama') || title.includes('cumle tamamlama');
    const cleanedQuestion = question.replace(/^cümleyi tamamla:\s*/i, '').replace(/^cumleyi tamamla:\s*/i, '');
    const selectedOptionText =
      options.find((option) => option.id === quizState.selectedOptionId)?.text || '____';
    const renderedSentence = cleanedQuestion.includes('____')
      ? cleanedQuestion.replace('____', selectedOptionText)
      : cleanedQuestion;

    if (isSentenceCompletion) {
      return (
        <View style={styles.card}>
          <Text style={styles.stepTag}>Cümle Tamamlama</Text>
          {!!question && (
            cleanedQuestion.includes('____') && quizState.selectedOptionId ? (
              (() => {
                const parts = cleanedQuestion.split('____');
                const before = parts[0] ?? '';
                const after = parts[1] ?? '';
                return (
                  <Text style={styles.sentenceCompletionText}>
                    {before}
                    <Text
                      style={
                        quizState.isCorrect
                          ? styles.sentenceInlineWordCorrect
                          : styles.sentenceInlineWordWrong
                      }
                    >
                      {selectedOptionText}
                    </Text>
                    {after}
                  </Text>
                );
              })()
            ) : (
              <Text style={styles.sentenceCompletionText}>
                {quizState.selectedOptionId ? renderedSentence : cleanedQuestion}
              </Text>
            )
          )}
          <View style={styles.sentenceOptionsGrid}>
            {options.map((option, index) => {
              const selected = quizState.selectedOptionId === option.id;
              const isCorrectOption = quizState.isCorrect && selected;
              const isWrongOption = quizState.isCorrect === false && selected;

              return (
                <TouchableOpacity
                  key={option.id || `opt-${index}`}
                  style={[
                    styles.sentenceOptionChip,
                    selected && styles.optionButtonSelected,
                    isCorrectOption && styles.optionButtonCorrect,
                    isWrongOption && styles.optionButtonWrong,
                  ]}
                  activeOpacity={0.85}
                  onPress={() => handleOptionSelect(option.id, correctOptionId)}
                  disabled={quizState.isCorrect === true}
                >
                  <Text style={styles.sentenceOptionChipText}>{option.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Text style={styles.stepTag}>Alıştırma</Text>
        {!!question && <Text style={styles.stepTitle}>{question}</Text>}
        <View style={styles.optionsWrapper}>
          {options.map((option, index) => {
            const selected = quizState.selectedOptionId === option.id;
            const isCorrectOption = quizState.isCorrect && selected;
            const isWrongOption = quizState.isCorrect === false && selected;

            return (
              <TouchableOpacity
                key={option.id || `opt-${index}`}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                  isCorrectOption && styles.optionButtonCorrect,
                  isWrongOption && styles.optionButtonWrong,
                ]}
                activeOpacity={0.85}
                onPress={() => handleOptionSelect(option.id, correctOptionId)}
                disabled={quizState.isCorrect === true}
              >
                <Text style={[styles.optionText, (isCorrectOption || isWrongOption) && styles.optionTextState]}>
                  {option.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderFlashcardStep = (step: LessonStep) => {
    const metadata = step.metadata || {};
    // Use metadata.front_text and metadata.back_text (new format) with fallbacks
    const frontText = metadata.front_text || step.content || 'Kelime';
    const backText = metadata.back_text || metadata.back || '';

    const anim = ensureAnimation(step.id);
    const frontRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
    const backRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
    const frontOpacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 0] });
    const backOpacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });

    return (
      <View style={styles.flipCardContainer}>
        <Text style={styles.stepTag}>Kelime Kartı</Text>
        <TouchableOpacity activeOpacity={0.95} onPress={() => handleFlip(step.id)}>
          <View style={styles.flipCardWrapper}>
            <Animated.View
              style={[styles.flipCard, styles.flipCardFront, { transform: [{ rotateY: frontRotate }], opacity: frontOpacity }]}
            >
              <Text style={styles.vocabTermFront}>{frontText}</Text>
              <Text style={styles.flipHint}>Çevirmek için dokun</Text>
            </Animated.View>
            <Animated.View
              style={[styles.flipCard, styles.flipCardBack, { transform: [{ rotateY: backRotate }], opacity: backOpacity }]}
            >
              {!!backText && <Text style={styles.vocabDefinition}>{backText}</Text>}
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const bindSoundStatus = (sound: Audio.Sound) => {
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setAudioState((prev) => ({
          ...prev,
          position: status.positionMillis || 0,
          duration: status.durationMillis || 0,
          isPlaying: status.isPlaying || false,
        }));
        if (status.didJustFinish) {
          setAudioState((prev) => ({ ...prev, isPlaying: false, position: 0 }));
        }
      }
    });
  };

  const handleAudioPlayPause = async () => {
    const metadata = currentStep?.metadata;
    const audioUrl = metadata?.audio_url || metadata?.audioUrl;

    if (!audioUrl) {
      Alert.alert('Hata', 'Ses dosyası bulunamadı. Bu adım için metadata.audio_url eklenmeli.');
      return;
    }

    try {
      if (currentStep?.id) {
        setAudioStartedStepIds((prev) => ({ ...prev, [currentStep.id]: true }));
      }
      if (audioState.isPlaying && audioState.sound) {
        await audioState.sound.pauseAsync();
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
      } else if (audioState.sound) {
        await audioState.sound.playAsync();
        setAudioState((prev) => ({ ...prev, isPlaying: true }));
      } else {
        setAudioState((prev) => ({ ...prev, isLoading: true }));

        const tryPlayFromUri = async (uri: string) => {
          const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
          bindSoundStatus(sound);
          setAudioState({
            sound,
            isPlaying: true,
            isLoading: false,
            position: 0,
            duration: 0,
          });
        };

        try {
          await tryPlayFromUri(audioUrl);
        } catch (streamErr) {
          console.log('MOONO AUDIO - Uzak URI ile oynatma basarisiz, indirme deneniyor:', streamErr);
          const safeName =
            decodeURIComponent(audioUrl.split('/').pop()?.split('?')[0] || '') ||
            `audio_${Date.now()}.mp3`;
          const destinationFile = new File(Paths.cache, safeName);
          const downloadedFile = await File.downloadFileAsync(audioUrl, destinationFile, {
            idempotent: true,
          });
          await tryPlayFromUri(downloadedFile.uri);
        }
      }
    } catch (error) {
      console.log('MOONO AUDIO DEBUG - SES ÇALMA HATASI (GENEL):', error);
      setAudioState((prev) => ({ ...prev, isLoading: false }));
      Alert.alert('Hata', 'Ses oynatılamadı. Lütfen tekrar deneyin.');
    }
  };

  const renderAudioStep = (step: LessonStep) => {
    const metadata = step.metadata || {};
    const audioUrl = metadata.audio_url || metadata.audioUrl;
    const rawText = (metadata.text || metadata.body || '').trim();
    const isPlaceholder =
      !rawText ||
      /şu an uygulamada gizli/i.test(rawText) ||
      /su an uygulamada gizli/i.test(rawText);
    let description = rawText;
    if (audioUrl && isPlaceholder) {
      description =
        'Bu derse ait kısa sesli özet. Kulaklık veya hoparlörle dinleyebilirsin.';
    } else if (!audioUrl) {
      description =
        rawText ||
        'Ses dosyası henüz bu adıma bağlanmadı (metadata.audio_url eksik).';
    }
    const markdown = description.replace(/\\n/g, '\n');
    const progress = audioState.duration > 0 
      ? audioState.position / audioState.duration 
      : 0;

    const formatTime = (millis: number) => {
      const totalSeconds = Math.floor(millis / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const hasTranscript =
      audioCaptionData &&
      (audioCaptionData.mode === 'timed'
        ? audioCaptionData.lines.length > 0
        : audioCaptionData.hasTranscript);
    const captionStarted =
      audioState.isPlaying || audioState.position > 0 || audioState.isLoading;

    let captionWindowWords: { word: string; globalIndex: number }[] = [];
    let activeWordInWindow = -1;
    if (hasTranscript && audioCaptionData?.mode === 'words' && audioCaptionData.visibleWordCount > 0) {
      const startIndex = Math.max(0, audioCaptionData.visibleWordCount - AUDIO_CAPTION_WINDOW_WORDS);
      captionWindowWords = audioCaptionData.words
        .slice(startIndex, audioCaptionData.visibleWordCount)
        .map((word, offset) => ({
          word,
          globalIndex: startIndex + offset,
        }));
      activeWordInWindow = audioCaptionData.activeWordIndex;
    }

    return (
      <View style={[styles.audioCard, hasTranscript && styles.audioCardWithCaption]}>
        <Text style={styles.stepTag}>Dinleme</Text>
        <View style={[styles.audioIconContainer, hasTranscript && styles.audioIconContainerCompact]}>
          <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
            <Ionicons name="headset" size={hasTranscript ? 56 : 80} color="#00C4CC" />
          </Animated.View>
        </View>

        {hasTranscript ? (
          <View style={styles.audioIntroBlock}>
            <Text style={styles.audioHeadline}>{AUDIO_STEP_HEADLINE}</Text>
            <Text style={styles.audioSubline}>{AUDIO_STEP_SUBLINE}</Text>
          </View>
        ) : (
          !!markdown && (
            <View style={styles.audioDescriptionContainer}>
              <Markdown style={markdownStyles}>{markdown}</Markdown>
            </View>
          )
        )}

        {audioState.duration > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(audioState.position)}</Text>
              <Text style={styles.timeText}>{formatTime(audioState.duration)}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.playButton, hasTranscript && styles.playButtonCompact]}
          onPress={handleAudioPlayPause}
          disabled={audioState.isLoading}
          activeOpacity={0.9}
        >
          {audioState.isLoading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Text style={styles.playButtonText}>
              {audioState.isPlaying ? 'DURAKLAT' : 'OYNAT'}
            </Text>
          )}
        </TouchableOpacity>

        {hasTranscript && captionStarted && audioCaptionData?.mode === 'words' && captionWindowWords.length > 0 && (
          <View style={styles.captionPanel}>
            <View style={[styles.captionClip, { height: AUDIO_CAPTION_CLIP_HEIGHT }]}>
              <View style={styles.captionWordWrap}>
                {captionWindowWords.map(({ word, globalIndex }) => (
                  <Text
                    key={`word-${globalIndex}`}
                    style={[
                      styles.captionWord,
                      globalIndex === activeWordInWindow && styles.captionWordActive,
                    ]}
                  >
                    {word}{' '}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {hasTranscript && captionStarted && audioCaptionData?.mode === 'timed' && (
          <View style={styles.captionPanel}>
            <View style={[styles.captionClip, { height: AUDIO_CAPTION_CLIP_HEIGHT }]}>
              {audioCaptionData.lines.slice(0, audioCaptionData.activeIndex + 1).map((line, index) => (
                <Text
                  key={`caption-${index}`}
                  style={[
                    styles.captionLine,
                    index === audioCaptionData.activeIndex && styles.captionLineActive,
                  ]}
                >
                  {line}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderFinalQuizStep = (step: LessonStep) => {
    const metadata = step.metadata || {};
    const questions = Array.isArray(metadata.questions) ? metadata.questions : [];
    const passThreshold = getEffectivePassThreshold(metadata.pass_threshold, questions.length);
    const normalizedTitle = (step.title || '').toLowerCase();
    const isCheckpointExam =
      normalizedTitle.includes('ara değerlendirme') ||
      normalizedTitle.includes('ara degerlendirme');
    const isLevelEndExam =
      normalizedTitle.includes('seviye') ||
      normalizedTitle.includes('geçiş') ||
      normalizedTitle.includes('gecis');

    if (questions.length === 0) {
      return (
        <View style={styles.card}>
          <Text style={styles.errorText}>Final test soruları bulunamadı.</Text>
        </View>
      );
    }

    if (!finalQuizState.hasStarted) {
      const introTag = isCheckpointExam
        ? 'Ara Değerlendirme'
        : isLevelEndExam
          ? 'Seviye Sonu Sınavı'
          : 'Bölüm Sonu Testi';
      return (
        <View style={styles.card}>
          <Text style={styles.stepTag}>{introTag}</Text>
          <Text style={styles.stepTitle}>Hazır mısın Ortak?</Text>
          <Text style={styles.explanationText}>
            {`Şimdi ${questions.length} soruluk ${introTag.toLowerCase()} bölümüne geçiyoruz. En az ${passThreshold} doğru yaptığında geçeceksin.`}
            {' '}
            Sakin kal, soruları dikkatle oku ve kendi yorumuna güven.
          </Text>
        </View>
      );
    }

    if (finalQuizState.isSubmitted) {
      const wrongQuestions = questions.filter((question, index) => {
        const questionKey = getFinalQuestionKey(question, index);
        const selected = finalQuizState.selectedAnswers[questionKey];
        return selected !== question.correct_option_id;
      });
      const wrongCount = Math.max(questions.length - finalQuizState.score, 0);

      const passed = finalQuizState.score >= passThreshold;

      return (
        <View style={styles.resultContainer}>
          <View style={styles.resultHero}>
            <Text style={styles.resultTag}>Bölüm Sonu Testi</Text>
            <View style={[styles.scoreRing, { borderColor: passed ? '#4ADE80' : '#F87171' }]}>
              <Text style={styles.scoreRingValue}>{finalQuizState.score}</Text>
              <Text style={styles.scoreRingTotal}>/ {questions.length}</Text>
            </View>
            <Text style={styles.resultHeadline}>
              {passed ? 'Tebrikler ortak, testi geçtin!' : 'Bu sefer olmadı ortak.'}
            </Text>
            <Text style={styles.resultSubtext}>
              {passed
                ? wrongCount === 0
                  ? 'Tüm soruları doğru cevapladın, harikasın.'
                  : 'Yanlış yaptığın sorulara aşağıdan göz at, eksik kalmasın.'
                : `Geçmek için en az ${passThreshold} doğru gerekiyor. Dersi tazeleyip tekrar deneyelim.`}
            </Text>
          </View>

          <View style={styles.resultStatsRow}>
            <View style={styles.resultStatCard}>
              <Ionicons name="checkmark-circle" size={20} color="#4ADE80" />
              <Text style={styles.resultStatValue}>{finalQuizState.score}</Text>
              <Text style={styles.resultStatLabel}>Doğru</Text>
            </View>
            <View style={styles.resultStatCard}>
              <Ionicons name="close-circle" size={20} color="#F87171" />
              <Text style={styles.resultStatValue}>{wrongCount}</Text>
              <Text style={styles.resultStatLabel}>Yanlış</Text>
            </View>
            <View style={styles.resultStatCard}>
              <Ionicons name="flag" size={20} color={palette.accent} />
              <Text style={styles.resultStatValue}>{passThreshold}</Text>
              <Text style={styles.resultStatLabel}>Baraj</Text>
            </View>
          </View>

          {!passed && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handleReviewLesson} activeOpacity={0.85}>
              <Text style={styles.secondaryButtonText}>Dersleri Tekrarla</Text>
            </TouchableOpacity>
          )}

          {wrongQuestions.length > 0 && (
            <View style={styles.wrongSection}>
              <Text style={styles.wrongSectionTitle}>Yanlış Cevapların</Text>
              {wrongQuestions.map((question, index) => {
                const questionIndex = questions.findIndex((q) => q === question);
                const questionKey = getFinalQuestionKey(question, questionIndex >= 0 ? questionIndex : index);
                const selected = finalQuizState.selectedAnswers[questionKey];
                const selectedText = question.options.find((opt) => opt.id === selected)?.text ?? 'Boş';
                const correctText = question.options.find((opt) => opt.id === question.correct_option_id)?.text ?? '-';
                const isExpanded = expandedWrongAnswers[questionKey] !== false;
                return (
                  <View key={`${questionKey}-wrong-${index}`} style={styles.wrongCard}>
                    <TouchableOpacity
                      style={styles.wrongCardHeader}
                      activeOpacity={0.8}
                      onPress={() =>
                        setExpandedWrongAnswers((prev) => ({
                          ...prev,
                          [questionKey]: !isExpanded,
                        }))
                      }
                    >
                      <View style={styles.wrongCardBadge}>
                        <Text style={styles.wrongCardBadgeText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.wrongCardQuestion}>{question.question}</Text>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={palette.muted}
                      />
                    </TouchableOpacity>
                    {isExpanded ? (
                      <View style={styles.wrongCardBody}>
                        <View style={[styles.answerBlock, styles.answerBlockWrong]}>
                          <Ionicons name="close-circle" size={16} color="#F87171" style={styles.answerBlockIcon} />
                          <View style={styles.answerBlockTextWrap}>
                            <Text style={styles.answerBlockLabel}>Senin cevabın</Text>
                            <Text style={styles.answerBlockTextWrong}>{selectedText}</Text>
                          </View>
                        </View>
                        <View style={[styles.answerBlock, styles.answerBlockCorrect]}>
                          <Ionicons name="checkmark-circle" size={16} color="#4ADE80" style={styles.answerBlockIcon} />
                          <View style={styles.answerBlockTextWrap}>
                            <Text style={styles.answerBlockLabel}>Doğru cevap</Text>
                            <Text style={styles.answerBlockTextCorrect}>{correctText}</Text>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      );
    }

    const currentQuestion = questions[finalQuizState.currentQuestionIndex];
    const currentQuestionKey = getFinalQuestionKey(currentQuestion, finalQuizState.currentQuestionIndex);
    const selectedOptionId = finalQuizState.selectedAnswers[currentQuestionKey];

    return (
      <View style={styles.card}>
        <Text style={styles.stepTag}>Bölüm Sonu Testi</Text>
        <Text style={styles.headerSubtitle}>
          Soru {finalQuizState.currentQuestionIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.stepTitle}>{currentQuestion.question}</Text>
        <View style={styles.optionsWrapper}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedOptionId === option.id && styles.optionButtonSelected,
              ]}
              activeOpacity={0.75}
              onPress={() => handleFinalQuizOptionSelect(currentQuestionKey, option.id)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderStepContent = () => {
    if (!currentStep) return null;
    switch (currentStep.type) {
      case 'read':
        return renderReadStep(currentStep);
      case 'quiz':
        return renderQuizStep(currentStep);
      case 'flashcard':
        return renderFlashcardStep(currentStep);
      case 'audio':
        return renderAudioStep(currentStep);
      case 'final_quiz':
        return renderFinalQuizStep(currentStep);
      default:
        // Fallback: Bilinmeyen tip için boş görünüm
        return (
          <View style={styles.card}>
            <Text style={styles.errorText}>Bilinmeyen adım tipi: {currentStep.type}</Text>
          </View>
        );
    }
  };

  const renderAudioCheckpointModal = () => {
    if (!audioCheckpoint.visible) return null;

    return (
      <View style={styles.audioCheckpointOverlay}>
        <View style={styles.audioCheckpointCard}>
          {audioCheckpoint.phase === 'choice' ? (
            <>
              <Image
                source={require('../assets/moono-profile.png')}
                style={styles.audioCheckpointAvatar}
                resizeMode="cover"
              />
              <Text style={styles.audioCheckpointTitle}>Kısa Hatırlatma</Text>
              <Text style={styles.audioCheckpointText}>
                Ortak, senin için harika bir özet hazırladım. Bu adımı geçmeden önce şu soruyu cevapla.
                {'\n\n'}
                Sonra dönüp mutlaka dinle, çok faydasını göreceksin.
              </Text>
              <TouchableOpacity
                style={styles.audioCheckpointContinueButton}
                activeOpacity={0.9}
                onPress={() =>
                  setAudioCheckpoint((prev) => ({ ...prev, visible: false }))
                }
              >
                <Text style={styles.audioCheckpointContinueButtonText}>Dur, dinleyeyim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.audioCheckpointOption}
                activeOpacity={0.85}
                onPress={() =>
                  setAudioCheckpoint((prev) => ({ ...prev, phase: 'question' }))
                }
              >
                <Text style={styles.audioCheckpointOptionText}>Soruyu cevaplayıp geçeyim</Text>
              </TouchableOpacity>
            </>
          ) : audioCheckpoint.phase === 'question' ? (
            <>
              <Image
                source={require('../assets/moono-profile.png')}
                style={styles.audioCheckpointAvatar}
                resizeMode="cover"
              />
              <Text style={styles.audioCheckpointTitle}>Tamam Ortak</Text>
              <Text style={styles.audioCheckpointText}>
                O zaman tek bir soruyla geçebiliriz:
              </Text>
              <Text style={styles.audioCheckpointQuestion}>Borsanın ana mantığı nedir?</Text>

              <TouchableOpacity
                style={styles.audioCheckpointOption}
                activeOpacity={0.8}
                onPress={() => handleAudioCheckpointAnswer(true)}
              >
                <Text style={styles.audioCheckpointOptionText}>Şirket ve yatırımcıyı buluşturur</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.audioCheckpointOption}
                activeOpacity={0.8}
                onPress={() => handleAudioCheckpointAnswer(false)}
              >
                <Text style={styles.audioCheckpointOptionText}>Sadece şans oyunudur</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.audioCheckpointTitle}>
                {audioCheckpoint.isCorrect ? 'Doğru' : 'Sorun Değil'}
              </Text>
              <Text style={styles.audioCheckpointText}>
                {audioCheckpoint.isCorrect
                  ? 'Aynen. Borsa alıcı ve satıcıyı buluşturan düzenli bir piyasadır. Devam edelim.'
                  : 'Kısa not: Borsa şans oyunu değil; şirket ve yatırımcının buluştuğu düzenli bir piyasadır. Bu adımı geçelim, sonra bu özeti dinlemeyi unutma.'}
              </Text>
              <TouchableOpacity
                style={styles.audioCheckpointContinueButton}
                activeOpacity={0.9}
                onPress={() => {
                  void handleAudioCheckpointContinue();
                }}
              >
                <Text style={styles.audioCheckpointContinueButtonText}>Devam Et</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  const renderBody = () => {
    const currentFinalQuizQuestions =
      currentStep?.type === 'final_quiz' && Array.isArray((currentStep.metadata || {}).questions)
        ? (((currentStep.metadata || {}).questions as FinalQuizQuestion[]) ?? [])
        : [];
    const currentFinalQuizPassThreshold =
      currentStep?.type === 'final_quiz'
        ? getEffectivePassThreshold((currentStep.metadata || {}).pass_threshold, currentFinalQuizQuestions.length)
        : 0;

    if (loading) {
      return (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={palette.accent} />
          <Text style={styles.loadingText}>Ders adımları yükleniyor...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Bir sorun oluştu: {error}</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={loadSteps}>
            <Text style={styles.primaryButtonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (steps.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.mutedText}>Henüz bu derse ait adım bulunmuyor.</Text>
        </View>
      );
    }

    if (isCompleted) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.completionTitle}>Ders Bitti 🎉</Text>
          <Text style={styles.mutedText}>Harika bir iş çıkardın!</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Bölümlere Dön</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={[
            styles.scrollContent,
            currentStep?.type === 'audio' && styles.scrollContentAudio,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {renderStepContent()}
        </ScrollView>
        <TouchableOpacity
          style={[styles.primaryButton, styles.footerButton, (!canContinue || isCompleting) && styles.primaryButtonDisabled]}
          disabled={!canContinue || isCompleting}
          onPress={handleNext}
        >
          {isCompleting ? (
            <View style={styles.completingRow}>
              <ActivityIndicator size="small" color="#000000" />
              <Text style={styles.primaryButtonText}>Bitiriliyor...</Text>
            </View>
          ) : (
            <Text style={styles.primaryButtonText}>
              {currentStep?.type === 'final_quiz'
                ? (finalQuizState.isSubmitted
                    ? (finalQuizState.score >= currentFinalQuizPassThreshold ? 'Bölümü Bitir' : 'Testi Tekrar Çöz')
                    : (!finalQuizState.hasStarted
                        ? 'Teste Başla'
                        : (finalQuizState.currentQuestionIndex >= (((currentStep.metadata || {}).questions as FinalQuizQuestion[] | undefined)?.length ?? 1) - 1
                            ? 'Testi Bitir'
                            : 'Sıradaki Soru')))
                : (currentIndex === steps.length - 1 ? 'Bitir' : 'Devam Et')}
            </Text>
          )}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.customHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleLessonBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color={palette.text} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text
              style={styles.headerTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.78}
            >
              {lessonTitle || 'Ders'}
            </Text>
            <Text style={styles.headerSubtitle}>{headerSubtitleText}</Text>
          </View>
          <TouchableOpacity
            style={styles.closeLessonButton}
            onPress={handleExitToUnitList}
            activeOpacity={0.7}
            accessibilityLabel="Derslere dön"
          >
            <Ionicons name="close" size={28} color={palette.muted} />
          </TouchableOpacity>
        </View>
        {renderBody()}
        {renderAudioCheckpointModal()}
      </View>
    </SafeAreaView>
  );
}

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 18,
    color: palette.text,
    lineHeight: 26,
  },
  strong: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  paragraph: {
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingVertical: 24,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  closeLessonButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: palette.accent,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: palette.muted,
    fontWeight: '500',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    color: palette.muted,
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
  scrollContainer: {
    flex: 1,
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  scrollContentAudio: {
    paddingBottom: 8,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 26,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 24,
  },
  stepTag: {
    fontSize: 13,
    color: palette.accent,
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 28,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
    flex: 1,
  },
  stepTitleContainer: {
    marginBottom: 20,
    marginTop: 8,
  },
  stepTitleLarge: {
    fontSize: 32,
    fontWeight: '800',
    color: palette.text,
    lineHeight: 42,
  },
  emojiContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: palette.accent,
  },
  explanationLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.accent,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  explanationText: {
    fontSize: 16,
    color: palette.text,
    lineHeight: 24,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: {
    fontSize: 12,
    color: palette.muted,
    fontWeight: '600',
  },
  optionsWrapper: {
    gap: 12,
    marginTop: 16,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  optionButtonSelected: {
    borderColor: palette.accent,
    backgroundColor: '#06383A',
    transform: [{ scale: 0.98 }],
  },
  optionButtonCorrect: {
    backgroundColor: palette.success,
    borderColor: palette.success,
  },
  optionButtonWrong: {
    backgroundColor: palette.danger,
    borderColor: palette.danger,
  },
  optionText: {
    color: palette.text,
    fontSize: 16,
  },
  optionTextState: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultContainer: {
    marginBottom: 24,
  },
  resultHero: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: palette.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 12,
  },
  resultTag: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  scoreRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  scoreRingValue: {
    fontSize: 40,
    fontWeight: '800',
    color: palette.text,
    lineHeight: 44,
  },
  scoreRingTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.muted,
  },
  resultHeadline: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  resultSubtext: {
    fontSize: 14,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 21,
  },
  resultStatsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  resultStatCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: palette.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    paddingVertical: 14,
    gap: 4,
  },
  resultStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.text,
  },
  resultStatLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.muted,
  },
  wrongSection: {
    marginTop: 20,
  },
  wrongSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 12,
  },
  wrongCard: {
    backgroundColor: palette.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 10,
    overflow: 'hidden',
  },
  wrongCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
  },
  wrongCardBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(248, 113, 113, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrongCardBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F87171',
  },
  wrongCardQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: palette.text,
    lineHeight: 21,
  },
  wrongCardBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 8,
  },
  answerBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  answerBlockWrong: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  answerBlockCorrect: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  answerBlockIcon: {
    marginTop: 1,
  },
  answerBlockTextWrap: {
    flex: 1,
  },
  answerBlockLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: palette.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  answerBlockTextWrong: {
    fontSize: 14,
    color: '#FCA5A5',
    lineHeight: 20,
  },
  answerBlockTextCorrect: {
    fontSize: 14,
    fontWeight: '600',
    color: '#86EFAC',
    lineHeight: 20,
  },
  feedbackText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackSuccess: {
    color: palette.success,
  },
  feedbackError: {
    color: palette.danger,
  },
  flipCardContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  flipCardWrapper: {
    width: flipCardWidth,
    height: 320,
  },
  flipCard: {
    position: 'absolute',
    width: flipCardWidth,
    height: '100%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardFront: {
    backgroundColor: palette.card,
  },
  flipCardBack: {
    backgroundColor: palette.cardAlt,
  },
  vocabLabel: {
    color: palette.accent,
    letterSpacing: 1,
    marginBottom: 12,
  },
  vocabTermFront: {
    fontSize: 40,
    fontWeight: '800',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  flipHint: {
    color: palette.muted,
    fontSize: 15,
  },
  vocabDefinition: {
    fontSize: 20,
    color: palette.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  exampleWrapper: {
    borderTopWidth: 1,
    borderTopColor: palette.border,
    paddingTop: 16,
    width: '100%',
  },
  exampleLabel: {
    color: palette.muted,
    textAlign: 'center',
    marginBottom: 6,
  },
  exampleText: {
    color: palette.text,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: palette.accent,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButton: {
    width: '100%',
    marginTop: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.4,
  },
  completingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: palette.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: palette.accent,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.text,
    marginBottom: 8,
  },
  mutedText: {
    fontSize: 16,
    color: palette.muted,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: palette.danger,
    textAlign: 'center',
    marginBottom: 12,
  },
  audioCard: {
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 24,
    alignItems: 'center',
  },
  audioCardWithCaption: {
    marginBottom: 16,
  },
  audioIconContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  audioIconContainerCompact: {
    marginVertical: 12,
  },
  audioIntroBlock: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  audioHeadline: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  audioSubline: {
    fontSize: 13,
    lineHeight: 19,
    color: palette.muted,
    textAlign: 'center',
  },
  audioIcon: {
    fontSize: 64,
  },
  audioTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  audioDescriptionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  captionPanel: {
    width: '100%',
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  captionClip: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  captionWordWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  captionWord: {
    fontSize: 16,
    lineHeight: AUDIO_CAPTION_LINE_HEIGHT,
    color: palette.text,
  },
  captionWordActive: {
    color: palette.accent,
    fontWeight: '700',
  },
  captionLine: {
    fontSize: 15,
    lineHeight: 22,
    color: palette.text,
    marginBottom: 10,
  },
  captionLineActive: {
    color: palette.accent,
    fontWeight: '700',
  },
  playButton: {
    backgroundColor: palette.accent,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonCompact: {
    paddingVertical: 14,
    minWidth: 180,
  },
  playButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  audioCheckpointOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 20,
  },
  audioCheckpointCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#101214',
    borderColor: '#2A2A2A',
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
  audioCheckpointTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  audioCheckpointAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#00C4CC',
  },
  audioCheckpointText: {
    color: '#D1D5DB',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 14,
  },
  audioCheckpointQuestion: {
    color: '#00C4CC',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  audioCheckpointOption: {
    borderWidth: 1,
    borderColor: '#00C4CC',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  audioCheckpointOptionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  audioCheckpointContinueButton: {
    marginTop: 8,
    backgroundColor: '#00C4CC',
    borderRadius: 12,
    paddingVertical: 14,
  },
  audioCheckpointContinueButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
  },
  sentenceCompletionText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 34,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 18,
  },
  sentenceCompletionCorrect: {
    color: '#22C55E',
  },
  sentenceCompletionWrong: {
    color: '#F87171',
  },
  sentenceInlineWordCorrect: {
    color: '#22C55E',
    fontWeight: '800',
  },
  sentenceInlineWordWrong: {
    color: '#F87171',
    fontWeight: '800',
  },
  sentenceOptionsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  sentenceOptionChip: {
    width: '48%',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#111111',
  },
  sentenceOptionChipText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
});
