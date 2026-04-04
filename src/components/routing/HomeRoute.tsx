import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SplashScreen from '../splash/SplashScreen';
import MainHomeScreen from '../home/MainHomeScreen';
import LanguageSelectScreen from '../language/LanguageSelectScreen';
import NameInputScreen from '../onboarding/NameInputScreen';

const SPLASH_DURATION_MS = 1800;

export default function HomeRoute() {
  const { isLoggedIn, isInitializing, login } = useAuth();
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

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
  if (isLoggedIn) return <MainHomeScreen />;

  // Step 1: 언어 선택
  if (!selectedLanguage) {
    return (
      <LanguageSelectScreen
        onComplete={(lang) => setSelectedLanguage(lang)}
      />
    );
  }

  // Step 2: 이름 입력 → 유저 생성
  return (
    <NameInputScreen
      onComplete={async (name) => {
        await login(selectedLanguage, name);
      }}
    />
  );
}
