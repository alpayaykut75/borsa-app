import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../lib/supabase';

const EDGE_URL = `${SUPABASE_URL}/functions/v1/moono-daily-brief`;

export type MoonoDailyBriefPayload = {
  ok: boolean;
  error?: string;
  briefDate?: string;
  format?: 1 | 2;
  /** format 1 — eski cache */
  fullText?: string;
  /** format 2 */
  opening?: string;
  domestic?: string;
  international?: string;
  cached?: boolean;
  sourcesNote?: string;
  disclaimer?: string;
};

export async function fetchMoonoDailyBrief(options?: {
  forceRegenerate?: boolean;
}): Promise<MoonoDailyBriefPayload> {
  const qs = options?.forceRegenerate ? '?force=1' : '';
  const response = await fetch(`${EDGE_URL}${qs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  let data: MoonoDailyBriefPayload;
  try {
    data = (await response.json()) as MoonoDailyBriefPayload;
  } catch {
    return { ok: false, error: 'Moono özeti okunamadı.' };
  }

  if (!response.ok || !data.ok) {
    return {
      ok: false,
      error: typeof data.error === 'string' ? data.error : 'Moono özeti alınamadı.',
    };
  }

  return data;
}
