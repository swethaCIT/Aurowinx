-- Admin page setup: run this once in the Supabase SQL editor.
-- Adds a triage status to job_applications and locks down writes to
-- authenticated users only, while preserving existing public behaviour
-- (anonymous visitors can still read open jobs and submit applications).

-- 1. Triage status for the applications inbox
alter table job_applications
  add column if not exists status text not null default 'new';

alter table job_applications
  drop constraint if exists job_applications_status_check;

alter table job_applications
  add constraint job_applications_status_check
  check (status in ('new', 'reviewed', 'rejected', 'hired'));

-- 2. Row Level Security
alter table jobs enable row level security;
alter table job_applications enable row level security;

-- jobs: public can read open roles (unchanged from current app behaviour)
drop policy if exists "public can read open jobs" on jobs;
create policy "public can read open jobs"
  on jobs for select
  to anon, authenticated
  using (status = 'open');

-- jobs: only logged-in admins can read every row (needed for the admin list,
-- which also shows draft/closed jobs)
drop policy if exists "admins can read all jobs" on jobs;
create policy "admins can read all jobs"
  on jobs for select
  to authenticated
  using (true);

-- jobs: only logged-in admins can create/edit/delete
drop policy if exists "admins can insert jobs" on jobs;
create policy "admins can insert jobs"
  on jobs for insert
  to authenticated
  with check (true);

drop policy if exists "admins can update jobs" on jobs;
create policy "admins can update jobs"
  on jobs for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admins can delete jobs" on jobs;
create policy "admins can delete jobs"
  on jobs for delete
  to authenticated
  using (true);

-- job_applications: anyone can submit an application (unchanged)
drop policy if exists "public can submit applications" on job_applications;
create policy "public can submit applications"
  on job_applications for insert
  to anon, authenticated
  with check (true);

-- job_applications: only logged-in admins can view/triage
drop policy if exists "admins can read applications" on job_applications;
create policy "admins can read applications"
  on job_applications for select
  to authenticated
  using (true);

drop policy if exists "admins can update applications" on job_applications;
create policy "admins can update applications"
  on job_applications for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admins can delete applications" on job_applications;
create policy "admins can delete applications"
  on job_applications for delete
  to authenticated
  using (true);
