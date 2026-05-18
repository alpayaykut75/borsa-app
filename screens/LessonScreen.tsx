import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
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

const { width: windowWidth } = Dimensions.get('window');
const flipCardWidth = Math.min(windowWidth - 40, 420);
const HIDE_AUDIO_STEPS = false;

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
type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

const getFinalQuestionKey = (question: FinalQuizQuestion, index: number): string =>
  question.id?.trim() || `q-${index}`;

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
          if (HIDE_AUDIO_STEPS && step.type === 'audio') return false;
          const meta = (step.metadata && typeof step.metadata === 'object') ? (step.metadata as Record<string, unknown>) : null;
          if (meta?.hidden_in_app === true) return false;
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
  const isCompleted = !loading && steps.length > 0 && currentIndex >= steps.length;
  const progress = steps.length > 0 ? (currentIndex + 1) / steps.length : 0;
  const stepHeaderText = steps.length > 0
    ? `Adım ${Math.min(currentIndex + 1, steps.length)} / ${steps.length}`
    : 'Adım 0 / 0';

  const canContinue = useMemo(() => {
    if (!currentStep) return false;
    if (currentStep.type === 'quiz') return quizState.isCorrect === true;
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
  }, [currentStep, quizState, finalQuizState]);

  const handleOptionSelect = (selectedOptionId: string, correctOptionId?: string) => {
    if (quizState.isCorrect) return;
    if (correctOptionId == null) {
      setQuizState({ selectedOptionId, isCorrect: false, feedback: 'Bu soru yapılandırılmamış.' });
      // Error SFX for misconfigured question
      playSound('error');
      return;
    }

    const isCorrect = selectedOptionId === correctOptionId;
    setQuizState({ selectedOptionId, isCorrect, feedback: isCorrect ? 'Doğru! 🎉' : 'Yanlış. Tekrar dene.' });

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
  };

  const completeLessonAndNavigate = useCallback(async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      Alert.alert('Hata', 'Kullanıcı bilgisi alınamadı. Lütfen tekrar giriş yapın.');
      return;
    }

    const { error: progressError } = await supabase.from('user_progress').upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        is_completed: true,
      },
      {
        onConflict: 'user_id,lesson_id',
      }
    );

    if (progressError) {
      console.warn('İlerleme kaydı hatası:', progressError.message);
    }

    let isUnitCompleted = false;
    let hasNextLessonInUnit = false;
    if (unitId) {
      const { data: unitLessonsData } = await supabase
        .from('lessons')
        .select('id, sort_order')
        .eq('unit_id', unitId);

      const sortedUnitLessons = [...(unitLessonsData ?? [])].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      );
      const unitLessonIds = sortedUnitLessons.map((lesson) => lesson.id);
      const currentLessonIndex = sortedUnitLessons.findIndex((lesson) => lesson.id === lessonId);
      hasNextLessonInUnit =
        currentLessonIndex >= 0 && currentLessonIndex < sortedUnitLessons.length - 1;

      if (unitLessonIds.length > 0) {
        const { data: completedUnitLessonsData } = await supabase
          .from('user_progress')
          .select('lesson_id')
          .eq('user_id', user.id)
          .eq('is_completed', true)
          .in('lesson_id', unitLessonIds);

        isUnitCompleted = (completedUnitLessonsData?.length ?? 0) >= unitLessonIds.length;
      }
    }

    const forceReturnToUnitDetail = entryStatus === 'COMPLETED' && hasNextLessonInUnit;

    if (unitId && unitTitle) {
      navigation.replace('Completion', {
        unitId: unitId,
        unitTitle: unitTitle,
        isUnitCompleted,
        forceReturnToUnitDetail,
      });
    } else {
      navigation.replace('Completion', {
        unitId: 0,
        unitTitle: 'Dersler',
        isUnitCompleted: false,
        forceReturnToUnitDetail,
      });
    }
  }, [lessonId, unitId, unitTitle, entryStatus, navigation]);

  const handleNext = async () => {
    if (!currentStep) return;

    if (currentStep.type === 'final_quiz') {
      const metadata = currentStep.metadata || {};
      const questions = Array.isArray(metadata.questions) ? metadata.questions : [];
      const passThreshold = metadata.pass_threshold ?? 7;

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

        if (score >= passThreshold) {
          playSound('complete');
        } else {
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

    // Son adımdaysa ders tamamlandı (final_quiz dışındaki son adımlar: okuma, ses vb.)
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
    const explanation = metadata.explanation;

    // Normalize options: handle both old format (string[]) and new format (QuizOption[])
    const options = rawOptions.map((opt, index) => {
      if (typeof opt === 'string') {
        // Old format: string
        return { id: `opt-${index}`, text: opt };
      }
      // New format: { id, text }
      return opt as QuizOption;
    });

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
        {!!quizState.feedback && (
          <Text
            style={[styles.feedbackText, quizState.isCorrect ? styles.feedbackSuccess : styles.feedbackError]}
          >
            {quizState.feedback}
          </Text>
        )}
        {quizState.isCorrect && explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationLabel}>Açıklama:</Text>
            <Text style={styles.explanationText}>{explanation}</Text>
          </View>
        )}
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

    return (
      <View style={styles.audioCard}>
        <Text style={styles.stepTag}>Dinleme</Text>
        <View style={styles.audioIconContainer}>
          <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
            <Ionicons name="headset" size={80} color="#00C4CC" />
          </Animated.View>
        </View>
        {!!markdown && (
          <View style={styles.audioDescriptionContainer}>
            <Markdown style={markdownStyles}>{markdown}</Markdown>
          </View>
        )}
        
        {/* Progress Bar */}
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
          style={styles.playButton}
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
      </View>
    );
  };

  const renderFinalQuizStep = (step: LessonStep) => {
    const metadata = step.metadata || {};
    const questions = Array.isArray(metadata.questions) ? metadata.questions : [];
    const passThreshold = metadata.pass_threshold ?? 7;

    if (questions.length === 0) {
      return (
        <View style={styles.card}>
          <Text style={styles.errorText}>Final test soruları bulunamadı.</Text>
        </View>
      );
    }

    if (!finalQuizState.hasStarted) {
      return (
        <View style={styles.card}>
          <Text style={styles.stepTag}>Bölüm Sonu Testi</Text>
          <Text style={styles.stepTitle}>Hazır mısın Ortak?</Text>
          <Text style={styles.explanationText}>
            Şimdi 10 soruluk bölüm sonu testine geçiyoruz. En az 7 doğru yaptığında bölümü geçeceksin.
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

      return (
        <View style={styles.card}>
          <Text style={styles.stepTag}>Bölüm Sonu Testi</Text>
          <Text style={styles.stepTitle}>
            Skorun: {finalQuizState.score}/{questions.length}
          </Text>
          <Text style={[styles.feedbackText, finalQuizState.score >= passThreshold ? styles.feedbackSuccess : styles.feedbackError]}>
            {finalQuizState.score >= passThreshold
              ? `Tebrikler Ortak, testi geçtin.`
              : `Bu tur ${passThreshold}/${questions.length} barajını geçemedin. Tekrar deneyelim.`}
          </Text>

          {finalQuizState.score < passThreshold && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handleReviewLesson} activeOpacity={0.85}>
              <Text style={styles.secondaryButtonText}>Dersleri Tekrarla</Text>
            </TouchableOpacity>
          )}

          {wrongQuestions.length > 0 && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationLabel}>Yanlış Cevapların</Text>
              {wrongQuestions.map((question, index) => {
                const questionIndex = questions.findIndex((q) => q === question);
                const questionKey = getFinalQuestionKey(question, questionIndex >= 0 ? questionIndex : index);
                const selected = finalQuizState.selectedAnswers[questionKey];
                const selectedText = question.options.find((opt) => opt.id === selected)?.text ?? 'Boş';
                const correctText = question.options.find((opt) => opt.id === question.correct_option_id)?.text ?? '-';
                return (
                  <View key={`${questionKey}-wrong-${index}`} style={styles.wrongAnswerRow}>
                    <Text style={styles.explanationText}>{index + 1}. {question.question}</Text>
                    <Text style={styles.wrongAnswerText}>Senin cevabın: {selectedText}</Text>
                    <Text style={styles.correctAnswerText}>Doğru cevap: {correctText}</Text>
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

  const renderBody = () => {
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
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderStepContent()}
        </ScrollView>
        <TouchableOpacity
          style={[styles.primaryButton, styles.footerButton, !canContinue && styles.primaryButtonDisabled]}
          disabled={!canContinue}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>
            {currentStep?.type === 'final_quiz'
              ? (finalQuizState.isSubmitted
                  ? (finalQuizState.score >= (((currentStep.metadata || {}).pass_threshold) ?? 7) ? 'Bölümü Bitir' : 'Testi Tekrar Çöz')
                  : (!finalQuizState.hasStarted
                      ? 'Teste Başla'
                      : (finalQuizState.currentQuestionIndex >= (((currentStep.metadata || {}).questions as FinalQuizQuestion[] | undefined)?.length ?? 1) - 1
                          ? 'Testi Bitir'
                          : 'Sıradaki Soru')))
              : (currentIndex === steps.length - 1 ? 'Bitir' : 'Devam Et')}
          </Text>
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
            <Text style={styles.headerSubtitle}>{stepHeaderText}</Text>
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
  wrongAnswerRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  wrongAnswerText: {
    marginTop: 6,
    fontSize: 14,
    color: '#FCA5A5',
  },
  correctAnswerText: {
    marginTop: 4,
    fontSize: 14,
    color: '#86EFAC',
    fontWeight: '600',
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
  audioIconContainer: {
    marginVertical: 24,
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
    marginBottom: 32,
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
  playButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
