import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchCommunityComments, fetchCommunityPost } from '../../api/communityApi';
import type { CommunityComment, CommunityPost } from '../../types/community';

const imgArrowLine = 'https://www.figma.com/api/mcp/asset/304f4f50-fe2a-41d0-aef2-fa8796a06b9b';
const imgMypageStroke = 'https://www.figma.com/api/mcp/asset/6efa4388-f7eb-4882-936b-a26dae853a96';
const imgUnion = 'https://www.figma.com/api/mcp/asset/09bb2e4c-db3a-4e83-b032-20194974782d';
const imgIconHome = 'https://www.figma.com/api/mcp/asset/ae7d82a2-60ca-43f7-a6f3-76fca538a9f4';
const imgIconPrescription = 'https://www.figma.com/api/mcp/asset/67bf53c8-6b9e-4e81-ae20-0b3b81253024';

function normalizeLanguage(language: string | undefined) {
  if (!language) return 'ko';
  if (language === 'ja') return 'en';
  return language;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function CommunityDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);

  const [post, setPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = Number(postId);

    async function load() {
      if (!id) {
        setError('잘못된 게시글 경로입니다.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [nextPost, nextComments] = await Promise.all([
          fetchCommunityPost(id, currentLanguage),
          fetchCommunityComments(id, currentLanguage),
        ]);

        if (cancelled) return;
        setPost(nextPost);
        setComments(nextComments);
      } catch {
        if (!cancelled) {
          setError('게시글 상세를 불러오지 못했습니다.');
          setPost(null);
          setComments([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [currentLanguage, postId]);

  return (
    <div className="flex h-svh w-full justify-center overflow-hidden bg-[#F3F4F6]">
      <div className="flex h-svh w-full max-w-[402px] flex-col bg-white">
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
              커뮤니티 상세
            </span>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {loading ? (
            <div className="m-[32px] rounded-[10px] border border-[#d1d5db] bg-[#f9f9fb] px-[20px] py-[30px] text-center text-[15px] font-medium text-[#6b7280]">
              게시글을 불러오는 중입니다.
            </div>
          ) : error ? (
            <div className="m-[32px] rounded-[10px] border border-[#fecaca] bg-[#fff1f2] px-[20px] py-[30px] text-center text-[15px] font-medium text-[#b91c1c]">
              {error}
            </div>
          ) : post ? (
            <>
              {/* Post Header Group */}
              <section className="px-[32px] pt-[30px] pb-[24px] text-left border-b border-[#f3f4f6]">
                <div className="flex items-center justify-between">
                  <span className="rounded-[4px] bg-[#eef2f7] px-[8px] py-[4px] text-[12px] font-semibold text-[#296dff]">
                    {post.category}
                  </span>
                </div>
                <h1 className="mt-[16px] text-[24px] font-bold tracking-[-1.2px] text-[#111827] leading-[1.3] break-keep">
                  {post.title}
                </h1>
                <div className="mt-[20px] flex items-center justify-between">
                  <div className="flex items-center gap-[10px]">
                    <div className="h-[36px] w-[36px] rounded-full bg-[#f3f4f6] flex items-center justify-center font-bold text-[14px] text-[#6b7280]">
                      {post.userId.toString().slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold tracking-[-0.7px] text-[#111827]">User #{post.userId}</span>
                      <span className="text-[12px] font-medium tracking-[-0.6px] text-[#9ca3af]">{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                  {/* language indicator */}
                  <span className="rounded-[4px] bg-[#f9fafb] border border-[#e5e7eb] px-[8px] py-[4px] text-[11px] font-bold text-[#6b7280]">
                    {post.language.toUpperCase()}
                  </span>
                </div>
              </section>

              {/* Post Body Group */}
              <section className="px-[32px] py-[30px] text-left">
                <p className="whitespace-pre-wrap text-[16px] leading-[1.6] tracking-[-0.4px] text-[#374151]">
                  {post.content}
                </p>

                {post.tag ? (
                  <div className="mt-[30px] flex flex-wrap gap-[8px]">
                    {post.tag.split(',').map((t, i) => (
                      <span key={i} className="rounded-[4px] bg-[rgba(41,109,255,0.06)] px-[8px] py-[4px] text-[13px] font-bold tracking-[-0.6px] text-[#296dff]">
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                ) : null}
              </section>

              <div className="h-[12px] bg-[#f9f9fb]" />

              {/* Comments Section */}
              <section className="px-[32px] pt-[24px] pb-[40px] text-left bg-white">
                <div className="mb-[20px] flex items-center">
                  <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">댓글</p>
                  <span className="ml-[6px] text-[16px] font-bold text-[#296dff]">{comments.length}</span>
                </div>

                <div className="flex flex-col">
                  {comments.length === 0 ? (
                    <div className="py-[30px] text-center text-[15px] font-medium text-[#6b7280]">
                      아직 댓글이 없습니다.
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <article
                        key={comment.commentId}
                        className="py-[16px] border-b border-[#f3f4f6] first:pt-0 last:border-b-0 last:pb-0"
                      >
                        <div className="flex flex-col">
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-[8px]">
                               <span className="text-[14px] font-bold tracking-[-0.7px] text-[#111827]">User #{comment.userId}</span>
                               {comment.language !== post.language && (
                                  <span className="text-[11px] font-bold text-[#9ca3af] bg-[#f3f4f6] px-[6px] py-[2px] rounded-[4px]">
                                    {comment.language.toUpperCase()}
                                  </span>
                               )}
                             </div>
                             <span className="text-[12px] font-medium tracking-[-0.6px] text-[#9ca3af]">
                               {formatDate(comment.createdAt)}
                             </span>
                           </div>
                           <p className="mt-[8px] text-[15px] leading-[1.5] tracking-[-0.4px] text-[#374151]">
                             {comment.content}
                           </p>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </>
          ) : null}
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

          <Link to="/community" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgUnion} alt="커뮤니티" className="h-[27px] w-[27px]" style={{ filter: 'invert(33%) sepia(85%) saturate(2768%) hue-rotate(209deg) brightness(101%) contrast(106%)' }} />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#296dff]">커뮤니티</span>
          </Link>

          <Link to="/mypage" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgMypageStroke} alt="마이페이지" className="h-[23px] w-[23px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">마이페이지</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
