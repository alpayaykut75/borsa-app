import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '../lib/supabase';
import type { HomeStackParamList, RootStackParamList } from '../App';
import LessonPathItem from '../components/LessonPathItem';
import { useSfx } from '../src/hooks/useSfx';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'UnitDetail'>,
  NativeStackScreenProps<RootStackParamList>
>;

type Lesson = {
  id: number;
  title: string;
  description?: string;
  order_index?: number;
  icon_name?: string;
};

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
  danger: '#EF4444',
};

const levelHeaderImages = [
  require('../assets/levels/level1-cirak.png'),
  require('../assets/levels/level2-caylak.png'),
  require('../assets/levels/level3-analist.png'),
  require('../assets/levels/level4-stratejist.png'),
  require('../assets/levels/level5-profesyonel.png'),
];

const getLevelHeaderImage = (unitTitle?: string, unitId?: number) => {
  const titleMatch = unitTitle?.match(/Seviye\s*(\d+)/i);
  const titleLevel = titleMatch ? Number(titleMatch[1]) : NaN;
  const fromTitle = Number.isFinite(titleLevel) ? titleLevel - 1 : -1;
  const fromId = typeof unitId === 'number' ? unitId - 1 : -1;
  const index = fromTitle >= 0 ? fromTitle : fromId;
  const safeIndex = Math.min(Math.max(index, 0), levelHeaderImages.length - 1);
  return levelHeaderImages[safeIndex];
};

export default function UnitDetailScreen({ route, navigation }: Props) {
  const { unitId, unitTitle } = route.params;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<number>>(new Set());
  const { playSound } = useSfx();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' as never }],
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: supabaseError } = await supabase
      .from('lessons')
      .select('*')
      .eq('unit_id', unitId)
      .order('sort_order', { ascending: true });

    if (supabaseError) {
      setError(supabaseError.message);
      setLessons([]);
    } else {
      setLessons(data ?? []);
    }

    setLoading(false);
  }, [unitId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // Kullanıcının tamamladığı dersleri çek
  const fetchCompletedLessons = useCallback(async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      setCompletedLessonIds(new Set());
      return;
    }

    const { data, error: progressError } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('is_completed', true);

    if (progressError) {
      console.warn('Tamamlanan dersler çekilemedi:', progressError.message);
      setCompletedLessonIds(new Set());
      return;
    }

    const completedIds = new Set<number>((data ?? []).map((item) => item.lesson_id));
    setCompletedLessonIds(completedIds);
  }, []);

  // Sayfa her odaklandığında tamamlanan dersleri çek
  useFocusEffect(
    useCallback(() => {
      fetchCompletedLessons();
    }, [fetchCompletedLessons])
  );

  const handleLessonPress = (lesson: Lesson) => {
    const index = lessons.findIndex((l) => l.id === lesson.id);
    const status = getLessonStatus(index, lesson.id);

    // If lesson is newly unlocked (i.e., not completed and currently ACTIVE), play unlock SFX
    if (status === 'ACTIVE' && !completedLessonIds.has(lesson.id)) {
      playSound('unlock');
    }

    navigation.navigate('Lesson', {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      unitId: unitId,
      unitTitle: unitTitle,
    });
  };

  const getLessonStatus = (index: number, lessonId: number): 'LOCKED' | 'ACTIVE' | 'COMPLETED' => {
    // COMPLETED: Eğer ders tamamlananlar listesindeyse
    if (completedLessonIds.has(lessonId)) {
      return 'COMPLETED';
    }

    // ACTIVE: Eğer ders tamamlanmamışsa VE (bir önceki ders tamamlanmışsa VEYA bu listenin ilk dersiyse)
    if (index === 0) {
      return 'ACTIVE';
    }

    const previousLesson = lessons[index - 1];
    if (previousLesson && completedLessonIds.has(previousLesson.id)) {
      return 'ACTIVE';
    }

    // LOCKED: Yukarıdakiler değilse
    return 'LOCKED';
  };

  const renderLessonItem = ({ item, index }: { item: Lesson; index: number }) => {
    const status = getLessonStatus(index, item.id);
    
    return (
      <LessonPathItem
        lesson={item}
        index={index}
        totalLessons={lessons.length}
        status={status}
        onPress={handleLessonPress}
      />
    );
  };

  // Calculate completion percentage
  const completedCount = lessons.filter(lesson => completedLessonIds.has(lesson.id)).length;
  const totalCount = lessons.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const currentStep = totalCount > 0 ? Math.min(completedCount + 1, totalCount) : 1;
  const levelHeaderImage = getLevelHeaderImage(unitTitle, unitId);

  const renderBody = () => {
    if (loading) {
      return (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={palette.accent} />
          <Text style={styles.stateText}>Dersler yükleniyor...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerState}>
          <Text style={styles.errorText}>Bir sorun oluştu: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchLessons}>
            <Text style={styles.retryText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (lessons.length === 0) {
      return (
        <View style={styles.centerState}>
          <Text style={styles.stateText}>Bu ünitede henüz ders bulunmuyor.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={renderLessonItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.customHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color={palette.text} />
          </TouchableOpacity>
          <View style={styles.headerAvatarContainer}>
            <Image source={levelHeaderImage} style={styles.headerLevelAvatar} resizeMode="cover" />
          </View>
          <View style={styles.headerContent}>
            <Text
              style={styles.headerTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.82}
            >
              {unitTitle || 'Dersler'}
            </Text>
            <Text style={styles.headerSubtext}>
              Adım {currentStep}/{Math.max(totalCount, 1)} • %{completionPercentage}
            </Text>
          </View>
        </View>
        {renderBody()}
      </View>
    </SafeAreaView>
  );
}

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
    paddingBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerAvatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.accent,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.accent,
    marginBottom: 4,
    flexShrink: 1,
  },
  headerLevelAvatar: {
    width: '100%',
    height: '100%',
  },
  headerSubtext: {
    fontSize: 14,
    color: palette.muted,
    fontWeight: '500',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  stateText: {
    marginTop: 12,
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
  retryButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: palette.accent,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});

