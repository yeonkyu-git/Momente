export interface User {
  id: string;
  kakao_id: string | null;
  nickname: string;
  avatar_url: string | null;
  push_token: string | null;
  created_at: string;
}

export interface Couple {
  id: string;
  user_a: string;
  user_b: string;
  anniversary: string | null;
  invite_code: string;
  created_at: string;
}

export type MediaType = 'image' | 'video';

export interface Post {
  id: string;
  couple_id: string;
  author_id: string;
  media_urls: string[];
  media_types: MediaType[];
  memo: string | null;
  place_name: string;
  place_address: string | null;
  place_lat: number;
  place_lng: number;
  date_at: string;
  taken_at: string | null;
  created_at: string;
}

export interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}
