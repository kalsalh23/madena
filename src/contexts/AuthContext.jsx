import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isDemoMode } from '@/lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(!isDemoMode);

  useEffect(() => {
    if (isDemoMode) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return undefined;
    }

    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
      if (data?.session?.user) {
        const { data: admin } = await supabase
          .from('admins')
          .select('id,name,role')
          .eq('user_id', data.session.user.id)
          .single();
        setProfile(admin);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase
          .from('admins')
          .select('id,name,role')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data: admin }) => setProfile(admin));
      } else {
        setProfile(null);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (isDemoMode) {
      throw new Error('وضع العرض التجريبي — اربط Supabase لتسجيل الدخول');
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    if (isDemoMode) return;
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
