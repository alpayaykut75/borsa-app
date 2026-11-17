import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../lib/supabase';

const EDGE_URL = `${SUPABASE_URL}/functions/v1/delete-account`;

/**
 * Oturumdaki kullanıcının hesabını sunucuda kalıcı olarak siler.
 * accessToken: supabase.auth oturumundaki access_token.
 */
export async function requestAccountDeletion(
  accessToken: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(EDGE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: '{}',
    });

    let data: { ok?: boolean; error?: string } = {};
    try {
      data = await response.json();
    } catch {
      /* boş gövde */
    }

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: typeof data.error === 'string' ? data.error : 'Hesap silinemedi. Lütfen tekrar dene.',
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Bağlantı kurulamadı. İnternetini kontrol edip tekrar dene.' };
  }
}

/** Cihazda tutulan Moono verilerini (profil, sohbet, Shorts beğenileri vb.) temizler. */
export async function clearLocalMoonoData(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const moonoKeys = keys.filter((k) => k.startsWith('moono_'));
    if (moonoKeys.length) {
      await AsyncStorage.multiRemove(moonoKeys);
    }
  } catch {
    /* yerel temizlik başarısız olsa da hesap silinmiş olur */
  }
}
