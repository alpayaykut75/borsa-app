import AsyncStorage from '@react-native-async-storage/async-storage';

// Shorts beğen/kaydet durumunun cihazda kalıcılığı.
// (Sunucu senkronu ileride shorts_saves tablosuyla eklenebilir.)
const SAVED_KEY = 'moono_shorts_saved';
const LIKED_KEY = 'moono_shorts_liked';

async function loadIdSet(key: string): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed.map(String));
  } catch {
    /* bozuk/yok ise boş set */
  }
  return new Set();
}

async function persistIdSet(key: string, ids: Set<string>): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify([...ids]));
  } catch {
    /* sessizce geç; UI state zaten güncel */
  }
}

export const loadSavedShortIds = (): Promise<Set<string>> => loadIdSet(SAVED_KEY);
export const loadLikedShortIds = (): Promise<Set<string>> => loadIdSet(LIKED_KEY);
export const persistSavedShortIds = (ids: Set<string>): Promise<void> => persistIdSet(SAVED_KEY, ids);
export const persistLikedShortIds = (ids: Set<string>): Promise<void> => persistIdSet(LIKED_KEY, ids);
