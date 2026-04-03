export interface CommunityPost {
  postId: number;
  userId: number;
  title: string;
  content: string;
  language: string;
  tag: string | null;
  category: 'NOTICE' | 'QUESTION' | 'REVIEW' | 'FREE';
  createdAt: string;
}

export interface CommunityComment {
  commentId: number;
  userId: number;
  postId: number;
  content: string;
  language: string;
  createdAt: string;
}
