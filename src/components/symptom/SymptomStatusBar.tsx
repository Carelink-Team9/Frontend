/**
 * 모바일 프레임 상단 여백 (Figma Status Bar - iPhone 높이 50px 대응)
 */
export default function SymptomStatusBar() {
  return (
    <div
      className="flex h-[50px] w-full shrink-0 items-start justify-between bg-white px-4 pt-5"
      aria-hidden
    >
      <span className="text-center text-[17px] font-semibold leading-[22px] text-[#111827]">
        9:41
      </span>
      <span className="h-[10px] w-[124px]" />
      <span className="w-16" />
    </div>
  );
}
