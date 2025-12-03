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
  locked: '#666666',
};

// Level-specific icons
const getLevelIcon = (index: number, status: 'LOCKED' | 'ACTIVE' | 'COMPLETED'): { name?: string; emoji: string } => {
  if (status === 'LOCKED') {
    return { name: 'lock-closed', emoji: '🔒' };
  }
  
  const icons = [
    { emoji: '🌱' }, // Level 1 - Seed
    { emoji: '🌿' }, // Level 2 - Sprout
    { emoji: '📊' }, // Level 3 - Chart
    { emoji: '🚀' }, // Level 4 - Rocket
    { emoji: '🏆' }, // Level 5+ - Trophy
  ];
  
  return icons[Math.min(index, icons.length - 1)] || { emoji: '⭐' };
};

type Unit = {
  id: number;
  title: string;
  description?: string;
  order_index?: number;
};

type UnitPathItemProps = {
  unit: Unit;
  index: number;
  totalUnits: number;
  status: 'LOCKED' | 'ACTIVE' | 'COMPLETED';
  onPress: (unit: Unit) => void;
  completedLessons?: number;
  totalLessons?: number;
};

export default function UnitPathItem({
  unit,
  index,
  totalUnits,
  status,
  onPress,
  completedLessons = 0,
  totalLessons = 0,
}: UnitPathItemProps) {
  const isLocked = status === 'LOCKED';
  const levelIcon = getLevelIcon(index, status);
  const progress = totalLessons > 0 ? completedLessons / totalLessons : 0;

  const handlePress = () => {
    if (!isLocked) {
      onPress(unit);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.unitCard,
        status === 'ACTIVE' && styles.unitCardActive,
        isLocked && styles.unitCardLocked,
      ]}
      activeOpacity={isLocked ? 1 : 0.85}
      onPress={handlePress}
      disabled={isLocked}
    >
      <View style={styles.unitContent}>
        {/* Icon Container */}
        <View style={styles.iconContainer}>
          {isLocked ? (
            <Ionicons 
              name="lock-closed" 
              size={24} 
              color={palette.locked} 
            />
          ) : (
            <Text style={styles.emojiIcon}>{levelIcon.emoji}</Text>
          )}
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.unitTitle,
              isLocked && styles.unitTitleLocked,
            ]}
          >
            {unit.title}
          </Text>
          {!!unit.description && (
            <Text
              style={[
                styles.unitDescription,
                isLocked && styles.unitDescriptionLocked,
              ]}
              numberOfLines={2}
            >
              {unit.description}
            </Text>
          )}
          
          {/* Progress Bar */}
          {!isLocked && totalLessons > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${progress * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {completedLessons}/{totalLessons} ders
              </Text>
            </View>
          )}
        </View>

        {/* Arrow */}
        {!isLocked && (
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={20} color={palette.muted} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  unitCard: {
    width: '100%',
    backgroundColor: palette.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  unitCardActive: {
    borderColor: palette.accent,
    borderWidth: 2,
  },
  unitCardLocked: {
    opacity: 0.6,
  },
  unitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emojiIcon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  unitTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
  },
  unitTitleLocked: {
    color: palette.muted,
  },
  unitDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.muted,
    marginBottom: 12,
  },
  unitDescriptionLocked: {
    color: palette.locked,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0F0F0F',
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: palette.accent,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: palette.muted,
    fontWeight: '600',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

