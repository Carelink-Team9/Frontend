import type { CommunityCategory } from '../../stores/communityStore';
import { useTranslation } from 'react-i18next';
import { COMMUNITY_CATEGORIES } from './communityUi';

interface CommunityCategoryTabsProps {
  selectedCategory: CommunityCategory;
  onSelect: (category: CommunityCategory) => void;
}

export default function CommunityCategoryTabs({
  selectedCategory,
  onSelect,
}: CommunityCategoryTabsProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-[10px] px-[32px] py-[10px]">
        {COMMUNITY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`min-h-[35px] shrink-0 rounded-[20px] px-[15px] py-[8px] text-[14px] font-medium leading-[1.3] tracking-[-0.7px] transition-colors ${
              selectedCategory === category
                ? 'border border-[#296dff] bg-[#296dff] text-white'
                : 'border border-[#d1d5db] text-[#111827]'
            }`}
          >
            <span className="whitespace-nowrap">{t(`community.categoryLabel.${category}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
