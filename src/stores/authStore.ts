import { create } from 'zustand';
import { createUserSession, deleteUserSession, fetchUserSession } from '../api/userApi';

type AuthStore = {
  isLoggedIn: boolean;
  isInitializing: boolean;
  initialized: boolean;
  initializeSession: () => Promise<void>;
  login: (language: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  isInitializing: true,
  initialized: false,
  initializeSession: async () => {
    if (get().initialized) {
      set({ isInitializing: false });
      return;
    }

    set({ isInitializing: true });

    try {
      await fetchUserSession();
      set({ isLoggedIn: true, isInitializing: false, initialized: true });
    } catch (error) {
      console.error('Failed to restore user session from /api/user/session.', error);
      set({ isLoggedIn: false, isInitializing: false, initialized: true });
    }
  },
  login: async (language: string) => {
    try {
      await createUserSession({
        name: '홍길동',
        language,
      });
      set({ isLoggedIn: true });
    } catch (error) {
      console.error('Failed to create user session via /api/user.', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await deleteUserSession();
    } catch (error) {
      console.error('Failed to delete user session via /api/user/session.', error);
    } finally {
      set({ isLoggedIn: false });
    }
  },
}));
