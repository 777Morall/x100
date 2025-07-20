import { useState, useEffect } from 'react';
import { supabase, getCurrentUser, signOut } from '../lib/supabase';
import type { AuthState, User } from '../lib/types';

export const useAuth = (): AuthState & { signOut: () => Promise<void> } => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Get initial user
    const initializeAuth = async () => {
      try {
        const user = await getCurrentUser();
        setAuthState({
          user: user ? { id: user.id, email: user.email!, role: 'admin' } : null,
          loading: false,
        });
      } catch (error) {
        console.error('Error getting user:', error);
        setAuthState({ user: null, loading: false });
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setAuthState({
            user: {
              id: session.user.id,
              email: session.user.email!,
              role: 'admin'
            },
            loading: false,
          });
        } else {
          setAuthState({ user: null, loading: false });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return {
    ...authState,
    signOut: handleSignOut,
  };
};