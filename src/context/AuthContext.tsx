import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { createUserSession, deleteUserSession, fetchUserSession } from '../api/userApi';

type AuthContextValue = {
  isLoggedIn: boolean;
  isInitializing: boolean;
  login: (language: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function initializeSession() {
      try {
        await fetchUserSession();

        if (!cancelled) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to restore user session from /api/user/session.', error);

        if (!cancelled) {
          setIsLoggedIn(false);
        }
      } finally {
        if (!cancelled) {
          setIsInitializing(false);
        }
      }
    }

    void initializeSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (language: string) => {
    try {
      await createUserSession({
        name: '홍길동',
        language,
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to create user session via /api/user.', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await deleteUserSession();
    } catch (error) {
      console.error('Failed to delete user session via /api/user/session.', error);
    } finally {
      setIsLoggedIn(false);
    }
  }, []);

  const value = {
    isLoggedIn,
    isInitializing,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  }
  return ctx;
}
