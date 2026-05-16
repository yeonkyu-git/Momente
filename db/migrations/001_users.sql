-- 사용자 테이블
create table users (
  id         uuid primary key references auth.users,
  kakao_id   text unique,
  nickname   text not null,
  avatar_url text,
  push_token text,
  created_at timestamptz default now()
);

alter table users enable row level security;

create policy "users can read own row" on users
  for select using (auth.uid() = id);

create policy "users can update own row" on users
  for update using (auth.uid() = id);

-- 신규 auth 유저 생성 시 users 테이블에 자동 insert
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into users (id, nickname)
  values (new.id, coalesce(new.raw_user_meta_data->>'nickname', '유저'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
