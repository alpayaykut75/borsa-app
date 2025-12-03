import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '../lib/supabase';
import type { MainTabParamList, HomeStackParamList } from '../App';
import UnitPathItem from '../components/UnitPathItem';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'HomeStack'>,
  NativeStackNavigationProp<HomeStackParamList>
>;

type Unit = {
  id: number;
  title: string;
  description?: string;
  order_index?: number;
};

const palette = {
  background: '#000000',
  card: '#1E1E1E',
  border: '#333333',
  accent: '#22D3EE',
  text: '#FFFFFF',
  muted: '#A3A3A3',
  danger: '#EF4444',
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedLessonsByUnit, setCompletedLessonsByUnit] = useState<Record<number, number>>({});
  const [totalLessonsByUnit, setTotalLessonsByUnit] = useState<Record<number, number>>({});

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

  // Fetch user progress and lesson counts
  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get completed lessons by unit
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('lesson_id, lessons!inner(unit_id)')
        .eq('user_id', user.id)
        .eq('is_completed', true);

      // Get total lessons by unit
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('id, unit_id');

      if (progressData && lessonsData) {
        const completed: Record<number, number> = {};
        const total: Record<number, number> = {};

        // Count completed lessons per unit
        progressData.forEach((item: any) => {
          const unitId = item.lessons?.unit_id;
          if (unitId) {
            completed[unitId] = (completed[unitId] || 0) + 1;
          }
        });

        // Count total lessons per unit
        lessonsData.forEach((lesson: any) => {
          total[lesson.unit_id] = (total[lesson.unit_id] || 0) + 1;
        });

        setCompletedLessonsByUnit(completed);
        setTotalLessonsByUnit(total);
      }
    };

    fetchProgress();
  }, [units]);

  const handleStartLesson = (unit: Unit) => {
    navigation.navigate('UnitDetail', {
      unitId: unit.id,
      unitTitle: unit.title,
    });
  };

  const getUnitStatus = (index: number): 'LOCKED' | 'ACTIVE' | 'COMPLETED' => {
    if (index === 0) return 'ACTIVE';
    return 'LOCKED';
  };

  const renderState = () => {
    if (loading) {
      return (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={palette.accent} />
          <Text style={styles.stateText}>Bölümler yükleniyor...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerState}>
          <Text style={styles.errorText}>Bir sorun oluştu: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUnits}>
            <Text style={styles.retryText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (units.length === 0) {
      return (
        <View style={styles.centerState}>
          <Text style={styles.stateText}>Henüz bölüm bulunmuyor.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={units}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const status = getUnitStatus(index);
          const completedCount = completedLessonsByUnit[item.id] || 0;
          const totalCount = totalLessonsByUnit[item.id] || 0;
          return (
            <UnitPathItem
              unit={item}
              index={index}
              totalUnits={units.length}
              status={status}
              onPress={handleStartLesson}
              completedLessons={completedCount}
              totalLessons={totalCount}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={48} color="#00C4CC" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerGreeting}>Hoş geldin Yatırımcı</Text>
            <Text style={styles.headerSubtitle}>Yatırım Yolculuğun</Text>
          </View>
        </View>
        {renderState()}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 32,
  },
  avatarContainer: {
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerGreeting: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: palette.muted,
    fontWeight: '500',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
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
});