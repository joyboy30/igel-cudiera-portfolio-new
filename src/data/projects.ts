import { NEEDS_VERIFICATION, type Evidence } from './evidence'

/**
 * Projects: documented SEO work only. Every client, query, metric and
 * screenshot below comes from the previous portfolio (lib/data.ts,
 * components/sections/case-studies.tsx and public/images/case-studies).
 *
 * Nothing is invented. Where the source material does not settle a fact -
 * dates, employer context, live URLs - the field says NEEDS_VERIFICATION.
 */

export type Shot = { src: string; thumb: string; label: string }

const shot = (file: string, label: string): Shot => ({
  src: `/case-studies/${file}.webp`,
  thumb: `/case-studies/thumbs/${file}.webp`,
  label,
})

/* ---------- Flagship: Wincrest Orthodontics ---------- */

export const wincrest = {
  client: 'Wincrest Orthodontics',
  industry: 'Dental / orthodontics',
  evidence: 'Client work' as Evidence,
  metric: { before: 224, after: 1705, unit: 'average monthly organic visits', source: 'Ahrefs' },
  growth: '+661%',
  role: 'SEO Specialist',
  platform: `Website platform ${NEEDS_VERIFICATION}`,
  engagement: `Engagement dates and employer context ${NEEDS_VERIFICATION}`,
  liveUrl: null as string | null,
  work: ['Keyword optimization', 'Guest-post link building'],
  workNote: `Work performed as recorded in the previous portfolio's dental SEO descriptions. Per-client scope ${NEEDS_VERIFICATION}.`,
  tools: ['Ahrefs'],
  shots: [
    shot('wincrest1', 'Wincrest Orthodontics: Ahrefs average traffic, starting point (224)'),
    shot('wincrest2', 'Wincrest Orthodontics: Ahrefs average traffic, later reading (1,705)'),
    shot('wincrest3', 'Wincrest Orthodontics: Ahrefs overview'),
  ],
}

/* ---------- Dental SEO programs ---------- */

export type DentalRow = { client: string; before: number; after: number; action: string; shots: Shot[] }

const pair = (file: string, client: string) => [
  shot(`${file}1`, `${client}: Ahrefs organic traffic, before`),
  shot(`${file}2`, `${client}: Ahrefs organic traffic, after`),
]

export const dentalRows: DentalRow[] = [
  { client: 'Androscoggin Dental Group', before: 202, after: 282, action: 'Keyword optimization + guest-post link building', shots: pair('androscoggindentalgroup', 'Androscoggin Dental Group') },
  { client: 'Batavia Family Dental', before: 581, after: 812, action: 'Keyword optimization + guest-post link building', shots: pair('batavia', 'Batavia Family Dental') },
  { client: 'Comfort Dental Spa', before: 176, after: 324, action: 'Keyword optimization + guest-post link building', shots: pair('comfortdental', 'Comfort Dental Spa') },
  { client: 'Crosstown Dental', before: 32, after: 124, action: 'First SEO program: keyword optimization + guest-post link building', shots: pair('crosstowndental', 'Crosstown Dental') },
  { client: 'Dental Horizons', before: 90, after: 124, action: 'Keyword optimization + guest-post link building', shots: pair('dentalhorizons', 'Dental Horizons') },
  { client: 'Orillia Dentistry', before: 129, after: 188, action: 'Keyword optimization + guest-post link building', shots: pair('orillia', 'Orillia Dentistry') },
]

export const growthOf = (r: { before: number; after: number }) =>
  `+${Math.round(((r.after - r.before) / r.before) * 100)}%`

/** Screenshot-only dental results: Ahrefs overviews, no metric claimed. */
export const dentalOverviews: Shot[] = [
  shot('annarborsmiles', 'Ann Arbor Smiles: Ahrefs overview'),
  shot('smilequestdental', 'Smile Quest Dental: Ahrefs overview'),
  shot('toothology', 'Toothology: Ahrefs overview'),
  shot('thedentalhealthpractice', 'The Dental Health Practice: Ahrefs overview'),
  shot('skyviewdental', 'Skyview Dental: Ahrefs overview'),
]

/** Every evidence screenshot, for the results strip. */
export const allShots: Shot[] = [
  ...wincrest.shots,
  ...dentalRows.flatMap((r) => r.shots),
  ...dentalOverviews,
]

/* ---------- AI Search Visibility ---------- */

export type AICase = {
  id: string
  client: string
  industry: string
  aio: string[]
  chatgpt: string[]
  chatgptNote?: string
  focus: string[]
}

/** Queries where the client's site appeared in Google AI Overviews and/or
 *  ChatGPT answers, as recorded in the previous portfolio. No screenshots of
 *  these citations exist yet. */
