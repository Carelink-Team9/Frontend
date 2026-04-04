import { Link, useLocation } from 'react-router-dom';

const imgIconHome = 'https://www.figma.com/api/mcp/asset/c8b22801-f966-46f6-9052-4fbbab01fb4f';
const imgIconPrescription = 'https://www.figma.com/api/mcp/asset/67bf53c8-6b9e-4e81-ae20-0b3b81253024';
const imgUnion = 'https://www.figma.com/api/mcp/asset/4ecb3741-2b9b-4405-8ce3-9bbbb098d8ac';
const imgMypageStroke = 'https://www.figma.com/api/mcp/asset/a16567fb-feef-4811-b5a8-486d95c85113';

// Filter for #296dff
const activeFilter = 'invert(33%) sepia(85%) saturate(2768%) hue-rotate(209deg) brightness(101%) contrast(106%)';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const isHome = path === '/';
  const isPrescription = path.startsWith('/prescriptions');
  const isCommunity = path.startsWith('/community');
  const isMyPage = path.startsWith('/mypage');

  return (
    <nav className="flex h-[94px] shrink-0 items-start justify-around border-t border-[#dadada] bg-white pt-[10px]">
      {isHome ? (
        <button type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgIconHome} alt="홈" className="h-[30px] w-[30px]" style={{ filter: activeFilter }} />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#296dff]">홈</span>
        </button>
      ) : (
        <Link to="/" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgIconHome} alt="홈" className="h-[30px] w-[30px]" />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">홈</span>
        </Link>
      )}

      {isPrescription ? (
        <button type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgIconPrescription} alt="처방전" className="h-[30px] w-[30px]" style={{ filter: activeFilter }} />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#296dff]">처방전</span>
        </button>
      ) : (
        <Link to="/prescriptions" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgIconPrescription} alt="처방전" className="h-[30px] w-[30px]" />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">처방전</span>
        </Link>
      )}

      {isCommunity ? (
        <button type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgUnion} alt="커뮤니티" className="h-[27px] w-[27px]" style={{ filter: activeFilter }} />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#296dff]">커뮤니티</span>
        </button>
      ) : (
        <Link to="/community" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgUnion} alt="커뮤니티" className="h-[27px] w-[27px]" />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">커뮤니티</span>
        </Link>
      )}

      {isMyPage ? (
        <button type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgMypageStroke} alt="마이페이지" className="h-[23px] w-[23px]" style={{ filter: activeFilter }} />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#296dff]">마이페이지</span>
        </button>
      ) : (
        <Link to="/mypage" className="flex w-[83px] flex-col items-center gap-[4px]">
          <img src={imgMypageStroke} alt="마이페이지" className="h-[23px] w-[23px]" />
          <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">마이페이지</span>
        </Link>
      )}
    </nav>
  );
}
