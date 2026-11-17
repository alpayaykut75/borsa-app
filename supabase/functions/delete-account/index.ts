/**
 * delete-account — kullanıcının kendi hesabını kalıcı olarak siler.
 * (App Store Review Guideline 5.1.1(v): uygulama içi hesap silme zorunluluğu)
 *
 * Akış:
 *  1) Authorization header'daki JWT ile çağıran kullanıcıyı doğrula.
 *  2) Kullanıcıya ait satırları sil (profiles, user_progress; daily_word_* tabloları
 *     auth.users'a "on delete cascade" ile bağlı ama yine de açıkça temizlenir).
 *  3) auth.users kaydını sil.
 *
 * Secrets: SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY Supabase tarafından otomatik sağlanır.
 * Deploy: npx supabase functions deploy delete-account
 */
import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

/** Kullanıcı verisi tutan tablolar: [tablo, kullanıcı kolonu] */
const USER_TABLES: [string, string][] = [
  ['daily_word_attempts', 'user_id'],
  ['daily_word_assignments', 'user_id'],
  ['user_progress', 'user_id'],
  ['profiles', 'id'],
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method Not Allowed' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim();
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim();
  if (!supabaseUrl || !serviceRole) {
    return json({ ok: false, error: 'Sunucu yapılandırması eksik.' }, 500);
  }

  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return json({ ok: false, error: 'Oturum bulunamadı.' }, 401);
  }

  const admin = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await admin.auth.getUser(token);
  const userId = userData?.user?.id;
  if (userError || !userId) {
    return json({ ok: false, error: 'Oturum doğrulanamadı.' }, 401);
  }

  for (const [table, column] of USER_TABLES) {
    const { error } = await admin.from(table).delete().eq(column, userId);
    // Tablo yoksa (42P01) atla; başka hata varsa durdur ki yarım silme olmasın.
    if (error && error.code !== '42P01' && error.code !== 'PGRST205') {
      console.error(`delete-account: ${table} silinemedi`, error);
      return json({ ok: false, error: 'Veriler silinirken bir sorun oluştu.' }, 500);
    }
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) {
    console.error('delete-account: auth kullanıcısı silinemedi', deleteError);
    return json({ ok: false, error: 'Hesap silinirken bir sorun oluştu.' }, 500);
  }

  return json({ ok: true });
});
