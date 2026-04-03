import React from 'react';

interface SplashScreenProps {
  className?: string;
}

export default function SplashScreen({ className = '' }: SplashScreenProps) {
  return (
    <div
      className={`flex min-h-svh w-full items-center justify-center bg-white ${className}`}
    >
      <div className="flex flex-col items-center gap-0">
        <h1
          className="animate-fade-in font-suit-bold text-[79.6px] font-bold leading-[87.6px] tracking-[-3.98px] text-[var(--blue)] whitespace-nowrap"
        >
          Care Link
        </h1>
        <p
          className="animate-fade-up text-[18px] font-normal leading-[70px] tracking-[-0.54px] text-[var(--blue)] whitespace-nowrap"
          style={{ '--animation-delay': '0.4s' } as React.CSSProperties}
        >
          어려운 의료 경험을 이해하기 쉬운 흐름으로!
        </p>
      </div>
    </div>
  );
}
