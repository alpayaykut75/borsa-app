import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';

type Difficulty = 'easy' | 'medium' | 'hard';

type QuizOption = {
  id: string;
  text: string;
};

type DailyQuizCard = {
  id: string;
  slotIndex: number;
  difficulty: Difficulty;
  sourceLabel: string;
  topicKey: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  selectedOptionId: string | null;
  answered: boolean;
  isCorrect: boolean | null;
  explanation: string | null;
};

export type ReinforcementCard = DailyQuizCard;

export type DailyQuizPayload = {
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
  cards?: DailyQuizCard[];
};

export type FlashcardLibraryItem = {
  id: string;
  term: string;
  definition: string;
  unitTitle: string;
  lessonTitle: string;
};

type LearningHubSnapshot = {
  dailyQuiz: DailyQuizPayload;
  flashcards: FlashcardLibraryItem[];
};

type LessonRow = {
  id: number;
  unit_id: number;
  title: string;
  sort_order: number;
};

type UnitRow = {
  id: number;
  title: string;
  order_index: number;
};

type StepRow = {
  id: number;
  lesson_id: number;
  type: 'flashcard' | 'quiz' | 'final_quiz';
  title: string | null;
  metadata: Record<string, unknown> | string | null;
};

type ParsedQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string | null;
  difficulty: Difficulty;
  topicKey: string;
  sourceLabel: string;
};

type HistoryEntry = {
  questionId: string;
  topicKey: string;
  isCorrect: boolean;
  ts: number;
};

type TopicMasteryEntry = {
  topicKey: string;
  wrongCount: number;
  correctCount: number;
  recentWrongCount: number;
  lastWrongAt: number | null;
  lastSeenAt: number | null;
  streakCorrect: number;
  weaknessScore: number;
  recoveryNeedScore: number;
};

const DAILY_TOTAL = 3;
const HISTORY_LIMIT = 200;
const RECENT_WRONG_WINDOW_MS = 7 * 24 * 3600 * 1000;
const TOPIC_LOOKBACK_MS = 45 * 24 * 3600 * 1000;
const SET_KEY_PREFIX = 'daily_quiz_set_v2';
const HISTORY_KEY_PREFIX = 'daily_quiz_history_v2';

