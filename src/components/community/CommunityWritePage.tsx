import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createPost } from '../../api/communityApi';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

type PostCategory = 'REVIEW' | 'NOTICE' | 'QUESTION' | 'FREE';

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'REVIEW', label: '약 후기' },
  { value: 'NOTICE', label: '병원 정보' },
  { value: 'QUESTION', label: '질문' },
  { value: 'FREE', label: '정보 공유' },
];

function normalizeLanguage(lang: string | undefined) {
  if (!lang || lang === 'ja') return 'ko';
  return lang;
}

export default function CommunityWritePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);

  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isReady = !!selectedCategory && title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async () => {
    if (!isReady || submitting) return;
    setSubmitting(true);
    try {
      const post = await createPost({
        title: title.trim(),
        content: content.trim(),
        language: currentLanguage,
        category: selectedCategory!,
      });
      navigate(`/community/${post.postId}`, { replace: true });
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <MobileContainer
      hasBottomNav
      header={<AppHeader title="글 작성" />}
      bottomFixedElement={
        <div className="bg-white px-[32px] pt-[20px] pb-[20px] shadow-[0px_-4px_10px_0px_#d1d5db]">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isReady || submitting}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              isReady
                ? 'bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]'
                : 'bg-[#f3f4f6] text-[#d1d5db]'
            }`}
          >
            {submitting ? '게시 중...' : '게시하기'}
          </button>
        </div>
      }
    >
      {/* Category */}
      <div className="px-[32px] pt-[24px] pb-[20px] border-b border-[#f3f4f6] text-left">
        <p className="mb-[24px] text-[20px] font-bold tracking-[-1px] text-[#111827]">
          카테고리 / Category
        </p>
        <div className="flex flex-wrap gap-[12px]">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedCategory(prev => prev === value ? null : value)}
              className={`h-[35px] rounded-[20px] px-[15px] text-[14px] font-medium tracking-[-0.7px] transition-colors ${
                selectedCategory === value
                  ? 'bg-[#296dff] text-white'
                  : 'border border-[#d1d5db] text-[#111827]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-[20px] bg-[#f9f9fb]" />

      {/* Inputs */}
      <div className="flex flex-col gap-[32px] px-[32px] pt-[20px] text-left">
        {/* Title */}
        <div className="flex flex-col gap-[16px]">
          <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">제목 / Title</p>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-[50px] w-full rounded-[10px] border border-[#d1d5db] bg-white px-[20px] text-[16px] font-medium tracking-[-0.8px] text-[#111827] placeholder-[#d1d5db] outline-none"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[16px]">
          <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">내용 / Content</p>
          <textarea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full rounded-[10px] border border-[#d1d5db] bg-white px-[20px] py-[12px] text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#111827] placeholder-[#d1d5db] outline-none resize-none"
          />
        </div>
      </div>
    </MobileContainer>
  );
}
