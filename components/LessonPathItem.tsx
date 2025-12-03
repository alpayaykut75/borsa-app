import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

const palette = {
  background: '#000000',
  card: '#1E1E1E',
  cardActive: '#262626',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#A3A3A3',
  success: '#16A34A',
  locked: '#666666',
};

type Lesson = {
  id: number;
  title: string;
  description?: string;
  order_index?: number;
};

type LessonPathItemProps = {
  lesson: Lesson;
  index: number;
  totalLessons: number;
  status: 'LOCKED' | 'ACTIVE' | 'COMPLETED';
  onPress: (lesson: Lesson) => void;
};

export default function LessonPathItem({
  lesson,
  index,
  totalLessons,
  status,
  onPress,
}: LessonPathItemProps) {
  const isLast = index === totalLessons - 1;
  const isLocked = status === 'LOCKED';

  const handlePress = () => {
    if (!isLocked) {
      onPress(lesson);
    }
  };

  return (
    <View style={styles.container}>
      {/* Timeline - Sol Taraf */}
      <View style={styles.timelineContainer}>
        {/* Üst Çizgi - Sadece ilk eleman değilse göster */}
        {index !== 0 && (
          <View
            style={[
              styles.topLine,
              status === 'COMPLETED' && styles.topLineCompleted,
              status === 'ACTIVE' && styles.topLineActive,
              status === 'LOCKED' && styles.topLineLocked,
            ]}
          />
        )}
        {/* Alt Çizgi - Sadece son eleman değilse göster */}
        {!isLast && (
          <View
            style={[
              styles.bottomLine,
              status === 'COMPLETED' && styles.bottomLineCompleted,
              status === 'ACTIVE' && styles.bottomLineActive,
              status === 'LOCKED' && styles.bottomLineLocked,
            ]}
          />
        )}
        {/* Yuvarlak Düğme */}
        <View
          style={[
            styles.timelineCircle,
            status === 'COMPLETED' && styles.timelineCircleCompleted,
            status === 'ACTIVE' && styles.timelineCircleActive,
            status === 'LOCKED' && styles.timelineCircleLocked,
          ]}
        >
          {status === 'COMPLETED' && (
            <Ionicons name="checkmark" size={20} color="#000000" />
          )}
          {status === 'ACTIVE' && (
            <Ionicons name="play" size={18} color="#000000" />
          )}
          {status === 'LOCKED' && (
            <Ionicons name="lock-closed" size={16} color={palette.locked} />
          )}
        </View>
      </View>

      {/* Ders Kartı - Sağ Taraf */}
      <TouchableOpacity
        style={[
          styles.lessonCard,
          status === 'ACTIVE' && styles.lessonCardActive,
          isLocked && styles.lessonCardLocked,
        ]}
        activeOpacity={isLocked ? 1 : 0.85}
        onPress={handlePress}
        disabled={isLocked}
      >
        <View style={styles.lessonContent}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.lessonTitle,
                isLocked && styles.lessonTitleLocked,
              ]}
            >
              {lesson.title}
            </Text>
            {!!lesson.description && (
              <Text
                style={[
                  styles.lessonDescription,
                  isLocked && styles.lessonDescriptionLocked,
                ]}
                numberOfLines={2}
              >
                {lesson.description}
              </Text>
            )}
          </View>
          {!isLocked && (
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={20} color={palette.muted} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 80,
    marginVertical: 8,
  },
  timelineContainer: {
    width: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
  },
  topLine: {
    position: 'absolute',
    top: 0,
    left: 28,
    width: 2,
    height: '50%',
    backgroundColor: palette.border,
  },
  topLineCompleted: {
    backgroundColor: palette.accent,
  },
  topLineActive: {
    backgroundColor: palette.accent,
  },
  topLineLocked: {
    backgroundColor: palette.border,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 28,
    width: 2,
    height: '50%',
    backgroundColor: palette.border,
  },
  bottomLineCompleted: {
    backgroundColor: palette.accent,
  },
  bottomLineActive: {
    backgroundColor: palette.accent,
  },
  bottomLineLocked: {
    backgroundColor: palette.border,
  },
  timelineCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.border,
    zIndex: 1,
  },
  timelineCircleCompleted: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  timelineCircleActive: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  timelineCircleLocked: {
    backgroundColor: '#1A1A1A',
    borderColor: palette.locked,
  },
  lessonCard: {
    flex: 1,
    backgroundColor: palette.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  lessonCardActive: {
    backgroundColor: palette.cardActive,
    borderColor: palette.accent,
    borderWidth: 2,
  },
  lessonCardLocked: {
    opacity: 0.5,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  lessonTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
  },
  lessonTitleLocked: {
    color: palette.muted,
  },
  lessonDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.muted,
  },
  lessonDescriptionLocked: {
    color: palette.locked,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

