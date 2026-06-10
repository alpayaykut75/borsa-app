import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type Difficulty = 'easy' | 'medium' | 'hard';

type CardRow = {
  id: number;
  term: string;
  prompt: string;
  options: { id: string; text: string }[];
  correct_option_id: string;
  explanation: string | null;
  difficulty: Difficulty;
};

type AssignmentRow = {
  id: number;
  slot_index: number;
  difficulty: Difficulty;
  selected_option_id: string | null;
  is_correct: boolean | null;
  answered_at: string | null;
  word_card_pool: CardRow | null;
};

const TOTAL_DAILY_SLOTS = 3;

function istanbulYmd(d = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

function shiftDateYmd(baseYmd: string, deltaDays: number): string {
  const date = new Date(`${baseYmd}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString().slice(0, 10);
}

function randomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  const idx = Math.floor(Math.random() * items.length);
  return items[idx] ?? null;
}

async function resolveUserId(
  req: Request,
  supabaseAdmin: ReturnType<typeof createClient>,
): Promise<string | null> {
  const authHeader = req.headers.get('authorization') ?? req.headers.get('Authorization') ?? '';
  if (!authHeader.toLowerCase().startsWith('bearer ')) return null;
  const token = authHeader.slice(7).trim();
  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user?.id) return null;
  return data.user.id;
}

async function loadCardsByDifficulty(
  supabaseAdmin: ReturnType<typeof createClient>,
): Promise<Record<Difficulty, CardRow[]>> {
  const { data, error } = await supabaseAdmin
    .from('word_card_pool')
    .select('id, term, prompt, options, correct_option_id, explanation, difficulty')
    .eq('is_active', true);

  if (error || !data) return { easy: [], medium: [], hard: [] };

  const grouped: Record<Difficulty, CardRow[]> = { easy: [], medium: [], hard: [] };
  for (const row of data as CardRow[]) {
    if (row.difficulty === 'easy' || row.difficulty === 'medium' || row.difficulty === 'hard') {
      grouped[row.difficulty].push(row);
    }
  }
  return grouped;
}

async function recentCardIds(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  todayYmd: string,
): Promise<Set<number>> {
  const fromYmd = shiftDateYmd(todayYmd, -14);
  const { data } = await supabaseAdmin
    .from('daily_word_assignments')
    .select('word_card_id')
    .eq('user_id', userId)
    .gte('assignment_date', fromYmd)
    .lt('assignment_date', todayYmd);

  return new Set((data ?? []).map((r: any) => Number(r.word_card_id)).filter(Number.isFinite));
}

async function difficultyPattern(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  todayYmd: string,
): Promise<Difficulty[]> {
  const { data: historicalRows } = await supabaseAdmin
    .from('daily_word_assignments')
    .select('assignment_date')
    .eq('user_id', userId)
    .lt('assignment_date', todayYmd);

  const activeDays = new Set((historicalRows ?? []).map((r: any) => String(r.assignment_date))).size;
  if (activeDays < 3) return ['easy', 'easy', 'medium'];

  const recentFrom = shiftDateYmd(todayYmd, -7);
  const { data: recentRows } = await supabaseAdmin
    .from('daily_word_assignments')
    .select('is_correct')
    .eq('user_id', userId)
    .gte('assignment_date', recentFrom)
    .lt('assignment_date', todayYmd);

  const answered = (recentRows ?? []).filter((r: any) => typeof r.is_correct === 'boolean');
  if (answered.length === 0) return ['easy', 'medium', 'hard'];

  const correct = answered.filter((r: any) => r.is_correct === true).length;
  const accuracy = correct / answered.length;

  if (answered.length >= 9 && accuracy >= 0.8) return ['medium', 'hard', 'hard'];
  if (accuracy >= 0.6) return ['easy', 'medium', 'hard'];
  return ['easy', 'easy', 'medium'];
}

async function assignTodayCards(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  todayYmd: string,
): Promise<void> {
  const [pattern, cardsByDifficulty, recentIds] = await Promise.all([
    difficultyPattern(supabaseAdmin, userId, todayYmd),
    loadCardsByDifficulty(supabaseAdmin),
    recentCardIds(supabaseAdmin, userId, todayYmd),
  ]);

  const chosenCardIds = new Set<number>();
  const rowsToInsert: {
    user_id: string;
    assignment_date: string;
    slot_index: number;
    word_card_id: number;
    difficulty: Difficulty;
  }[] = [];

  for (let i = 0; i < pattern.length; i += 1) {
    const difficulty = pattern[i];
    const preferredPool = cardsByDifficulty[difficulty].filter(
      (c) => !chosenCardIds.has(c.id) && !recentIds.has(c.id),
    );
    const fallbackPool = cardsByDifficulty[difficulty].filter((c) => !chosenCardIds.has(c.id));
    const globalFallback = [
      ...cardsByDifficulty.easy,
      ...cardsByDifficulty.medium,
      ...cardsByDifficulty.hard,
    ].filter((c) => !chosenCardIds.has(c.id));

    const picked =
      randomItem(preferredPool) ??
      randomItem(fallbackPool) ??
      randomItem(globalFallback);

    if (!picked) continue;
    chosenCardIds.add(picked.id);
    rowsToInsert.push({
      user_id: userId,
      assignment_date: todayYmd,
      slot_index: i + 1,
      word_card_id: picked.id,
      difficulty,
    });
  }

  if (rowsToInsert.length === 0) return;

  await supabaseAdmin.from('daily_word_assignments').upsert(rowsToInsert, {
    onConflict: 'user_id,assignment_date,slot_index',
  });
}

async function loadTodayAssignments(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  todayYmd: string,
): Promise<AssignmentRow[]> {
  const { data } = await supabaseAdmin
    .from('daily_word_assignments')
    .select(`
      id,
      slot_index,
      difficulty,
      selected_option_id,
      is_correct,
      answered_at,
      word_card_pool:word_card_id (
        id,
        term,
        prompt,
        options,
        correct_option_id,
        explanation,
        difficulty
      )
    `)
    .eq('user_id', userId)
    .eq('assignment_date', todayYmd)
    .order('slot_index', { ascending: true });

  return (data ?? []) as AssignmentRow[];
}

async function upsertDailySet(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  todayYmd: string,
): Promise<AssignmentRow[]> {
  let rows = await loadTodayAssignments(supabaseAdmin, userId, todayYmd);
  if (rows.length >= TOTAL_DAILY_SLOTS) return rows;

  await assignTodayCards(supabaseAdmin, userId, todayYmd);
  rows = await loadTodayAssignments(supabaseAdmin, userId, todayYmd);
  return rows;
}

async function streakSummary(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  todayYmd: string,
): Promise<{ streakDays: number; yesterdayCorrect: number; yesterdayTotal: number }> {
  const fromYmd = shiftDateYmd(todayYmd, -30);
  const { data } = await supabaseAdmin
    .from('daily_word_assignments')
    .select('assignment_date, is_correct')
    .eq('user_id', userId)
    .gte('assignment_date', fromYmd)
    .lte('assignment_date', todayYmd);

  const dayMap = new Map<string, { answered: number; correct: number }>();
  for (const row of data ?? []) {
    const day = String((row as any).assignment_date);
    const entry = dayMap.get(day) ?? { answered: 0, correct: 0 };
    if (typeof (row as any).is_correct === 'boolean') {
      entry.answered += 1;
      if ((row as any).is_correct) entry.correct += 1;
    }
    dayMap.set(day, entry);
  }

  let streakDays = 0;
  let cursor = todayYmd;
  for (let i = 0; i < 30; i += 1) {
    const entry = dayMap.get(cursor);
    if (!entry || entry.answered < TOTAL_DAILY_SLOTS) break;
    streakDays += 1;
    cursor = shiftDateYmd(cursor, -1);
  }

  const yesterdayYmd = shiftDateYmd(todayYmd, -1);
  const yesterday = dayMap.get(yesterdayYmd) ?? { answered: 0, correct: 0 };

  return {
    streakDays,
    yesterdayCorrect: yesterday.correct,
    yesterdayTotal: yesterday.answered,
  };
}

async function responsePayload(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  todayYmd: string,
) {
  const [rows, streak] = await Promise.all([
    upsertDailySet(supabaseAdmin, userId, todayYmd),
    streakSummary(supabaseAdmin, userId, todayYmd),
  ]);

  const answered = rows.filter((r) => typeof r.is_correct === 'boolean').length;
  const correct = rows.filter((r) => r.is_correct === true).length;
  const status =
    answered === 0 ? 'not_started' : answered < TOTAL_DAILY_SLOTS ? 'in_progress' : 'completed';

  return {
    ok: true,
    assignmentDate: todayYmd,
    status,
    progress: {
      answered,
      total: TOTAL_DAILY_SLOTS,
      correct,
    },
    streakDays: streak.streakDays,
    yesterdayCorrect: streak.yesterdayCorrect,
    yesterdayTotal: streak.yesterdayTotal,
    cards: rows.map((r) => ({
      assignmentId: r.id,
      slotIndex: r.slot_index,
      difficulty: r.difficulty,
      term: r.word_card_pool?.term ?? '',
      prompt: r.word_card_pool?.prompt ?? '',
      options: r.word_card_pool?.options ?? [],
      selectedOptionId: r.selected_option_id,
      answered: typeof r.is_correct === 'boolean',
      isCorrect: r.is_correct,
      correctOptionId:
        typeof r.is_correct === 'boolean'
          ? r.word_card_pool?.correct_option_id ?? null
          : null,
      explanation:
        typeof r.is_correct === 'boolean'
          ? r.word_card_pool?.explanation ?? null
          : null,
    })),
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: corsHeaders,
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim();
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim();
  if (!supabaseUrl || !serviceRole) {
    return new Response(JSON.stringify({ ok: false, error: 'Supabase env eksik.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false },
  });
  const userId = await resolveUserId(req, supabaseAdmin);
  if (!userId) {
    return new Response(JSON.stringify({ ok: false, error: 'Kullanıcı doğrulanamadı.' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const todayYmd = istanbulYmd();

  if (req.method === 'POST') {
    let body: { slotIndex?: number; selectedOptionId?: string } = {};
    try {
      body = (await req.json()) as { slotIndex?: number; selectedOptionId?: string };
    } catch {
      return new Response(JSON.stringify({ ok: false, error: 'Geçersiz istek gövdesi.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const slotIndex = Number(body.slotIndex);
    const selectedOptionId = String(body.selectedOptionId ?? '').trim();
    if (!Number.isInteger(slotIndex) || slotIndex < 1 || slotIndex > TOTAL_DAILY_SLOTS || !selectedOptionId) {
      return new Response(JSON.stringify({ ok: false, error: 'slotIndex veya seçenek hatalı.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rows = await upsertDailySet(supabaseAdmin, userId, todayYmd);
    const target = rows.find((r) => r.slot_index === slotIndex);
    if (!target || !target.word_card_pool) {
      return new Response(JSON.stringify({ ok: false, error: 'Günlük kart bulunamadı.' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (typeof target.is_correct !== 'boolean') {
      const isCorrect = selectedOptionId === target.word_card_pool.correct_option_id;
      const { count } = await supabaseAdmin
        .from('daily_word_attempts')
        .select('id', { count: 'exact', head: true })
        .eq('assignment_id', target.id);
      const attemptNo = (count ?? 0) + 1;

      await supabaseAdmin.from('daily_word_assignments').update({
        selected_option_id: selectedOptionId,
        is_correct: isCorrect,
        answered_at: new Date().toISOString(),
      }).eq('id', target.id);

      await supabaseAdmin.from('daily_word_attempts').insert({
        user_id: userId,
        assignment_id: target.id,
        word_card_id: target.word_card_pool.id,
        attempt_no: attemptNo,
        selected_option_id: selectedOptionId,
        is_correct: isCorrect,
      });
    }
  }

  const payload = await responsePayload(supabaseAdmin, userId, todayYmd);
  return new Response(JSON.stringify(payload), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
