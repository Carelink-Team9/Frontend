import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

export default function MyPageScreen() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <MobileContainer
      hasBottomNav={false}
      header={<AppHeader title="마이페이지" />}
    >

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
    </MobileContainer>
  );
}