export const aiCases: AICase[] = [
  {
    id: 'jamil',
    client: 'The Jamil Brothers Realty Group',
    industry: 'Residential real estate · Northern Virginia',
    aio: [
      'How to sell a home in Fairfax County',
      'What is the cost in selling a home in West Virginia?',
      'How Do You Sell a Home in Columbia, MD?',
      'Are Sellers More Willing to Negotiate in Northern Virginia?',
      'Is It Harder to Sell a Townhouse or Single-Family Home in Prince William County?',
      'How Do You Sell a House That Needs Repairs in West Virginia?',
      'When Is the Best Time to Sell a House in Baltimore County, MD?',
      'How Much Does Selling a House in Loudoun County Really Cost?',
    ],
    chatgpt: [
      'How to sell a home in Fairfax County',
      'What is the cost in selling a home in West Virginia?',
      'How Do You Sell a Home in Columbia, MD?',
      'Are Sellers More Willing to Negotiate in Northern Virginia?',
      'Is It Harder to Sell a Townhouse or Single-Family Home in Prince William County?',
      'When Is the Best Time to Sell a House in Baltimore County, MD?',
      'How Much Does Selling a House in Loudoun County Really Cost?',
    ],
    focus: ['Local real estate SEO', 'Seller-intent keywords', 'Long-tail keyword research', 'Informational content', 'AI Search Optimization'],
  },
  {
    id: 'explorevahomes',
    client: 'The Jamil Brothers Realty Group & ExploreVAHomes',
    industry: 'Residential real estate',
    aio: ['How Do You Sell an Investment Property in Fairfax and Minimize Taxes?'],
    chatgpt: ['How Do You Sell an Investment Property in Fairfax and Minimize Taxes?'],
    focus: ['Investment property SEO', 'Tax-related content', 'Long-tail search', 'Local real estate marketing'],
  },
  {
    id: 'first-choice',
    client: 'First Choice Business Brokers',
    industry: 'Business brokerage',
    aio: [
      'How do I sell my business in Los Angeles?',
      'How do I connect with business buyers in Los Angeles?',
      'What is the best way to sell a small business in Los Angeles?',
      'How do I sell my business in Las Vegas?',
      'How can I find a buyer for my business in Atlanta, GA?',
    ],
    chatgpt: [],
    chatgptNote: 'This project focused on Google AI Overviews. No ChatGPT citations are claimed.',
    focus: ['Business brokerage SEO', 'Buyer and seller intent', 'Location-based SEO', 'Long-tail keywords'],
  },
  {
    id: 'brush-dental',
    client: 'Brush Dental Studio',
    industry: 'Local dental practice · Saint Bonifacius, MN',
    aio: ['Dentist in Saint Bonifacius, MN', 'How much does a dental cleaning cost in Saint Bonifacius, MN?'],
    chatgpt: ['Dentist in Saint Bonifacius, MN', 'How much does a dental cleaning cost in Saint Bonifacius, MN?'],
    focus: ['Local SEO', 'Dental service pages', 'Service pricing content', 'Location-based SEO'],
  },
  {
    id: 'patient-news',
    client: 'Patient News',
    industry: 'Dental marketing & dental SEO',
    aio: ['What is the dental marketing agency in Haliburton Canada?', 'What is the dental SEO agency in Haliburton Canada?'],
    chatgpt: ['What is the dental marketing agency in Haliburton Canada?', 'What is the dental SEO agency in Haliburton Canada?'],
    focus: ['Dental marketing', 'Dental SEO', 'Local SEO', 'Healthcare content'],
  },
  {
    id: 'pecan-jacks',
    client: 'Pecan Jacks',
    industry: 'Restaurant & dessert shop · Grayton Beach',
    aio: ['What are the best gourmet desserts to try in Grayton Beach?', 'What is the best ice cream in Grayton Beach?'],
    chatgpt: ['What are the best gourmet desserts to try in Grayton Beach?', 'What is the best ice cream in Grayton Beach?'],
    focus: ['Restaurant SEO', 'Local discovery searches', '"Best of" queries', 'Food & hospitality SEO'],
  },
  {
    id: 'fontana-di-vino',
    client: 'Fontana Di Vino',
    industry: 'Italian restaurant · Davidson, NC',
    aio: ['What is the best Italian restaurant in Davidson, NC?', 'Date night restaurants Davidson, NC', 'Best Italian restaurant Davidson, NC'],
    chatgpt: ['Best Italian restaurant Davidson, NC'],
    focus: ['Restaurant SEO', 'Local SEO', 'Recommendation-based searches', 'Local dining discovery'],
  },
]

export const aiQueryCount = aiCases.reduce((n, c) => n + c.aio.length, 0)

/* ---------- Industry case studies (the build stack) ---------- */

