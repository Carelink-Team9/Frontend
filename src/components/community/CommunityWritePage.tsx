import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createPost } from '../../api/communityApi';
import { useCommunityStore } from '../../stores/communityStore';
import PrimaryButton from '../common/PrimaryButton';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import CommunityCategoryTabs from './CommunityCategoryTabs';
import { normalizeCommunityLanguage } from './communityUi';

export default function CommunityWritePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeCommunityLanguage(i18n.resolvedLanguage);
  const selectedCategory = useCommunityStore((state) => state.draftCategory);
  const title = useCommunityStore((state) => state.draftTitle);
  const content = useCommunityStore((state) => state.draftContent);
  const setDraftCategory = useCommunityStore((state) => state.setDraftCategory);
  const setDraftTitle = useCommunityStore((state) => state.setDraftTitle);
  const setDraftContent = useCommunityStore((state) => state.setDraftContent);
  const resetDraft = useCommunityStore((state) => state.resetDraft);

  const [submitting, setSubmitting] = useState(false);

  const isReady = Boolean(selectedCategory && title.trim() && content.trim());

  const handleSubmit = async () => {
    if (!isReady || !selectedCategory || submitting) return;

    setSubmitting(true);

    try {
      const post = await createPost({
        title: title.trim(),
        content: content.trim(),
        language: currentLanguage,
        category: selectedCategory,
      });

      resetDraft();
      navigate(`/community/${post.postId}`, { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MobileContainer
      hasBottomNav
      header={<AppHeader title="글 작성" />}
      bottomFixedElement={
        <div className="bg-white px-[32px] pb-[20px] pt-[20px] shadow-[0px_-4px_10px_0px_#d1d5db]">
          <PrimaryButton
            disabled={!isReady || submitting}
            onClick={() => {
              void handleSubmit();
            }}
          >
            {submitting ? '게시 중...' : '게시하기'}
          </PrimaryButton>
        </div>
      }
    >
      <div className="border-b border-[#f3f4f6] px-[32px] pb-[20px] pt-[24px] text-left">
        <p className="mb-[24px] text-[20px] font-bold tracking-[-1px] text-[#111827]">카테고리 / Category</p>
        <CommunityCategoryTabs
          selectedCategory={selectedCategory ?? 'ALL'}
          onSelect={(category) => {
            if (category === 'ALL') return;
            setDraftCategory(selectedCategory === category ? null : category);
          }}
        />
      </div>

      <div className="h-[20px] bg-[#f9f9fb]" />

      <div className="flex flex-col gap-[32px] px-[32px] pt-[20px] text-left">
        <div className="flex flex-col gap-[16px]">
          <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">제목 / Title</p>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="h-[50px] w-full rounded-[10px] border border-[#d1d5db] bg-white px-[20px] text-[16px] font-medium tracking-[-0.8px] text-[#111827] placeholder-[#d1d5db] outline-none"
          />
        </div>

        <div className="flex flex-col gap-[16px]">
          <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">내용 / Content</p>
          <textarea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setDraftContent(e.target.value)}
            rows={6}
            className="w-full resize-none rounded-[10px] border border-[#d1d5db] bg-white px-[20px] py-[12px] text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#111827] placeholder-[#d1d5db] outline-none"
          />
        </div>
      </div>
    </MobileContainer>
  );
}
