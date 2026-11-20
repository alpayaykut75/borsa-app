import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 4 bölümlü ders (BoStreak kararı #4).
 * 20 adım korunur; yol ve ders ekranında 4 bölüm görünür:
 *   Öğren (1–6), Pekiştir (7–12), Uygula (13–18), Özet ve final (19–20).
 * Bölüm ilerlemesi cihazda tutulur (kullanıcı + ders başına "kaç bölüm bitti").
 */
export const LESSON_SECTIONS = [
  { name: 'Öğren', longName: 'Öğren', sub: 'Okuma, kelime kartı, ilk sorular', time: '~3 dk' },
  { name: 'Pekiştir', longName: 'Pekiştir', sub: 'Yeni kavramlar ve sorular', time: '~3 dk' },
  { name: 'Uygula', longName: 'Uygula', sub: 'Senaryo, görev, sorular', time: '~4 dk' },
  { name: 'Özet', longName: 'Özet ve final', sub: 'Animasyonlu özet + 10 soru', time: '~4 dk' },
] as const;

export const SECTION_COUNT = LESSON_SECTIONS.length;

/** Adımın bölümü (0–3). Tekrar adımları her zaman "Uygula" bölümündedir. */
export function sectionOfStep(orderIndex: number, isReview = false): number {
  if (isReview) return 2;
  if (orderIndex <= 6) return 0;
  if (orderIndex <= 12) return 1;
  if (orderIndex <= 18) return 2;
  return 3;
}

const key = (userId: string, lessonId: number) => `moono.lessonSections.${userId}.${lessonId}`;

/** Bu derste bitirilmiş bölüm sayısı (0–3). Ders bitince kayıt silinir. */
export async function getSectionsDone(userId: string | undefined, lessonId: number): Promise<number> {
  if (!userId) return 0;
  try {
    const raw = await AsyncStorage.getItem(key(userId, lessonId));
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? Math.max(0, Math.min(SECTION_COUNT - 1, n)) : 0;
  } catch {
    return 0;
  }
}

export async function setSectionsDone(userId: string | undefined, lessonId: number, done: number): Promise<void> {
  if (!userId) return;
  try {
    await AsyncStorage.setItem(key(userId, lessonId), String(done));
  } catch {
    // depolama yazılamazsa ilerleme yalnızca bu oturumda kalır
  }
}

export async function clearSectionsDone(userId: string | undefined, lessonId: number): Promise<void> {
  if (!userId) return;
  try {
    await AsyncStorage.removeItem(key(userId, lessonId));
  } catch {
    // önemsiz
  }
}

/** Birden çok ders için bitirilmiş bölüm sayıları. */
export async function getSectionsDoneMap(
  userId: string | undefined,
  lessonIds: number[],
): Promise<Record<number, number>> {
  const out: Record<number, number> = {};
  if (!userId || lessonIds.length === 0) return out;
  try {
    const pairs = await AsyncStorage.multiGet(lessonIds.map((id) => key(userId, id)));
    pairs.forEach(([, raw], i) => {
      const n = raw ? parseInt(raw, 10) : 0;
      if (Number.isFinite(n) && n > 0) out[lessonIds[i]] = Math.min(SECTION_COUNT - 1, n);
    });
  } catch {
    // boş döner
  }
  return out;
}
