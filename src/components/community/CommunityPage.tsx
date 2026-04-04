import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchCommunityPosts } from '../../api/communityApi';
import type { CommunityPost } from '../../types/community';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconSearch = 'https://www.figma.com/api/mcp/asset/13220d68-48d3-4796-b9db-ba4f30951a53';
const imgIconThumb = 'https://www.figma.com/api/mcp/asset/2a411611-ebae-49c8-890f-1a036751217b';
const imgIconChat = 'https://www.figma.com/api/mcp/asset/261ed748-703a-41c4-a052-03e81ddb6a91';
const imgIconPlus = 'https://www.figma.com/api/mcp/asset/f3f5a980-b5be-4e9c-813a-918b8fbe45ca';

type CategoryFilter = 'ALL' | 'NOTICE' | 'QUESTION' | 'REVIEW' | 'FREE';

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  ALL: '전체',
  REVIEW: '약 후기',
  NOTICE: '병원 정보',
  QUESTION: '질문',
  FREE: '정보 공유',
};

const CATEGORIES: CategoryFilter[] = ['ALL', 'REVIEW', 'NOTICE', 'QUESTION', 'FREE'];

function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

function normalizeLanguage(lang: string | undefined) {
  if (!lang || lang === 'ja') return 'ko';
  return lang;
}

function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category as CategoryFilter] ?? category;
}

const LANGUAGE_FLAGS: Record<string, string> = {
  ko: '🇰🇷', en: '🇺🇸', zh: '🇨🇳', ja: '🇯🇵',
  vi: '🇻🇳', th: '🇹🇭', id: '🇮🇩', es: '🇪🇸',
  fr: '🇫🇷', de: '🇩🇪', ru: '🇷🇺', pt: '🇧🇷',
};

function getFlag(lang: string): string {
  return LANGUAGE_FLAGS[lang] ?? '';
}

export default function CommunityPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [category, setCategory] = useState<CategoryFilter>('ALL');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        let data = await fetchCommunityPosts(currentLanguage, currentLanguage);
        if (data.length === 0 && currentLanguage !== 'ko') {
          data = await fetchCommunityPosts('ko', currentLanguage);
        }
        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [currentLanguage]);

  const filtered = posts.filter((p) => {
    if (category !== 'ALL' && p.category !== category) return false;
    if (searchText && !p.title.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  return (
    <MobileContainer
      hasBottomNav
      header={<AppHeader title="커뮤니티" showBack={false} />}
      bottomFixedElement={
        <div className="bg-white px-[32px] pt-[20px] pb-[20px] rounded-tl-[10px] rounded-tr-[10px] shadow-[0px_-4px_10px_0px_rgba(209,213,219,0.4)]">
          <button
            type="button"
            onClick={() => navigate('/community/write')}
            className="flex h-[60px] w-full items-center justify-center gap-[8px] rounded-[10px] bg-[#296dff] shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]"
          >
            <img src={imgIconPlus} alt="" className="h-[18px] w-[18px]" />
            <span className="text-[18px] font-medium tracking-[-0.9px] text-white">글 작성하기</span>
          </button>
        </div>
      }
    >
      {/* Search bar */}
      <div className="px-[32px] pt-[20px]">
        <div className="flex h-[52px] items-center gap-[10px] rounded-[8px] bg-[#f3f4f6] px-[15px]">
          <img src={imgIconSearch} alt="" className="h-[20px] w-[20px] shrink-0" />
          <input
            type="text"
            placeholder="검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 bg-transparent text-[16px] font-medium tracking-[-0.8px] text-[#111827] placeholder-[#d1d5db] outline-none"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-[20px] h-[20px] bg-[#f9f9fb]" />

      {/* Category filter */}
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-[10px] px-[32px] py-[10px] w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`h-[35px] shrink-0 rounded-[20px] px-[15px] text-[14px] font-medium tracking-[-0.7px] transition-colors ${
                category === cat
                  ? 'bg-[#296dff] border border-[#296dff] text-white'
                  : 'border border-[#d1d5db] text-[#111827]'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Post list */}
      <div className="flex flex-col items-center gap-[16px] px-[32px] py-[16px]">
        {loading ? (
          <p className="py-[40px] text-[15px] font-medium text-[#6b7280]">불러오는 중...</p>
        ) : filtered.length === 0 ? (
          <p className="py-[40px] text-[15px] font-medium text-[#6b7280]">게시글이 없습니다.</p>
        ) : (
          filtered.map((post) => (
            <button
              key={post.postId}
              type="button"
              onClick={() => navigate(`/community/${post.postId}`)}
              className="w-full rounded-[10px] bg-[#f9f9fb] p-[20px] text-left shadow-[0px_4px_10px_0px_#d1d5db]"
            >
              {/* User row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#d1d5db] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]">
                    <span className="text-[20px] font-bold tracking-[-1px] text-[#111827]">
                      {(post.userName ?? String(post.userId)).slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="flex items-center gap-[6px] text-[16px] font-medium tracking-[-0.8px] text-[#111]">
                      {post.userName ?? `User #${post.userId}`}
                      {post.userLanguage && (
                        <span className="text-[14px]">{getFlag(post.userLanguage)}</span>
                      )}
                    </span>
                    <span className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">
                      {formatTimeAgo(post.createdAt)}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[14px] font-medium tracking-[-0.7px] text-white">
                  {getCategoryLabel(post.category)}
                </span>
              </div>

              {/* Content */}
              <div className="mt-[20px] flex flex-col gap-[10px]">
                <p className="text-[20px] font-bold tracking-[-1px] text-[#111827] line-clamp-1">
                  {post.title}
                </p>
                <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280] line-clamp-2">
                  {post.content}
                </p>
                {post.tag && (
                  <div className="flex flex-wrap gap-[8px]">
                    {post.tag.split(',').map((t, i) => (
                      <span key={i} className="text-[14px] font-medium tracking-[-0.7px] text-[#003ea7]">
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Separator */}
              <div className="my-[20px] h-px bg-[#d1d5db]" />

              {/* Feedback */}
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[6px]">
                  <img src={imgIconThumb} alt="" className="h-[22px] w-[22px]" />
                  <span className="text-[12px] font-bold text-[#111827]">0</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <img src={imgIconChat} alt="" className="h-[22px] w-[22px]" />
                  <span className="text-[12px] font-bold text-[#111827]">{post.commentCount ?? 0}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </MobileContainer>
  );
}
