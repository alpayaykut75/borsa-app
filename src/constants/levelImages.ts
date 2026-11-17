import { ImageSourcePropType } from 'react-native';

/**
 * Ana sayfa / seviye kartı görselleri — order_index sırasına göre.
 * Seviye 1 (Çaylak) = yeşil tişört, Seviye 2 (Çırak) = sarı tişört.
 * Dosya adları tarihsel; mapping isimlere göre.
 */
export const LEVEL_IMAGES: ImageSourcePropType[] = [
  require('../../assets/levels/level2-caylak.png'), // 1 — Çaylak (yeşil)
  require('../../assets/levels/level1-cirak.png'), // 2 — Çırak (sarı)
  require('../../assets/levels/level3-analist.png'),
  require('../../assets/levels/level4-stratejist.png'),
  require('../../assets/levels/level5-profesyonel.png'), // 5 — Usta
  require('../../assets/levels/level5-profesyonel.png'), // 6 — Türevler (geçici; özel görsel sonra)
];

export function getLevelImage(indexOrLevel: number): ImageSourcePropType {
  const index = Math.min(Math.max(indexOrLevel, 0), LEVEL_IMAGES.length - 1);
  return LEVEL_IMAGES[index];
}
