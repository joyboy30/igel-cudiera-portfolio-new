import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Sparkle,
  Medal,
  Stack,
  Question,
  MagnifyingGlass,
  Browsers,
  FunnelSimple,
  Robot,
  Megaphone,
  SealCheck,
} from '@/components/slab'
import { allShots, aiCases } from '@/data/projects'
import { certifications } from '@/data/about'
import { FAQS } from '@/data/faqs'
import { profile } from '@/data/profile'

/**
 * Home's showcase: one card per page, each an index of what that page holds,
 * each built from records the pages render in full - the Ahrefs evidence
 * screenshots, the AI-citation clients, the certificates, the service tiers
 * and the FAQs. Nothing here invents a fact.
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
        <CardHead Icon={FolderOpen} title="Projects" desc="Wincrest Orthodontics: 224 → 1,705 monthly organic visits, plus six more dental SEO programs." />
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
            <span key={src} className="bento__photo" style={{ ['--i' as string]: i }}>
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
        <CardHead Icon={Medal} title="Credentials" desc="Pinoy SEO, SEO Workout, Margin & Momentum, plus ads training." />
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

      {/* FAQs: the questions drifting up a clipped column. */}
      <Link to="/faqs" className="bento__card bento__card--quotes">
        <CardHead Icon={Question} title="FAQs" desc="Working arrangements, SEO, AI search, web builds and what I do not claim." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...FAQS.slice(0, 6), ...FAQS.slice(0, 6)].map((f, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <Question size={14} weight="fill" />
                  <b>{f.q}</b>
                </span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
