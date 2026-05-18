import AsyncStorage from '@react-native-async-storage/async-storage';

/** Eski sürüm: tüm hesaplar aynı sohbeti paylaşıyordu */
const LEGACY_MOONO_CHAT_KEY = 'moono_ai_chat_messages';

export type StoredMoonoMessage = {
  id: number;
  text: string;
  sender: 'user' | 'moono';
};

export function moonoChatStorageKey(userId: string | null | undefined): string {
  if (userId) return `moono_ai_chat_${userId}`;
  return 'moono_ai_chat_guest';
}

export function isStoredMessageList(data: unknown): data is StoredMoonoMessage[] {
  if (!Array.isArray(data) || data.length === 0) return false;
  return data.every(
    (item) =>
      item &&
      typeof item === 'object' &&
      typeof (item as StoredMoonoMessage).id === 'number' &&
      typeof (item as StoredMoonoMessage).text === 'string' &&
      ((item as StoredMoonoMessage).sender === 'user' ||
        (item as StoredMoonoMessage).sender === 'moono'),
  );
}

export async function loadMoonoChatMessages(
  storageKey: string,
): Promise<StoredMoonoMessage[] | null> {
  const raw = await AsyncStorage.getItem(storageKey);
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (isStoredMessageList(parsed)) return parsed;
    } catch {
      /* fall through */
    }
  }
  return null;
}

/** Eski ortak anahtarı bir kez kaldır (gizlilik) */
export async function removeLegacySharedMoonoChat(): Promise<void> {
  try {
    await AsyncStorage.removeItem(LEGACY_MOONO_CHAT_KEY);
  } catch {
    /* ignore */
  }
}

export async function saveMoonoChatMessages(
  storageKey: string,
  messages: StoredMoonoMessage[],
): Promise<void> {
  await AsyncStorage.setItem(storageKey, JSON.stringify(messages));
}
