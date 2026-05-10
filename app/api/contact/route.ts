import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contentByLocale, isLocale, type Locale } from "@/lib/site-content";

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
    const copy = contentByLocale[locale];
    const emailCopy = copy.contact.email;

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

    const internalFrom = formatFrom(emailCopy.internalFromLabel, contactFrom);
    const visitorFrom = formatFrom(emailCopy.visitorFromLabel, contactFrom);

    const { error: teamError } = await resend.emails.send({
      from: internalFrom,
      to: [contactTo],
      replyTo: email,
      subject: `New consultation request from ${details.fullName}`,
      text: buildInternalText(details, copy),
      html: buildInternalHtml(details, copy)
    });

    if (teamError) {
      console.error("[contact] Resend team email:", teamError);
      return NextResponse.json({ error: "Unable to deliver notification email." }, { status: 502 });
    }

    const { error: visitorError } = await resend.emails.send({
      from: visitorFrom,
      to: [email],
      subject: emailCopy.visitorSubject,
      text: buildVisitorText(details.fullName, copy),
      html: buildVisitorHtml(details.fullName, copy)
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

function buildInternalText(
  details: Record<string, string>,
  copy: (typeof contentByLocale)[Locale],
) {
  const f = copy.contact.fields;
  return [
    copy.contact.email.internalSummaryTitle,
    "",
    `${f.fullName}: ${details.fullName}`,
    `${f.companyName}: ${details.companyName}`,
    `${f.email}: ${details.email}`,
    `${f.phoneTelegram}: ${details.phoneTelegram}`,
    `${f.servicesInterested}: ${details.servicesInterested}`,
    `${f.estimatedBudget}: ${details.estimatedBudget}`,
    `${f.timeline}: ${details.timeline}`,
    "",
    `${f.projectDescription}:`,
    details.projectDescription
  ].join("\n");
}

function buildInternalHtml(
  details: Record<string, string>,
  copy: (typeof contentByLocale)[Locale],
) {
  const f = copy.contact.fields;
  const rows = [
    [f.fullName, details.fullName],
    [f.companyName, details.companyName],
    [f.email, details.email],
    [f.phoneTelegram, details.phoneTelegram],
    [f.servicesInterested, details.servicesInterested],
    [f.estimatedBudget, details.estimatedBudget],
    [f.timeline, details.timeline],
    [f.projectDescription, details.projectDescription]
  ];

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#061A1F;color:#F2EFEA;padding:28px;border-radius:18px">
      <h1 style="margin:0 0 18px;font-size:24px">${escapeHtml(copy.contact.email.internalSummaryTitle)}</h1>
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

function buildVisitorText(
  fullName: string,
  copy: (typeof contentByLocale)[Locale],
) {
  return copy.contact.email.visitorText.replace(/\{\{name\}\}/g, fullName);
}

function buildVisitorHtml(fullName: string, copy: (typeof contentByLocale)[Locale]) {
  const e = copy.contact.email;

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#061A1F;color:#F2EFEA;padding:32px;border-radius:18px">
      <p style="margin:0 0 10px;color:#7CE7F7;font-size:13px;letter-spacing:.16em;text-transform:uppercase">${escapeHtml(e.visitorBrandEyebrow)}</p>
      <h1 style="margin:0 0 16px;font-size:28px">${escapeHtml(e.visitorHtmlTitle)}, ${escapeHtml(fullName)}</h1>
      <p style="margin:0;color:#D7DEDC;line-height:1.7;font-size:16px">${escapeHtml(e.visitorHtmlBody)}</p>
    </div>
  `;
}
