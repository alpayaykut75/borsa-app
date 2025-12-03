import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://tjxzpfkewlechcpsxull.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeHpwZmtld2xlY2hjcHN4dWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzAwNTQsImV4cCI6MjA3OTcwNjA1NH0.tq7gBxCFdfY4F9SJgp9LXXx75pX59oFq1ug_UKztjTY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

