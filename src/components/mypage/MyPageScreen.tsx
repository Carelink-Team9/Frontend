import { useAuth } from '../../context/AuthContext';
import PrimaryButton from '../common/PrimaryButton';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

export default function MyPageScreen() {
  const { logout } = useAuth();

  return (
    <MobileContainer
      hasBottomNav={false}
      header={<AppHeader title="마이페이지" />}
    >
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-[32px]">
        <PrimaryButton
          variant="danger"
          className="h-[50px] text-[16px] font-bold"
          onClick={() => {
            void logout();
          }}
        >
          로그아웃
        </PrimaryButton>
      </div>
    </MobileContainer>
  );
}
