import { supabase } from './supabase';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('EXPO_PUBLIC_API_BASE_URL 환경변수가 필요합니다');
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  message: string;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();

  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`);
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  const body = (await res.json()) as ApiResponse<T>;

  if (!res.ok || body.error) {
    throw new Error(body.message || `API 호출 실패: ${res.status}`);
  }

  if (body.data === null) {
    throw new Error('API 응답에 데이터가 없습니다');
  }

  return body.data;
}
