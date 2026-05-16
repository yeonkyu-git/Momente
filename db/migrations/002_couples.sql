-- 커플 테이블
create table couples (
  id          uuid primary key default gen_random_uuid(),
  user_a      uuid references users not null,
  user_b      uuid references users not null,
  anniversary date,
  invite_code text unique not null,
  created_at  timestamptz default now()
);

alter table couples enable row level security;

create policy "couple members only" on couples
  using (user_a = auth.uid() or user_b = auth.uid());

create index idx_couples_user_a on couples(user_a);
create index idx_couples_user_b on couples(user_b);
create index idx_couples_invite_code on couples(invite_code);
