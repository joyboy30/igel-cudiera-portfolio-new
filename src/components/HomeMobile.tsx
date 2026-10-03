import { Link } from 'react-router-dom'
import { SealCheck, CaretRight, Stack, Quotes, ChartLineUp, EnvelopeSimple, WhatsappLogo, LinkedinLogo, GithubLogo } from '@/components/slab'
import { profile } from '@/data/profile'
import { wincrest } from '@/data/projects'
import { certifications } from '@/data/about'
import { TESTIMONIALS } from '@/data/testimonials'
import QuickMenu from './QuickMenu'

/**
 * Home on a phone, the parts the rail and the bento used to carry:
 *
 *   HomeProfile  avatar, name, verified mark, handle and the QuickMenu
 *                (theme + accessibility) - the rail's identity block, laid flat
 *   HomeStats    three proof facts (profile.stats), each named by a glyph
 *   HomeExplore  one shelf card per page in a snap row, then the flagship
 *                result as a proof card
 */

const CONTACTS = [
  { label: 'Email', href: `mailto:${profile.email}`, Icon: EnvelopeSimple, external: false },
  { label: 'WhatsApp', href: profile.whatsapp, Icon: WhatsappLogo, external: true },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinLogo, external: true },
  { label: 'GitHub', href: profile.github, Icon: GithubLogo, external: true },
]

export function HomeProfile() {
  return (
    <header className="hprofile hprofile--center">
      <QuickMenu className="hprofile__menu" />
      <img className="hprofile__avatar" src={profile.avatarSrc} alt={profile.name} width={96} height={96} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
          <SealCheck size={16} weight="fill" className="hprofile__verified" aria-label={profile.verifiedLabel} />
        </span>
        <span className="hprofile__handle">{profile.handle}</span>
        <span className="hprofile__role">{profile.role}</span>
      </div>
      <ul className="hprofile__contacts" role="list">
        {CONTACTS.map(({ label, href, Icon, external }) => (
          <li key={label}>
            <a
              className="hprofile__contact"
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon size={20} weight="fill" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }, i) => (
        <li key={i}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  { n: '01', label: 'Projects', to: '/projects', title: 'SEO results with the receipts', desc: 'Ahrefs screenshots, dental programs and AI-search citations.', img: wincrest.shots[0].thumb },
  { n: '02', label: 'Services', to: '/services', title: 'SEO & web development first', desc: 'Plus GHL funnels, AI automation, ads, social and email.', Icon: Stack },
  { n: '03', label: 'About', to: '/about', title: `Hi, I'm ${profile.firstName}.`, desc: `Four SEO roles, ${certifications.length} certificates, one programming background.`, img: profile.hero.portraitSrc },
  { n: '04', label: 'Testimonials', to: '/testimonials', title: 'What clients said', desc: `${TESTIMONIALS.map((t) => t.name).join(', ')}, in their own words.`, Icon: Quotes, accent: true },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className={`htile${'accent' in t && t.accent ? ' htile--accent' : ''}`}>
              {'img' in t ? (
                <span className="htile__media"><img className="htile__img" src={t.img} alt="" loading="lazy" /></span>
              ) : (
                <span className="htile__media htile__glyph"><t.Icon size={52} weight="duotone" aria-hidden="true" /></span>
              )}
              <span className="htile__body">
                <span className="htile__n">{t.n} {t.label}</span>
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* A header that links carries its chevron on the title itself. */}
      <div className="hsec">
        <h2 className="hsec__title">
          <Link to="/projects" className="hsec__link">
            Flagship result
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </h2>
      </div>
      <Link to="/projects" className="hproof hproof--metric" aria-label="Wincrest Orthodontics: average monthly organic visits grew from 224 to 1,705 (Ahrefs).">
        <span className="hproof__stage hproof__stage--metric" aria-hidden="true">
          <ChartLineUp size={30} weight="duotone" />
          <span className="hproof__metric">
            <b>{wincrest.metric.before}</b>
            <i>→</i>
            <b>{wincrest.metric.after.toLocaleString('en-US')}</b>
          </span>
        </span>
        <span className="hproof__copy">
          <span className="hproof__title">{wincrest.client}: average monthly organic visits, measured in Ahrefs.</span>
          <span className="hproof__meta">Client work · dental SEO</span>
        </span>
      </Link>
    </>
  )
}
