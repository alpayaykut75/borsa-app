import { SUPABASE_URL, supabase } from '../../lib/supabase';

const EDGE_URL = `${SUPABASE_URL}/functions/v1/moono-daily-word-yaz`;

export type DailyWordDifficulty = 'easy' | 'medium' | 'hard';

export type DailyWordOption = {
  id: string;
  text: string;
};

export type DailyWordCard = {
  assignmentId: number;
  slotIndex: number;
  difficulty: DailyWordDifficulty;
  term: string;
  prompt: string;
  options: DailyWordOption[];
  selectedOptionId: string | null;
  answered: boolean;
  isCorrect: boolean | null;
  correctOptionId?: string | null;
  explanation: string | null;
};

export type DailyWordPayload = {
  ok: boolean;
  error?: string;
  assignmentDate?: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  progress?: {
    answered: number;
    total: number;
    correct: number;
  };
  streakDays?: number;
  yesterdayCorrect?: number;
  yesterdayTotal?: number;
  cards?: DailyWordCard[];
};

async function getUserAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

async function parsePayload(response: Response): Promise<DailyWordPayload> {
  try {
    return (await response.json()) as DailyWordPayload;
  } catch {
    return { ok: false, error: 'Günlük kart yanıtı okunamadı.' };
  }
}

export async function fetchDailyWordSet(): Promise<DailyWordPayload> {
  const accessToken = await getUserAccessToken();
  if (!accessToken) return { ok: false, error: 'Oturum bulunamadı.' };

  const response = await fetch(EDGE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = await parsePayload(response);
  if (!response.ok || !payload.ok) {
    return {
      ok: false,
      error: typeof payload.error === 'string' ? payload.error : 'Günlük kart alınamadı.',
    };
  }
  return payload;
}

export async function submitDailyWordAnswer(params: {
  slotIndex: number;
  selectedOptionId: string;
}): Promise<DailyWordPayload> {
  const accessToken = await getUserAccessToken();
  if (!accessToken) return { ok: false, error: 'Oturum bulunamadı.' };

  const response = await fetch(EDGE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });

  const payload = await parsePayload(response);
  if (!response.ok || !payload.ok) {
    return {
      ok: false,
      error: typeof payload.error === 'string' ? payload.error : 'Cevap kaydedilemedi.',
    };
  }
  return payload;
}
