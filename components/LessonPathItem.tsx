import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  cardActive: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
  success: '#16A34A',
  locked: '#888888',
};

type Lesson = {
  id: number;
  title: string;
  description?: string;
  order_index?: number;
  icon_name?: string;
};

export type LessonPathStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED' | 'PREMIUM';

type LessonPathItemProps = {
  lesson: Lesson;
  index: number;
  totalLessons: number;
  status: LessonPathStatus;
  onPress: (lesson: Lesson) => void;
  hideActiveBadge?: boolean;
};

export default function LessonPathItem({
  lesson,
  index,
  totalLessons,
  status,
  onPress,
  hideActiveBadge = false,
}: LessonPathItemProps) {
  const isLast = index === totalLessons - 1;
  const isProgressLocked = status === 'LOCKED';
  const isPremiumLocked = status === 'PREMIUM';
  const isLocked = isProgressLocked || isPremiumLocked;

  const handlePress = () => {
    if (!isProgressLocked) {
      onPress(lesson);
    }
  };
  const normalizedTitle = (lesson.title || '').toLowerCase();
  const isExamLike =
    normalizedTitle.includes('ara değerlendirme') ||
    normalizedTitle.includes('ara degerlendirme') ||
    normalizedTitle.includes('sınav') ||
    normalizedTitle.includes('sinav');
  const examIconName = (lesson.icon_name || 'school-outline') as any;

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
            status === 'PREMIUM' && styles.timelineCirclePremium,
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
          {status === 'PREMIUM' && (
            <Ionicons name="diamond" size={16} color={palette.accent} />
          )}
        </View>
      </View>

      {/* Ders Kartı - Sağ Taraf */}
      <TouchableOpacity
        style={[
          styles.lessonCard,
          status === 'ACTIVE' && styles.lessonCardActive,
          isPremiumLocked && styles.lessonCardPremium,
          isProgressLocked && styles.lessonCardLocked,
        ]}
        activeOpacity={isProgressLocked ? 1 : 0.85}
        onPress={handlePress}
        disabled={isProgressLocked}
      >
        <View style={styles.lessonContent}>
          <View style={styles.textContainer}>
            {status === 'ACTIVE' && !hideActiveBadge && (
              <View style={styles.nextLessonBadge}>
                <Text style={styles.nextLessonBadgeText}>{isExamLike ? 'Aktif Sınav' : 'Aktif Ders'}</Text>
              </View>
            )}
            {status === 'PREMIUM' && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>Premium ile devam et</Text>
              </View>
            )}
            <Text
              style={[
                styles.lessonTitle,
                isLocked && styles.lessonTitleLocked,
              ]}
            >
              {isExamLike ? (
                <>
                  <Ionicons name={examIconName} size={16} color={palette.accent} />{' '}
                  {lesson.title}
                </>
              ) : (
                lesson.title
              )}
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
          {!isProgressLocked && (
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={20} color={isPremiumLocked ? palette.accent : palette.muted} />
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
  timelineCirclePremium: {
    backgroundColor: '#1A1A1A',
    borderColor: palette.accent,
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
    opacity: 0.72,
  },
  lessonCardPremium: {
    borderColor: palette.accent,
    borderWidth: 1,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.12)',
    marginBottom: 8,
  },
  premiumBadgeText: {
    fontSize: 11,
    color: palette.accent,
    fontWeight: '700',
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
  nextLessonBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.12)',
    marginBottom: 8,
  },
  nextLessonBadgeText: {
    fontSize: 11,
    color: palette.accent,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  lessonTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
  },
  lessonTitleLocked: {
    color: '#9A9A9A',
  },
  lessonDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.muted,
  },
  lessonDescriptionLocked: {
    color: '#7D7D7D',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

