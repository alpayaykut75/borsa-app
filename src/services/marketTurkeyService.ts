import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../lib/supabase';

const EDGE_URL = `${SUPABASE_URL}/functions/v1/market-turkey`;

export type MarketQuoteCard = {
  id: string;
  label: string;
  value: string;
  changeText: string | null;
  up: boolean | null;
  footnote?: string;
};

export type MarketNewsRow = {
  headline: string;
  source: string;
  datetime: number;
  url: string;
  summary?: string;
};

export type MarketTurkeyPayload = {
  ok: boolean;
  error?: string;
  fetchedAt?: string;
  quotes: MarketQuoteCard[];
  aiHighlights: string[];
  aiHighlightsNote?: string;
  news: MarketNewsRow[];
  disclaimers: string[];
};

export async function fetchMarketTurkey(): Promise<MarketTurkeyPayload> {
  const response = await fetch(EDGE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  let data: MarketTurkeyPayload;
  try {
    data = (await response.json()) as MarketTurkeyPayload;
  } catch {
    return {
      ok: false,
      error: 'Sunucu yanıtı okunamadı. Edge function yüklü mü?',
      quotes: [],
      aiHighlights: [],
      news: [],
      disclaimers: [],
    };
  }

  if (!response.ok || !data.ok) {
    return {
      ok: false,
      error: typeof data.error === 'string' ? data.error : 'Piyasa verisi alınamadı.',
      quotes: [],
      aiHighlights: [],
      news: [],
      disclaimers: [],
    };
  }

  return data;
}
