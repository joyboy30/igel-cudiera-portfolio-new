import { MagnifyingGlass, ChartLineUp, Bug, type Icon } from '@/components/slab'
import type { Evidence } from './evidence'

/**
 * Services, in three tiers. The tier says how central a service is to the
 * offer; `evidence` says how it is backed. They are deliberately separate:
 * a service can be promoted (GoHighLevel, AI Automation) while its evidence
 * is still "Supporting capability".
 *
 * Evidence notes follow the previous portfolio's own honest "basis" lines
 * (lib/services-content.ts) and the rebuild audit.
 */

export type Tier = 'primary' | 'specialist' | 'supporting'

export type Service = {
  id: string
  tier: Tier
  title: string
  /** What I do. */
  what: string
  /** The problem it solves. */
  problem: string
  tools: string[]
  /** Ideal project / client. */
  ideal: string
  evidence: Evidence
  evidenceNote: string
  /** Logo marks from public/icons. */
  logos?: string[]
}

const I = {
  gsc: '/icons/marketing/googlesearchconsole.svg',
  ga: '/icons/marketing/googleanalytics.svg',
  semrush: '/icons/marketing/semrush.svg',
  wp: '/icons/marketing/wordpress.svg',
  elementor: '/icons/marketing/elementor.svg',
  shopify: '/icons/marketing/shopify.svg',
  gads: '/icons/marketing/googleads.svg',
  meta: '/icons/marketing/meta.svg',
  gemini: '/icons/marketing/googlegemini.svg',
  claude: '/icons/marketing/claude.svg',
  ghl: '/icons/gohighlevel.png',
  openai: '/icons/openai.svg',
  facebook: '/icons/marketing/facebook.svg',
  instagram: '/icons/marketing/instagram.svg',
}
export const ICONS = I

