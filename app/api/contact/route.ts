import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "blancamariabarrufet@gmail.com";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "CV Contact <onboarding@resend.dev>";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = normalizeField(body.name);
  const email = normalizeField(body.email).toLowerCase();
  const message = normalizeField(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (name.length > 120) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New signal from ${stripSubjectUnsafeChars(name)}`,
    html: signalNotificationEmail({ name, email, message }),
    text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    console.error("Resend contact email error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function normalizeField(value: unknown, maxLength = 1000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function stripSubjectUnsafeChars(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function formatMessage(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function signalNotificationEmail({ name, email, message }: { name: string; email: string; message: string }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = formatMessage(message);

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#f6f3ee;font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:620px;background:#ffffff;border:1px solid #ddd6cc;">
              <tr>
                <td style="padding:24px 28px;border-bottom:1px solid #ddd6cc;">
                  <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;color:#6f6559;">
                    09.mail | Send a signal
                  </p>
                  <h1 style="margin:0;font-size:24px;line-height:1.25;color:#111111;">
                    New portfolio message
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">
                    Someone submitted the contact form on your CV site.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:22px;">
                    <tr>
                      <td style="padding:10px 0;width:90px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6f6559;border-bottom:1px solid #eee7dd;">
                        Name
                      </td>
                      <td style="padding:10px 0;font-size:15px;border-bottom:1px solid #eee7dd;">
                        ${safeName}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;width:90px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6f6559;border-bottom:1px solid #eee7dd;">
                        Email
                      </td>
                      <td style="padding:10px 0;font-size:15px;border-bottom:1px solid #eee7dd;">
                        <a href="mailto:${safeEmail}" style="color:#111111;text-decoration:underline;">${safeEmail}</a>
                      </td>
                    </tr>
                  </table>

                  <div style="padding:18px;background:#f8f6f2;border:1px solid #e4ddd3;">
                    <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6f6559;">
                      Message
                    </p>
                    <p style="margin:0;font-size:15px;line-height:1.7;">${safeMessage}</p>
                  </div>

                  <p style="margin:24px 0 0;font-size:13px;color:#6f6559;">
                    Reply directly to this email to continue the conversation.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
