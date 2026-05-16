# DB — 작업 규칙

## 마이그레이션 파일 네이밍 규칙
- `NNN_설명.sql` 형식으로 순번을 붙인다. (예: `001_users.sql`)
- 순번은 3자리 0패딩 고정. 중간 삽입 금지 — 항상 마지막에 추가한다.
- 각 파일은 단일 책임 — 하나의 테이블 또는 연관 변경만 담는다.

## RLS 활성화 필수
- 모든 테이블에 `alter table {table} enable row level security;` 적용 필수.
- policy는 커플 단위 접근 제어를 기준으로 작성한다.

```sql
alter table posts enable row level security;
create policy "couple members only" on posts
  using (
    couple_id in (
      select id from couples
      where user_a = auth.uid() or user_b = auth.uid()
    )
  );
```

## 인덱스 작성 규칙
- 외래키 컬럼, 자주 필터링되는 컬럼에 인덱스를 추가한다.
- 네이밍: `idx_{테이블명}_{컬럼명}`

```sql
create index idx_posts_couple_id on posts(couple_id);
create index idx_posts_date_at on posts(date_at);
```

## 금지
- RLS 없는 테이블을 운영 DB에 배포 금지
- 운영 DB를 CLI나 대시보드에서 직접 수정 금지 — 반드시 마이그레이션 파일로 처리
- 마이그레이션 파일 소급 수정 금지 — 새 파일 추가로 변경
