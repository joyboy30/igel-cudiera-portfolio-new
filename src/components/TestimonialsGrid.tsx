import { Link } from 'react-router-dom'
import { Quotes, SealCheck, IdentificationCard, ChatCircleText, ArrowUpRight, ChartLineUp } from '@/components/slab'
import type { Icon } from '@/components/slab'
import { wincrest } from '@/data/projects'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * TestimonialsGrid - the Testimonials view as a fixed viewport.
 *
 * There are no verified testimonials yet, so this page is an honest empty
 * state in the template's two-column layout: a quote plate on the left, and on
 * the right the standard every testimonial here will meet before it is
 * published. No quote, name or logo on this page is invented.
 *
 * To add a testimonial later: replace the plate with the client's words (or a
 * video in public/testimonials/), their name, role and company - with their
 * written permission.
 */

type Rule = { index: string; title: string; body: string; Icon: Icon }

const RULES: Rule[] = [
  {
    index: '01',
    title: 'Real clients only',
    body: 'Every testimonial comes from a client I have worked for, in their own words.',
    Icon: SealCheck,
  },
  {
    index: '02',
    title: 'Named, with permission',
    body: 'Published with the person’s name, role and company, and only with their written consent.',
    Icon: IdentificationCard,
  },
  {
    index: '03',
    title: 'Matched to the work',
    body: 'Each one links to the project or service it describes, so it can be checked against the results.',
    Icon: ChatCircleText,
  },
]

export default function TestimonialsGrid() {
  usePageMeta('Testimonials', 'Client testimonials will be added as verified feedback becomes available.')
  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Testimonials</span>
        <h1 className="pgrid__title" id="testimonials-title">
          Verified feedback only.
        </h1>
        <p className="pgrid__lede">
          Client testimonials will be added as verified feedback becomes available. Until then, the results speak through
          the screenshots on the Projects page.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        <div className="tgrid__reel">
          <div className="tgrid__stage tempty">
            <Quotes className="tempty__mark" size={56} weight="fill" aria-hidden="true" />
            <p className="tempty__title">Client testimonials will be added as verified feedback becomes available.</p>
            <p className="tempty__body">
              No quotes are shown here until they are real, attributed and approved by the client.
            </p>
            <div className="tempty__actions">
              <Link className="home__cta" to="/projects">
                See documented results
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </Link>
              <Link className="home__cta home__cta--ghost" to="/contact">
                Work with me
              </Link>
            </div>
          </div>

          <Link to="/projects" className="tempty__proof">
            <ChartLineUp size={22} weight="duotone" aria-hidden="true" />
            <span>
              <b>
                {wincrest.metric.before} → {wincrest.metric.after.toLocaleString('en-US')}
              </b>{' '}
              average monthly organic visits for {wincrest.client} (Ahrefs)
            </span>
          </Link>
        </div>

        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">What every testimonial here will meet</h2>
            <p className="tgrid__ledger-sub">The standard, set before the first one is published.</p>
          </div>

          <ul className="tgrid__clients" role="list">
            {RULES.map((r) => (
              <li key={r.index} className="tgrid__client">
                <span className="tgrid__client-ghost" aria-hidden="true">{r.index}</span>
                <span className="tgrid__client-mark" aria-hidden="true">
                  <r.Icon size={22} weight="duotone" />
                </span>
                <span className="tgrid__client-body">
                  <span className="tgrid__client-head">
                    <span className="tgrid__client-name">{r.title}</span>
                  </span>
                  <span className="tgrid__client-daily">{r.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
