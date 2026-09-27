import type { Evidence } from './evidence'

/**
 * The 3D carousel (FunnelBarrel) and its preview dialog read from here.
 *
 * It is EMPTY on purpose: no website, funnel, landing page, GoHighLevel or
 * AI-automation sample with a screenshot, demo file or live URL exists in the
 * source material yet, and the rule for this portfolio is no invented work.
 * While the list is empty, Projects shows a "Showcase coming soon" state
 * instead of the carousel.
 *
 * To add a real item:
 *   1. Screenshot only:  put a 3:4 portrait image (1080x1440 JPEG/WebP) in
 *      public/showcase/thumbs/ and set `thumb`. Optionally set `shot` to a
 *      full-length screenshot for the preview dialog.
 *   2. Interactive demo:  put the self-contained page in public/showcase/ and
 *      set `demo` (e.g. '/showcase/ghl-demo.html'). `npm run thumbs` renders
 *      its 3:4 thumbnail into public/showcase/thumbs/.
 *   3. Live site: set `url`. The dialog links out; it never iframes a third-
 *      party site (most block framing).
 * Label practice and demo work honestly with `evidence`.
 */

export type ShowcaseCategory =
  | 'Website'
  | 'Landing page'
  | 'Funnel'
  | 'GoHighLevel demo'
  | 'AI automation demo'
  | 'Email demo'

export type ShowcaseItem = {
  id: string
  label: string
  category: ShowcaseCategory
  evidence: Evidence
  platform: string
  /** One or two lines: who it was for and what it had to do. */
  desc: string
  /** 3:4 portrait thumbnail, used as the carousel card texture. */
  thumb: string
  /** Optional full-length screenshot shown in the preview dialog. */
  shot?: string
  /** Optional local, self-contained demo page, iframed in the dialog. */
  demo?: string
  /** Optional live URL, opened in a new tab. */
  url?: string
}

export const showcase: ShowcaseItem[] = []

/** Card-label colors per category, passed to CSS as --tag-color. */
export const categoryColors: Record<ShowcaseCategory, string> = {
  Website: '#FF7A1A',
  'Landing page': '#8b5cf6',
  Funnel: '#ec4899',
  'GoHighLevel demo': '#0ea5e9',
  'AI automation demo': '#10b981',
  'Email demo': '#f59e0b',
}

/** What the carousel is reserved for, shown in the coming-soon state. */
export const plannedCategories: { category: ShowcaseCategory | 'Practice project'; note: string }[] = [
  { category: 'Website', note: 'WordPress, Elementor, Lofty, Duda and Shopify sites, with platform, role and live URL' },
  { category: 'Landing page', note: 'Single-page builds for campaigns and lead capture' },
  { category: 'Funnel', note: 'Multi-step funnels, labelled as client work or demo' },
  { category: 'GoHighLevel demo', note: 'GHL funnel and automation demos, labelled as demos' },
  { category: 'AI automation demo', note: 'Trigger → AI step → CRM → follow-up flows, labelled as demos' },
  { category: 'Practice project', note: 'Training and practice builds, always labelled as practice' },
]
