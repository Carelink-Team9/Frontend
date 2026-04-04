import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SplashScreen from '../splash/SplashScreen';
import MainHomeScreen from '../home/MainHomeScreen';
import LanguageSelectScreen from '../language/LanguageSelectScreen';

const SPLASH_DURATION_MS = 1800;

export default function HomeRoute() {
  const { isLoggedIn, isInitializing, login } = useAuth();
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
      }, SPLASH_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (showSplash) return <SplashScreen />;
  if (isInitializing) return <SplashScreen />;
  if (!isLoggedIn) return <LanguageSelectScreen onComplete={login} />;
  return <MainHomeScreen />;
}
