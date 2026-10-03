import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Sparkle,
  Medal,
  Stack,
  Quotes,
  MagnifyingGlass,
  Browsers,
  FunnelSimple,
  Robot,
  Megaphone,
  SealCheck,
} from '@/components/slab'
import { allShots, aiCases } from '@/data/projects'
import { certifications } from '@/data/about'
import { TESTIMONIALS } from '@/data/testimonials'
import { profile } from '@/data/profile'

/**
 * Home's showcase: one card per page, each an index of what that page holds,
 * each built from records the pages render in full - the Ahrefs evidence
 * screenshots, the AI-citation clients, the certificates, the service tiers
 * and the client testimonials. Nothing here invents a fact.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

/** Wide Ahrefs charts read best cropped to their plot area. */
const PROJECT_SHOTS = [allShots[0], allShots[3], allShots[5], allShots[1]]

const OFFERS = [
  { Icon: MagnifyingGlass, title: 'SEO', note: 'Technical, on-page, local & AI search' },
  { Icon: Browsers, title: 'Web Development', note: 'SEO-ready WordPress builds' },
  { Icon: FunnelSimple, title: 'GoHighLevel Funnels', note: 'Lead capture & follow-up' },
  { Icon: Robot, title: 'AI Automation', note: 'AI-assisted content & workflows' },
  { Icon: Megaphone, title: 'Ads, Social & Email', note: 'Trained, supporting services' },
] as const

const PHOTOS = [profile.hero.portraitSrc, certifications[0].thumb, certifications[2].thumb]

const AI_CLIENTS = aiCases.map((c) => c.client.replace('The Jamil Brothers Realty Group & ', ''))

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_CLIENTS.length / 2)
  const chipRows = [AI_CLIENTS.slice(0, half), AI_CLIENTS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects: the Ahrefs evidence drifting upward on a looped track. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Wincrest Orthodontics: 224 → 1,705 monthly organic visits, plus 6 more dental clients." />
        <div className="bento__media bento__reel bento__reel--charts" aria-hidden="true">
          <div className="bento__reel-track">
            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map((s, i) => (
              <span key={i} className="bento__shot bento__shot--chart">
                <img src={s.thumb} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* About: the portrait fanned with two certificates. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="SEO specialist with a programming background. 3+ years, remote from Cebu." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={src} className={`bento__photo${i ? ' bento__photo--cert' : ''}`} style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* AI search: the clients cited in AI Overviews and ChatGPT. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Sparkle} title="AI Search" desc="Client pages cited in Google AI Overviews and ChatGPT." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {chipRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((name, i) => (
                  <span key={`${name}-${i}`} className="bento__chip" data-status="Live">
                    <Sparkle size={15} weight="duotone" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Credentials: the certificate count on its plate. */}
      <Link to="/about#credentials" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Credentials" desc="SEO, GoHighLevel, ads and VA training." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring bento__badge-ring--count">
            <b>{certifications.length}</b>
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            Certificates
          </span>
        </div>
      </Link>

      {/* Services: the offer as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="SEO and web development first, with supporting marketing services." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Testimonials: the client quotes drifting up a clipped column. The
          second copy only closes the loop, so it is hidden from assistive tech. */}
      <Link to="/testimonials" className="bento__card bento__card--quotes" aria-label="Testimonials: what clients said">
        <CardHead Icon={Quotes} title="Testimonials" desc="What clients said about working with me, in their own words." />
        <div className="bento__media bento__reviews">
          <div className="bento__reviews-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <figure key={i} className="bento__review" aria-hidden={i >= TESTIMONIALS.length || undefined}>
                <figcaption className="bento__review-top">
                  <Quotes size={14} weight="fill" aria-hidden="true" />
                  <b>{t.name}</b>
                </figcaption>
                <blockquote className="bento__review-role">
                  “{t.quote}”
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
