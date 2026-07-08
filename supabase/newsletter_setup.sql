-- Newsletter signup setup: run this once in the Supabase SQL editor.
-- Backs the "Subscribe" form in the site-wide footer (src/components/home/CTASection.jsx).

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

drop policy if exists "public can subscribe" on newsletter_subscribers;
create policy "public can subscribe"
  on newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admins can read subscribers" on newsletter_subscribers;
create policy "admins can read subscribers"
  on newsletter_subscribers for select
  to authenticated
  using (true);
