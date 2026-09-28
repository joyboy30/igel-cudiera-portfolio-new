import { Link } from 'react-router-dom'
import { Quotes, ArrowUpRight, ChartLineUp } from '@/components/slab'
import { wincrest } from '@/data/projects'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * TestimonialsGrid - the Testimonials view as a fixed viewport.
 *
 * The template's two-column layout: a plate on the left that says how these
 * quotes are published, and on the right the ledger of client quotes.
 *
 * Each quote is the client's own words, lightly edited for grammar and
 * readability only. Names are shown as given - no job title, company, date,
 * rating or photo is added that the client did not provide.
 */

type Testimonial = { index: string; name: string; quote: string }

const TESTIMONIALS: Testimonial[] = [
  {
    index: '01',
    name: 'Saad Jamil',
    quote: 'Thank you for your contributions. I’m happy with your hard work and dedication to my team.',
  },
  {
    index: '02',
    name: 'Ivy',
    quote: 'Thank you. Your efforts mean a lot to my business and have helped me a lot in getting more sales.',
  },
  {
    index: '03',
    name: 'Mendy Perlman',
    quote: 'I just looked at the Holistic Midwifery site, and the design updates look great—super clean!',
  },
]

export default function TestimonialsGrid() {
  usePageMeta('Testimonials', 'What previous clients have said about working with Igel Cudiera, in their own words.')
  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Testimonials</span>
        <h1 className="pgrid__title" id="testimonials-title">
          Verified feedback only.
        </h1>
        <p className="pgrid__lede">
          What previous clients have said, in their own words. The results behind the work are on the Projects page.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        <div className="tgrid__reel">
          <div className="tgrid__stage tempty">
            <Quotes className="tempty__mark" size={56} weight="fill" aria-hidden="true" />
            <p className="tempty__title">From clients I have worked for.</p>
            <p className="tempty__body">
              Each quote is the client’s own words, lightly edited for grammar and readability. Nothing is added to what
              they said.
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
            <h2 className="tgrid__ledger-title">What clients said</h2>
            <p className="tgrid__ledger-sub">Lightly edited for grammar; meaning and voice unchanged.</p>
          </div>

          <ul className="tgrid__clients" role="list">
            {TESTIMONIALS.map((t) => (
              <li key={t.index} className="tgrid__client">
                <span className="tgrid__client-ghost" aria-hidden="true">{t.index}</span>
                <span className="tgrid__client-mark" aria-hidden="true">
                  <Quotes size={22} weight="duotone" />
                </span>
                <figure className="tgrid__client-body tgrid__quote">
                  <blockquote className="tgrid__client-daily">
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="tgrid__client-name">{t.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
