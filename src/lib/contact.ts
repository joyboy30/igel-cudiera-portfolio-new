/**
 * Contact submission.
 *
 * submitLead() POSTs the form as JSON to the serverless function in
 * api/contact.ts, which emails it to igel.cudiera31@gmail.com through Resend.
 * The API key lives only in that function's environment, never in this
 * bundle. It resolves only once the function answers 2xx, so the form never
 * reports a message as sent unless the email service accepted it.
 *
 * VITE_CONTACT_ENDPOINT can point the form at another backend that accepts
 * the same JSON; it defaults to the function above.
 */

export const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

// Built from \u escapes so the source stays pure ASCII.
// Control chars U+0000-U+001F and U+007F; when newlines are allowed, tab,
// LF and CR survive. Zero-width and bidi marks always go.
// Stripping control characters is the point of these two patterns.
// eslint-disable-next-line no-control-regex
const CTRL_NO_NL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')
// eslint-disable-next-line no-control-regex
const CTRL_KEEP_NL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g')

export function sanitize(input: string, allowNewlines = false): string {
  const controls = allowNewlines ? CTRL_KEEP_NL : CTRL_NO_NL
  return input.replace(controls, '').replace(ZERO_WIDTH, '')
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Lead = {
  firstName: string
  lastName: string
  email: string
  message: string
  /** Honeypot. Empty for a person; your backend should drop anything else. */
  website: string
}


/** Read, trim, cap and sanitise the four fields. Returns null if a required
 *  field is missing or the email does not look like one. */
export function readLead(data: FormData): Lead | null {
  const firstName = sanitize(String(data.get('firstName') ?? '').trim()).slice(0, MAX_NAME)
  const lastName = sanitize(String(data.get('lastName') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!firstName || !lastName || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  return { firstName, lastName, email, message, website }
}

export class SubmitError extends Error {}

/** Resolves once the backend accepted the message; throws SubmitError otherwise. */
export async function submitLead(lead: Lead): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  }).catch(() => null)
  if (!res || !res.ok) throw new SubmitError(res ? `The server answered ${res.status}.` : 'Network error.')
}
