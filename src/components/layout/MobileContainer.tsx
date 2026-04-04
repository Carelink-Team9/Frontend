import type { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface MobileContainerProps {
  children: ReactNode;
  header?: ReactNode;
  hasBottomNav?: boolean;
  bottomFixedElement?: ReactNode;
}

export default function MobileContainer({
  children,
  header,
  hasBottomNav = false,
  bottomFixedElement,
}: MobileContainerProps) {
  return (
    <div className="flex min-h-svh h-svh w-full justify-center overflow-hidden bg-[#F3F4F6]">
      <div className="flex h-svh w-full max-w-[402px] flex-col bg-white overflow-hidden relative">
        {header && header}
        <div className="flex flex-1 flex-col overflow-y-auto w-full relative">
          {children}
        </div>
        {bottomFixedElement && bottomFixedElement}
        {hasBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
