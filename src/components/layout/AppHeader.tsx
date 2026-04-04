import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const imgArrowLine = 'https://www.figma.com/api/mcp/asset/304f4f50-fe2a-41d0-aef2-fa8796a06b9b';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  backTo?: string;
  rightElement?: ReactNode;
  isHomeComponent?: boolean;
}

export default function AppHeader({
  title,
  showBack = true,
  backTo,
  rightElement,
  isHomeComponent = false,
}: AppHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  if (isHomeComponent) {
    return (
      <header className="flex shrink-0 items-center justify-between border-b border-[#dadada] bg-white px-[32px] h-[60px] relative z-10 w-full">
        <span className="font-['SUIT',sans-serif] text-[20px] font-extrabold tracking-[-0.4px] text-[#111827]">
          {title || 'CareLink'}
        </span>
        {rightElement}
      </header>
    );
  }

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#dadada] bg-white px-[32px] h-[60px] relative z-10 w-full">
      <div className="flex items-center gap-[12px]">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <img src={imgArrowLine} alt="" className="h-[16px] w-[16px]" />
          </button>
        )}
        <span className="font-['SUIT',sans-serif] text-[20px] font-extrabold tracking-[-0.4px] text-[#111827]">
          {title}
        </span>
      </div>
      {rightElement && (
        <div className="flex items-center">
          {rightElement}
        </div>
      )}
    </header>
  );
}
