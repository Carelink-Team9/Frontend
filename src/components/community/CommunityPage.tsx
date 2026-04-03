import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchCommunityPosts } from '../../api/communityApi';
import type { CommunityPost } from '../../types/community';

const imgArrowLine = 'https://www.figma.com/api/mcp/asset/304f4f50-fe2a-41d0-aef2-fa8796a06b9b';
const imgMypageStroke = 'https://www.figma.com/api/mcp/asset/6efa4388-f7eb-4882-936b-a26dae853a96';
const imgUnion = 'https://www.figma.com/api/mcp/asset/09bb2e4c-db3a-4e83-b032-20194974782d';
const imgIconHome = 'https://www.figma.com/api/mcp/asset/ae7d82a2-60ca-43f7-a6f3-76fca538a9f4';
const imgIconPrescription = 'https://www.figma.com/api/mcp/asset/67bf53c8-6b9e-4e81-ae20-0b3b81253024';

type CategoryFilter = 'ALL' | 'NOTICE' | 'QUESTION' | 'REVIEW' | 'FREE';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function normalizeLanguage(language: string | undefined) {
  if (!language) return 'ko';
  if (language === 'ja') return 'en';
  return language;
}

export default function CommunityPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [category, setCategory] = useState<CategoryFilter>('ALL');
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      setPostsLoading(true);
      setError(null);

      try {
        let nextPosts = await fetchCommunityPosts(currentLanguage, currentLanguage);

        if (nextPosts.length === 0 && currentLanguage !== 'ko') {
          nextPosts = await fetchCommunityPosts('ko', currentLanguage);
        }

        if (cancelled) return;
        setPosts(nextPosts);
      } catch {
        if (!cancelled) {
          setError('커뮤니티 글을 불러오지 못했습니다.');
          setPosts([]);
        }
      } finally {
        if (!cancelled) {
          setPostsLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, [currentLanguage]);

  const filteredPosts =
    category === 'ALL' ? posts : posts.filter((post) => post.category === category);

  return (
    <div className="flex h-svh w-full justify-center overflow-hidden bg-[#F3F4F6]">
      <div className="flex h-svh w-full max-w-[402px] flex-col bg-white">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-[#dadada] bg-white px-[32px] h-[60px]">
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="뒤로가기"
            >
              <img src={imgArrowLine} alt="" className="h-[16px] w-[16px]" />
            </button>
            <span className="font-['SUIT',sans-serif] text-[20px] font-extrabold tracking-[-0.4px] text-[#111827]">
              커뮤니티
            </span>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Greeting/Title Area */}
          <div className="px-[32px] pt-[30px] pb-[16px] text-left">
            <p className="text-[28px] tracking-[-1.4px] text-[#111827] leading-[1.3] break-keep">
              <span className="font-bold">다양한 이야기</span>를
              <br />
              나누어 보세요.
            </p>
            <p className="mt-[10px] text-[15px] font-medium tracking-[-0.7px] text-[#6b7280]">
              질문과 후기를 카테고리별로 확인하세요.
            </p>
          </div>

          {/* Categories */}
          <section className="flex gap-[8px] overflow-x-auto px-[32px] py-[10px] [&::-webkit-scrollbar]:hidden">
            {(['ALL', 'NOTICE', 'QUESTION', 'REVIEW', 'FREE'] as CategoryFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-[10px] px-[16px] py-[8px] text-[14px] font-bold transition-colors ${
                  category === item
                    ? 'bg-[#296dff] text-white'
                    : 'bg-[#f3f4f6] text-[#6b7280]'
                }`}
              >
                {item}
              </button>
            ))}
          </section>

          {/* Post List */}
          <section className="px-[32px] pt-[16px] pb-[30px]">
            {postsLoading ? (
              <div className="rounded-[10px] border border-[#d1d5db] bg-[#f9f9fb] px-[20px] py-[30px] text-center text-[15px] font-medium text-[#6b7280]">
                커뮤니티 글을 불러오는 중입니다.
              </div>
            ) : error ? (
              <div className="rounded-[10px] border border-[#fecaca] bg-[#fff1f2] px-[20px] py-[30px] text-center text-[15px] font-medium text-[#b91c1c]">
                {error}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="rounded-[10px] border border-[#d1d5db] bg-[#f9f9fb] px-[20px] py-[30px] text-center text-[15px] font-medium text-[#6b7280]">
                표시할 게시글이 없습니다.
              </div>
            ) : (
              <div className="flex flex-col gap-[16px]">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.postId}
                    to={`/community/${post.postId}`}
                    className="flex flex-col rounded-[10px] border border-[#d1d5db] bg-white px-[20px] py-[24px] text-left transition-shadow hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-[4px] bg-[#eef2f7] px-[8px] py-[4px] text-[12px] font-semibold text-[#296dff]">
                        {post.category}
                      </span>
                      <span className="text-[13px] font-medium tracking-[-0.6px] text-[#9ca3af]">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <p className="mt-[14px] line-clamp-1 text-[20px] font-bold tracking-[-1px] text-[#111827]">
                      {post.title}
                    </p>
                    <p className="mt-[10px] line-clamp-2 text-[15px] font-medium leading-[1.5] tracking-[-0.4px] text-[#6b7280]">
                      {post.content}
                    </p>
                    {post.tag ? (
                      <div className="mt-[16px] flex flex-wrap gap-[6px]">
                        {post.tag.split(',').map((t, i) => (
                          <span key={i} className="rounded-[4px] bg-[rgba(41,109,255,0.06)] px-[6px] py-[2px] text-[13px] font-bold tracking-[-0.6px] text-[#296dff]">
                            #{t.trim()}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <nav className="flex h-[94px] shrink-0 items-start justify-around border-t border-[#dadada] bg-white pt-[10px]">
          <Link to="/" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgIconHome} alt="홈" className="h-[30px] w-[30px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">홈</span>
          </Link>

          <Link to="/prescriptions" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgIconPrescription} alt="처방전" className="h-[30px] w-[30px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">처방전</span>
          </Link>

          <button type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgUnion} alt="커뮤니티" className="h-[27px] w-[27px]" style={{ filter: 'invert(33%) sepia(85%) saturate(2768%) hue-rotate(209deg) brightness(101%) contrast(106%)' }} />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#296dff]">커뮤니티</span>
          </button>

          <Link to="/mypage" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgMypageStroke} alt="마이페이지" className="h-[23px] w-[23px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">마이페이지</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
