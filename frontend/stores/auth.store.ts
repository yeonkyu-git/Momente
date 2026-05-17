import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { logoutKakao } from '@/lib/kakao';
import type { User } from '@/types';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  session: Session | null;
  user: User | null;
  setStatus: (status: AuthStatus) => void;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',
  session: null,
  user: null,
  setStatus: (status) => set({ status }),
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  signOut: async () => {
    await supabase.auth.signOut();
    await logoutKakao();
    set({ status: 'unauthenticated', session: null, user: null });
  },
}));
