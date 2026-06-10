import type { TextStyle } from 'react-native';

export const palette = {
  background: '#000000',
  card: '#1A1A1A',
  cardDark: '#0F0F0F',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#8A8A8A',
  danger: '#EF4444',
};

export const neutrals = {
  textSubtle: '#A8A8A8',
  textSoft: '#D0D0D0',
  textOverlay: '#D7D7D7',
  textGhost: '#E5E5E5',
  textDisabled: '#7A7A7A',
  borderStrong: '#2F2F2F',
  borderSoft: '#303236',
  borderGhost: '#4B4B4B',
  switchTrackOff: '#3A3A3A',
  switchThumbOff: '#B0B0B0',
};

type TypographyToken = Pick<TextStyle, 'fontSize' | 'fontWeight'>;

export const typography: Record<
  'h1' | 'h2' | 'h3' | 'body' | 'bodySm' | 'caption' | 'button',
  TypographyToken
> = {
  h1: { fontSize: 26, fontWeight: '700' },
  h2: { fontSize: 24, fontWeight: '800' },
  h3: { fontSize: 20, fontWeight: '700' },
  body: { fontSize: 16, fontWeight: '400' },
  bodySm: { fontSize: 14, fontWeight: '500' },
  caption: { fontSize: 12, fontWeight: '600' },
  button: { fontSize: 16, fontWeight: '700' },
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};
