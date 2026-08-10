import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// RESEND_API_KEY is a project secret you set yourself (supabase secrets set).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by
// Supabase into every deployed Edge Function — no manual configuration needed.
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Internal notifications go to these production inboxes.
const NOTIFY_EMAILS = ["info@aurowinx.com", "govindaraj.natarajan@aurowinx.com"];

// Only these origins may call this function from a browser. Add your
// production domain(s) here if they differ.
const ALLOWED_ORIGINS = [
  "https://aurowinx.com",
  "https://www.aurowinx.com",
];

function corsHeaders(origin: string | null) {
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

// Defense-in-depth: escape values before interpolating into HTML email
// bodies, even though they now come from our own database rather than
// directly from the request body.
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendResendEmail(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }
}

serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const { applicationId } = await req.json();
    if (!applicationId || typeof applicationId !== "string") {
      return new Response(JSON.stringify({ error: "applicationId is required" }), {
        headers: { ...headers, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Look up the real application row with the service role key — the
    // email content is driven entirely by data that already passed the
    // "public can submit applications" RLS insert policy, never by
    // arbitrary fields from this request.
    const lookupRes = await fetch(
      `${SUPABASE_URL}/rest/v1/job_applications` +
        `?id=eq.${encodeURIComponent(applicationId)}` +
        `&select=id,full_name,email,phone,resume_url,notified,jobs(job_title)`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      },
    );
    if (!lookupRes.ok) throw new Error(`Application lookup failed (${lookupRes.status})`);
    const rows = await lookupRes.json();
    const application = rows[0];
    if (!application) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        headers: { ...headers, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Idempotent: a given application can only trigger one round of
    // emails, so re-invoking this function with the same id (accidentally
    // or maliciously) can't be used to spam either inbox.
    if (application.notified) {
      return new Response(JSON.stringify({ success: true, alreadyNotified: true }), {
        headers: { ...headers, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const applicantName = escapeHtml(application.full_name);
    const applicantEmail = application.email as string;
    const applicantPhone = escapeHtml(application.phone);
    const jobTitle = escapeHtml(application.jobs?.job_title ?? "the role");
    const resumeUrl = application.resume_url as string;

    // ── Email to the team ──────────────────────────────────────────
    await sendResendEmail({
      from: "AurowinX Careers <onboarding@resend.dev>",
      to: NOTIFY_EMAILS,
      subject: `New Application: ${jobTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">New Job Application</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">${jobTitle}</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${applicantName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(applicantEmail)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${applicantPhone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Resume</td>
                <td style="padding: 10px 0; font-size: 14px;">
                  <a href="${escapeHtml(resumeUrl)}" style="color: #4f46e5; font-weight: 600; text-decoration: none;">View Resume &rarr;</a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    // ── Confirmation email to the applicant ────────────────────────
    await sendResendEmail({
      from: "AurowinX Careers <onboarding@resend.dev>",
      to: [applicantEmail],
      subject: `Application Received — ${jobTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">Application Received!</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">AurowinX Technologies</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
              Hi <strong>${applicantName}</strong>,
            </p>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Thank you for applying for the <strong>${jobTitle}</strong> position at AurowinX Technologies.
              We've received your application and our team will review it shortly.
            </p>
            <div style="background: #f5f3ff; border-radius: 10px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0; color: #5b21b6; font-size: 13px; font-weight: 600;">What happens next?</p>
              <ul style="margin: 10px 0 0; padding-left: 18px; color: #6b7280; font-size: 13px; line-height: 1.8;">
                <li>Our team reviews your application (3–5 business days)</li>
                <li>Shortlisted candidates will be contacted for an interview</li>
                <li>We'll keep you updated at every step</li>
              </ul>
            </div>
            <p style="color: #9ca3af; font-size: 13px; margin: 0;">
              Best regards,<br/>
              <strong style="color: #374151;">AurowinX Technologies Talent Team</strong>
            </p>
          </div>
        </div>
      `,
    });

    // Mark as notified so this id can't trigger another round of emails.
    await fetch(
      `${SUPABASE_URL}/rest/v1/job_applications?id=eq.${encodeURIComponent(applicationId)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ notified: true }),
      },
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
