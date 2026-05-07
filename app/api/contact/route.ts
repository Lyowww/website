import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/site-content";

type ContactPayload = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phoneTelegram?: string;
  servicesInterested?: string;
  projectDescription?: string;
  estimatedBudget?: string;
  timeline?: string;
  locale?: string;
};

const emailPattern = /^\S+@\S+\.\S+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const fullName = sanitize(payload.fullName);
    const email = sanitize(payload.email);
    const projectDescription = sanitize(payload.projectDescription);
    const locale: Locale = payload.locale && isLocale(payload.locale) ? payload.locale : "en";

    if (!fullName || !email || !emailPattern.test(email) || !projectDescription) {
      return NextResponse.json({ error: "Missing required contact fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactTo = process.env.CONTACT_TO_EMAIL;
    const contactFrom = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !contactTo || !contactFrom) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    const details = {
      fullName,
      companyName: sanitize(payload.companyName) || "-",
      email,
      phoneTelegram: sanitize(payload.phoneTelegram) || "-",
      servicesInterested: sanitize(payload.servicesInterested) || "-",
      projectDescription,
      estimatedBudget: sanitize(payload.estimatedBudget) || "-",
      timeline: sanitize(payload.timeline) || "-"
    };

    const internalFrom = formatFrom("AdLog Website", contactFrom);
    const visitorFrom = formatFrom("AdLog", contactFrom);

    const { error: teamError } = await resend.emails.send({
      from: internalFrom,
      to: [contactTo],
      replyTo: email,
      subject: `New consultation request from ${details.fullName}`,
      text: buildInternalText(details),
      html: buildInternalHtml(details)
    });

    if (teamError) {
      console.error("[contact] Resend team email:", teamError);
      return NextResponse.json({ error: "Unable to deliver notification email." }, { status: 502 });
    }

    const { error: visitorError } = await resend.emails.send({
      from: visitorFrom,
      to: [email],
      subject:
        locale === "hy"
          ? "Շնորհակալություն կապ հաստատելու համար"
          : "Thank you for contacting AdLog",
      text: buildVisitorText(details.fullName, locale),
      html: buildVisitorHtml(details.fullName, locale)
    });

    if (visitorError) {
      console.error("[contact] Resend visitor email:", visitorError);
      return NextResponse.json({ error: "Lead saved but confirmation email failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send contact emails." }, { status: 500 });
  }
}

function formatFrom(displayName: string, address: string) {
  const trimmed = address.trim();
  if (trimmed.includes("<") && trimmed.includes(">")) {
    return trimmed;
  }
  return `${displayName} <${trimmed}>`;
}

function sanitize(value: unknown) {
  return String(value ?? "").trim().slice(0, 4000);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildInternalText(details: Record<string, string>) {
  return [
    "New consultation request",
    "",
    `Full Name: ${details.fullName}`,
    `Company Name: ${details.companyName}`,
    `Email: ${details.email}`,
    `Phone / Telegram: ${details.phoneTelegram}`,
    `Services Interested In: ${details.servicesInterested}`,
    `Estimated Budget: ${details.estimatedBudget}`,
    `Timeline: ${details.timeline}`,
    "",
    "Project Description:",
    details.projectDescription
  ].join("\n");
}

function buildInternalHtml(details: Record<string, string>) {
  const rows = [
    ["Full Name", details.fullName],
    ["Company Name", details.companyName],
    ["Email", details.email],
    ["Phone / Telegram", details.phoneTelegram],
    ["Services Interested In", details.servicesInterested],
    ["Estimated Budget", details.estimatedBudget],
    ["Timeline", details.timeline],
    ["Project Description", details.projectDescription]
  ];

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#061A1F;color:#F2EFEA;padding:28px;border-radius:18px">
      <h1 style="margin:0 0 18px;font-size:24px">New consultation request</h1>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:12px;border-top:1px solid rgba(242,239,234,.14);color:#9FB7B6;width:210px">${escapeHtml(label)}</td>
                <td style="padding:12px;border-top:1px solid rgba(242,239,234,.14);white-space:pre-wrap">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}

function buildVisitorText(fullName: string, locale: Locale) {
  if (locale === "hy") {
    return `${fullName}, շնորհակալություն կապ հաստատելու համար։ Մենք ստացանք ձեր հարցումը և շուտով կկապվենք ձեզ հետ հաջորդ քայլերի համար։`;
  }

  return `${fullName}, thank you for contacting AdLog. We received your request and will get back to you soon with clear next steps.`;
}

function buildVisitorHtml(fullName: string, locale: Locale) {
  const copy =
    locale === "hy"
      ? {
          title: "Շնորհակալություն",
          body: "Մենք ստացանք ձեր հարցումը և շուտով կկապվենք ձեզ հետ հաջորդ քայլերի համար։",
          footer: "AdLog"
        }
      : {
          title: "Thank you",
          body: "We received your request and will get back to you soon with clear next steps.",
          footer: "AdLog"
        };

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#061A1F;color:#F2EFEA;padding:32px;border-radius:18px">
      <p style="margin:0 0 10px;color:#7CE7F7;font-size:13px;letter-spacing:.16em;text-transform:uppercase">${copy.footer}</p>
      <h1 style="margin:0 0 16px;font-size:28px">${copy.title}, ${escapeHtml(fullName)}</h1>
      <p style="margin:0;color:#D7DEDC;line-height:1.7;font-size:16px">${copy.body}</p>
    </div>
  `;
}
