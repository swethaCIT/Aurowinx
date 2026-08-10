-- Contact inquiries + email-notification idempotency: run this once in the
-- Supabase SQL editor, AFTER admin_setup.sql and newsletter_setup.sql.
-- Safe to re-run (uses IF NOT EXISTS / DROP POLICY IF EXISTS throughout).

-- 1. Backs the general contact form (src/components/contact/ContactForm.jsx),
--    reachable today at /contact and, in future, via ContactModal.
create table if not exists contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  context text not null default 'general'
    check (context in ('general', 'services', 'career', 'company', 'product')),
  source_page text,
  name text not null,
  email text not null,
  phone text,
  company text,
  service_required text,
  technology_node text,
  role_applying text,
  experience text,
  resume_url text,
  engagement_type text,
  product_interest text,
  request_type text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'closed')),
  -- true once send-contact-email has successfully notified the team for
  -- this row; lets the edge function be safely re-invoked without spamming.
  notified boolean not null default false
);

alter table contact_inquiries enable row level security;

drop policy if exists "public can submit inquiries" on contact_inquiries;
create policy "public can submit inquiries"
  on contact_inquiries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admins can read inquiries" on contact_inquiries;
create policy "admins can read inquiries"
  on contact_inquiries for select
  to authenticated
  using (true);

drop policy if exists "admins can update inquiries" on contact_inquiries;
create policy "admins can update inquiries"
  on contact_inquiries for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admins can delete inquiries" on contact_inquiries;
create policy "admins can delete inquiries"
  on contact_inquiries for delete
  to authenticated
  using (true);

-- 2. Same idempotency flag for job applications, so send-application-email
--    can be re-invoked safely (see supabase/functions/send-application-email).
alter table job_applications
  add column if not exists notified boolean not null default false;
