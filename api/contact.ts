/**
 * POST /api/contact - the Contact form's backend (a Vercel serverless function).
 *
 * Validates the form fields, then sends them as an email through Resend's
 * HTTP API (https://resend.com/docs/api-reference/emails/send-email). The
 * visitor's address is set as Reply-To, so replying in Gmail answers them.
 *
 * Environment variables (set in Vercel > Project > Settings > Environment
 * Variables; never in source, never with a VITE_ prefix, which would ship
 * them to the browser):
 *   RESEND_API_KEY      required. A Resend API key.
 *   CONTACT_FROM_EMAIL  optional. A sender on a domain verified in Resend,
 *                       e.g. "Portfolio <contact@yourdomain.com>". Defaults to
 *                       Resend's test sender, which can only deliver to the
 *                       email address the Resend account was created with.
 *
 * Responses: 200 { ok: true } once Resend has accepted the email; 4xx/5xx
 * { error } otherwise. The form only reports success on a 200.
 */

/** Where every submission goes. Not a secret; fixed here on purpose. */
const RECIPIENT = 'igel.cudiera31@gmail.com'
const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>'

const MAX_NAME = 80
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

/** Single-line field: trim, drop control characters, cap the length. */
function line(v: unknown, max: number) {
  return String(v ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '') // eslint-disable-line no-control-regex
    .trim()
    .slice(0, max)
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not set')
    return json(500, { error: 'Email is not configured.' })
  }

  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return json(400, { error: 'Invalid request.' })
  }

  // Honeypot filled in: a bot. Answer like a success so it does not retry.
  if (String(data.website ?? '').trim()) return json(200, { ok: true })

  const firstName = line(data.firstName, MAX_NAME)
  const lastName = line(data.lastName, MAX_NAME)
  const email = line(data.email, MAX_EMAIL)
  const message = String(data.message ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // eslint-disable-line no-control-regex
    .trim()
    .slice(0, MAX_MESSAGE)
  if (!firstName || !lastName || !message || !EMAIL_RE.test(email)) {
    return json(400, { error: 'Missing or invalid fields.' })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: [RECIPIENT],
      reply_to: email,
      subject: `Portfolio inquiry from ${firstName} ${lastName}`,
      text: [`Name: ${firstName} ${lastName}`, `Email: ${email}`, '', message].join('\n'),
    }),
  }).catch((err: unknown) => {
    console.error('contact: Resend request failed', err)
    return null
  })

  if (!res || !res.ok) {
    if (res) console.error('contact: Resend rejected the email', res.status, await res.text().catch(() => ''))
    return json(502, { error: 'The email could not be sent.' })
  }
  return json(200, { ok: true })
}
