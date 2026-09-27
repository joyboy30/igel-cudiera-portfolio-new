import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { MagnifyingGlass, Wrench, ChartLineUp, CheckCircle, ArrowUpRight, Target, Toolbox as Tool, UserFocus } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot from '@/components/Autopilot'
import EvidenceTag from './EvidenceTag'
import { services, tierMeta, method, processTools as TOOLS, type Service, type Tier } from '@/data/services'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Four bands, top to bottom: the three-step method on its plate; the two
 * primary services as large cards; the specialist and supporting tiers as
 * compact cards; and the SEO process running as a live workflow (Autopilot).
 *
 * Every card answers the same four questions - what I do, the problem it
 * solves, the tools, the ideal client - and carries an evidence tag, so a
 * supporting service is never dressed up as established client work.
 */

const STAGE_ICONS: Icon[] = [MagnifyingGlass, Wrench, ChartLineUp]

function Marks({ logos }: { logos?: string[] }) {
  if (!logos?.length) return null
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

function ServiceCard({ s, index, total }: { s: Service; index: number; total: number }) {
  const primary = s.tier === 'primary'
  return (
    <li className={`bento__card sgrid__service svc${primary ? ' svc--primary' : ''}`} id={`service-${s.id}`}>
      <span className="bento__head">
        <span className="sgrid__service-top">
          <Marks logos={s.logos} />
          <span className="sgrid__service-index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </span>
        <span className="bento__title">{s.title}</span>
        <EvidenceTag level={s.evidence} />
      </span>

      <dl className="svc__qa">
        <div>
          <dt>
            <CheckCircle size={14} weight="duotone" aria-hidden="true" />
            What I do
          </dt>
          <dd>{s.what}</dd>
        </div>
        <div>
          <dt>
            <Target size={14} weight="duotone" aria-hidden="true" />
            Problem it solves
          </dt>
          <dd>{s.problem}</dd>
        </div>
        {s.tools.length > 0 && (
          <div>
            <dt>
              <Tool size={14} weight="duotone" aria-hidden="true" />
              Platforms & tools
            </dt>
            <dd>{s.tools.join(' · ')}</dd>
          </div>
        )}
        <div>
          <dt>
            <UserFocus size={14} weight="duotone" aria-hidden="true" />
            Ideal for
          </dt>
          <dd>{s.ideal}</dd>
        </div>
      </dl>
      <p className="svc__basis">{s.evidenceNote}</p>
    </li>
  )
}

function TierBand({ tier }: { tier: Tier }) {
  const list = services.filter((s) => s.tier === tier)
  const meta = tierMeta[tier]
  return (
    <div className={`sgrid__offers svc-tier svc-tier--${tier}`}>
      <div className="sgrid__offers-head">
        <span className="svc-tier__label">{meta.label}</span>
        <h2 className="sgrid__offers-title">{meta.title}</h2>
        <p className="sgrid__offers-sub">{meta.note}</p>
      </div>
      <ul className={`bento sgrid__services svc-grid svc-grid--${tier}`} role="list">
        {list.map((s, i) => (
          <ServiceCard key={s.id} s={s} index={i} total={list.length} />
        ))}
      </ul>
    </div>
  )
}

export default function ServicesGrid() {
  usePageMeta('Services', 'SEO and web development, with specialist technical, on-page, local and AI search SEO, plus supporting GoHighLevel, automation, ads, social and email services.')
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          SEO and web development, done properly.
        </h1>
        <p className="pgrid__lede">
          Two primary services, the specialist work behind them, and supporting services labelled honestly as trained,
          demo or supporting. Available part-time, per project, on contract or on a monthly retainer.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">The method</span>
            <h2 className="sgrid__method-title" id="method-title">
              Audit. Build. Measure.
              <br />
              <span>The same three steps on every project.</span>
            </h2>
            <p className="sgrid__method-sub">Nothing gets built until the site can be crawled, indexed and understood.</p>
          </div>

          <ol className="sgrid__stages" role="list">
            {method.map((m, i) => {
              const StageIcon = STAGE_ICONS[i]
              return (
                <li key={m.label} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{m.label}.</h3>
                  <p className="sgrid__stage-body">{m.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${m.label} touches`}>
                    {m.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        <TierBand tier="primary" />
        <TierBand tier="specialist" />
        <TierBand tier="supporting" />

        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">How I work</span>
              <h2 className="sgrid__flow-title">The SEO process, running.</h2>
              <p className="sgrid__flow-sub">
                Discovery and a technical audit first, then keywords, on-page and fixes. Monitoring decides the next round.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools behind the process">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>

        <div className="svc-cta">
          <p>Not sure which service fits? Describe the site and the goal, and I will suggest the smallest useful first step.</p>
          <Link className="home__cta" to="/contact">
            Start a project
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
