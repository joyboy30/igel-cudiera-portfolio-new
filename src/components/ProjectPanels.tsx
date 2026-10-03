import { lazy, Suspense, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Globe, Sparkle, CheckCircle } from '@/components/slab'
import ShotGallery from './ShotGallery'
import EvidenceTag from './EvidenceTag'
import { useShowcaseModal } from './FunnelModal'
import {
  wincrest,
  dentalRows,
  dentalOverviews,
  birthingCenter,
  growthOf,
  aiCases,
  industryCases,
  webBuilds,
  type AICase,
  type IndustryCase,
  type LiveLink,
} from '@/data/projects'
import { showcase, plannedCategories, categoryColors } from '@/data/showcase'
import { NEEDS_VERIFICATION } from '@/data/evidence'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/**
 * What the Projects dialogs show. Each panel is a mac window with a scrolling
 * body - the case study itself, on screen the moment the dialog opens.
 */

function SectionWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">{label}</span>
        </span>
      </div>
      <div className="ppanel__scroll">
        <article className="cs">{children}</article>
      </div>
    </div>
  )
}

/** Label / value facts: industry, platform, role, live URL. */
function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="cs__facts">
      {rows.map(([k, v]) => (
        <div key={k} className="cs__fact">
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="cs__list" role="list">
      {items.map((i) => (
        <li key={i}>
          <CheckCircle size={15} weight="duotone" aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  )
}

const noUrl = <span className="cs__nv">Not published {NEEDS_VERIFICATION}</span>

/** Live site links for the facts grid; the "not published" marker when there are none. */
function LiveLinks({ links }: { links: LiveLink[] }) {
  if (!links.length) return noUrl
  return (
    <span className="cs__urls">
      {links.map((l) => (
        <a key={l.url} className="cs__url" href={l.url} target="_blank" rel="noopener noreferrer">
          {l.label}
          <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
        </a>
      ))}
    </span>
  )
}

/** Marks a fact amber when it still carries the NEEDS_VERIFICATION marker. */
const fact = (v: string) => <span className={v.includes(NEEDS_VERIFICATION) ? 'cs__nv' : undefined}>{v}</span>

/* ---------- Wincrest ---------- */

export function WincrestPanel() {
  const w = wincrest
  return (
    <SectionWindow label="Case study · Wincrest Orthodontics">
      <header className="cs__head">
        <span className="cs__eyebrow">Flagship result · Dental SEO</span>
        <h2 className="cs__title">{w.client}</h2>
        <EvidenceTag level={w.evidence} />
      </header>

      <div className="cs__metric" aria-label={`Average monthly organic traffic grew from ${w.metric.before} to ${w.metric.after}`}>
        <span className="cs__metric-num">{w.metric.before}</span>
        <span className="cs__metric-arrow" aria-hidden="true">→</span>
        <span className="cs__metric-num cs__metric-num--up">{w.metric.after.toLocaleString('en-US')}</span>
        <span className="cs__metric-cap">
          {w.metric.unit} ({w.metric.source}) · <b>{w.growth}</b>
        </span>
      </div>

      <Facts
        rows={[
          ['Industry', w.industry],
          ['My role', w.role],
          ['Platform', fact(w.platform)],
          ['Timeline', fact(w.engagement)],
          ['Live URL', <LiveLinks links={w.liveUrl ? [{ label: 'wincrestorthodontics.com', url: w.liveUrl }] : []} />],
          ['Tools', w.tools.join(', ')],
        ]}
      />

      <section className="cs__block">
        <h3>Work performed</h3>
        <List items={w.work} />
        <p className="cs__note">{w.workNote}</p>
      </section>

      <section className="cs__block">
        <h3>Evidence</h3>
        <p className="cs__note">Ahrefs screenshots from the original report. Open one to see it full size.</p>
        <ShotGallery shots={w.shots} className="shots--wide" />
      </section>
    </SectionWindow>
  )
}

/* ---------- All evidence screenshots ---------- */

export function EvidencePanel() {
  return (
    <SectionWindow label="SEO results · Ahrefs and Search Console screenshots">
      <header className="cs__head">
        <span className="cs__eyebrow">Evidence gallery</span>
        <h2 className="cs__title">Every result, with its screenshot</h2>
        <EvidenceTag level="Client work" />
      </header>
      <p className="cs__lede">
        Ahrefs traffic screenshots for twelve dental practices, and a Google Search Console report for Birthing Center NYC.
        Open any image full size; use the arrow keys to step through a set.
      </p>
      <section className="cs__block">
        <h3>{wincrest.client}</h3>
        <ShotGallery shots={wincrest.shots} className="shots--wide" />
      </section>
      <section className="cs__block">
        <h3>Before / after: six dental practices</h3>
        <ShotGallery shots={dentalRows.flatMap((r) => r.shots)} />
      </section>
      <section className="cs__block">
        <h3>Ahrefs overviews: five more practices</h3>
        <ShotGallery shots={dentalOverviews} />
      </section>
      <section className="cs__block">
        <h3>
          {birthingCenter.client}: {birthingCenter.source}
        </h3>
        <Facts rows={[['Period', birthingCenter.period], ...birthingCenter.totals]} />
        <p className="cs__note">Totals as shown in the report for one 3-month window. No before/after growth is claimed.</p>
        <ShotGallery shots={[birthingCenter.shot]} className="shots--wide" />
      </section>
    </SectionWindow>
  )
}

/* ---------- Dental programs ---------- */

export function DentalPanel() {
  return (
    <SectionWindow label="Dental SEO programs">
      <header className="cs__head">
        <span className="cs__eyebrow">Dental SEO · six client accounts</span>
        <h2 className="cs__title">Organic traffic before and after</h2>
        <EvidenceTag level="Client work" />
      </header>
      <p className="cs__lede">
        Keyword optimization and guest-post link building across dental practices. Traffic figures are the Ahrefs
        readings in the screenshots below. Engagement dates and employer context {NEEDS_VERIFICATION}.
      </p>

      <div className="cs__table-wrap">
        <table className="cs__table">
          <thead>
            <tr>
              <th scope="col">Practice</th>
              <th scope="col">Before</th>
              <th scope="col">After</th>
              <th scope="col">Growth</th>
              <th scope="col">Key action</th>
            </tr>
          </thead>
          <tbody>
            {dentalRows.map((r) => (
              <tr key={r.client}>
                <th scope="row">{r.client}</th>
                <td>{r.before}</td>
                <td>{r.after}</td>
                <td className="cs__growth">{growthOf(r)}</td>
                <td>{r.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="cs__block">
        <h3>Before / after screenshots</h3>
        <ShotGallery shots={dentalRows.flatMap((r) => r.shots)} />
      </section>

      <section className="cs__block">
        <h3>More dental accounts</h3>
        <p className="cs__note">Ahrefs overviews for five more practices. No growth figure is claimed for these.</p>
        <ShotGallery shots={dentalOverviews} />
      </section>
    </SectionWindow>
  )
}

/* ---------- AI search visibility ---------- */

function QueryCase({ c }: { c: AICase }) {
  return (
    <section className="cs__ai">
      <header className="cs__ai-head">
        <h3>{c.client}</h3>
        <span>{c.industry}</span>
      </header>
      <div className="cs__ai-cols">
        <div>
          <h4>Google AI Overviews</h4>
          <ul role="list">
            {c.aio.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>ChatGPT</h4>
          {c.chatgpt.length ? (
            <ul role="list">
              {c.chatgpt.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="cs__note">{c.chatgptNote}</p>
          )}
        </div>
      </div>
      <ul className="cs__chips" role="list" aria-label="SEO focus">
        {c.focus.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </section>
  )
}

export function AIVisibilityPanel() {
  return (
    <SectionWindow label="AI search visibility">
      <header className="cs__head">
        <span className="cs__eyebrow">AIO · AEO · GEO</span>
        <h2 className="cs__title">Cited in Google AI Overviews and ChatGPT</h2>
        <EvidenceTag level="Client work" />
      </header>
      <p className="cs__lede">
        Search queries where client websites appeared in AI-generated answers, after intent research and content built
        to answer them directly. Screenshots of these citations {NEEDS_VERIFICATION}.
      </p>
      {aiCases.map((c) => (
        <QueryCase key={c.id} c={c} />
      ))}
    </SectionWindow>
  )
}

/* ---------- Industry case studies (the build stack) ---------- */

function IndustryPanel({ ic }: { ic: IndustryCase }) {
  const cases = aiCases.filter((c) => ic.caseIds.includes(c.id))
  return (
    <SectionWindow label={`Case study · ${ic.kicker}`}>
      <header className="cs__head">
        <span className="cs__eyebrow">{ic.kicker}</span>
        <h2 className="cs__title">{ic.title}</h2>
        <EvidenceTag level={ic.evidence} />
      </header>
      <Facts
        rows={[
          ['Client', ic.client],
          ['Industry', ic.industry],
          ['My role', fact(ic.role)],
          ['Platform', fact(ic.platform)],
          ['Live URL', <LiveLinks links={ic.liveUrls} />],
          ...(ic.tools.length ? ([['Tools', ic.tools.join(', ')]] as [string, ReactNode][]) : []),
        ]}
      />
      <section className="cs__block">
        <h3>Work performed</h3>
        <List items={ic.work} />
      </section>
      <section className="cs__block">
        <h3>Results</h3>
        <List items={ic.results} />
        {ic.resultsNote && <p className="cs__note">{ic.resultsNote}</p>}
      </section>
      {cases.map((c) => (
        <QueryCase key={c.id} c={c} />
      ))}
    </SectionWindow>
  )
}

export const RealEstatePanel = () => <IndustryPanel ic={industryCases[0]} />
export const BrokeragePanel = () => <IndustryPanel ic={industryCases[1]} />
export const LocalPanel = () => <IndustryPanel ic={industryCases[2]} />

/* ---------- Websites & funnels: the 3D carousel ---------- */

/** What a category card says when it has no screenshot-backed item of its own. */
function emptyNote(category: string) {
  if (category === 'Practice project') {
    const n = showcase.filter((s) => s.evidence === 'Practice project').length
    return n ? `${n} of the builds in the carousel above are GoHighLevel practice projects, not client work. Each build carries its own label.` : null
  }
  if (category === 'Website') return 'No website with screenshots yet. The documented WordPress builds are listed below.'
  return null
}

export function ShowcasePanel() {
  const { openItem, modal } = useShowcaseModal()
  const live = showcase.length > 0

  return (
    <SectionWindow label="Websites & funnels">
      <header className="cs__head">
        <span className="cs__eyebrow">3D showcase</span>
        <h2 className="cs__title">{live ? 'Client websites and GoHighLevel builds' : 'Showcase coming soon'}</h2>
        {!live && <EvidenceTag level="Needs verification" />}
      </header>
      {live ? (
        <p className="cs__lede">
          Homepages of client websites, plus a landing page, funnel steps, CRM pipelines and workflows I built in a
          GoHighLevel practice sub-account and an HVAC service request funnel for a fictional company. Every build is
          labelled: client work or practice project. Drag the reel, or open any build below.
        </p>
      ) : (
        <p className="cs__lede">
          This space is the 3D carousel for websites, landing pages, funnels and demos. It stays empty until each piece
          has a real screenshot, demo file or live URL, so nothing here is a mock-up passed off as client work.
        </p>
      )}

      {live && (
        <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
          <FunnelBarrel items={showcase} onOpen={openItem} />
        </Suspense>
      )}

      <ul className="soon" role="list">
        {plannedCategories.map((p) => {
          const items = showcase.filter((s) => s.category === p.category)
          const note = items.length ? null : emptyNote(p.category)
          return (
            <li key={p.category} className="soon__item" data-filled={items.length > 0 || undefined} style={{ ['--tag-color' as string]: p.category in categoryColors ? categoryColors[p.category as keyof typeof categoryColors] : 'var(--muted)' }}>
              <span className="soon__tag">{p.category}</span>
              <span className="soon__note">{p.note}</span>
              {items.map((s) => {
                const cover = s.shots?.[0]
                return (
                  <button key={s.id} type="button" className="soon__build" onClick={(e) => openItem(s, e.currentTarget)}>
                    {cover && <img src={cover.src} alt="" width={cover.width} height={cover.height} loading="lazy" decoding="async" />}
                    <span className="soon__build-label">{s.label}</span>
                    <EvidenceTag level={s.evidence} />
                  </button>
                )
              })}
              {note && <span className="soon__note">{note}</span>}
            </li>
          )
        })}
      </ul>

      <section className="cs__block">
        <h3>Documented website builds</h3>
        <p className="cs__note">These builds are recorded in my experience.</p>
        <div className="builds">
          {webBuilds.map((b) => (
            <section key={b.name} className="builds__card">
              <header className="builds__head">
                <Globe size={20} weight="duotone" aria-hidden="true" />
                <h4>{b.name}</h4>
                <EvidenceTag level={b.evidence} />
              </header>
              <Facts
                rows={[
                  ['Platform', b.platform],
                  ['My role', b.role],
                ]}
              />
              <h5>Development work</h5>
              <List items={b.development} />
              <h5>SEO work</h5>
              <List items={b.seo} />
            </section>
          ))}
        </div>
      </section>

      <p className="cs__cta">
        <Sparkle size={16} weight="duotone" aria-hidden="true" />
        Need a site or funnel built? <Link to="/contact">Start a project <ArrowUpRight size={13} weight="bold" aria-hidden="true" /></Link>
      </p>
      {modal}
    </SectionWindow>
  )
}
