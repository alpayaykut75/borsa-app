/** Müfredat yardımcıları — ders sayacı, ara quiz, bonus modül */

export const CORE_LESSONS_PER_LEVEL = 10;
/** Ana seviyeler (Çaylak → Usta); bonus Türevler hariç */
export const CORE_LEVEL_COUNT = 5;
/** Genel ilerleme paydası: 5 × 10 çekirdek ders (ara / sınav / türev yok) */
export const CORE_LESSONS_TOTAL = CORE_LESSONS_PER_LEVEL * CORE_LEVEL_COUNT;

export type LessonLike = {
  title?: string | null;
  icon_name?: string | null;
};

export function isCheckpointExamLesson(lesson: LessonLike): boolean {
  const title = (lesson.title || '').toLowerCase();
  return (
    title.includes('ara değerlendirme') ||
    title.includes('ara degerlendirme') ||
    lesson.icon_name === 'medal-outline' ||
    lesson.icon_name === 'document-text-outline' ||
    lesson.icon_name === 'ribbon-outline'
  );
}

export function isCoreLesson(lesson: LessonLike): boolean {
  return !isCheckpointExamLesson(lesson);
}

/** Bonus / Türevler — ilerleme % ve seviye kilidine etki etmez (sonraki seviye yok) */
export function isBonusUnit(unit: { order_index?: number | null; title?: string | null }): boolean {
  if ((unit.order_index ?? 0) >= 6) return true;
  const title = (unit.title || '').toLowerCase();
  return title.includes('türev') || title.includes('turev') || title.includes('bonus');
}
