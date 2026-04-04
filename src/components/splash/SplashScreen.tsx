import React from 'react';
import { useTranslation } from 'react-i18next';

interface SplashScreenProps {
  className?: string;
}

export default function SplashScreen({ className = '' }: SplashScreenProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex min-h-svh w-full items-center justify-center bg-white ${className}`}>
      <div className="flex flex-col items-center gap-0">
        <h1 className="animate-fade-in whitespace-nowrap font-suit-bold text-[79.6px] font-bold leading-[87.6px] tracking-[-3.98px] text-[var(--blue)]">
          Care Link
        </h1>
        <p
          className="animate-fade-up whitespace-nowrap text-[18px] font-normal leading-[70px] tracking-[-0.54px] text-[var(--blue)]"
          style={{ '--animation-delay': '0.4s' } as React.CSSProperties}
        >
          {t('splash.subtitle')}
        </p>
      </div>
    </div>
  );
}
