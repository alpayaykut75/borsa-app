import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

import TabScreenHeader from '../components/TabScreenHeader';
import UnitPathItem from '../components/UnitPathItem';
import { supabase } from '../lib/supabase';
import type { HomeStackParamList } from '../App';
import { useSfx } from '../src/hooks/useSfx';
import { UNLOCK_ALL_FOR_TEST } from '../src/constants/devFlags';
import {
  CORE_LESSONS_PER_LEVEL,
  CORE_LESSONS_TOTAL,
  isBonusUnit,
  isCoreLesson,
} from '../src/constants/curriculum';
import { fetchLearningHubSnapshot } from '../src/services/learningHubService';
import { greetingFirstName, loadProfileDisplay } from '../src/constants/profileStorage';
import { DEFAULT_PROFILE_AVATAR_ID, getProfileAvatarSource } from '../src/constants/avatars';
import { neutrals, spacing, typography } from '../src/constants/theme';
import ScalePressable from '../components/ScalePressable';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

type Unit = {
  id: number;
  title: string;
  description?: string;
  order_index?: number;
  coming_soon?: boolean;
};

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#8A8A8A',
  danger: '#EF4444',
};
const HUB_UNLOCK_LESSONS = 5;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedLessonsByUnit, setCompletedLessonsByUnit] = useState<Record<number, number>>({});
  const [totalLessonsByUnit, setTotalLessonsByUnit] = useState<Record<number, number>>({});
  /** Kilit zinciri: ara quiz dahil tüm öğeler */
  const [completedAllByUnit, setCompletedAllByUnit] = useState<Record<number, number>>({});
  const [totalAllByUnit, setTotalAllByUnit] = useState<Record<number, number>>({});
  const [profileAvatarId, setProfileAvatarId] = useState(DEFAULT_PROFILE_AVATAR_ID);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileFirstName, setProfileFirstName] = useState('');
  const [hubLoading, setHubLoading] = useState(true);
  const [hubError, setHubError] = useState<string | null>(null);
  const [flashcardCount, setFlashcardCount] = useState(0);
  const { playSound } = useSfx();

  const fetchUnits = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: supabaseError } = await supabase
      .from('units')
      .select('*')
      .order('order_index', { ascending: true });

    if (supabaseError) {
      setError(supabaseError.message);
      setUnits([]);
    } else {
      setUnits(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const fetchProgress = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: progressData } = await supabase
      .from('user_progress')
      .select('lesson_id, lessons!inner(unit_id, title, icon_name)')
      .eq('user_id', user.id)
      .eq('is_completed', true);

    const { data: lessonsData } = await supabase
      .from('lessons')
      .select('id, unit_id, title, icon_name');

    if (progressData && lessonsData) {
      const completedCore: Record<number, number> = {};
      const totalCore: Record<number, number> = {};
      const completedAll: Record<number, number> = {};
      const totalAll: Record<number, number> = {};

      progressData.forEach((item: any) => {
        const unitId = item.lessons?.unit_id;
        if (!unitId) return;
        completedAll[unitId] = (completedAll[unitId] || 0) + 1;
        if (isCoreLesson(item.lessons)) {
          completedCore[unitId] = (completedCore[unitId] || 0) + 1;
        }
      });

      lessonsData.forEach((lesson: any) => {
        totalAll[lesson.unit_id] = (totalAll[lesson.unit_id] || 0) + 1;
        if (isCoreLesson(lesson)) {
          totalCore[lesson.unit_id] = (totalCore[lesson.unit_id] || 0) + 1;
        }
      });

      // Eksik birimde sabit 10 göster (henüz yüklenmediyse)
      units.forEach((unit) => {
        if (!isBonusUnit(unit) && !totalCore[unit.id]) {
          totalCore[unit.id] = CORE_LESSONS_PER_LEVEL;
        }
      });

      setCompletedLessonsByUnit(completedCore);
      setTotalLessonsByUnit(totalCore);
      setCompletedAllByUnit(completedAll);
      setTotalAllByUnit(totalAll);
    }
  }, [units]);

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [fetchProgress]),
  );

  useFocusEffect(
    useCallback(() => {
      const loadHeaderProfile = async () => {
        try {
          const display = await loadProfileDisplay();
          setProfileAvatarId(display.avatar);
          setProfilePhoto(display.photoUri);
          setProfileFirstName(display.firstName);
        } catch (loadError) {
          console.warn('Profile header load error:', loadError);
        }
      };

      loadHeaderProfile();
    }, []),
  );

  const refreshHub = useCallback(async () => {
    setHubLoading(true);
    setHubError(null);
    try {
      const snapshot = await fetchLearningHubSnapshot();
      setFlashcardCount(snapshot.flashcards.length);
      if (!snapshot.dailyQuiz.ok) {
        setHubError(snapshot.dailyQuiz.error ?? 'Gelisim Merkezi yuklenemedi.');
      }
    } catch {
      setHubError('Baglanti hatasi.');
    } finally {
      setHubLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshHub();
    }, [refreshHub]),
  );

  const handleStartLesson = (unit: Unit) => {
    playSound('correct', { volume: 0.22, maxDurationMs: 200 });
    const sortedUnits = [...units].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
    const index = sortedUnits.findIndex((u) => u.id === unit.id);
    const status = getUnitStatus(index);
    if (status === 'SOON') {
      Alert.alert(
        'Yakında',
        'Bu seviye hazırlanıyor, ortak. Çok yakında burada olacak!',
      );
      return;
    }
    navigation.navigate('UnitDetail', {
      unitId: unit.id,
      unitTitle: unit.title,
      previewLocked: status === 'LOCKED',
    });
  };

  const getUnitStatus = (index: number): 'LOCKED' | 'ACTIVE' | 'COMPLETED' | 'SOON' => {
    if (UNLOCK_ALL_FOR_TEST) return 'ACTIVE';

    const sortedUnits = [...units].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
    const currentUnit = sortedUnits[index];
    if (!currentUnit) return 'LOCKED';

    // İçeriği hazırlanan seviye: DB'de units.coming_soon = true (build gerekmeden açılır)
    if (currentUnit.coming_soon) return 'SOON';

    const isCompleted = (unit: Unit) => {
      // Bonus ilerlemeyi etkilemez; ana zincirde ara quiz dahil tamamlanma gerekir
      const completed = completedAllByUnit[unit.id] ?? 0;
      const total = totalAllByUnit[unit.id] ?? 0;
      return total > 0 && completed >= total;
    };

    if (isCompleted(currentUnit)) return 'COMPLETED';

    // Bonus: yalnızca önceki ana seviyeler (bonus hariç) bitince açılır
    if (isBonusUnit(currentUnit)) {
      const mainUnits = sortedUnits.filter((u) => !isBonusUnit(u));
      const allMainDone = mainUnits.length > 0 && mainUnits.every(isCompleted);
      return allMainDone ? 'ACTIVE' : 'LOCKED';
    }

    const mainUnits = sortedUnits.filter((u) => !isBonusUnit(u));
    const firstIncompleteIndex = mainUnits.findIndex((unit) => !isCompleted(unit));
    const activeMain = firstIncompleteIndex === -1 ? mainUnits[0] : mainUnits[firstIncompleteIndex];
    return currentUnit.id === activeMain?.id ? 'ACTIVE' : 'LOCKED';
  };

  const totalCompletedLessons = useMemo(() => {
    // Hub kilidi: bonus hariç yalnızca çekirdek dersler
    return units.reduce((sum, unit) => {
      if (isBonusUnit(unit)) return sum;
      return sum + (completedLessonsByUnit[unit.id] ?? 0);
    }, 0);
  }, [units, completedLessonsByUnit]);
  const overallProgressPct = Math.min(
    100,
    Math.round((totalCompletedLessons / CORE_LESSONS_TOTAL) * 100),
  );
  const hubUnlocked = UNLOCK_ALL_FOR_TEST || totalCompletedLessons >= HUB_UNLOCK_LESSONS;

  const showHubLockInfo = () => {
    Alert.alert('Kilitli', `İlk ${HUB_UNLOCK_LESSONS} dersi tamamla, kilidi aç.`);
  };

  const renderHubRow = () => (
    <View style={styles.hubRow}>
      <ScalePressable
        style={[styles.hubBox, styles.hubBoxCyan, !hubUnlocked && styles.hubBoxLocked]}
        onPress={() => {
          if (!hubUnlocked) {
            showHubLockInfo();
            return;
          }
          navigation.navigate('GrowthCenter');
        }}
      >
        <View style={styles.hubBoxTop}>
          <View style={styles.hubIconWrap}>
            <Ionicons name="sparkles-outline" size={16} color={palette.accent} />
          </View>
          <Ionicons name={hubUnlocked ? 'chevron-forward' : 'lock-closed'} size={16} color={neutrals.textDisabled} />
        </View>
        <Text style={styles.hubBoxTitleCompact}>Gelişim{'\n'}Merkezi</Text>
      </ScalePressable>

      <ScalePressable
        style={[styles.hubBox, styles.hubBoxBlue, !hubUnlocked && styles.hubBoxLocked]}
        onPress={() => {
          if (!hubUnlocked) {
            showHubLockInfo();
            return;
          }
          navigation.navigate('FlashcardLibrary');
        }}
      >
        <View style={styles.hubBoxTop}>
          <View style={styles.hubIconWrap}>
            <Ionicons name="albums-outline" size={16} color="#7DD3FC" />
          </View>
          <Ionicons name={hubUnlocked ? 'chevron-forward' : 'lock-closed'} size={16} color={neutrals.textDisabled} />
        </View>
        <Text style={styles.hubBoxTitleCompact}>Kelime{'\n'}Kartlarım</Text>
      </ScalePressable>

      <ScalePressable
        style={[styles.hubBox, styles.hubBoxBlue]}
        onPress={() => navigation.push('MarketNews')}
      >
        <View style={styles.hubBoxTop}>
          <View style={styles.hubIconWrap}>
            <Ionicons name="cafe-outline" size={16} color={palette.accent} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={neutrals.textDisabled} />
        </View>
        <Text style={styles.hubBoxTitleCompact}>Sabah{'\n'}Kahvesi</Text>
      </ScalePressable>
    </View>
  );

  const renderState = () => {
    if (loading) {
      return (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={palette.accent} />
          <Text style={styles.stateText}>Bolumler yukleniyor...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerState}>
          <Text style={styles.errorText}>Bir sorun olustu: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUnits}>
            <Text style={styles.retryText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (units.length === 0) {
      return (
        <View style={styles.centerState}>
          <Text style={styles.stateText}>Henuz bolum bulunmuyor.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={units}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={(
          <View style={styles.listHeader}>
            <View style={styles.overallProgress}>
              <View style={styles.overallProgressRow}>
                <Text style={styles.overallProgressLabel}>Genel ilerleme</Text>
                <Text style={styles.overallProgressValue}>
                  {totalCompletedLessons}/{CORE_LESSONS_TOTAL}
                </Text>
              </View>
              <View style={styles.overallTrack}>
                <View style={[styles.overallFill, { width: `${overallProgressPct}%` }]} />
              </View>
            </View>
            {renderHubRow()}
            {hubLoading && (
              <View style={styles.hubHintRow}>
                <ActivityIndicator size="small" color={palette.accent} />
              </View>
            )}
            {!!hubError && <Text style={styles.hubError}>{hubError}</Text>}
          </View>
        )}
        renderItem={({ item, index }) => (
          <UnitPathItem
            unit={item}
            index={index}
            totalUnits={units.length}
            status={getUnitStatus(index)}
            onPress={handleStartLesson}
            completedLessons={completedLessonsByUnit[item.id] || 0}
            totalLessons={totalLessonsByUnit[item.id] || CORE_LESSONS_PER_LEVEL}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <TabScreenHeader
          title={`Hos Geldin ${greetingFirstName(profileFirstName)}`}
          subtitle="Adım Adım Borsa"
          avatarImage={profilePhoto ? undefined : getProfileAvatarSource(profileAvatarId)}
          avatarPhotoUri={profilePhoto}
          moonoAvatarCrop
        />
        {renderState()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  container: { flex: 1 },
  listContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxl },
  listHeader: { marginBottom: spacing.md },
  overallProgress: {
    marginBottom: spacing.md,
  },
  overallProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  overallProgressLabel: {
    ...typography.caption,
    color: palette.muted,
    letterSpacing: 0.2,
  },
  overallProgressValue: {
    ...typography.caption,
    color: palette.text,
    fontWeight: '600',
  },
  overallTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: '#1F1F1F',
    overflow: 'hidden',
  },
  overallFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: palette.accent,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  stateText: { ...typography.body, marginTop: 12, color: palette.muted, textAlign: 'center' },
  errorText: { ...typography.body, color: palette.danger, textAlign: 'center', marginBottom: 12 },
  retryButton: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    backgroundColor: palette.accent,
  },
  retryText: { ...typography.button, color: '#000000' },
  hubRow: { flexDirection: 'row', gap: spacing.xs },
  hubBox: {
    flex: 1,
    minHeight: 104,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.card,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  hubBoxCyan: { borderColor: 'rgba(96,165,250,0.35)', backgroundColor: '#11161C' },
  hubBoxBlue: { borderColor: 'rgba(96,165,250,0.35)', backgroundColor: '#11161C' },
  hubBoxLocked: { opacity: 0.6 },
  hubBoxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hubIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E2224',
    borderWidth: 1,
    borderColor: '#24484C',
  },
  hubBoxTitleCompact: { ...typography.body, color: palette.text, fontWeight: '700', lineHeight: 23 },
  hubHintRow: { marginTop: 8, alignItems: 'center' },
  hubError: { ...typography.caption, marginTop: 8, textAlign: 'center', color: palette.danger },
});
