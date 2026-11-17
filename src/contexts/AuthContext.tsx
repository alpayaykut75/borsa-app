import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { clearLocalMoonoData, requestAccountDeletion } from '../services/accountService';

type AuthState = {
  session: Session | null;
  isLoading: boolean;
  isAnonymous: boolean;
};

type AuthContextType = AuthState & {
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  /** Hesabı ve kullanıcı verilerini kalıcı olarak siler, sonra oturumu kapatır. */
  deleteAccount: () => Promise<{ error: string | null }>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    isLoading: true,
    isAnonymous: false,
  });

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return;
        setState({
          session,
          isLoading: false,
          isAnonymous: session?.user?.is_anonymous ?? false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ session: null, isLoading: false, isAnonymous: false });
      });

    // getSession asılı kalırsa siyah loading ekranında kalmasın
    const fallback = setTimeout(() => {
      if (cancelled) return;
      setState((prev) => (prev.isLoading ? { ...prev, isLoading: false } : prev));
    }, 5000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        session,
        isLoading: false,
        isAnonymous: session?.user?.is_anonymous ?? false,
      });
    });

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://alpayaykut75.github.io/moono-web/',
      },
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const deleteAccount = async (): Promise<{ error: string | null }> => {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (!accessToken) return { error: 'Oturum bulunamadı. Lütfen tekrar giriş yap.' };

    const result = await requestAccountDeletion(accessToken);
    if (!result.ok) return { error: result.error ?? 'Hesap silinemedi.' };

    await clearLocalMoonoData();
    // Kullanıcı sunucuda silindi; yalnızca cihazdaki oturumu kapat.
    await supabase.auth.signOut({ scope: 'local' });
    return { error: null };
  };

  const resetPassword = async (email: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://alpayaykut75.github.io/moono-web/',
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut, resetPassword, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
