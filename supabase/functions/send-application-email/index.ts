import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const COMPANY_EMAIL = "careers@aurowinx.com"; // change to your actual email

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { applicantName, applicantEmail, applicantPhone, jobTitle, resumeUrl } = await req.json();

    // ── Email to Company ──────────────────────────────────────────
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AurowinX Careers <onboarding@resend.dev>",
        to: [COMPANY_EMAIL],
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
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${applicantEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${applicantPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Resume</td>
                  <td style="padding: 10px 0; font-size: 14px;">
                    <a href="${resumeUrl}" style="color: #4f46e5; font-weight: 600; text-decoration: none;">View Resume →</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        `,
      }),
    });

    // ── Confirmation Email to Applicant ───────────────────────────
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});