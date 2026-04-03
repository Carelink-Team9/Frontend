import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MyPageScreen() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex h-svh w-full justify-center overflow-hidden bg-[#F3F4F6]">
      <div className="flex h-svh w-full max-w-[402px] flex-col bg-white">
        {/* Header */}
        <header className="relative flex h-[70px] shrink-0 items-center justify-center border-b border-[#d1d5db] bg-white px-[32px]">
          <span className="text-[20px] font-medium tracking-[-1px] text-[#111827]">마이페이지</span>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="absolute right-[32px] text-[#296dff]"
            aria-label="로홈으로 되돌아가기"
          >
            {/* The user specifically asked for a '<' like emoji on the top right */}
            <span className="text-[24px] font-bold">&lt;</span>
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-[32px]">
          <button
            type="button"
            onClick={logout}
            className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#f3f4f6] text-[16px] font-bold text-[#ef4444] transition-colors hover:bg-[#fee2e2]"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
