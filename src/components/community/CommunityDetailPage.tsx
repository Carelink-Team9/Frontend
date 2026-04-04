import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { addComment, fetchCommunityComments, fetchCommunityPost } from '../../api/communityApi';
import type { CommunityComment, CommunityPost } from '../../types/community';
import { useCommunityStore } from '../../stores/communityStore';
import PrimaryButton from '../common/PrimaryButton';
import StatusMessage from '../common/StatusMessage';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import { formatTimeAgo, getCommunityCategoryLabel, getCommunityFlag } from './communityUi';

const imgIconThumb = 'https://www.figma.com/api/mcp/asset/98d4ecaf-d92a-4e87-9505-fe6a87d97ac6';
const imgIconChat = 'https://www.figma.com/api/mcp/asset/b2585ec5-cf1f-4803-9266-4d34ec67ca1b';

export default function CommunityDetailPage() {
  const { postId } = useParams();
  const { t } = useTranslation();
  const commentText = useCommunityStore((state) => state.detailCommentText);
  const setCommentText = useCommunityStore((state) => state.setDetailCommentText);
  const resetCommentText = useCommunityStore((state) => state.resetDetailCommentText);
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const postIdNum = Number(postId);

  useEffect(() => {
    let cancelled = false;

    async function loadDetail() {
      if (!postIdNum) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [nextPost, nextComments] = await Promise.all([
          fetchCommunityPost(postIdNum),
          fetchCommunityComments(postIdNum),
        ]);

        if (!cancelled) {
          setPost(nextPost);
          setComments(nextComments);
        }
      } catch {
        if (!cancelled) {
          setPost(null);
          setComments([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadDetail();
    return () => {
      cancelled = true;
      resetCommentText();
    };
  }, [postIdNum, resetCommentText]);

  const handleAddComment = async () => {
    if (!commentText.trim() || submitting || !postIdNum) return;
    setSubmitting(true);

    try {
      const nextComment = await addComment(postIdNum, { content: commentText.trim() });
      setComments((previous) => [...previous, nextComment]);
      resetCommentText();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MobileContainer
      hasBottomNav
      header={<AppHeader title={t('community.postTitle')} />}
      bottomFixedElement={
        <div className="bg-white px-[32px] pb-[20px] pt-[20px] shadow-[0px_-4px_10px_0px_#d1d5db]">
          <div className="flex gap-[10px]">
            <input
              type="text"
              placeholder={t('community.commentPlaceholder')}
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') void handleAddComment();
              }}
              className="h-[60px] flex-1 rounded-[10px] border border-[#d1d5db] bg-white px-[20px] text-[16px] font-medium tracking-[-0.8px] text-[#111827] placeholder-[#d1d5db] outline-none"
            />
            <PrimaryButton disabled={!commentText.trim() || submitting} fullWidth={false} className="w-[77px] shrink-0" onClick={() => void handleAddComment()}>
              {t('community.commentSubmit')}
            </PrimaryButton>
          </div>
        </div>
      }
    >
      {loading ? (
        <StatusMessage message={t('common.loading')} className="py-[60px]" />
      ) : !post ? (
        <StatusMessage message={t('community.notFound')} className="py-[60px]" />
      ) : (
        <>
          <div className="bg-white px-[32px] pb-[20px] pt-[24px] text-left">
            <div className="mb-[20px]">
              <span className="inline-block rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[14px] font-medium tracking-[-0.7px] text-white">{getCommunityCategoryLabel(post.category)}</span>
            </div>
            <p className="mb-[24px] break-keep text-left text-[22px] font-bold leading-[1.4] tracking-[-1px] text-[#111827]">{post.title}</p>
            <p className="whitespace-pre-wrap text-left text-[15px] font-medium leading-[1.8] tracking-[-0.7px] text-[#4b5563]">{post.content}</p>
            {post.tag ? (
              <div className="mt-[24px] flex flex-wrap gap-[8px]">
                {post.tag.split(',').map((tag, index) => (
                  <span key={index} className="text-[14px] font-medium tracking-[-0.7px] text-[#003ea7]">#{tag.trim()}</span>
                ))}
              </div>
            ) : null}
            <div className="my-[20px] h-px bg-[#d1d5db]" />
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

          <div className="h-[20px] bg-[#f3f4f6]" />

          <div className="bg-white px-[32px] pb-[20px] pt-[20px] text-left">
            <p className="mb-[20px] text-[18px] font-bold leading-[1.3] break-keep tracking-[-0.9px] text-[#111827]">{t('community.commentsCount', { count: comments.length })}</p>
            <div className="flex flex-col gap-[24px]">
              {comments.length === 0 ? (
                <StatusMessage message={t('community.noComments')} className="py-[20px]" />
              ) : (
                comments.map((comment) => (
                  <div key={comment.commentId} className="rounded-[10px] bg-[#f9f9fb] p-[20px] shadow-[0px_4px_10px_0px_#d1d5db]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[10px]">
                        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#d1d5db] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]">
                          <span className="text-[20px] font-bold tracking-[-1px] text-[#111827]">{(comment.userName ?? String(comment.userId)).slice(0, 1).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="flex items-center gap-[6px] text-[15px] font-medium leading-[1.2] tracking-[-0.8px] text-[#111]">
                            {comment.userName ?? `User #${comment.userId}`}
                            {comment.userLanguage ? <span className="text-[14px] leading-none">{getCommunityFlag(comment.userLanguage)}</span> : null}
                          </span>
                          <span className="mt-[2px] text-[13px] font-medium leading-[1.2] tracking-[-0.7px] text-[#8c929e]">{formatTimeAgo(comment.createdAt)}</span>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[14px] font-medium leading-[1.4] break-keep tracking-[-0.7px] text-white">{t('community.commentTag')}</span>
                    </div>

                    <p className="mt-[20px] whitespace-pre-wrap text-left text-[14px] font-medium leading-[1.7] tracking-[-0.7px] text-[#6b7280]">{comment.content}</p>

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
