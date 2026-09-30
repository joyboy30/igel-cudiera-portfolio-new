import { useEffect, type CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight, MapPin, GraduationCap, Translate, Briefcase, DownloadSimple, FilePdf } from '@/components/slab'
import { profile } from '@/data/profile'
import { experience, education, languages, industries, certifications, timeline, skillTiers } from '@/data/about'
import { ICONS } from '@/data/services'
import EvidenceTag from './EvidenceTag'
import ShotGallery from './ShotGallery'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * AboutGrid - the About view. The first glass sheet keeps the template's
 * two-column intro (who, the four things I do with their tool marks, the
 * facts bar, the portrait). Below it the page scrolls through the record:
 * experience, credentials, the timeline and the skill tiers - each role and
 * credential labelled by how it is backed.
 */

type Capability = { index: string; title: string; marks: { src: string; name: string }[] }

const m = (src: string, name: string) => ({ src, name })

const CAPABILITIES: Capability[] = [
  { index: '01', title: 'Technical, on-page & local SEO', marks: [m(ICONS.gsc, 'Google Search Console'), m(ICONS.ga, 'Google Analytics 4'), m(ICONS.semrush, 'Semrush')] },
  { index: '02', title: 'WordPress web development', marks: [m(ICONS.wp, 'WordPress'), m(ICONS.elementor, 'Elementor')] },
  { index: '03', title: 'AI search & AI-assisted content', marks: [m(ICONS.claude, 'Claude'), m(ICONS.openai, 'ChatGPT'), m(ICONS.gemini, 'Gemini')] },
  { index: '04', title: 'Funnels, ads & supporting marketing', marks: [m(ICONS.ghl, 'GoHighLevel'), m(ICONS.gads, 'Google Ads'), m(ICONS.meta, 'Meta')] },
]

const CERT_SHOTS = certifications.map((c) => ({ src: c.image, thumb: c.thumb, label: `${c.title} · ${c.issuer} · ${c.date}` }))

export default function AboutGrid() {
  usePageMeta(
    'About Igel G. Cudiera | SEO Specialist & Web Developer',
    'Meet Igel G. Cudiera, an SEO specialist and WordPress developer. See four SEO roles since 2023, certificates and training, career timeline and core skills.',
  )
  const { hash } = useLocation()

  // The panel is the scroller, so an in-page hash needs a manual scroll.
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
  }, [hash])

  return (
    <section className="pgrid agrid agrid--flow" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          SEO specialist and WordPress developer in {profile.location}, working remotely with businesses in the US,
          and Canada.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            An SEO specialist who thinks like an engineer.
            <span> And builds the sites the SEO runs on.</span>
          </p>

          <p className="agrid__note">
            My background is in <strong>computer programming and hardware servicing</strong>, so I start with the systems
            underneath SEO: crawlability, indexability, site architecture and how search engines discover a page before it
            can rank. Since 2023 I have done SEO for dental practices, real estate, business brokerage, restaurants,
            e-commerce and iGaming, and I now focus on getting clients cited in Google AI Overviews and ChatGPT as well
            as the classic results.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((mk, i) => (
                    <span key={mk.name} className="agrid__mark" style={{ '--i': c.marks.length - i } as CSSProperties}>
                      <img src={mk.src} alt={mk.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src={certifications[0].thumb} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{certifications.length} certificates</span>
                <span className="agrid__cell-meta">SEO · GoHighLevel · ads · VA training</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Cebu, Philippines</span>
                <span className="agrid__cell-meta">{profile.timezone}</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href={profile.resumeSrc} download>
              <span className="agrid__cell-mark">
                <DownloadSimple size={16} weight="bold" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Download my resume</span>
                <span className="agrid__cell-meta">PDF · public version</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait agrid__portrait--photo">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={880}
            height={1100}
          />
        </div>
      </div>

      {/* ---------- Experience ---------- */}
      <section className="home__glass about-sec" aria-labelledby="exp-title" id="experience">
        <header className="about-sec__head">
          <span className="pgrid__eyebrow">Experience</span>
          <h2 id="exp-title" className="about-sec__title">4 SEO roles since 2023</h2>
        </header>
        <ol className="xp" role="list">
          {experience.map((r) => (
            <li key={r.company} className="xp__item">
              <div className="xp__meta">
                <span className="xp__period">{r.period}</span>
                <EvidenceTag level={r.evidence} />
              </div>
              <div className="xp__body">
                <h3 className="xp__company">{r.company}</h3>
                <p className="xp__role">
                  <Briefcase size={14} weight="duotone" aria-hidden="true" /> {r.role} · {r.industry}
                </p>
                <p className="xp__summary">{r.summary}</p>
                <ul className="xp__work" role="list">
                  {r.work.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Credentials ---------- */}
      <section className="home__glass about-sec" aria-labelledby="cred-title" id="credentials">
        <header className="about-sec__head">
          <span className="pgrid__eyebrow">Credentials</span>
          <h2 id="cred-title" className="about-sec__title">Certificates and training</h2>
          <p className="about-sec__sub">No verification links are published by the issuers; open a certificate to see it full size.</p>
        </header>
        <ul className="certs" role="list">
          {certifications.map((c) => (
            <li key={c.title} className="certs__item">
              <span className="certs__top">
                <EvidenceTag level={c.evidence} />
                <span className="certs__date">{c.date}</span>
              </span>
              <h3 className="certs__title">{c.title}</h3>
              <p className="certs__issuer">{c.issuer}</p>
              <p className="certs__desc">{c.description}</p>
              {c.credentialId && <p className="certs__id">Operator ID {c.credentialId}</p>}
              {c.pdf && (
                <a className="certs__pdf" href={c.pdf} target="_blank" rel="noopener noreferrer">
                  <FilePdf size={15} weight="duotone" aria-hidden="true" />
                  View certificate (PDF)
                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
        <ShotGallery shots={CERT_SHOTS} className="shots--certs" />
      </section>

      {/* ---------- Timeline, education, skills ---------- */}
      <div className="about-split">
        <section className="home__glass about-sec" aria-labelledby="time-title">
          <header className="about-sec__head">
            <span className="pgrid__eyebrow">Timeline</span>
            <h2 id="time-title" className="about-sec__title">How I got here</h2>
          </header>
          <ol className="tl" role="list">
            {timeline.map((t) => (
              <li key={t.label} className="tl__item">
                <span className="tl__year">{t.year}</span>
                <span className="tl__label">{t.label}</span>
                <span className="tl__detail">{t.detail}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="home__glass about-sec" aria-labelledby="skills-title">
          <header className="about-sec__head">
            <span className="pgrid__eyebrow">Skills</span>
            <h2 id="skills-title" className="about-sec__title">Strongest evidence first</h2>
          </header>
          {skillTiers.map((t) => (
            <div key={t.tier} className="skills">
              <p className="skills__tier">
                <b>{t.tier}</b> · {t.note}
              </p>
              <ul className="cs__chips" role="list">
                {t.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}

          <dl className="facts">
            <div>
              <dt>
                <GraduationCap size={16} weight="duotone" aria-hidden="true" /> Education
              </dt>
              <dd>
                {education.school} · {education.program} · {education.years}
              </dd>
            </div>
            <div>
              <dt>
                <Translate size={16} weight="duotone" aria-hidden="true" /> Languages
              </dt>
              <dd>{languages.join(' · ')}</dd>
            </div>
            <div>
              <dt>
                <Briefcase size={16} weight="duotone" aria-hidden="true" /> Industries
              </dt>
              <dd>{industries.join(' · ')}</dd>
            </div>
          </dl>
        </section>
      </div>
    </section>
  )
}
