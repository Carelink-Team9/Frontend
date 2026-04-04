export interface CommunityPost {
  postId: number;
  userId: number;
  userName: string;
  userLanguage: string;
  title: string;
  content: string;
  language: string;
  tag: string | null;
  category: 'NOTICE' | 'QUESTION' | 'REVIEW' | 'FREE';
  createdAt: string;
  commentCount: number;
}

export interface CommunityComment {
  commentId: number;
  userId: number;
  userName: string;
  userLanguage: string;
  postId: number;
  content: string;
  language: string;
  createdAt: string;
}
