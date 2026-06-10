import { supabase } from '../../lib/supabase';

export type ShortCategory = 'ogret' | 'ilham' | 'hikaye';

export type ShortItem = {
  id: string;
  category: ShortCategory;
  title: string;
  caption: string;
  videoUrl?: string;
  accent: string;
  seriesLabel?: string;
  lessonId?: number;
  lessonTitle?: string;
  likeCount: number;
};

type ShortRow = {
  id: number;
  category: string;
  title: string;
  caption: string;
  video_url: string | null;
  accent: string | null;
  series_label: string | null;
  lesson_id: number | null;
  lesson_title: string | null;
  like_count: number | null;
};

const VALID_CATEGORIES: ShortCategory[] = ['ogret', 'ilham', 'hikaye'];

function mapRow(row: ShortRow): ShortItem {
  const category = (VALID_CATEGORIES as string[]).includes(row.category)
    ? (row.category as ShortCategory)
    : 'ogret';
  return {
    id: String(row.id),
    category,
    title: row.title,
    caption: row.caption,
    videoUrl: row.video_url ?? undefined,
    accent: row.accent ?? '#0B3D40',
    seriesLabel: row.series_label ?? undefined,
    lessonId: row.lesson_id ?? undefined,
    lessonTitle: row.lesson_title ?? undefined,
    likeCount: row.like_count ?? 0,
  };
}

export async function fetchShorts(): Promise<ShortItem[]> {
  const { data, error } = await supabase
    .from('shorts')
    .select(
      'id, category, title, caption, video_url, accent, series_label, lesson_id, lesson_title, like_count',
    )
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as ShortRow));
}
