import { create } from 'zustand';
import { createUserSession, deleteUserSession, fetchUserSession } from '../api/userApi';

const USER_LANGUAGE_KEY = 'care-link-user-language';
const LANGUAGE_SELECTED_KEY = 'care-link-language-selected';

type AuthStore = {
  isLoggedIn: boolean;
  isInitializing: boolean;
  initialized: boolean;
  language: string;
  initializeSession: () => Promise<void>;
  login: (language: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  isInitializing: true,
  initialized: false,
  language: localStorage.getItem(USER_LANGUAGE_KEY) ?? 'ko',
  initializeSession: async () => {
    if (get().initialized) {
      set({ isInitializing: false });
      return;
    }

    set({ isInitializing: true });

    try {
      await fetchUserSession();
      const language = localStorage.getItem(USER_LANGUAGE_KEY) ?? 'ko';
      set({ isLoggedIn: true, isInitializing: false, initialized: true, language });
    } catch (error) {
      console.error('Failed to restore user session from /api/user/session.', error);
      set({ isLoggedIn: false, isInitializing: false, initialized: true });
    }
  },
  login: async (language: string, name: string) => {
    try {
      await createUserSession({
        name,
        language,
      });
      localStorage.setItem(USER_LANGUAGE_KEY, language);
      set({ isLoggedIn: true, language });
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
      localStorage.removeItem(USER_LANGUAGE_KEY);
      localStorage.removeItem(LANGUAGE_SELECTED_KEY);
      set({ isLoggedIn: false, language: 'ko' });
    }
  },
}));
