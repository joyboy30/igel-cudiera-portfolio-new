import { useState, type FormEvent } from 'react'
import { PaperPlaneTilt, CheckCircle, WarningCircle, EnvelopeSimple, ArrowUpRight, WhatsappLogo, LinkedinLogo, GithubLogo, DownloadSimple } from '@/components/slab'
import { profile } from '@/data/profile'
import { readLead, submitLead, SubmitError, MAX_NAME, MAX_EMAIL, MAX_MESSAGE, type SubmitResult } from '@/lib/contact'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * ContactGrid - the Contact view as a fixed viewport.
 *
 * One glass sheet, two columns: how we can work together and the direct
 * routes (email, WhatsApp, LinkedIn, GitHub, resume) on the left, on a
 * dark plate, and the form itself on the right. No phone number is shown. Sized to the panel, so
 * nothing here scrolls; the message box takes whatever height is left.
 *
 * Submission goes through lib/contact.ts, which is the one place a form
 * backend gets wired. Until it is, the same call opens the visitor's mail
 * client with the message laid out, and the success copy says so.
 */

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'error'; note: string } | { kind: 'sent'; via: SubmitResult['via'] }

/* The plane takes this long to leave the button. The sent state waits for it
   even when the submit itself is instant, so the send is something you see
   happen rather than a panel that blinks. */
const FLIGHT_MS = 650

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function ContactGrid() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  // Bumped on every failed submit so the shake replays even if the same
  // error is already showing.
  const [shake, setShake] = useState(0)
  usePageMeta('Contact', 'Hire Igel for part-time, project-based, freelance, contract or monthly retainer SEO and web development work.')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lead = readLead(new FormData(e.currentTarget))
    if (!lead) {
      setStatus({ kind: 'error', note: 'Add your name, a real email, and a short note.' })
      setShake((n) => n + 1)
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const [result] = await Promise.all([submitLead(lead), wait(FLIGHT_MS)])
      setStatus({ kind: 'sent', via: result.via })
    } catch (err) {
      const note = err instanceof SubmitError ? err.message : 'That did not go through. Email me directly instead.'
      setStatus({ kind: 'error', note })
      setShake((n) => n + 1)
    }
  }

  const busy = status.kind === 'sending'

  return (
    <section className="pgrid cgrid" aria-labelledby="contact-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Contact</span>
        <h1 className="pgrid__title" id="contact-title">
          Let’s improve your search visibility.
        </h1>
        <p className="pgrid__lede">
          Tell me about your site and what you need. I reply within 24 hours, usually with a suggested first step.
        </p>
      </header>

      <div className="home__glass cgrid__glass">
        {/* Left: the dark plate. How we can work together, and direct routes. */}
        <aside className="cgrid__aside" aria-labelledby="contact-ways">
          <div className="cgrid__aside-head">
            <span className="cgrid__eyebrow">Work together</span>
            <h2 className="cgrid__aside-title" id="contact-ways">
              Part-time, per project,
              <br />
              <span>or ongoing.</span>
            </h2>
          </div>

          <ul className="cways" role="list">
            {profile.engagements.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="cways__note">
            Current {profile.availability.source} listing: {profile.availability.mode.toLowerCase()},{' '}
            {profile.availability.hours}, {profile.availability.rate}. Project and retainer work is quoted on scope.
          </p>

          <ul className="croutes" role="list">
            <li>
              <a className="croute" href={`mailto:${profile.email}`}>
                <EnvelopeSimple size={16} weight="fill" aria-hidden="true" />
                <span className="croute__label">Email</span>
                <span className="croute__value">{profile.email}</span>
              </a>
            </li>
            <li>
              <a className="croute" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={16} weight="fill" aria-hidden="true" />
                <span className="croute__label">WhatsApp</span>
                <span className="croute__value">Chat on WhatsApp</span>
              </a>
            </li>
            <li>
              <a className="croute" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinLogo size={16} weight="fill" aria-hidden="true" />
                <span className="croute__label">LinkedIn</span>
                <span className="croute__value">in/igelcudiera</span>
              </a>
            </li>
            <li>
              <a className="croute" href={profile.github} target="_blank" rel="noopener noreferrer">
                <GithubLogo size={16} weight="fill" aria-hidden="true" />
                <span className="croute__label">GitHub</span>
                <span className="croute__value">@joyboy30</span>
              </a>
            </li>
            <li>
              <a className="croute" href={profile.resumeSrc} download>
                <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                <span className="croute__label">Resume</span>
                <span className="croute__value">Download PDF</span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Right: the form. */}
        <div className="cgrid__panel">
          {status.kind === 'sent' ? (
            <div className="cgrid__done" role="status">
              <span className="cgrid__done-mark" aria-hidden="true">
                <CheckCircle size={30} weight="fill" />
              </span>
              <h2 className="cgrid__done-title">
                {status.via === 'webhook' ? 'Got it.' : 'Your mail app has it.'}
              </h2>
              <p className="cgrid__done-body">
                {status.via === 'webhook'
                  ? 'It is in my inbox. You will hear back within 24 hours.'
                  : 'The message is laid out and addressed. Press send there and you will hear back within 24 hours.'}
              </p>
              <button type="button" className="cgrid__again" onClick={() => setStatus({ kind: 'idle' })}>
                Write another
              </button>
            </div>
          ) : (
            <form className={`cgrid__form${busy ? ' is-sending' : ''}`} onSubmit={onSubmit} noValidate>
              {/* Honeypot. Hidden from people and assistive tech; a script that
                  fills every field trips it and the backend can drop the
                  post. autoComplete off so a browser never fills it either. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="cgrid__trap"
              />
              <div className="cgrid__row">
                <label className="cgrid__field">
                  <span className="cgrid__label">First name</span>
                  <input type="text" name="firstName" autoComplete="given-name" required maxLength={MAX_NAME} placeholder="First name" />
                </label>
                <label className="cgrid__field">
                  <span className="cgrid__label">Last name</span>
                  <input type="text" name="lastName" autoComplete="family-name" required maxLength={MAX_NAME} placeholder="Last name" />
                </label>
              </div>

              <label className="cgrid__field">
                <span className="cgrid__label">Email</span>
                <input type="email" name="email" autoComplete="email" required maxLength={MAX_EMAIL} placeholder="name@company.com" />
              </label>

              <label className="cgrid__field cgrid__field--grow">
                <span className="cgrid__label">Your site and what you need</span>
                <textarea
                  name="message"
                  required
                  maxLength={MAX_MESSAGE}
                  placeholder="Your website, the goal (SEO, a new site, a funnel...), and the kind of arrangement you have in mind."
                />
              </label>

              <div className="cgrid__actions">
                <button
                  key={shake}
                  type="submit"
                  className={`cgrid__submit${busy ? ' is-sending' : ''}${status.kind === 'error' ? ' is-shaking' : ''}`}
                  disabled={busy}
                >
                  <span className="cgrid__submit-plane" aria-hidden="true">
                    <PaperPlaneTilt size={17} weight="fill" />
                  </span>
                  <span className="cgrid__submit-label">{busy ? 'Sending' : 'Send message'}</span>
                  <ArrowUpRight className="cgrid__submit-arrow" size={15} weight="bold" aria-hidden="true" />
                </button>
                {status.kind === 'error' ? (
                  <span className="cgrid__status" role="alert">
                    <WarningCircle size={16} weight="fill" aria-hidden="true" />
                    {status.note}
                  </span>
                ) : (
                  <span className="cgrid__hint">I reply within 24 hours.</span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