export const services: Service[] = [
  /* ---------- Primary ---------- */
  {
    id: 'seo',
    tier: 'primary',
    title: 'SEO',
    what: 'Full-cycle search engine optimization: technical audits, on-page and content optimization, local SEO, off-page authority and AI Search Optimization, run as one plan.',
    problem: 'Sites that are hard to crawl, target the wrong intent, or are invisible in Google, the map pack and AI-generated answers.',
    tools: ['Google Search Console', 'GA4', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Google Business Profile'],
    ideal: 'Local service businesses, dental practices, real estate teams, business brokerages and e-commerce stores that want steady organic growth.',
    evidence: 'Client work',
    evidenceNote: 'Named dental clients with Ahrefs screenshots (Wincrest: 224 → 1,705 monthly visits) and four SEO roles, 2023–2026.',
    logos: [I.gsc, I.ga, I.semrush],
  },
  {
    id: 'web-development',
    tier: 'primary',
    title: 'Web Development',
    what: 'WordPress website builds with an SEO-ready structure from day one: clean architecture, indexable pages, analytics connected and mobile-first performance.',
    problem: 'A business without a site, or a site that has to be rebuilt before SEO can work.',
    tools: ['WordPress', 'Google Search Console', 'GA4'],
    ideal: 'Small businesses that need a new site built to rank, or an existing WordPress site cleaned up.',
    evidence: 'Professional experience',
    evidenceNote: 'WordPress build for Zltoto Sports (client) and Ivy Flowers (training). Live URLs and screenshots are not in the portfolio yet.',
    logos: [I.wp, I.gsc, I.ga],
  },

  /* ---------- Specialist ---------- */
  {
    id: 'technical-seo',
    tier: 'specialist',
    title: 'Technical SEO',
    what: 'Audits and fixes for crawlability, indexation, redirects, broken links, robots.txt, canonicals, structured data and Core Web Vitals.',
    problem: 'Pages that never get indexed, crawl errors, and schema that fails validation.',
    tools: ['Google Search Console', 'Screaming Frog', 'Ahrefs', 'Rich Results Test'],
    ideal: 'Sites with indexing or crawl problems, or before a content push.',
    evidence: 'Professional experience',
    evidenceNote: 'MyPortal and Jamil Brothers roles; SEO Workout Technical SEO certificate (2025).',
  },
  {
    id: 'on-page-seo',
    tier: 'specialist',
    title: 'On-Page SEO',
    what: 'Keyword research and mapping, titles and meta descriptions, heading structure, internal linking and content re-optimization.',
    problem: 'Content that ranks for nothing, or several pages competing for the same keyword.',
    tools: ['Ahrefs', 'Semrush', 'Google Search Console'],
    ideal: 'Blogs and service pages that get impressions but few clicks.',
    evidence: 'Professional experience',
    evidenceNote: 'Blog creation, re-optimization and cannibalization fixes across agency and real estate roles.',
  },
  {
    id: 'local-seo',
    tier: 'specialist',
    title: 'Local SEO',
    what: 'Google Business Profile optimization and posting, NAP consistency, categories, local citations and location pages.',
    problem: 'A local business missing from the map pack and local AI answers.',
    tools: ['Google Business Profile', 'Local citation sites'],
    ideal: 'Dental clinics, restaurants and other location-based businesses.',
    evidence: 'Professional experience',
    evidenceNote: 'GBP and citation work at MyPortal Marketing; local queries cited for Brush Dental, Pecan Jacks and Fontana Di Vino.',
  },
  {
    id: 'ai-search',
    tier: 'specialist',
    title: 'AI Search Optimization',
    what: 'AIO, AEO and GEO: direct-answer content, FAQ schema and entity signals so pages can be cited in Google AI Overviews and ChatGPT.',
    problem: 'Search moving into AI-generated answers that never mention your business.',
    tools: ['Google AI Overviews', 'ChatGPT', 'Schema markup'],
    ideal: 'Service businesses answering high-intent, location-specific questions.',
    evidence: 'Client work',
    evidenceNote: 'Recorded citations for 7 named clients. Screenshots of the citations are not in the portfolio yet.',
  },
  {
    id: 'wordpress',
    tier: 'specialist',
    title: 'WordPress',
    what: 'Building, maintaining and optimizing WordPress sites: structure, plugins for SEO and speed, and on-page implementation.',
    problem: 'WordPress sites that are slow, messy or hard to update.',
    tools: ['WordPress', 'Elementor'],
    ideal: 'Businesses already on WordPress, or choosing it for a new site.',
    evidence: 'Professional experience',
    evidenceNote: 'Zltoto Sports and Ivy Flowers builds. Elementor use is not yet documented with an example.',
  },
  {
    id: 'lofty',
    tier: 'specialist',
    title: 'Lofty',
    what: 'Real estate websites and CRM on Lofty: page content, on-page SEO and site structure for agent and team sites.',
    problem: 'Real estate sites on Lofty that are not built to rank for local seller and buyer searches.',
    tools: ['Lofty CRM'],
    ideal: 'Real estate agents and teams using Lofty.',
    evidence: 'Needs verification',
    evidenceNote: 'Lofty is listed as a platform in the previous portfolio and resume. A documented Lofty project is still to be added.',
  },
  {
    id: 'website-optimization',
    tier: 'specialist',
    title: 'Website Optimization',
    what: 'Page speed, Core Web Vitals, mobile-first fixes, broken links and redirects, so a site is fast and clean for users and crawlers.',
    problem: 'Slow, error-prone sites that lose visitors and rankings.',
    tools: ['PageSpeed Insights', 'Google Search Console', 'Screaming Frog'],
    ideal: 'Existing sites that need a performance and health pass.',
    evidence: 'Professional experience',
    evidenceNote: 'Core Web Vitals and mobile optimization at MyPortal Marketing and Zltoto Sports.',
  },

  /* ---------- Supporting ---------- */
  {
    id: 'gohighlevel',
    tier: 'supporting',
    title: 'GoHighLevel',
    what: 'GHL funnels, pages, forms and automations for lead capture and follow-up.',
    problem: 'Leads coming in with no system to capture, tag and follow up with them.',
    tools: ['GoHighLevel'],
    ideal: 'Service businesses and agencies running GHL.',
    evidence: 'Supporting capability',
    evidenceNote: 'Examples will be published as clearly labelled GoHighLevel demos or practice projects.',
    logos: [I.ghl],
  },
  {
    id: 'funnels',
    tier: 'supporting',
    title: 'Funnel Building',
    what: 'Landing pages and multi-step funnels: offer, form, thank-you page and follow-up.',
    problem: 'Traffic that lands on a page with no clear next step.',
    tools: ['GoHighLevel', 'WordPress'],
    ideal: 'Campaigns that need a dedicated lead-capture path.',
    evidence: 'Supporting capability',
    evidenceNote: 'No funnel project is documented yet. Future examples will be labelled Demo or Practice Project.',
  },
  {
    id: 'ai-automation',
    tier: 'supporting',
    title: 'AI Automation',
    what: 'AI-assisted workflows: content drafting with Claude, ad creative with Gemini, ChatGPT and Canva, and simple trigger-to-follow-up automations.',
    problem: 'Repetitive marketing tasks that eat time better spent on strategy.',
    tools: ['Claude', 'ChatGPT', 'Gemini', 'Canva'],
    ideal: 'Small teams that want faster content and fewer manual steps.',
    evidence: 'Supporting capability',
    evidenceNote: 'AI-assisted content and ad creative are described in the previous portfolio. No automation workflow is documented yet.',
    logos: [I.claude, I.openai, I.gemini],
  },
  {
    id: 'google-ads',
    tier: 'supporting',
    title: 'Google Ads',
    what: 'Search campaign setup, keyword and ad group structure, budgeting and conversion tracking basics.',
    problem: 'Needing leads now while SEO builds up.',
    tools: ['Google Ads'],
    ideal: 'Small campaigns that complement an SEO plan.',
    evidence: 'Training',
    evidenceNote: 'Google Ads Training, Inspired Filipino Freelancers (September 2023). No client campaign is documented.',
    logos: [I.gads],
  },
  {
    id: 'meta-ads',
    tier: 'supporting',
    title: 'Meta Ads',
    what: 'Facebook and Instagram campaign structure, audiences, retargeting, budgeting and split testing.',
    problem: 'Reaching local audiences and re-engaging site visitors.',
    tools: ['Meta Ads Manager', 'Canva'],
    ideal: 'Lead-generation campaigns for local businesses.',
    evidence: 'Training',
    evidenceNote: 'Facebook Ads Management, ProVA Virtual Assistant (November 2023). No client campaign is documented.',
    logos: [I.meta],
  },
  {
    id: 'social-media',
    tier: 'supporting',
    title: 'Social Media Management',
    what: 'Profile upkeep, content calendars and consistent posting, including Google Business Profile posts.',
    problem: 'Profiles that go quiet and stop signalling an active business.',
    tools: ['Canva', 'Google Business Profile'],
    ideal: 'Local businesses that need a steady posting rhythm.',
    evidence: 'Supporting capability',
    evidenceNote: 'GBP posting is part of documented SEO work. No standalone social media client engagement is documented.',
    logos: [I.facebook, I.instagram],
  },
  {
    id: 'email',
    tier: 'supporting',
    title: 'Email Marketing',
    what: 'Welcome and nurture sequences and simple newsletters that support search and paid traffic.',
    problem: 'Leads that are captured once and never followed up.',
    tools: [],
    ideal: 'Businesses with a list and no follow-up.',
    evidence: 'Supporting capability',
    evidenceNote: 'No email marketing client work or certification is documented. Examples will be labelled Email Marketing Demo.',
  },
  {
    id: 'kajabi',
    tier: 'supporting',
    title: 'Kajabi',
    what: 'Additional platform: page edits and SEO settings for course and membership sites.',
    problem: 'Kajabi pages missing basic on-page SEO.',
    tools: ['Kajabi'],
    ideal: 'Course creators who need on-page SEO help.',
    evidence: 'Needs verification',
    evidenceNote: 'Listed on the resume only. Treated as an additional platform, not established experience.',
  },
]

export const tierMeta: Record<Tier, { label: string; title: string; note: string }> = {
  primary: { label: 'Primary', title: 'SEO & Web Development', note: 'Where the documented results come from.' },
  specialist: { label: 'Specialist', title: 'The disciplines behind them', note: 'Professional experience unless marked.' },
  supporting: { label: 'Supporting', title: 'Growing and supporting services', note: 'Offered with honest labels: training, demo or supporting capability.' },
}

/** The method band on Services. */
export const method = [
  { label: 'Audit', body: 'Crawl, index and intent check before anything changes.', chips: ['Technical audit', 'Keyword research', 'GBP review'] },
  { label: 'Build & optimize', body: 'Fix what blocks growth, then build pages that answer real searches.', chips: ['On-page', 'Schema', 'WordPress'] },
  { label: 'Measure & iterate', body: 'Track traffic, rankings and AI citations; keep what works.', chips: ['GSC', 'GA4', 'Ahrefs'] },
]

/** The tools behind the SEO process workflow (Autopilot on Services). */
export const processTools: { Icon: Icon; label: string }[] = [
  { Icon: MagnifyingGlass, label: 'Search Console' },
  { Icon: ChartLineUp, label: 'Ahrefs · Semrush' },
  { Icon: Bug, label: 'Screaming Frog' },
]
