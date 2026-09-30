import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaretDown, ArrowUpRight, EnvelopeSimple } from '@/components/slab'
import { FAQ_GROUPS } from '@/data/faqs'
import { profile } from '@/data/profile'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * FaqsGrid - the FAQs view. A dark plate on the left holds the topic index
 * and the way out (write to me); the accordions on the right are grouped by
 * topic. Several answers can be open at once, and the page scrolls, so a long
 * answer never clips.
 */
export default function FaqsGrid() {
  usePageMeta(
    'SEO, Web Development & Hiring FAQs | Igel G. Cudiera',
    'Straight answers before you hire: working arrangements, pricing, SEO, AI search, web development, GoHighLevel funnels, AI automation and paid ads questions.',
  )
  const [open, setOpen] = useState<Set<string>>(() => new Set([`${FAQ_GROUPS[0].id}-0`]))

  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const jump = (id: string) => document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="pgrid fgrid" aria-labelledby="faqs-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">FAQs</span>
        <h1 className="pgrid__title" id="faqs-title">
          Straight answers, before you hire.
        </h1>
        <p className="pgrid__lede">
          How I work, what I charge for, what I have done, and what I will not claim.
        </p>
      </header>

      <div className="home__glass fgrid__glass">
        <aside className="cgrid__aside fgrid__aside" aria-label="FAQ topics">
          <span className="cgrid__eyebrow">Topics</span>
          <ul className="fgrid__topics" role="list">
            {FAQ_GROUPS.map((g) => (
              <li key={g.id}>
                <button type="button" className="fgrid__topic" onClick={() => jump(g.id)}>
                  <span>{g.label}</span>
                  <span className="fgrid__count" aria-label={`${g.items.length} questions`}>{g.items.length}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="fgrid__ask">
            <p>Still have a question?</p>
            <Link className="home__cta" to="/contact">
              Ask me directly
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
            <a className="fgrid__mail" href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={15} weight="fill" aria-hidden="true" />
              {profile.email}
            </a>
          </div>
        </aside>

        <div className="fgrid__groups">
          {FAQ_GROUPS.map((g) => (
            <section key={g.id} className="fgrid__group" id={`faq-${g.id}`} aria-labelledby={`faqh-${g.id}`}>
              <h2 className="fgrid__group-title" id={`faqh-${g.id}`}>{g.label}</h2>
              <ul className="fgrid__list" role="list">
                {g.items.map((f, i) => {
                  const key = `${g.id}-${i}`
                  const isOpen = open.has(key)
                  return (
                    <li key={key} className={`fgrid__faq${isOpen ? ' is-open' : ''}`}>
                      <h3 className="fgrid__q-wrap">
                        <button
                          type="button"
                          className="fgrid__q"
                          onClick={() => toggle(key)}
                          aria-expanded={isOpen}
                          aria-controls={`fa-${key}`}
                        >
                          <span>{f.q}</span>
                          <CaretDown size={15} weight="bold" className="fgrid__caret" aria-hidden="true" />
                        </button>
                      </h3>
                      <div className="fgrid__a" id={`fa-${key}`} hidden={!isOpen}>
                        <p>{f.a}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
