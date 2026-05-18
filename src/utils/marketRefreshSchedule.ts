/** İstanbul saatine göre Piyasa ekranı yenileme kuralları */

export const QUOTES_REFRESH_MS = 15 * 60 * 1000;

/** Günlük özet üretim penceresi (İstanbul) */
export const BRIEF_REFRESH_HOUR = 8;
export const BRIEF_REFRESH_MINUTE = 30;

export type IstanbulClock = {
  ymd: string;
  hour: number;
  minute: number;
  minutesSinceMidnight: number;
};

export function getIstanbulClock(now = new Date()): IstanbulClock {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  const ymd = `${get('year')}-${get('month')}-${get('day')}`;
  const hour = parseInt(get('hour'), 10);
  const minute = parseInt(get('minute'), 10);
  return { ymd, hour, minute, minutesSinceMidnight: hour * 60 + minute };
}

export function briefRefreshMinutesSinceMidnight(): number {
  return BRIEF_REFRESH_HOUR * 60 + BRIEF_REFRESH_MINUTE;
}

/** 08:30 (İstanbul) geçtiyse ve özet bugünün tarihinde değilse sunucuda yeniden üret. */
export function shouldRegenerateDailyBrief(
  briefDateYmd: string | undefined,
  now = new Date(),
): boolean {
  const clock = getIstanbulClock(now);
  if (clock.minutesSinceMidnight < briefRefreshMinutesSinceMidnight()) {
    return false;
  }
  if (!briefDateYmd || !/^\d{4}-\d{2}-\d{2}$/.test(briefDateYmd)) {
    return true;
  }
  return briefDateYmd < clock.ymd;
}

export function formatYmdTrLabel(ymd: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return '';
  const [y, m, d] = ymd.split('-').map((x) => parseInt(x, 10));
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Üst başlık: takvim günü (gece 00:00 İstanbul’da yeni güne geçer). */
export function getHeaderDateYmd(now = new Date()): string {
  return getIstanbulClock(now).ymd;
}

/**
 * Özet kartı üstündeki tarih: 08:30’dan önce dünün baskısı; 08:30’dan sonra bugünün baskısı.
 */
export function getBriefDisplayYmd(briefDateYmd: string | undefined, now = new Date()): string {
  const clock = getIstanbulClock(now);
  if (clock.minutesSinceMidnight >= briefRefreshMinutesSinceMidnight()) {
    return clock.ymd;
  }
  if (briefDateYmd && /^\d{4}-\d{2}-\d{2}$/.test(briefDateYmd)) {
    return briefDateYmd;
  }
  const [y, m, d] = clock.ymd.split('-').map((x) => parseInt(x, 10));
  const prev = new Date(Date.UTC(y, m - 1, d - 1, 12, 0, 0));
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(prev);
}

export function formatQuotesUpdatedTr(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const datePart = d.toLocaleDateString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    day: 'numeric',
    month: 'long',
  });
  const timePart = d.toLocaleTimeString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    hour: '2-digit',
    minute: '2-digit',
  });
  return `Son güncelleme · ${datePart}, ${timePart}`;
}

/** 08:30 öncesi: bugünün baskısı henüz yok (üstte kısa not). */
export function briefStatusHint(
  briefDateYmd: string | undefined,
  now = new Date(),
): string | null {
  const clock = getIstanbulClock(now);
  if (clock.minutesSinceMidnight >= briefRefreshMinutesSinceMidnight()) {
    if (briefDateYmd && briefDateYmd < clock.ymd) {
      return 'Bugünkü özet hazırlanıyor…';
    }
    return null;
  }
  if (briefDateYmd !== clock.ymd) {
    return `Bugünkü özet ${String(BRIEF_REFRESH_HOUR).padStart(2, '0')}:${String(BRIEF_REFRESH_MINUTE).padStart(2, '0')}'da hazırlanır.`;
  }
  return null;
}
