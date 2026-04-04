import axios from 'axios';
import type { ApiResponse } from '../types/hospital';
import type { CommunityComment, CommunityPost } from '../types/community';

export async function fetchCommunityPosts(
  language: string,
  targetLanguage: string,
): Promise<CommunityPost[]> {
  const { data } = await axios.get<ApiResponse<CommunityPost[]>>('/api/community/posts', {
    params: { language, targetLanguage },
  });

  return data.data;
}

export async function fetchCommunityComments(
  postId: number,
  targetLanguage: string,
): Promise<CommunityComment[]> {
  const { data } = await axios.get<ApiResponse<CommunityComment[]>>(`/api/community/posts/${postId}/comments`, {
    params: { targetLanguage },
  });

  return data.data;
}

export async function fetchCommunityPost(
  postId: number,
  targetLanguage: string,
): Promise<CommunityPost> {
  const { data } = await axios.get<ApiResponse<CommunityPost>>(`/api/community/posts/${postId}`, {
    params: { targetLanguage },
  });

  return data.data;
}

export async function createPost(payload: {
  title: string;
  content: string;
  language: string;
  tag?: string;
  category: string;
}): Promise<CommunityPost> {
  const { data } = await axios.post<ApiResponse<CommunityPost>>('/api/community/posts', payload);
  return data.data;
}

export async function addComment(
  postId: number,
  payload: { content: string; language: string },
): Promise<CommunityComment> {
  const { data } = await axios.post<ApiResponse<CommunityComment>>(
    `/api/community/posts/${postId}/comments`,
    payload,
  );
  return data.data;
}
