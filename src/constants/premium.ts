export const PREMIUM_PRODUCT_ID = 'com.alpayaykut.borsaapp.premium_lifetime';
export const PREMIUM_ENTITLEMENT_ID = 'premium';
export const FREE_LESSONS_IN_FIRST_UNIT = 5;

export function getBypassEmails(): string[] {
  const raw = process.env.EXPO_PUBLIC_PREMIUM_BYPASS_EMAILS ?? '';
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isBypassEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return getBypassEmails().includes(email.trim().toLowerCase());
}

export function isLessonInFreeTier(
  unitId: number,
  lessonIndex: number,
  firstUnitId: number | null
): boolean {
  if (firstUnitId === null || unitId !== firstUnitId) return false;
  return lessonIndex < FREE_LESSONS_IN_FIRST_UNIT;
}

export function isLessonPremiumGated(
  unitId: number,
  lessonIndex: number,
  firstUnitId: number | null
): boolean {
  return !isLessonInFreeTier(unitId, lessonIndex, firstUnitId);
}

export function isUnitPremiumGated(unitIndex: number): boolean {
  return unitIndex > 0;
}
