import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchCommunityComments, fetchCommunityPost, addComment } from '../../api/communityApi';
import type { CommunityComment, CommunityPost } from '../../types/community';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconThumb = 'https://www.figma.com/api/mcp/asset/98d4ecaf-d92a-4e87-9505-fe6a87d97ac6';
const imgIconChat = 'https://www.figma.com/api/mcp/asset/b2585ec5-cf1f-4803-9266-4d34ec67ca1b';

const LANGUAGE_FLAGS: Record<string, string> = {
  ko: '🇰🇷', en: '🇺🇸', zh: '🇨🇳', ja: '🇯🇵',
  vi: '🇻🇳', th: '🇹🇭', id: '🇮🇩', es: '🇪🇸',
  fr: '🇫🇷', de: '🇩🇪', ru: '🇷🇺', pt: '🇧🇷',
};

function getFlag(lang: string): string {
  return LANGUAGE_FLAGS[lang] ?? '';
}

const CATEGORY_LABELS: Record<string, string> = {
  REVIEW: '약 후기',
  NOTICE: '병원 정보',
  QUESTION: '질문',
  FREE: '정보 공유',
};

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

export default function CommunityDetailPage() {
  const { postId } = useParams();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);

  const [post, setPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const postIdNum = Number(postId);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!postIdNum) return;
      setLoading(true);
      try {
        const [p, c] = await Promise.all([
          fetchCommunityPost(postIdNum, currentLanguage),
          fetchCommunityComments(postIdNum, currentLanguage),
        ]);
        if (cancelled) return;
        setPost(p);
        setComments(c);
      } catch {
        // pass
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [postIdNum, currentLanguage]);

  const handleAddComment = async () => {
    if (!commentText.trim() || submitting || !postIdNum) return;
    setSubmitting(true);
    try {
      const newComment = await addComment(postIdNum, {
        content: commentText.trim(),
        language: currentLanguage,
      });
      setComments((prev) => [...prev, newComment]);
      setCommentText('');
    } catch {
      // pass
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MobileContainer
      hasBottomNav
      header={<AppHeader title="게시글" />}
      bottomFixedElement={
        <div className="bg-white px-[32px] pt-[20px] pb-[20px] shadow-[0px_-4px_10px_0px_#d1d5db]">
          <div className="flex gap-[10px]">
            <input
              type="text"
              placeholder="댓글을 입력하세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void handleAddComment();
              }}
              className="h-[60px] flex-1 rounded-[10px] border border-[#d1d5db] bg-white px-[20px] text-[16px] font-medium tracking-[-0.8px] text-[#111827] placeholder-[#d1d5db] outline-none"
            />
            <button
              type="button"
              onClick={handleAddComment}
              disabled={!commentText.trim() || submitting}
              className="h-[60px] w-[77px] shrink-0 rounded-[10px] bg-[#296dff] text-[18px] font-medium tracking-[-0.9px] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]"
            >
              등록
            </button>
          </div>
        </div>
      }
    >
      {loading ? (
        <div className="py-[60px] text-center text-[15px] font-medium text-[#6b7280]">
          불러오는 중...
        </div>
      ) : !post ? (
        <div className="py-[60px] text-center text-[15px] font-medium text-[#6b7280]">
          게시글을 찾을 수 없습니다.
        </div>
      ) : (
        <>
          {/* Post section */}
          <div className="bg-white px-[32px] pt-[24px] pb-[20px] text-left">
            <div className="mb-[20px]">
              <span className="inline-block rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[14px] font-medium tracking-[-0.7px] text-white">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            </div>

            <p className="mb-[24px] text-left text-[22px] font-bold tracking-[-1px] text-[#111827] break-keep leading-[1.4]">
              {post.title}
            </p>
            <p className="text-left text-[15px] font-medium leading-[1.8] tracking-[-0.7px] text-[#4b5563] whitespace-pre-wrap">
              {post.content}
            </p>

            {post.tag && (
              <div className="mt-[24px] flex flex-wrap gap-[8px]">
                {post.tag.split(',').map((t, i) => (
                  <span key={i} className="text-[14px] font-medium tracking-[-0.7px] text-[#003ea7]">
                    #{t.trim()}
                  </span>
                ))}
              </div>
            )}

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
                <span className="text-[12px] font-bold text-[#111827]">{comments.length}</span>
              </div>
            </div>
          </div>

          {/* Gray divider */}
          <div className="h-[20px] bg-[#f3f4f6]" />

          {/* Comments section */}
          <div className="bg-white px-[32px] pt-[20px] pb-[20px] text-left">
            <p className="mb-[20px] text-[18px] font-bold tracking-[-0.9px] text-[#111827]">
              댓글 {comments.length}개
            </p>

            <div className="flex flex-col gap-[24px]">
              {comments.length === 0 ? (
                <p className="py-[20px] text-center text-[15px] font-medium text-[#6b7280]">
                  아직 댓글이 없습니다.
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.commentId}
                    className="rounded-[10px] bg-[#f9f9fb] p-[20px] shadow-[0px_4px_10px_0px_#d1d5db]"
                  >
                    {/* User row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[10px]">
                        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#d1d5db] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]">
                          <span className="text-[20px] font-bold tracking-[-1px] text-[#111827]">
                            {(comment.userName ?? String(comment.userId)).slice(0, 1).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="flex items-center gap-[6px] text-[15px] font-medium tracking-[-0.8px] text-[#111] leading-[1.2]">
                            {comment.userName ?? `User #${comment.userId}`}
                            {comment.userLanguage && (
                              <span className="text-[14px] leading-none">{getFlag(comment.userLanguage)}</span>
                            )}
                          </span>
                          <span className="text-[13px] font-medium tracking-[-0.7px] text-[#8c929e] leading-[1.2] mt-[2px]">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[14px] font-medium tracking-[-0.7px] text-white">
                        답변
                      </span>
                    </div>

                    {/* Comment content */}
                    <p className="mt-[20px] text-left text-[14px] font-medium leading-[1.7] tracking-[-0.7px] text-[#6b7280] whitespace-pre-wrap">
                      {comment.content}
                    </p>

                    {/* Like */}
                    <div className="mt-[16px] flex items-center gap-[6px]">
                      <img src={imgIconThumb} alt="" className="h-[22px] w-[22px]" />
                      <span className="text-[12px] font-bold text-[#111827]">0</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </MobileContainer>
  );
}
