import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
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
  fetchLearningHubSnapshot,
  type FlashcardLibraryItem,
} from '../src/services/learningHubService';
import { useSfx } from '../src/hooks/useSfx';
import { neutrals, spacing, typography } from '../src/constants/theme';
import ScalePressable from '../components/ScalePressable';
import AppButton from '../components/AppButton';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'FlashcardLibrary'>;
type GameStatus = 'idle' | 'intro' | 'playing' | 'correct' | 'wrong' | 'completed';

const palette = {
  bg: '#000000',
  card: '#171717',
  border: '#333333',
  text: '#FFFFFF',
  muted: '#8A8A8A',
  accent: '#00C4CC',
  success: '#16A34A',
  danger: '#DC2626',
};

const GAME_SIZES = [2, 4, 6] as const;
const TOTAL_STAGES = 3;
const GAME_TARGET_SIZE = GAME_SIZES[GAME_SIZES.length - 1];

export default function FlashcardLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [cards, setCards] = useState<FlashcardLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isGameMode, setIsGameMode] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [gamePool, setGamePool] = useState<FlashcardLibraryItem[]>([]);
  const [targetCardId, setTargetCardId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [usedTargetCardIds, setUsedTargetCardIds] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const { playSound } = useSfx();
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const snapshot = await fetchLearningHubSnapshot();
    setCards(snapshot.flashcards);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load().catch(() => setError('Kartlar yüklenemedi.'));
    }, [load]),
  );

  const targetCard = useMemo(
    () => gamePool.find((card) => card.id === targetCardId) ?? null,
    [gamePool, targetCardId],
  );

  const displayData = useMemo(
    () => (isGameMode ? gamePool : cards),
    [cards, gamePool, isGameMode],
  );

  const canStartGame = cards.length >= 2;
  const hasFullDifficulty = cards.length >= GAME_TARGET_SIZE;

  const pickRandomCards = useCallback((source: FlashcardLibraryItem[], count: number) => {
    const copied = [...source];
    for (let i = copied.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied.slice(0, Math.min(count, copied.length));
  }, []);

  const startStage = useCallback((idx: number, usedIdsOverride?: string[]) => {
    const desiredSize = GAME_SIZES[Math.min(idx, GAME_SIZES.length - 1)];
    const usedIds = usedIdsOverride ?? usedTargetCardIds;
    const availableTargets = cards.filter((card) => !usedIds.includes(card.id));
    const targetSource = availableTargets.length > 0 ? availableTargets : cards;
    const target = targetSource[Math.floor(Math.random() * targetSource.length)] ?? null;
    if (!target) return;
    const distractors = pickRandomCards(
      cards.filter((card) => card.id !== target.id),
      Math.max(desiredSize - 1, 0),
    );
    const pool = pickRandomCards([target, ...distractors], desiredSize);

    setStageIndex(idx);
    setGamePool(pool);
    setTargetCardId(target.id);
    setUsedTargetCardIds(idx === 0 ? [target.id] : [...usedIds, target.id]);
    setSelectedCardId(null);
    setActiveCardId(null);
    setGameStatus('playing');
  }, [cards, pickRandomCards, usedTargetCardIds]);

  const startGame = useCallback(() => {
    if (!canStartGame) return;
    setIsGameMode(true);
    setStageIndex(0);
    setGamePool([]);
    setTargetCardId(null);
    setSelectedCardId(null);
    setActiveCardId(null);
    setUsedTargetCardIds([]);
    setGameStatus('intro');
  }, [canStartGame]);

  const stopGame = useCallback(() => {
    setIsGameMode(false);
    setGamePool([]);
    setTargetCardId(null);
    setSelectedCardId(null);
    setActiveCardId(null);
    setUsedTargetCardIds([]);
    setGameStatus('idle');
    setStageIndex(0);
  }, []);

  const restartGame = useCallback(() => {
    if (!canStartGame) return;
    setIsGameMode(true);
    setUsedTargetCardIds([]);
    startStage(0, []);
  }, [canStartGame, startStage]);

  const continueGame = useCallback(() => {
    if (gameStatus === 'intro') {
      startStage(0, []);
      return;
    }
    if (gameStatus !== 'correct') return;
    if (stageIndex >= TOTAL_STAGES - 1) {
      setGameStatus('completed');
      return;
    }
    startStage(stageIndex + 1);
  }, [gameStatus, stageIndex, startStage]);

  const stageCoachLine = useMemo(() => {
    if (stageIndex === 0) return 'Süper! İkinci soru geliyor.';
    if (stageIndex === 1) return 'Harika! Son soru geliyor.';
    return 'Harika gidiyorsun!';
  }, [stageIndex]);

  const hasGameOverlay =
    isGameMode &&
    (gameStatus === 'intro' || gameStatus === 'correct' || gameStatus === 'wrong' || gameStatus === 'completed');

  useEffect(() => {
    if (!hasGameOverlay) return;
    overlayOpacity.setValue(0);
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [gameStatus, hasGameOverlay, overlayOpacity]);

  const handleCardPress = useCallback((item: FlashcardLibraryItem) => {
    if (!isGameMode) {
      // Only one card can be open at a time.
      playSound('unlock', { volume: 0.2, maxDurationMs: 170 });
      setActiveCardId((prev) => (prev === item.id ? null : item.id));
      return;
    }

    if (gameStatus !== 'playing' || !targetCardId) return;
    const isCorrect = item.id === targetCardId;
    setSelectedCardId(item.id);
    setActiveCardId(null);
    if (isCorrect) {
      if (stageIndex >= TOTAL_STAGES - 1) {
        setGameStatus('completed');
        playSound('complete', { volume: 0.34 });
      } else {
        setGameStatus('correct');
        playSound('correct', { volume: 0.32, maxDurationMs: 260 });
      }
    } else {
      setGameStatus('wrong');
      playSound('error', { volume: 0.32, maxDurationMs: 260 });
    }
  }, [gameStatus, isGameMode, playSound, stageIndex, targetCardId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <TabScreenHeader
          title="Kelime Kartlarım"
          subtitle="Hafızana güveniyor musun?"
          avatarImage={MOONO_CHARACTER_AVATAR}
          moonoAvatarCrop
          trailing={(
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={palette.text} />
            </TouchableOpacity>
          )}
        />
      </View>

      {!loading && !error && cards.length > 0 && !isGameMode && (
        <View style={styles.preGameWrap}>
          <Text style={styles.libraryCountText}>Toplam {cards.length} kart açıldı</Text>
          <View style={styles.playCard}>
            <Text style={styles.playCardTitle}>Hafıza Oyunu</Text>
            <AppButton
              title="Oyunu Başlat"
              onPress={startGame}
              disabled={!canStartGame}
              style={styles.gameButton}
            />
          </View>
          {!hasFullDifficulty && (
            <Text style={styles.playCardHint}>Kart sayısı arttıkça oyun otomatik zorlaşır.</Text>
          )}
        </View>
      )}

      {isGameMode && gameStatus === 'playing' && targetCard && (
        <View style={styles.questionWrap}>
          <Text style={styles.questionIndex}>Soru {Math.min(stageIndex + 1, TOTAL_STAGES)}</Text>
          <Text style={styles.questionText}>{targetCard.definition}</Text>
        </View>
      )}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={palette.accent} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : displayData.length === 0 && !isGameMode ? (
        <View style={styles.center}>
          <Text style={styles.muted}>Henüz açılan kelime kartı yok.</Text>
        </View>
      ) : displayData.length === 0 ? null : (
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isFlipped = !isGameMode && activeCardId === item.id;
            const isSelected = selectedCardId === item.id;
            const isCorrectCard = isGameMode && gameStatus === 'correct' && isSelected;
            const isWrongCard = isGameMode && gameStatus === 'wrong' && isSelected;
            const isInteractive = !isGameMode || gameStatus === 'playing';
            return (
              <ScalePressable
                style={[
                  styles.card,
                  isGameMode && styles.gameCard,
                  !isInteractive && styles.cardDisabled,
                  isCorrectCard && styles.cardCorrect,
                  isWrongCard && styles.cardWrong,
                ]}
                disabled={!isInteractive}
                onPress={() => handleCardPress(item)}
              >
                {!isFlipped ? (
                  <>
                    <Text style={styles.frontText}>{item.term}</Text>
                  </>
                ) : (
                  <Text style={styles.backText}>{item.definition}</Text>
                )}
              </ScalePressable>
            );
          }}
        />
      )}

      {isGameMode && gameStatus === 'intro' && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>Hazır mısın ortak?</Text>
            <Text style={styles.overlayBody}>
              3 soruluk hafıza testi başlıyor. Her soruda oyun biraz daha zorlaşacak.
            </Text>
            <AppButton
              title="Hazırım, başlayalım"
              onPress={continueGame}
              variant="secondary"
              style={styles.overlayPrimaryBtn}
            />
            <AppButton title="Vazgeçtim" onPress={stopGame} variant="ghost" style={styles.overlayGhostBtn} />
          </View>
        </Animated.View>
      )}

      {isGameMode && gameStatus === 'correct' && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>{stageCoachLine}</Text>
            <AppButton title="Devam Et" onPress={continueGame} variant="secondary" style={styles.overlayPrimaryBtn} />
          </View>
        </Animated.View>
      )}

      {isGameMode && gameStatus === 'wrong' && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>Bu defa olmadı</Text>
            <Text style={styles.overlayBody}>Hadi baştan bir tur daha deneyelim.</Text>
            <AppButton
              title="Baştan Başla"
              onPress={restartGame}
              variant="secondary"
              style={styles.overlayPrimaryBtn}
            />
            <AppButton title="Kartlara Dön" onPress={stopGame} variant="ghost" style={styles.overlayGhostBtn} />
          </View>
        </Animated.View>
      )}

      {isGameMode && gameStatus === 'completed' && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>Muhteşem tur!</Text>
            <Text style={styles.overlayBody}>3 soruyu da bildin. Yine oynayalım mı?</Text>
            <AppButton title="Yeni Tur" onPress={restartGame} variant="secondary" style={styles.overlayPrimaryBtn} />
            <AppButton title="Kartlara Dön" onPress={stopGame} variant="ghost" style={styles.overlayGhostBtn} />
          </View>
        </Animated.View>
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { ...typography.body, color: palette.muted },
  error: { color: palette.danger },

  preGameWrap: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  libraryCountText: {
    color: neutrals.textSubtle,
    textAlign: 'center',
    ...typography.bodySm,
  },
  playCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101214',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  playCardTitle: {
    ...typography.h2,
    color: palette.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  playCardHint: {
    color: neutrals.textDisabled,
    textAlign: 'center',
    ...typography.caption,
  },
  gameButton: {},

  questionWrap: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: neutrals.borderStrong,
    borderRadius: 14,
    backgroundColor: '#121416',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  questionIndex: {
    ...typography.caption,
    color: palette.accent,
    marginBottom: spacing.xs,
  },
  questionText: {
    ...typography.h3,
    color: palette.text,
    lineHeight: 28,
    textAlign: 'center',
  },

  listContent: { paddingBottom: spacing.xl, paddingHorizontal: spacing.md, paddingTop: 2 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48.5%',
    minHeight: 128,
    marginBottom: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: neutrals.borderSoft,
    backgroundColor: '#141517',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    minHeight: 118,
  },
  cardDisabled: {
    opacity: 0.75,
  },
  cardCorrect: {
    borderColor: palette.success,
    backgroundColor: '#12381F',
  },
  cardWrong: {
    borderColor: palette.danger,
    backgroundColor: '#3B1A1A',
  },
  frontText: {
    ...typography.h3,
    color: palette.text,
    textAlign: 'center',
  },
  backText: {
    ...typography.bodySm,
    color: palette.text,
    lineHeight: 22,
    textAlign: 'center',
  },

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
    ...typography.h1,
    color: '#FFFFFF',
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
  },
});
