import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// RESEND_API_KEY is a project secret (shared with send-application-email —
// set once via `supabase secrets set`, available to every function).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by
// Supabase into every deployed Edge Function.
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

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const CONTEXT_LABELS: Record<string, string> = {
  general: "General Enquiry",
  services: "Engineering Services",
  career: "Career Application",
  company: "Partnership & Corporate Relations",
  product: "Product Enquiry",
};

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
    const { inquiryId } = await req.json();
    if (!inquiryId || typeof inquiryId !== "string") {
      return new Response(JSON.stringify({ error: "inquiryId is required" }), {
        headers: { ...headers, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Look up the real inquiry row with the service role key — email
    // content is driven entirely by data that already passed the
    // "public can submit inquiries" RLS insert policy.
    const lookupRes = await fetch(
      `${SUPABASE_URL}/rest/v1/contact_inquiries` +
        `?id=eq.${encodeURIComponent(inquiryId)}&select=*`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      },
    );
    if (!lookupRes.ok) throw new Error(`Inquiry lookup failed (${lookupRes.status})`);
    const rows = await lookupRes.json();
    const inquiry = rows[0];
    if (!inquiry) {
      return new Response(JSON.stringify({ error: "Inquiry not found" }), {
        headers: { ...headers, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Idempotent: a given inquiry can only trigger one round of emails.
    if (inquiry.notified) {
      return new Response(JSON.stringify({ success: true, alreadyNotified: true }), {
        headers: { ...headers, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const name = escapeHtml(inquiry.name);
    const email = inquiry.email as string;
    const contextLabel = CONTEXT_LABELS[inquiry.context] ?? "General Enquiry";

    const detailRows: [string, unknown][] = [
      ["Type", contextLabel],
      ["Phone", inquiry.phone],
      ["Company", inquiry.company],
      ["Service required", inquiry.service_required],
      ["Technology node", inquiry.technology_node],
      ["Role applying for", inquiry.role_applying],
      ["Experience", inquiry.experience],
      ["Engagement type", inquiry.engagement_type],
      ["Product interest", inquiry.product_interest],
      ["Request type", inquiry.request_type],
      ["Source page", inquiry.source_page],
    ].filter(([, v]) => v);

    const detailHtml = detailRows.map(([label, value]) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; width: 160px;">${escapeHtml(label)}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(value)}</td>
      </tr>
    `).join("");

    // ── Email to the team ──────────────────────────────────────────
    await sendResendEmail({
      from: "AurowinX Website <onboarding@resend.dev>",
      to: NOTIFY_EMAILS,
      subject: `New Contact Inquiry: ${contextLabel} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #0891b2); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">New Contact Inquiry</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">${contextLabel}</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; width: 160px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(email)}</td>
              </tr>
              ${detailHtml}
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #111827; font-size: 14px; white-space: pre-wrap;">${escapeHtml(inquiry.message)}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    // ── Confirmation email to the visitor ──────────────────────────
    await sendResendEmail({
      from: "AurowinX <onboarding@resend.dev>",
      to: [email],
      subject: "We've received your enquiry — AurowinX Technologies",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #0891b2); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">Thanks for reaching out!</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">AurowinX Technologies</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
              Hi <strong>${name}</strong>,
            </p>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              We've received your ${escapeHtml(contextLabel.toLowerCase())} and our team will review it shortly.
              You can expect a response within 1 business day.
            </p>
            <p style="color: #9ca3af; font-size: 13px; margin: 24px 0 0;">
              Best regards,<br/>
              <strong style="color: #374151;">AurowinX Technologies</strong>
            </p>
          </div>
        </div>
      `,
    });

    // Mark as notified so this id can't trigger another round of emails.
    await fetch(
      `${SUPABASE_URL}/rest/v1/contact_inquiries?id=eq.${encodeURIComponent(inquiryId)}`,
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
