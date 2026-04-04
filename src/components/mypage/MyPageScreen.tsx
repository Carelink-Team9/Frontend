import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import PrimaryButton from '../common/PrimaryButton';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

export default function MyPageScreen() {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <MobileContainer hasBottomNav={false} header={<AppHeader title={t('mypage.title')} />}>
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-[32px]">
        <PrimaryButton
          variant="danger"
          className="h-[50px] text-[16px] font-bold"
          onClick={() => {
            void logout();
          }}
        >
          {t('mypage.logout')}
        </PrimaryButton>
      </div>
    </MobileContainer>
  );
}
