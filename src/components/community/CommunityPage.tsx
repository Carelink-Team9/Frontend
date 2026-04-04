import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchCommunityPosts } from '../../api/communityApi';
import type { CommunityPost } from '../../types/community';
import { useCommunityStore } from '../../stores/communityStore';
import PrimaryButton from '../common/PrimaryButton';
import StatusMessage from '../common/StatusMessage';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import CommunityCategoryTabs from './CommunityCategoryTabs';
import {
  formatTimeAgo,
  getCommunityCategoryLabel,
  getCommunityFlag,
  normalizeCommunityLanguage,
} from './communityUi';

const imgIconSearch = 'https://www.figma.com/api/mcp/asset/13220d68-48d3-4796-b9db-ba4f30951a53';
const imgIconThumb = 'https://www.figma.com/api/mcp/asset/2a411611-ebae-49c8-890f-1a036751217b';
const imgIconChat = 'https://www.figma.com/api/mcp/asset/261ed748-703a-41c4-a052-03e81ddb6a91';
const imgIconPlus = 'https://www.figma.com/api/mcp/asset/f3f5a980-b5be-4e9c-813a-918b8fbe45ca';

export default function CommunityPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeCommunityLanguage(i18n.resolvedLanguage);
  const category = useCommunityStore((state) => state.listCategory);
  const searchText = useCommunityStore((state) => state.listSearchText);
  const setCategory = useCommunityStore((state) => state.setListCategory);
  const setSearchText = useCommunityStore((state) => state.setListSearchText);

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      setLoading(true);

      try {
        let nextPosts = await fetchCommunityPosts(currentLanguage, currentLanguage);

        if (nextPosts.length === 0 && currentLanguage !== 'ko') {
          nextPosts = await fetchCommunityPosts('ko', currentLanguage);
        }

        if (!cancelled) {
          setPosts(nextPosts);
        }
      } catch {
        if (!cancelled) {
          setPosts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, [currentLanguage]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (category !== 'ALL' && post.category !== category) return false;
      if (!searchText.trim()) return true;

      return post.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [category, posts, searchText]);

  return (
    <MobileContainer
      hasBottomNav
      header={<AppHeader title="커뮤니티" showBack={false} />}
      bottomFixedElement={
        <div className="rounded-tl-[10px] rounded-tr-[10px] bg-white px-[32px] pb-[20px] pt-[20px] shadow-[0px_-4px_10px_0px_rgba(209,213,219,0.4)]">
          <PrimaryButton onClick={() => navigate('/community/write')}>
            <span className="flex items-center gap-[8px]">
              <img src={imgIconPlus} alt="" className="h-[18px] w-[18px]" />
              <span>글 작성하기</span>
            </span>
          </PrimaryButton>
        </div>
      }
    >
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

      <div className="mt-[20px] h-[20px] bg-[#f9f9fb]" />

      <CommunityCategoryTabs selectedCategory={category} onSelect={setCategory} />

      <div className="flex flex-col items-center gap-[16px] px-[32px] py-[16px]">
        {loading ? (
          <StatusMessage message="불러오는 중..." />
        ) : filteredPosts.length === 0 ? (
          <StatusMessage message="게시글이 없습니다." />
        ) : (
          filteredPosts.map((post) => (
            <button
              key={post.postId}
              type="button"
              onClick={() => navigate(`/community/${post.postId}`)}
              className="w-full rounded-[10px] bg-[#f9f9fb] p-[20px] text-left shadow-[0px_4px_10px_0px_#d1d5db]"
            >
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
                      {post.userLanguage ? <span className="text-[14px]">{getCommunityFlag(post.userLanguage)}</span> : null}
                    </span>
                    <span className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">
                      {formatTimeAgo(post.createdAt)}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[14px] font-medium tracking-[-0.7px] text-white">
                  {getCommunityCategoryLabel(post.category)}
                </span>
              </div>

              <div className="mt-[20px] flex flex-col gap-[10px]">
                <p className="line-clamp-1 text-[20px] font-bold tracking-[-1px] text-[#111827]">{post.title}</p>
                <p className="line-clamp-2 text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">
                  {post.content}
                </p>
                {post.tag ? (
                  <div className="flex flex-wrap gap-[8px]">
                    {post.tag.split(',').map((tag, index) => (
                      <span key={index} className="text-[14px] font-medium tracking-[-0.7px] text-[#003ea7]">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="my-[20px] h-px bg-[#d1d5db]" />

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