export type IndustryCase = {
  id: string
  kicker: string
  title: string
  desc: string
  evidence: Evidence
  client: string
  industry: string
  role: string
  platform: string
  work: string[]
  tools: string[]
  results: string[]
  caseIds: string[]
  liveUrl: string | null
}

export const industryCases: IndustryCase[] = [
  {
    id: 'real-estate',
    kicker: 'Real estate SEO',
    title: 'The Jamil Brothers Realty Group',
    desc: 'Seller-intent content cited in Google AI Overviews for 9 county-level queries.',
    evidence: 'Professional experience',
    client: 'The Jamil Brothers Realty Group',
    industry: 'Residential real estate · Northern Virginia',
    role: 'SEO Specialist (April – July 2026)',
    platform: `Website platform ${NEEDS_VERIFICATION}`,
    work: [
      'SEO blogs for home sellers, downsizing and home equity',
      'Re-optimized existing posts for heading hierarchy, semantic keywords and intent',
      'Resolved keyword cannibalization with consolidation and 301 redirects',
      'Fixed FAQ schema validation and structured data',
      'Directories, Web 2.0 backlinks and outreach for topical authority',
      'Audited and repaired broken internal links',
    ],
    tools: ['Google Rich Results Test'],
    results: [
      'Cited in Google AI Overviews for 8 seller-intent queries (plus 1 with ExploreVAHomes)',
      'Cited in ChatGPT answers for 7 of the same queries (plus 1 with ExploreVAHomes)',
    ],
    caseIds: ['jamil', 'explorevahomes'],
    liveUrl: null,
  },
  {
    id: 'brokerage',
    kicker: 'Business brokerage SEO',
    title: 'First Choice Business Brokers',
    desc: 'Buyer- and seller-intent pages cited in Google AI Overviews across Los Angeles, Las Vegas and Atlanta.',
    evidence: 'Client work',
    client: 'First Choice Business Brokers',
    industry: 'Business brokerage',
    role: `SEO Specialist · engagement context ${NEEDS_VERIFICATION}`,
    platform: `Website platform ${NEEDS_VERIFICATION}`,
    work: ['Buyer-intent content', 'Long-tail keyword targeting', 'Location-specific optimization'],
    tools: [],
    results: ['Cited in Google AI Overviews for 5 location-based queries'],
    caseIds: ['first-choice'],
    liveUrl: null,
  },
  {
    id: 'local',
    kicker: 'Local & restaurant SEO',
    title: 'Brush Dental · Pecan Jacks · Fontana Di Vino',
    desc: 'Local "best of" and service queries cited in both Google AI Overviews and ChatGPT.',
    evidence: 'Client work',
    client: 'Brush Dental Studio, Pecan Jacks, Fontana Di Vino',
    industry: 'Local dental practice and restaurants',
    role: `SEO Specialist · engagement context ${NEEDS_VERIFICATION}`,
    platform: `Website platforms ${NEEDS_VERIFICATION}`,
    work: ['Local SEO', 'Service and pricing content', 'Location-based optimization for "best of" searches'],
    tools: [],
    results: [
      'Brush Dental Studio: 2 queries in AI Overviews and ChatGPT',
      'Pecan Jacks: 2 queries in AI Overviews and ChatGPT',
      'Fontana Di Vino: 3 queries in AI Overviews, 1 in ChatGPT',
    ],
    caseIds: ['brush-dental', 'pecan-jacks', 'fontana-di-vino'],
    liveUrl: null,
  },
]

/* ---------- Website builds (documented, no screenshots yet) ---------- */

export type WebBuild = {
  name: string
  platform: string
  evidence: Evidence
  role: string
  development: string[]
  seo: string[]
  liveUrl: string | null
  screenshots: 'none'
}

export const webBuilds: WebBuild[] = [
  {
    name: 'Zltoto Sports',
    platform: 'WordPress',
    evidence: 'Professional experience',
    role: 'SEO Specialist (iGaming client) · August – November 2023',
    development: ['Built the website on WordPress', 'SEO-friendly site architecture', 'Mobile-first optimization for speed and usability'],
    seo: ['On-page SEO under a limited budget', 'Local SEO and citations', 'Google Search Console setup and Core Web Vitals'],
    liveUrl: null,
    screenshots: 'none',
  },
  {
    name: 'Ivy Flowers and Bouquet Shop',
    platform: 'WordPress',
    evidence: 'Training',
    role: 'Hands-on training client · March – May 2023',
    development: ['Designed and built the website from scratch on WordPress'],
    seo: ['Google Search Console and GA4 setup', 'XML sitemap and indexing', 'Keyword research, meta titles and descriptions', 'Local citations'],
    liveUrl: null,
    screenshots: 'none',
  },
]
