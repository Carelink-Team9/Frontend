import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const imgArrowLine = 'https://www.figma.com/api/mcp/asset/a39ec05c-7115-4399-a7ea-dac6482fac05';

export default function MyPageScreen() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex h-svh w-full justify-center overflow-hidden bg-[#F3F4F6]">
      <div className="flex h-svh w-full max-w-[402px] flex-col bg-white">
        {/* Header */}
        <header className="relative flex h-[70px] shrink-0 items-center justify-center border-b border-[#d1d5db] bg-white px-[32px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-[32px]"
            aria-label="뒤로가기"
          >
            <img src={imgArrowLine} alt="" className="h-[16px] w-[16px]" />
          </button>
          <span className="text-[20px] font-medium tracking-[-1px] text-[#111827]">마이페이지</span>
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
