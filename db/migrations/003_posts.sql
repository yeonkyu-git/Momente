-- 게시글 테이블
create table posts (
  id            uuid primary key default gen_random_uuid(),
  couple_id     uuid references couples not null,
  author_id     uuid references users not null,
  media_urls    text[] not null,
  media_types   text[] not null,       -- 'image' | 'video'
  memo          text,
  place_name    text not null,
  place_address text,
  place_lat     float8 not null,
  place_lng     float8 not null,
  date_at       date not null,         -- 데이트 날짜 (EXIF 또는 사용자 입력)
  taken_at      timestamptz,           -- EXIF 원본 촬영 시각
  created_at    timestamptz default now()
);

alter table posts enable row level security;

create policy "couple members only" on posts
  using (
    couple_id in (
      select id from couples
      where user_a = auth.uid() or user_b = auth.uid()
    )
  );

create index idx_posts_couple_id on posts(couple_id);
create index idx_posts_date_at on posts(date_at);
create index idx_posts_author_id on posts(author_id);
