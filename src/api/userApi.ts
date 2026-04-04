import axios from 'axios';
import type { ApiResponse } from '../types/hospital';

export interface SessionResponse {
  sessionId: string;
  userId: number;
  expiresAt: string;
}

interface CreateUserRequest {
  name: string;
  language: string;
}

export async function createUserSession(request: CreateUserRequest): Promise<SessionResponse> {
  const { data } = await axios.post<ApiResponse<SessionResponse>>('/api/user', request, {
    withCredentials: true,
  });

  return data.data;
}

export async function fetchUserSession(): Promise<SessionResponse> {
  const { data } = await axios.get<ApiResponse<SessionResponse>>('/api/user/session', {
    withCredentials: true,
  });

  return data.data;
}

export async function deleteUserSession(): Promise<void> {
  await axios.delete('/api/user/session', {
    withCredentials: true,
  });
}
