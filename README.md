# AurowinX Technologies — Website

React 19 + Vite + Tailwind CSS 4 marketing site, with a Supabase backend (auth, database, storage, edge functions) and a small admin panel for managing job postings and applications.

## Local development

```bash
npm install
cp .env.example .env   # fill in the values below
npm run dev
```

### Environment variables

| Variable | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase project → Settings → API → anon public key |

In production (Vercel), set these as project Environment Variables — do not commit a real `.env` file.

## Supabase setup (run once, in order)

Open the Supabase SQL Editor for this project and run, in this order:

1. `supabase/admin_setup.sql` — admin auth policies for `jobs` / `job_applications`, and enables RLS on both tables.
2. `supabase/newsletter_setup.sql` — creates `newsletter_subscribers` with RLS.
3. `supabase/contact_and_notifications_setup.sql` — creates `contact_inquiries` with RLS, and adds the `notified` idempotency column used by the email functions.

All three are safe to re-run (they use `if not exists` / `drop policy if exists` throughout).

### Edge Functions

Two functions send transactional email via Resend:

- `send-application-email` — triggered after a job application is submitted.
- `send-contact-email` — triggered after the contact form is submitted.

Both look up their record server-side by id (using the auto-injected `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`), so the client never controls the content of the emails. Deploy with:

```bash
supabase functions deploy send-application-email
supabase functions deploy send-contact-email
```

Both require a `RESEND_API_KEY` secret (shared across functions):

```bash
supabase secrets set RESEND_API_KEY=your-resend-key
```

Internal notification emails (new applications / new inquiries) are sent to `info@aurowinx.com` and `govindaraj.natarajan@aurowinx.com` — update the `NOTIFY_EMAILS` array at the top of each function's `index.ts` if that ever needs to change.

Both functions also restrict CORS to a small allowlist (`ALLOWED_ORIGINS` near the top of each `index.ts`) — add any additional production domain (e.g. a Vercel preview URL you rely on) there.

## Admin panel

The admin panel lives at `/admin` (`src/admin/`) and is used to manage job postings and triage applications.

- There's no self-serve signup — create admin users in the Supabase dashboard under Authentication → Users, then sign in at `/admin/login` with that email/password.
- Access is gated by Supabase Auth (`AdminAuthContext.jsx` / `ProtectedRoute.jsx`); any authenticated user can manage jobs and applications, so only create accounts for people who should have that access.
- Routes: `/admin/jobs` (list), `/admin/jobs/new` and `/admin/jobs/:id/edit` (create/edit), `/admin/applications` (inbox with triage status: new / reviewed / rejected / hired).
- Requires `supabase/admin_setup.sql` to have been run (see above) so RLS actually restricts writes to authenticated users.

## Deployment (Vercel)

- Set the two `VITE_SUPABASE_*` environment variables in the Vercel project settings.
- `vercel.json` handles SPA routing (all non-`/api` paths rewrite to `index.html`) and sets baseline security headers (CSP, HSTS, X-Frame-Options, etc.). If you introduce a new external resource (a script, font, or API host), you'll need to extend the `Content-Security-Policy` header there too, or it will be silently blocked in production.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint
