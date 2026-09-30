import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, CursorClick, House, Storefront, MapPin, ChartLineUp, Sparkle, Globe, Tooth } from '@/components/slab'
import { EvidencePanel, WincrestPanel, DentalPanel, AIVisibilityPanel, RealEstatePanel, BrokeragePanel, LocalPanel, ShowcasePanel } from './ProjectPanels'
import EvidenceTag from './EvidenceTag'
import { wincrest, dentalRows, aiCases, aiQueryCount, industryCases, allShots } from '@/data/projects'
import { showcase } from '@/data/showcase'
import type { Evidence } from '@/data/evidence'
import { useIsPhone } from '@/hooks/useMediaQuery'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * Projects, as one viewport in Home's bento language: a glass panel of cards,
 * each previewing a body of documented work with a live inner track, each
 * opening the full case study in a near-fullscreen dialog (ProjectPanels).
 *
 * The dialog is a portal at z 8000; screenshot lightboxes and the carousel's
 * own preview stack above it.
 */
type Project = {
  id: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number; weight?: 'duotone' }>
  Section: ComponentType
  evidence: Evidence
  span?: 2
  /** Small orange kicker above the title (stack cards). */
  kicker?: string
  Preview: ComponentType
  cat: Cat
}

type Cat = 'seo' | 'ai' | 'web'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'seo', label: 'SEO results' },
  { key: 'ai', label: 'AI search' },
  { key: 'web', label: 'Websites' },
]

const CHART_SHOTS = [allShots[0], allShots[1], allShots[3], allShots[4]]
const DENTAL_SHOTS = dentalRows.map((r) => r.shots[1])
const QUERIES = aiCases.flatMap((c) => c.aio).slice(0, 12)

/** The three industry case studies: each its own card in the stack. */
const STACK_ICONS = [House, Storefront, MapPin]
const BUILDS: Project[] = industryCases.map((ic, i) => ({
  id: ic.id,
  cat: 'ai',
  kicker: ic.kicker,
  title: ic.title,
  desc: ic.desc,
  evidence: ic.evidence,
  Icon: STACK_ICONS[i],
  Section: [RealEstatePanel, BrokeragePanel, LocalPanel][i],
  Preview: () => null,
}))

/* ---------- Previews ---------- */

/** The Wincrest result as a paper document. */
function WincrestPreview() {
  return (
    <div className="bento__media bento__doc bento__doc--metric" aria-hidden="true">
      <span className="bento__doc-eyebrow">Ahrefs · avg. monthly organic traffic</span>
      <span className="bento__doc-big">
        {wincrest.metric.before} <i>→</i> {wincrest.metric.after.toLocaleString('en-US')}
      </span>
      <span className="bento__doc-flow">
        <i>Keywords</i>
        <i>Guest posts</i>
        <i className="is-on">{wincrest.growth}</i>
      </span>
      <span className="bento__doc-line" />
      <span className="bento__doc-line bento__doc-line--short" />
    </div>
  )
}

function ChartsPreview({ shots }: { shots: typeof CHART_SHOTS }) {
  return (
    <div className="bento__media bento__reel bento__reel--charts" aria-hidden="true">
      <div className="bento__reel-track">
        {[...shots, ...shots].map((s, i) => (
          <span key={i} className="bento__shot bento__shot--chart">
            <img src={s.thumb} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </div>
  )
}

function QueriesPreview() {
  const half = Math.ceil(QUERIES.length / 2)
  const rows = [QUERIES.slice(0, half), QUERIES.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((q, i) => (
              <span key={`${q}-${i}`} className="bento__chip" data-status="Live">
                <Sparkle size={15} weight="duotone" />
                {q}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Coming-soon plates in the carousel's 3:4 card shape. */
function ShowcasePreview() {
  const items = showcase.length ? showcase.slice(0, 3).map((s) => s.category) : ['Sites', 'Pages', 'Funnels']
  return (
    <div className="bento__media bento__fan" aria-hidden="true">
      {items.map((label, i) => (
        <span key={label} className="bento__photo bento__photo--page bento__photo--soon" style={{ ['--i' as string]: i }}>
          <span>{label}</span>
        </span>
      ))}
    </div>
  )
}

const PROJECTS: Project[] = [
  {
    id: 'results',
    cat: 'seo',
    title: 'SEO results, with the screenshots',
    desc: `${allShots.length} Ahrefs screenshots across 12 dental practices, plus a Search Console report for Birthing Center NYC.`,
    evidence: 'Client work',
    Icon: ChartLineUp,
    Section: EvidencePanel,
    span: 2,
    Preview: () => <ChartsPreview shots={CHART_SHOTS} />,
  },
  {
    id: 'wincrest',
    cat: 'seo',
    title: 'Wincrest Orthodontics',
    desc: 'Flagship dental SEO result: 224 → 1,705 average monthly organic visits.',
    evidence: 'Client work',
    Icon: Tooth,
    Section: WincrestPanel,
    Preview: WincrestPreview,
  },
  {
    id: 'showcase',
    cat: 'web',
    title: 'Websites & funnels',
    desc: showcase.length
      ? 'Spin the 3D reel of sites, pages and demos.'
      : 'The 3D showcase opens once real screenshots and URLs are in. WordPress builds listed inside.',
    evidence: showcase.length ? 'Client work' : 'Needs verification',
    Icon: Globe,
    Section: ShowcasePanel,
    Preview: ShowcasePreview,
  },
  {
    id: 'ai',
    cat: 'ai',
    title: 'AI search visibility',
    desc: `${aiCases.length} client sites cited for ${aiQueryCount} queries in Google AI Overviews and ChatGPT.`,
    evidence: 'Client work',
    Icon: Sparkle,
    Section: AIVisibilityPanel,
    Preview: QueriesPreview,
  },
  {
    id: 'dental',
    cat: 'seo',
    title: 'Dental SEO programs',
    desc: 'Six practices, +38% to +288% organic traffic from keyword optimization and guest-post link building.',
    evidence: 'Client work',
    Icon: Tooth,
    Section: DentalPanel,
    span: 2,
    Preview: () => <ChartsPreview shots={DENTAL_SHOTS} />,
  },
]

/* ---------- Dialog ---------- */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  usePageMeta(
    'SEO Projects & Case Studies | Igel G. Cudiera Portfolio',
    'Documented SEO results with Ahrefs screenshots: Wincrest Orthodontics grew from 224 to 1,705 monthly organic visits, plus dental SEO and AI search citations.',
  )
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">
      {builds.map((b) => (
        <button
          key={b.id}
          type="button"
          className="bento__card bento__card--btn bento__card--build"
          onClick={(e) => show(b, e.currentTarget)}
          aria-haspopup="dialog"
        >
          <span className="bento__build-plate">
            <b.Icon size={20} weight="duotone" />
          </span>
          <span className="bento__build-text">
            <span className="bento__kicker">{b.kicker}</span>
            <span className="bento__build-title">{b.title}</span>
            <span className="bento__build-desc">{b.desc}</span>
          </span>
          <span className="bento__build-arrow">
            <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          Documented SEO results, not promises.
        </h1>
        <p className="pgrid__lede">
          Real clients, Ahrefs screenshots and recorded AI-search citations, each labelled by how it is backed. Open a card
          for the full case study.
        </p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <Fragment key={p.id}>
              <button
                type="button"
                className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
                data-id={p.id}
                onClick={(e) => show(p, e.currentTarget)}
                aria-haspopup="dialog"
              >
                <span className="bento__head">
                  <span className="bento__icon">
                    <p.Icon size={22} weight="duotone" />
                  </span>
                  <span className="bento__title">{p.title}</span>
                  <span className="bento__desc">{p.desc}</span>
                  <EvidenceTag level={p.evidence} className="bento__evtag" />
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
                </span>
                <p.Preview />
              </button>
              {p.id === 'wincrest' && stack}
            </Fragment>
          ))}
          {!projects.some((p) => p.id === 'wincrest') && stack}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
