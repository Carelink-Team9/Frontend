import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const imgIconHome = 'https://www.figma.com/api/mcp/asset/c8b22801-f966-46f6-9052-4fbbab01fb4f';
const imgIconPrescription = 'https://www.figma.com/api/mcp/asset/67bf53c8-6b9e-4e81-ae20-0b3b81253024';
const imgUnion = 'https://www.figma.com/api/mcp/asset/4ecb3741-2b9b-4405-8ce3-9bbbb098d8ac';
const imgMypageStroke = 'https://www.figma.com/api/mcp/asset/a16567fb-feef-4811-b5a8-486d95c85113';

const activeFilter = 'invert(33%) sepia(85%) saturate(2768%) hue-rotate(209deg) brightness(101%) contrast(106%)';

export default function BottomNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname;

  const isHome = path === '/';
  const isPrescription = path.startsWith('/prescriptions');
  const isCommunity = path.startsWith('/community');
  const isMyPage = path.startsWith('/mypage');

  const items = [
    { key: 'home', to: '/', icon: imgIconHome, active: isHome, size: 'h-[30px] w-[30px]' },
    { key: 'prescriptions', to: '/prescriptions', icon: imgIconPrescription, active: isPrescription, size: 'h-[30px] w-[30px]' },
    { key: 'community', to: '/community', icon: imgUnion, active: isCommunity, size: 'h-[27px] w-[27px]' },
    { key: 'mypage', to: '/mypage', icon: imgMypageStroke, active: isMyPage, size: 'h-[23px] w-[23px]' },
  ] as const;

  return (
    <nav className="flex h-[94px] shrink-0 items-start justify-around border-t border-[#dadada] bg-white pt-[10px]">
      {items.map((item) =>
        item.active ? (
          <button key={item.key} type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={item.icon} alt={t(`nav.${item.key}`)} className={item.size} style={{ filter: activeFilter }} />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#296dff]">{t(`nav.${item.key}`)}</span>
          </button>
        ) : (
          <Link key={item.key} to={item.to} className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={item.icon} alt={t(`nav.${item.key}`)} className={item.size} />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">{t(`nav.${item.key}`)}</span>
          </Link>
        ),
      )}
    </nav>
  );
}
