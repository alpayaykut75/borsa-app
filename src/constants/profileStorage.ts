import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';
import { DEFAULT_PROFILE_AVATAR_ID, normalizeProfileAvatarId } from './avatars';

export const PROFILE_AVATAR_KEY = 'moono_profile_avatar';
export const PROFILE_PHOTO_KEY = 'moono_profile_photo';

export type ProfileDisplay = {
  firstName: string;
  avatar: string;
  photoUri: string | null;
};

export async function cacheProfileAvatar(avatar: string): Promise<void> {
  await AsyncStorage.setItem(PROFILE_AVATAR_KEY, avatar);
}

export async function cacheProfilePhoto(photoUri: string | null): Promise<void> {
  if (photoUri) {
    await AsyncStorage.setItem(PROFILE_PHOTO_KEY, photoUri);
  } else {
    await AsyncStorage.removeItem(PROFILE_PHOTO_KEY);
  }
}

/** Ana sayfa başlığı: Supabase + yerel önbellek. */
export async function loadProfileDisplay(): Promise<ProfileDisplay> {
  let firstName = '';
  let avatar = DEFAULT_PROFILE_AVATAR_ID;
  let photoUri: string | null = null;

  try {
    const [savedAvatar, savedPhoto] = await Promise.all([
      AsyncStorage.getItem(PROFILE_AVATAR_KEY),
      AsyncStorage.getItem(PROFILE_PHOTO_KEY),
    ]);
    if (savedAvatar) avatar = normalizeProfileAvatarId(savedAvatar);
    if (savedPhoto) photoUri = savedPhoto;

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('first_name, avatar')
        .eq('id', user.id)
        .single();
      if (data?.first_name?.trim()) {
        firstName = data.first_name.trim();
      }
      if (data?.avatar && !photoUri) {
        avatar = normalizeProfileAvatarId(data.avatar);
        await AsyncStorage.setItem(PROFILE_AVATAR_KEY, avatar);
      }
    }
  } catch {
    /* yerel önbellek yeterli */
  }

  return { firstName, avatar, photoUri };
}

export function greetingFirstName(firstName: string): string {
  const t = firstName.trim();
  if (!t) return 'Ortak';
  return t.charAt(0).toLocaleUpperCase('tr-TR') + t.slice(1);
}
