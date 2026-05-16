-- 반응(하트) 테이블
create table reactions (
  id      uuid primary key default gen_random_uuid(),
  post_id uuid references posts not null,
  user_id uuid references users not null,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

alter table reactions enable row level security;

create policy "couple members only" on reactions
  using (
    post_id in (
      select id from posts where couple_id in (
        select id from couples
        where user_a = auth.uid() or user_b = auth.uid()
      )
    )
  );

create index idx_reactions_post_id on reactions(post_id);
create index idx_reactions_user_id on reactions(user_id);
