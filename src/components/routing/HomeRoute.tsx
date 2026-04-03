import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SplashScreen from '../splash/SplashScreen';
import MainHomeScreen from '../home/MainHomeScreen';
import LanguageSelectScreen from '../language/LanguageSelectScreen';

const SPLASH_DURATION_MS = 1800;

export default function HomeRoute() {
  const { isLoggedIn, login } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;
  if (!isLoggedIn) return <LanguageSelectScreen onComplete={login} />;
  return <MainHomeScreen />;
}
