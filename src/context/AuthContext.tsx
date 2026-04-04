import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';

type AuthContextValue = {
  isLoggedIn: boolean;
  isInitializing: boolean;
  login: (language: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const initializeSession = useAuthStore((state) => state.initializeSession);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    void initializeSession();
  }, [initializeSession]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isInitializing,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return ctx;
}
