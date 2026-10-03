import type { Evidence } from './evidence'

/**
 * The 3D carousel (FunnelBarrel) and its preview dialog read from here.
 *
 * It holds only work with real screenshots behind it. Today that is the
 * GoHighLevel practice build (public/images/gohighlevel/, captured from a
 * practice sub-account named "GHL Specialist Portfolio"), so every item is
 * labelled Practice project - none of it is client work. No Website item has
 * screenshots yet. If the list is ever emptied again, Projects falls back to
 * a "Showcase coming soon" state.
 *
 * ghl11.jpg is left out on purpose: it is GoHighLevel's own AI Agents
 * onboarding screen, and its statistics are GoHighLevel's marketing, not
 * anything built or measured here.
 *
 * To add a real item:
 *   1. Screenshot only:  put a 3:4 portrait image (1080x1440 JPEG/WebP) in
 *      public/showcase/thumbs/ and set `thumb`. Optionally set `shot` to a
 *      full-length screenshot, or `shots` to several, for the preview dialog.
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

export type ShowcaseShot = {
  src: string
  alt: string
  /** Intrinsic size, so the dialog reserves the space and never distorts it. */
  width: number
  height: number
  caption?: string
}

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
  /** Optional screenshots shown in order in the preview dialog (wins over `shot`). */
  shots?: ShowcaseShot[]
  /** Optional local, self-contained demo page, iframed in the dialog. */
  demo?: string
  /** Optional live URL, opened in a new tab. */
  url?: string
}

const GHL = '/images/gohighlevel'

export const showcase: ShowcaseItem[] = [
  {
    id: 'ghl-landing',
    label: 'GHL Specialist landing page',
    category: 'Landing page',
    evidence: 'Practice project',
    platform: 'GoHighLevel Sites',
    desc: 'A one-page lead-generation page built in GoHighLevel for my own GHL services: hero, about, service overview, common problems and a closing call to action. Built in a practice sub-account, not for a client.',
    thumb: '/showcase/thumbs/ghl-landing.jpeg',
    shots: [
      { src: `${GHL}/ghl.jpg`, width: 1875, height: 953, alt: 'GoHighLevel landing page hero: "Turn More Leads Into Clients With Funnels, Automation & AI" with a Get Started button and a portrait captioned Igel Cudiera, GHL Specialist', caption: 'Hero, in the GoHighLevel site preview' },
      { src: `${GHL}/ghl1.jpg`, width: 1855, height: 844, alt: 'About section: "Helping Businesses Build Smarter Marketing Systems" with a short description and a Learn More button', caption: 'About section' },
      { src: `${GHL}/ghl2.jpg`, width: 1801, height: 832, alt: 'Services section: "Everything You Need to Turn Leads Into Opportunities" with cards for Funnel Development, CRM & Workflow Automation and AI Lead Automation', caption: 'Service overview' },
      { src: `${GHL}/ghl3.jpg`, width: 1811, height: 702, alt: 'Problems section: "Turn Marketing Challenges Into Automated Systems" with four cards on lead capture, follow-up, scattered tools and AI', caption: 'Common problems the page speaks to' },
      { src: `${GHL}/ghl4.jpg`, width: 1820, height: 568, alt: 'Dark call-to-action band: "Ready to Build a Smarter Lead System?" with a Reach Out To Us button', caption: 'Closing call to action' },
    ],
  },
  {
    id: 'ghl-inquiry-funnel',
    label: 'Inquiry form and thank-you steps',
    category: 'Funnel',
    evidence: 'Practice project',
    platform: 'GoHighLevel Funnels',
    desc: 'Two lead-capture steps built in GoHighLevel: an inquiry form (first name, last name, phone, email) and a thank-you page that confirms the inquiry and explains what happens next.',
    thumb: '/showcase/thumbs/ghl-inquiry-funnel.jpeg',
    shots: [
      { src: `${GHL}/ghl5.jpg`, width: 1614, height: 861, alt: 'GoHighLevel inquiry form page "Let\'s Build a Smarter Lead System" with first name, last name, phone and email fields and a Submit button', caption: 'Step: inquiry form' },
      { src: `${GHL}/ghl6.jpg`, width: 1669, height: 902, alt: 'Thank-you page: "Thank You, Your Inquiry Has Been Received" with a check mark and a "Here\'s What Happens Next" section', caption: 'Step: thank-you page' },
    ],
  },
  {
    id: 'ghl-pipelines',
    label: 'CRM sales pipelines',
    category: 'GoHighLevel demo',
    evidence: 'Practice project',
    platform: 'GoHighLevel CRM',
    desc: 'Opportunity pipelines set up in a GoHighLevel practice sub-account: a Marketing Pipeline (6 stages), a GHL Specialist Sales Pipeline (7 stages) and a GHL Specialist AI Automation Pipeline (7 stages).',
    thumb: '/showcase/thumbs/ghl-pipelines.jpeg',
    shots: [
      { src: `${GHL}/ghl10.jpg`, width: 1908, height: 941, alt: 'GoHighLevel Opportunities, Pipelines screen listing Marketing Pipeline, GHL Specialist Sales Pipeline and GHL Specialist AI Automation Pipeline with their stage counts' },
    ],
  },
  {
    id: 'ghl-abandonment',
    label: 'Get Started page follow-up workflow',
    category: 'GoHighLevel demo',
    evidence: 'Practice project',
    platform: 'GoHighLevel Workflows',
    desc: 'A published workflow triggered by a page view on the funnel\'s Get Started page: a one-minute wait, an internal notification, then follow-up emails on days 3, 7, 14 and 30, ending at an inquiry-form submission goal.',
    thumb: '/showcase/thumbs/ghl-abandonment.jpeg',
    shots: [
      { src: `${GHL}/ghl9.jpg`, width: 1888, height: 953, alt: 'GoHighLevel workflow builder showing "Get Started Page Abandonment": a page-view trigger, wait steps, an internal notification and contact emails for days 3, 7, 14 and 30', caption: 'Workflow builder' },
      { src: `${GHL}/ghl7.jpg`, width: 1894, height: 943, alt: 'GoHighLevel Workflows list with two published workflows: "GHL – New Inquiry + Lead Qualification" and "Get Started Page Abandonment"', caption: 'Both workflows, published in the practice sub-account' },
    ],
  },
  {
    id: 'ghl-ai-qualification',
    label: 'New inquiry + AI lead qualification',
    category: 'AI automation demo',
    evidence: 'Practice project',
    platform: 'GoHighLevel Workflows',
    desc: 'A published workflow: a form submission tags the contact, creates or updates a sales opportunity and sends internal and confirmation emails, then an AI lead-qualification step routes the lead to high-priority, nurture or low-engagement branches.',
    thumb: '/showcase/thumbs/ghl-ai-qualification.jpeg',
    shots: [
      { src: `${GHL}/ghl8.jpg`, width: 1907, height: 947, alt: 'GoHighLevel workflow builder showing "GHL – New Inquiry + Lead Qualification": a form-submitted trigger, tag and opportunity steps, notification emails, an AI Lead Qualification step and four branches' },
    ],
  },
]

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
