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
import Markdown from 'react-native-markdown-display';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { supabase } from '../lib/supabase';
import type { RootStackParamList } from '../App';
import { useSfx } from '../src/hooks/useSfx';

const palette = {
  background: '#000000',
  card: '#1E1E1E',
  cardAlt: '#262626',
  border: '#333333',
  accent: '#22D3EE',
  text: '#FFFFFF',
  muted: '#A3A3A3',
  success: '#16A34A',
  danger: '#DC2626',
};

const { width: windowWidth } = Dimensions.get('window');
const flipCardWidth = Math.min(windowWidth - 40, 420);

type LessonStepType = 'read' | 'quiz' | 'flashcard' | 'audio';

type QuizOption = {
  id: string;
  text: string;
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
type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

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
  const { lessonId, lessonTitle, unitId, unitTitle } = route.params;
  const [steps, setSteps] = useState<LessonStep[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({});
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
      const normalized = (data ?? []).map((step) => {
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
      setSteps(normalized);
      setCurrentIndex(0);
      setQuizState({});
      flipAnimations.current = {};
      flippedState.current = {};
    }
    setLoading(false);
  }, [lessonId]);

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
          setAudioState({ sound: null, isPlaying: false, isLoading: false });
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
      title: lessonTitle || 'Ders',
      headerBackTitle: '',
      headerBackVisible: true,
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#00C4CC',
      },
    });
  }, [navigation, lessonTitle]);

  const currentStep = steps[currentIndex];
  const isCompleted = !loading && steps.length > 0 && currentIndex >= steps.length;
  const progress = steps.length > 0 ? (currentIndex + 1) / steps.length : 0;

  const canContinue = useMemo(() => {
    if (!currentStep) return false;
    if (currentStep.type === 'quiz') return quizState.isCorrect === true;
    return true;
  }, [currentStep, quizState]);

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

  const handleNext = async () => {
    if (!currentStep) return;
    
    // Son adımdaysa ders tamamlandı
    if (currentIndex === steps.length - 1) {
      // Play completion SFX when final step is completed
      playSound('complete');
      // Kullanıcı ID'sini al
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        Alert.alert('Hata', 'Kullanıcı bilgisi alınamadı. Lütfen tekrar giriş yapın.');
        return;
      }

      // Supabase'e ilerleme kaydı ekle
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            is_completed: true,
          },
          {
            onConflict: 'user_id,lesson_id',
          }
        );

      // Hata yönetimi: unique constraint hatası (23505) veya diğer hataları görmezden gel
      if (progressError) {
        // PostgreSQL unique constraint hatası (23505) veya diğer hataları logla ama devam et
        console.warn('İlerleme kaydı hatası:', progressError.message);
        // Kullanıcıya hata göstermeden devam et
      }

      // Başarı ekranına yönlendir (unit bilgisiyle)
      if (unitId && unitTitle) {
        navigation.replace('Completion', {
          unitId: unitId,
          unitTitle: unitTitle,
        });
      } else {
        // Fallback: unit bilgisi yoksa sadece Completion'a git
        navigation.replace('Completion', {
          unitId: 0,
          unitTitle: 'Dersler',
        });
      }
      return;
    }
    
    setCurrentIndex((prev) => prev + 1);
    setQuizState({});
  };

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

  const handleAudioPlayPause = async () => {
    const metadata = currentStep?.metadata;
    // Use metadata.audio_url (new format) with fallback to audioUrl (legacy)
    const audioUrl = metadata?.audio_url || metadata?.audioUrl;

    if (!audioUrl) {
      Alert.alert('Hata', 'Ses dosyası bulunamadı.');
      return;
    }

    try {
      if (audioState.isPlaying && audioState.sound) {
        // Durdur
        await audioState.sound.pauseAsync();
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
      } else if (audioState.sound) {
        // Devam ettir
        await audioState.sound.playAsync();
        setAudioState((prev) => ({ ...prev, isPlaying: true }));
      } else {
        // Yeni ses yükle ve oynat
        setAudioState((prev) => ({ ...prev, isLoading: true }));

        // Debug log for audio URL
        console.log('MOONO AUDIO DEBUG - OKUNAN URL:', audioUrl);

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        
        // Ses durumunu güncelle
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

        setAudioState({ 
          sound, 
          isPlaying: true, 
          isLoading: false,
          position: 0,
          duration: 0,
        });
      }
    } catch (error) {
      setAudioState((prev) => ({ ...prev, isLoading: false }));
      Alert.alert('Hata', 'Ses oynatılamadı. Lütfen tekrar deneyin.');
    }
  };

  const renderAudioStep = (step: LessonStep) => {
    const metadata = step.metadata || {};
    const description = metadata.text || metadata.body || '';
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
        <View style={styles.progressWrapper}>
          <Text style={styles.progressLabel}>Adım {currentIndex + 1}</Text>
          <Text style={styles.progressTotal}>/ {steps.length}</Text>
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
            {currentIndex === steps.length - 1 ? 'Bitir' : 'Devam Et'}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>{renderBody()}</View>
    </SafeAreaView>
  );
}

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 18,
    color: palette.text,
    lineHeight: 28,
  },
  strong: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  paragraph: {
    marginBottom: 12,
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
    paddingTop: 12,
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
    marginBottom: 14,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: palette.accent,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  progressTotal: {
    fontSize: 15,
    color: palette.muted,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 24,
  },
  stepTag: {
    fontSize: 13,
    color: palette.accent,
    letterSpacing: 1,
    marginBottom: 12,
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
    lineHeight: 40,
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
    backgroundColor: '#121212',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  optionButtonSelected: {
    borderColor: palette.accent,
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
