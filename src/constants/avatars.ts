import type { ImageSourcePropType } from 'react-native';

/** Moono asistan / giriş ekranı — profil avatarlarından ayrı */
export const MOONO_CHARACTER_AVATAR: ImageSourcePropType = require('../../assets/moono-profile.png');

export type ProfileAvatarOption = {
  id: string;
  label: string;
  source: ImageSourcePropType;
};

/** Profilde seçilebilir karakterler (`assets/avatars/*.png`) */
export const PROFILE_AVATAR_OPTIONS: ProfileAvatarOption[] = [
  { id: 'bear', label: 'Ayı', source: require('../../assets/avatars/bear.png') },
  { id: 'bull', label: 'Boğa', source: require('../../assets/avatars/bull.png') },
  { id: 'cat', label: 'Kedi', source: require('../../assets/avatars/cat.png') },
  { id: 'dog', label: 'Köpek', source: require('../../assets/avatars/dog.png') },
  { id: 'bird', label: 'Kuş', source: require('../../assets/avatars/bird.png') },
  { id: 'panda', label: 'Panda', source: require('../../assets/avatars/panda.png') },
  { id: 'koala', label: 'Koala', source: require('../../assets/avatars/koala.png') },
  { id: 'lion', label: 'Aslan', source: require('../../assets/avatars/lion.png') },
  { id: 'tiger', label: 'Kaplan', source: require('../../assets/avatars/tiger.png') },
  { id: 'tembel', label: 'Tembel', source: require('../../assets/avatars/tembel.png') },
];

export const DEFAULT_PROFILE_AVATAR_ID = PROFILE_AVATAR_OPTIONS[0].id;

const LEGACY_EMOJI_AVATARS = new Set([
  '🙂', '😎', '🤓', '🚀', '🎯', '🐂', '🔥', '🌟', '🧠', '💼',
]);

/** Eski kayıtlar (emoji veya kaldırılan moono id) */
const LEGACY_AVATAR_IDS = new Set(['moono', 'Moono']);

export function normalizeProfileAvatarId(avatar: string | null | undefined): string {
  if (avatar && PROFILE_AVATAR_OPTIONS.some((o) => o.id === avatar)) {
    return avatar;
  }
  if (
    avatar &&
    (LEGACY_EMOJI_AVATARS.has(avatar) || LEGACY_AVATAR_IDS.has(avatar))
  ) {
    return DEFAULT_PROFILE_AVATAR_ID;
  }
  return DEFAULT_PROFILE_AVATAR_ID;
}

export function getProfileAvatarSource(avatarId: string): ImageSourcePropType {
  const id = normalizeProfileAvatarId(avatarId);
  return (
    PROFILE_AVATAR_OPTIONS.find((o) => o.id === id)?.source ??
    PROFILE_AVATAR_OPTIONS[0].source
  );
}
