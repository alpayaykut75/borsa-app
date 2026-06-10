import { StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import ScalePressable from './ScalePressable';
import { neutrals, palette, typography } from '../src/constants/theme';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: AppButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function AppButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}: AppButtonProps) {
  return (
    <ScalePressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'primary' && styles.labelPrimary,
          variant === 'secondary' && styles.labelSecondary,
          variant === 'ghost' && styles.labelGhost,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  primary: {
    backgroundColor: '#0B3C41',
    borderColor: '#26D6DE',
  },
  secondary: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  ghost: {
    backgroundColor: '#131313',
    borderColor: neutrals.borderGhost,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    ...typography.button,
  },
  labelPrimary: {
    color: palette.text,
  },
  labelSecondary: {
    color: '#000000',
  },
  labelGhost: {
    color: neutrals.textGhost,
  },
});
