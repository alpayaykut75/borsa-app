import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { getLevelImage } from '../src/constants/levelImages';

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

type Unit = {
  id: number;
  title: string;
  description?: string;
  order_index?: number;
  coming_soon?: boolean;
};

type UnitPathItemProps = {
  unit: Unit;
  index: number;
  totalUnits: number;
  status: 'LOCKED' | 'ACTIVE' | 'COMPLETED' | 'PREMIUM' | 'SOON';
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
  const isProgressLocked = status === 'LOCKED';
  const isPremiumLocked = status === 'PREMIUM';
  const isComingSoon = status === 'SOON';
  const isLocked = isProgressLocked || isPremiumLocked || isComingSoon;
  const levelLockedImage = getLevelImage(index);
  const visibleCompletedLessons = isProgressLocked || isComingSoon ? 0 : completedLessons;
  const progress = totalLessons > 0 ? visibleCompletedLessons / totalLessons : 0;

  const handlePress = () => {
    onPress(unit);
  };

  return (
    <TouchableOpacity
      style={[
        styles.unitCard,
        status === 'ACTIVE' && styles.unitCardActive,
        isLocked && styles.unitCardLocked,
      ]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      <View style={styles.unitContent}>
        {/* Icon Container */}
        <View style={styles.iconContainer}>
          <Image
            source={levelLockedImage}
            style={[styles.levelImage, isLocked && styles.levelImageLocked]}
            resizeMode="cover"
          />
          {isProgressLocked && (
            <View style={styles.lockBadge}>
              <Ionicons name="lock-closed" size={16} color={palette.locked} />
            </View>
          )}
          {isComingSoon && (
            <View style={styles.lockBadge}>
              <Ionicons name="hourglass-outline" size={14} color={palette.locked} />
            </View>
          )}
          {isPremiumLocked && (
            <View style={[styles.lockBadge, styles.premiumBadge]}>
              <Ionicons name="diamond" size={16} color={palette.accent} />
            </View>
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
            >
              {unit.description}
            </Text>
          )}
          
          {isComingSoon && (
            <View style={styles.soonPill}>
              <Text style={styles.soonPillText}>Yakında</Text>
            </View>
          )}

          {/* Progress Bar */}
          {!isComingSoon && totalLessons > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressBarFill,
                    isLocked && styles.progressBarFillLocked,
                    { width: `${progress * 100}%` }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, isLocked && styles.progressTextLocked]}>
                {visibleCompletedLessons}/{totalLessons} ders
              </Text>
            </View>
          )}
        </View>

        {/* Arrow — kilitli seviyede de önizleme için göster */}
        <View style={styles.arrowContainer}>
          <Ionicons
            name={isComingSoon ? 'lock-closed' : 'chevron-forward'}
            size={20}
            color={isProgressLocked || isComingSoon ? palette.locked : isPremiumLocked ? palette.accent : palette.muted}
          />
        </View>
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
    opacity: 0.75,
  },
  unitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 62,
    height: 62,
    borderRadius: 16,
    backgroundColor: palette.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    overflow: 'hidden',
  },
  levelImage: {
    width: '100%',
    height: '100%',
  },
  levelImageLocked: {
    opacity: 0.72,
  },
  lockBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadge: {
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.15)',
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
    color: '#9A9A9A',
  },
  unitDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.muted,
    marginBottom: 12,
  },
  unitDescriptionLocked: {
    color: '#7D7D7D',
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
  progressTextLocked: {
    color: '#7D7D7D',
  },
  progressBarFillLocked: {
    backgroundColor: '#555555',
  },
  soonPill: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#444444',
    backgroundColor: '#111111',
  },
  soonPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9A9A9A',
    letterSpacing: 0.3,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