function istanbulYmd(d = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

function shiftYmd(baseYmd: string, deltaDays: number): string {
  const date = new Date(`${baseYmd}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString().slice(0, 10);
}

function normalizeOptions(raw: unknown): QuizOption[] {
  if (Array.isArray(raw)) {
    if (raw.length === 0) return [];
    if (typeof raw[0] === 'string') {
      return (raw as string[])
        .map((text, i) => ({
          id: String.fromCharCode(97 + i),
          text: String(text ?? '').trim(),
        }))
        .filter((o) => o.text.length > 0);
    }
    return (raw as Array<{ id?: string; text?: string }>)
      .map((o, i) => ({
        id: String(o.id ?? String.fromCharCode(97 + i)).trim(),
        text: String(o.text ?? '').trim(),
      }))
      .filter((o) => o.id.length > 0 && o.text.length > 0);
  }
  return [];
}

function normalizeCorrectOptionId(raw: unknown, options: QuizOption[]): string | null {
  if (typeof raw === 'string') {
    const id = raw.trim();
    return options.some((o) => o.id === id) ? id : null;
  }
  if (typeof raw === 'number' && Number.isInteger(raw)) {
    const option = options[raw];
    return option?.id ?? null;
  }
  return null;
}

function parseMetadata(raw: StepRow['metadata']): Record<string, unknown> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  if (typeof raw === 'object') return raw as Record<string, unknown>;
  return null;
}

function getDifficultyForQuizStep(stepTitle: string | null, optionsCount: number): Difficulty {
  const title = (stepTitle ?? '').toLowerCase();
  if (title.includes('alıştırma 1') || title.includes('alıştırma 1')) return 'easy';
  if (title.includes('cümle tamamlama') || title.includes('cumle tamamlama')) return 'medium';
  if (optionsCount <= 3) return 'easy';
  return 'medium';
}

function setStorageKey(userId: string, ymd: string): string {
  return `${SET_KEY_PREFIX}:${userId}:${ymd}`;
}

function historyStorageKey(userId: string): string {
  return `${HISTORY_KEY_PREFIX}:${userId}`;
}

async function loadHistory(userId: string): Promise<HistoryEntry[]> {
  const raw = await AsyncStorage.getItem(historyStorageKey(userId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as HistoryEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (e) =>
          e &&
          typeof e.questionId === 'string' &&
          typeof e.topicKey === 'string' &&
          typeof e.ts === 'number' &&
          typeof e.isCorrect === 'boolean',
      )
      .slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

async function saveHistory(userId: string, entries: HistoryEntry[]): Promise<void> {
  await AsyncStorage.setItem(historyStorageKey(userId), JSON.stringify(entries.slice(0, HISTORY_LIMIT)));
}

function buildTopicMastery(history: HistoryEntry[], nowTs: number): Map<string, TopicMasteryEntry> {
  const map = new Map<string, TopicMasteryEntry>();
  const filtered = history.filter((h) => h.ts >= nowTs - TOPIC_LOOKBACK_MS).reverse();

  for (const row of filtered) {
    const prev = map.get(row.topicKey) ?? {
      topicKey: row.topicKey,
      wrongCount: 0,
      correctCount: 0,
      recentWrongCount: 0,
      lastWrongAt: null,
      lastSeenAt: null,
      streakCorrect: 0,
      weaknessScore: 0,
      recoveryNeedScore: 0,
    };

    const isRecentWrong = !row.isCorrect && row.ts >= nowTs - RECENT_WRONG_WINDOW_MS;
    const nextWrong = prev.wrongCount + (row.isCorrect ? 0 : 1);
    const nextCorrect = prev.correctCount + (row.isCorrect ? 1 : 0);
    const nextStreak = row.isCorrect ? prev.streakCorrect + 1 : 0;
    const nextLastWrongAt = row.isCorrect ? prev.lastWrongAt : row.ts;
    const nextLastSeenAt = row.ts;
    const nextRecentWrong = prev.recentWrongCount + (isRecentWrong ? 1 : 0);

    const wrongGap = Math.max(nextWrong - nextCorrect, 0);
    const recencyBoost = nextLastWrongAt ? Math.max(0, 1 - (nowTs - nextLastWrongAt) / TOPIC_LOOKBACK_MS) : 0;
    const weaknessScore = wrongGap * 1.4 + nextRecentWrong * 1.25 + recencyBoost - nextStreak * 0.45;
    const recoveryNeedScore =
      nextWrong > 0 && nextCorrect > 0 ? Math.max(0.5, wrongGap * 0.8 + (nextStreak < 2 ? 1.2 : 0.2)) : 0;

    map.set(row.topicKey, {
      topicKey: row.topicKey,
      wrongCount: nextWrong,
      correctCount: nextCorrect,
      recentWrongCount: nextRecentWrong,
      lastWrongAt: nextLastWrongAt,
      lastSeenAt: nextLastSeenAt,
      streakCorrect: nextStreak,
      weaknessScore,
      recoveryNeedScore,
    });
  }

  return map;
}

type QuestionPickMode = 'weakest' | 'recent_wrong' | 'recovery' | 'fallback';

function scoreQuestionForMode(
  question: ParsedQuestion,
  mastery: TopicMasteryEntry | undefined,
  mode: QuestionPickMode,
  usedTopics: Set<string>,
  recentQuestionIds: Set<string>,
): number {
  const wrongCount = mastery?.wrongCount ?? 0;
  const recentWrongCount = mastery?.recentWrongCount ?? 0;
  const weaknessScore = mastery?.weaknessScore ?? 0;
  const recoveryNeedScore = mastery?.recoveryNeedScore ?? 0;
  const topicRepeatPenalty = usedTopics.has(question.topicKey) ? 1.4 : 0;
  const recentQuestionPenalty = recentQuestionIds.has(question.id) ? 0.45 : 0;

  switch (mode) {
    case 'weakest':
      return weaknessScore * 2.2 + wrongCount * 0.75 - topicRepeatPenalty - recentQuestionPenalty;
    case 'recent_wrong':
      return recentWrongCount * 2.6 + weaknessScore * 0.9 - topicRepeatPenalty - recentQuestionPenalty * 0.6;
    case 'recovery': {
      const hasRecoverySignal = wrongCount > 0 && (mastery?.correctCount ?? 0) > 0 ? 1 : 0;
      return recoveryNeedScore * 2.1 + hasRecoverySignal * 1.4 - topicRepeatPenalty - recentQuestionPenalty;
    }
    default:
      return weaknessScore * 1.1 + wrongCount * 0.4 - topicRepeatPenalty * 0.8 - recentQuestionPenalty;
  }
}

function pickQuestionByMode(
  candidates: ParsedQuestion[],
  usedQuestionIds: Set<string>,
  usedTopics: Set<string>,
  masteryMap: Map<string, TopicMasteryEntry>,
  recentQuestionIds: Set<string>,
  mode: QuestionPickMode,
): ParsedQuestion | null {
  const pool = candidates.filter((q) => !usedQuestionIds.has(q.id));
  if (pool.length === 0) return null;
  const topicDistinctPool = pool.filter((q) => !usedTopics.has(q.topicKey));
  const scoringPool = topicDistinctPool.length > 0 ? topicDistinctPool : pool;

  const ranked = scoringPool
    .map((question) => ({
      question,
      score: scoreQuestionForMode(
        question,
        masteryMap.get(question.topicKey),
        mode,
        usedTopics,
        recentQuestionIds,
      ),
    }))
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return a.question.id.localeCompare(b.question.id);
    });

  return ranked[0]?.question ?? null;
}

function statusFromCards(cards: DailyQuizCard[]): DailyQuizPayload['status'] {
  const answered = cards.filter((c) => c.answered).length;
  if (answered === 0) return 'not_started';
  if (answered < DAILY_TOTAL) return 'in_progress';
  return 'completed';
}

function progressFromCards(cards: DailyQuizCard[]): DailyQuizPayload['progress'] {
  const answered = cards.filter((c) => c.answered).length;
  const correct = cards.filter((c) => c.isCorrect === true).length;
  return { answered, total: DAILY_TOTAL, correct };
}

function normalizeCardAnswerState(cards: DailyQuizCard[]): DailyQuizCard[] {
  return cards.map((card) => {
    if (card.answered && card.isCorrect === false) {
      return {
        ...card,
        answered: false,
      };
    }
    return card;
  });
}

function buildStreakInfo(
  userId: string,
  todayYmd: string,
  todayCards: DailyQuizCard[],
): Promise<{ streakDays: number; yesterdayCorrect: number; yesterdayTotal: number }> {
  return (async () => {
    let streakDays = 0;
    let cursor = todayYmd;
    let yesterdayCorrect = 0;
    let yesterdayTotal = 0;

    for (let i = 0; i < 30; i += 1) {
      const key = setStorageKey(userId, cursor);
      const raw = await AsyncStorage.getItem(key);
      if (!raw) break;
      try {
        const parsed = JSON.parse(raw) as { cards?: DailyQuizCard[] };
        const cards = parsed.cards ?? [];
        const answered = cards.filter((c) => c.answered).length;
        if (answered < DAILY_TOTAL) break;
        streakDays += 1;
      } catch {
        break;
      }
      cursor = shiftYmd(cursor, -1);
    }

    const yesterdayRaw = await AsyncStorage.getItem(setStorageKey(userId, shiftYmd(todayYmd, -1)));
    if (yesterdayRaw) {
      try {
        const parsed = JSON.parse(yesterdayRaw) as { cards?: DailyQuizCard[] };
        const cards = parsed.cards ?? [];
        yesterdayTotal = cards.filter((c) => c.answered).length;
        yesterdayCorrect = cards.filter((c) => c.isCorrect === true).length;
      } catch {
        // noop
      }
    } else {
      yesterdayTotal = 0;
      yesterdayCorrect = 0;
    }

    if (todayCards.length > 0 && statusFromCards(todayCards) === 'completed' && streakDays === 0) {
      streakDays = 1;
    }
    return { streakDays, yesterdayCorrect, yesterdayTotal };
  })();
}

async function getUnlockedScope(userId: string): Promise<{
  lessonMap: Map<number, LessonRow>;
  accessibleLessonIds: number[];
}> {
  const [{ data: units }, { data: lessons }, { data: progress }] = await Promise.all([
    supabase.from('units').select('id, title, order_index').order('order_index', { ascending: true }),
    supabase.from('lessons').select('id, unit_id, title, sort_order').order('sort_order', { ascending: true }),
    supabase
      .from('user_progress')
      .select('lesson_id, is_completed')
      .eq('user_id', userId),
  ]);

  const unitRows = ((units ?? []) as UnitRow[]).sort((a, b) => a.order_index - b.order_index);
  const lessonRows = (lessons ?? []) as LessonRow[];
  const progressRows = (progress ?? []) as Array<{ lesson_id: number; is_completed: boolean }>;

  const completedLessonIds = new Set(progressRows.filter((p) => p.is_completed).map((p) => p.lesson_id));
  const touchedLessonIds = new Set(progressRows.map((p) => p.lesson_id));

  const lessonsByUnit = new Map<number, LessonRow[]>();
  for (const lesson of lessonRows) {
    const arr = lessonsByUnit.get(lesson.unit_id) ?? [];
    arr.push(lesson);
    lessonsByUnit.set(lesson.unit_id, arr);
  }
  for (const [, arr] of lessonsByUnit) {
    arr.sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
  }

  const isCompletedUnit = (unitId: number): boolean => {
    const unitLessons = lessonsByUnit.get(unitId) ?? [];
    if (unitLessons.length === 0) return false;
    return unitLessons.every((l) => completedLessonIds.has(l.id));
  };

  const firstIncompleteIdx = unitRows.findIndex((u) => !isCompletedUnit(u.id));
  const activeUnitIdx = firstIncompleteIdx === -1 ? unitRows.length - 1 : firstIncompleteIdx;

  const accessibleLessonIds: number[] = [];
  for (let i = 0; i < unitRows.length; i += 1) {
    if (i > activeUnitIdx) break;
    const unit = unitRows[i];
    const unitLessons = lessonsByUnit.get(unit.id) ?? [];
    if (i < activeUnitIdx) {
      accessibleLessonIds.push(...unitLessons.map((l) => l.id));
      continue;
    }

    const completedInUnit = unitLessons.filter((l) => completedLessonIds.has(l.id)).length;
    const touchedInUnitSort = unitLessons
      .filter((l) => touchedLessonIds.has(l.id))
      .map((l) => l.sort_order);
    const touchedMaxSort = touchedInUnitSort.length > 0 ? Math.max(...touchedInUnitSort) : 0;
    const limitSort = Math.max(completedInUnit + 1, touchedMaxSort, 1);
    accessibleLessonIds.push(...unitLessons.filter((l) => l.sort_order <= limitSort).map((l) => l.id));
  }

  return {
    lessonMap: new Map(lessonRows.map((l) => [l.id, l])),
    accessibleLessonIds: Array.from(new Set(accessibleLessonIds)),
  };
}

async function buildSourceContent(userId: string): Promise<{
  questions: ParsedQuestion[];
  flashcards: FlashcardLibraryItem[];
}> {
  const { lessonMap, accessibleLessonIds } = await getUnlockedScope(userId);
  if (accessibleLessonIds.length === 0) return { questions: [], flashcards: [] };

  const { data: steps } = await supabase
    .from('lesson_steps')
    .select('id, lesson_id, type, title, metadata')
    .in('lesson_id', accessibleLessonIds)
    .in('type', ['flashcard', 'quiz', 'final_quiz']);

  const rows = (steps ?? []) as StepRow[];
  const flashcards: FlashcardLibraryItem[] = [];
  const questions: ParsedQuestion[] = [];
  const seenFlashcard = new Set<string>();

  for (const row of rows) {
    const lesson = lessonMap.get(row.lesson_id);
    if (!lesson) continue;
    const metadata = parseMetadata(row.metadata);
    if (!metadata) continue;

    if (row.type === 'flashcard') {
      const term = String(metadata.front_text ?? '').trim();
      const definition = String(metadata.back_text ?? '').trim();
      if (!term || !definition) continue;
      const key = `${term}::${definition}`;
      if (seenFlashcard.has(key)) continue;
      seenFlashcard.add(key);
      flashcards.push({
        id: `f-${row.id}`,
        term,
        definition,
        unitTitle: `Seviye ${lesson.unit_id}`,
        lessonTitle: lesson.title,
      });
      continue;
    }

    if (row.type === 'quiz') {
      const prompt = String(metadata.question ?? '').trim();
      const options = normalizeOptions(metadata.options);
      const correctOptionId = normalizeCorrectOptionId(
        metadata.correct_option_id ?? metadata.correctAnswer,
        options,
      );
      if (!prompt || options.length < 2 || !correctOptionId) continue;
      const explanation = metadata.explanation ? String(metadata.explanation) : null;
      questions.push({
        id: `q-${row.id}-single`,
        prompt,
        options,
        correctOptionId,
        explanation,
        difficulty: getDifficultyForQuizStep(row.title, options.length),
        topicKey: `lesson-${row.lesson_id}`,
        sourceLabel: lesson.title,
      });
      continue;
    }

    if (row.type === 'final_quiz' && Array.isArray(metadata.questions)) {
      const nested = metadata.questions as Array<Record<string, unknown>>;
      nested.forEach((item, idx) => {
        const prompt = String(item.question ?? '').trim();
        const options = normalizeOptions(item.options);
        const correctOptionId = normalizeCorrectOptionId(item.correct_option_id, options);
        if (!prompt || options.length < 2 || !correctOptionId) return;
        questions.push({
          id: `q-${row.id}-final-${String(item.id ?? idx)}`,
          prompt,
          options,
          correctOptionId,
          explanation: item.explanation ? String(item.explanation) : null,
          difficulty: 'hard',
          topicKey: `lesson-${row.lesson_id}`,
          sourceLabel: `${lesson.title} • Final`,
        });
      });
    }
  }

  return { questions, flashcards };
}

function toQuizCard(question: ParsedQuestion, slotIndex: number): DailyQuizCard {
  return {
    id: question.id,
    slotIndex,
    difficulty: question.difficulty,
    sourceLabel: question.sourceLabel,
    topicKey: question.topicKey,
    prompt: question.prompt,
    options: question.options,
    correctOptionId: question.correctOptionId,
    selectedOptionId: null,
    answered: false,
    isCorrect: null,
    explanation: null,
  };
}

function buildReinforcementCards(
  questions: ParsedQuestion[],
  history: HistoryEntry[],
  count: number,
  excludeQuestionIds: Set<string> = new Set(),
): DailyQuizCard[] {
  const nowTs = Date.now();
  const masteryMap = buildTopicMastery(history, nowTs);
  const recentQuestionIds = new Set(
    history
      .filter((h) => h.ts >= nowTs - 5 * 24 * 3600 * 1000)
      .map((h) => h.questionId),
  );
  const usedQuestionIds = new Set<string>(excludeQuestionIds);
  const usedTopics = new Set<string>();
  const picked: ParsedQuestion[] = [];
  const slotModes: QuestionPickMode[] = ['weakest', 'recent_wrong', 'recovery'];

  for (let idx = 0; idx < count; idx += 1) {
    const mode = slotModes[idx] ?? 'fallback';
    const pickedQuestion =
      pickQuestionByMode(questions, usedQuestionIds, usedTopics, masteryMap, recentQuestionIds, mode) ??
      pickQuestionByMode(questions, usedQuestionIds, usedTopics, masteryMap, recentQuestionIds, 'fallback');
    if (!pickedQuestion) continue;

    picked.push(pickedQuestion);
    usedQuestionIds.add(pickedQuestion.id);
    usedTopics.add(pickedQuestion.topicKey);
  }

  return picked.map((question, idx) => toQuizCard(question, idx + 1));
}

async function generateDailyCards(userId: string, questions: ParsedQuestion[]): Promise<DailyQuizCard[]> {
  const history = await loadHistory(userId);
  return buildReinforcementCards(questions, history, DAILY_TOTAL);
}

async function getOrCreateDailyQuiz(userId: string, questions: ParsedQuestion[]): Promise<DailyQuizPayload> {
  if (questions.length === 0) {
    return {
      ok: false,
      error: 'Günlük quiz için yeterli işlenmiş içerik henüz yok.',
    };
  }

  const todayYmd = istanbulYmd();
  const storageKey = setStorageKey(userId, todayYmd);
  const stored = await AsyncStorage.getItem(storageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as { cards: DailyQuizCard[] };
      const cards = normalizeCardAnswerState(parsed.cards ?? []);
      await AsyncStorage.setItem(storageKey, JSON.stringify({ cards }));
      const streakInfo = await buildStreakInfo(userId, todayYmd, cards);
      return {
        ok: true,
        assignmentDate: todayYmd,
        cards,
        status: statusFromCards(cards),
        progress: progressFromCards(cards),
        ...streakInfo,
      };
    } catch {
      // corrupted cache -> regenerate
    }
  }

  const cards = await generateDailyCards(userId, questions);
  await AsyncStorage.setItem(storageKey, JSON.stringify({ cards }));
  const streakInfo = await buildStreakInfo(userId, todayYmd, cards);
  return {
    ok: true,
    assignmentDate: todayYmd,
    cards,
    status: statusFromCards(cards),
    progress: progressFromCards(cards),
    ...streakInfo,
  };
}

export type ExtraPracticePayload = {
  ok: boolean;
  error?: string;
  cards?: ReinforcementCard[];
};

export async function fetchExtraPracticeSet(params?: {
  count?: number;
  excludeQuestionIds?: string[];
}): Promise<ExtraPracticePayload> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const source = await buildSourceContent(user.id);
  if (source.questions.length === 0) {
    return { ok: false, error: 'Ekstra pekiştirme için yeterli soru yok.' };
  }

  const count = Math.max(1, Math.min(params?.count ?? 2, 5));
  const history = await loadHistory(user.id);
  const excludeSet = new Set(params?.excludeQuestionIds ?? []);
  const cards = buildReinforcementCards(source.questions, history, count, excludeSet);
  if (cards.length === 0) {
    return { ok: false, error: 'Şu an uygun ekstra soru bulunamadı.' };
  }
  return { ok: true, cards };
}

export async function recordExtraPracticeAnswer(params: {
  questionId: string;
  topicKey: string;
  selectedOptionId: string;
  correctOptionId: string;
}): Promise<{ ok: boolean; isCorrect?: boolean; error?: string }> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const isCorrect = params.selectedOptionId === params.correctOptionId;
  const history = await loadHistory(user.id);
  const entry: HistoryEntry = {
    questionId: params.questionId,
    topicKey: params.topicKey,
    isCorrect,
    ts: Date.now(),
  };
  await saveHistory(user.id, [entry, ...history]);
  return { ok: true, isCorrect };
}

export async function fetchLearningHubSnapshot(): Promise<LearningHubSnapshot> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    return {
      dailyQuiz: { ok: false, error: 'Oturum bulunamadı.' },
      flashcards: [],
    };
  }

  const source = await buildSourceContent(user.id);
  const dailyQuiz = await getOrCreateDailyQuiz(user.id, source.questions);

  return {
    dailyQuiz,
    flashcards: source.flashcards.sort((a, b) => a.term.localeCompare(b.term, 'tr')),
  };
}

export async function submitDailyQuizAnswer(params: {
  slotIndex: number;
  selectedOptionId: string;
}): Promise<DailyQuizPayload> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const ymd = istanbulYmd();
  const key = setStorageKey(user.id, ymd);
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return { ok: false, error: 'Bugünün quiz seti bulunamadı.' };

  let cards: DailyQuizCard[];
  try {
    const parsed = JSON.parse(raw) as { cards: DailyQuizCard[] };
    cards = parsed.cards ?? [];
  } catch {
    return { ok: false, error: 'Quiz verisi bozuk.' };
  }

  const idx = cards.findIndex((c) => c.slotIndex === params.slotIndex);
  if (idx === -1) return { ok: false, error: 'Soru bulunamadı.' };
  const current = cards[idx];
  if (current.answered && current.isCorrect === true) {
    const streakInfo = await buildStreakInfo(user.id, ymd, cards);
    return {
      ok: true,
      assignmentDate: ymd,
      cards,
      status: statusFromCards(cards),
      progress: progressFromCards(cards),
      ...streakInfo,
    };
  }

  const isCorrect = params.selectedOptionId === current.correctOptionId;
  const updated: DailyQuizCard = {
    ...current,
    selectedOptionId: params.selectedOptionId,
    answered: isCorrect,
    isCorrect,
    explanation: isCorrect ? 'Doğru cevap.' : null,
  };
  cards[idx] = updated;
  await AsyncStorage.setItem(key, JSON.stringify({ cards }));

  const history = await loadHistory(user.id);
  const entry: HistoryEntry = {
    questionId: updated.id,
    topicKey: updated.topicKey,
    isCorrect,
    ts: Date.now(),
  };
  await saveHistory(user.id, [entry, ...history]);

  const streakInfo = await buildStreakInfo(user.id, ymd, cards);
  return {
    ok: true,
    assignmentDate: ymd,
    cards,
    status: statusFromCards(cards),
    progress: progressFromCards(cards),
    ...streakInfo,
  };
}
