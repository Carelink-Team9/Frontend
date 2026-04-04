import type { CommunityCategory } from '../../stores/communityStore';
import { COMMUNITY_CATEGORIES, COMMUNITY_CATEGORY_LABELS } from './communityUi';

interface CommunityCategoryTabsProps {
  selectedCategory: CommunityCategory;
  onSelect: (category: CommunityCategory) => void;
}

export default function CommunityCategoryTabs({
  selectedCategory,
  onSelect,
}: CommunityCategoryTabsProps) {
  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-[10px] px-[32px] py-[10px]">
        {COMMUNITY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`h-[35px] shrink-0 rounded-[20px] px-[15px] text-[14px] font-medium tracking-[-0.7px] transition-colors ${
              selectedCategory === category
                ? 'border border-[#296dff] bg-[#296dff] text-white'
                : 'border border-[#d1d5db] text-[#111827]'
            }`}
          >
            {COMMUNITY_CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>
    </div>
  );
}
