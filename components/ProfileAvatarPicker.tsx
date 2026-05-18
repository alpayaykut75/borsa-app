import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  PROFILE_AVATAR_OPTIONS,
  normalizeProfileAvatarId,
} from '../src/constants/avatars';

const palette = {
  accent: '#00C4CC',
  cardDark: '#0F0F0F',
  border: '#333333',
};

const GRID_GAP = 10;
const MIN_CELL = 56;
const MAX_CELL = 72;

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
  /** Satır başına avatar (varsayılan 5 → 2 satırda 10) */
  columnsPerRow?: number;
  optionSize?: number;
};

export default function ProfileAvatarPicker({
  selectedId,
  onSelect,
  columnsPerRow = 5,
  optionSize: optionSizeProp,
}: Props) {
  const activeId = normalizeProfileAvatarId(selectedId);
  const [gridWidth, setGridWidth] = useState(0);

  const cellSize =
    optionSizeProp ??
    (gridWidth > 0
      ? Math.min(
          MAX_CELL,
          Math.max(
            MIN_CELL,
            Math.floor((gridWidth - GRID_GAP * (columnsPerRow - 1)) / columnsPerRow),
          ),
        )
      : 58);

  return (
    <View
      style={styles.grid}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && Math.abs(w - gridWidth) > 1) setGridWidth(w);
      }}
    >
      {PROFILE_AVATAR_OPTIONS.map((option) => {
        const isActive = option.id === activeId;
        return (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.85}
            onPress={() => onSelect(option.id)}
            style={[
              styles.option,
              {
                width: cellSize,
                height: cellSize,
                borderRadius: cellSize / 2,
              },
              isActive ? styles.optionActive : styles.optionIdle,
            ]}
          >
            <Image source={option.source} style={styles.optionImage} resizeMode="cover" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export { DEFAULT_PROFILE_AVATAR_ID } from '../src/constants/avatars';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    justifyContent: 'flex-start',
  },
  option: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.cardDark,
  },
  optionIdle: {
    borderWidth: 1,
    borderColor: palette.border,
  },
  optionActive: {
    borderWidth: 2,
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.1)',
  },
  optionImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.14 }, { translateY: 2 }],
  },
});
