import type { Evidence } from './evidence'

/**
 * About content: roles, education, credentials, the career timeline and the
 * skill hierarchy. Migrated from the previous portfolio's lib/data.ts and
 * about pages, with claims the evidence did not support removed:
 *   - "I run Google Ads and Meta Ads campaigns end-to-end" (training only)
 *   - "Facebook Ads Internship" (the certificate is a training course)
 *   - "#1 SERP", "dozens of client accounts", "first of several
 *     international clients" (no supporting record)
 */

export type Role = {
  company: string
  role: string
  period: string
  industry: string
  evidence: Evidence
  summary: string
  work: string[]
}

export const experience: Role[] = [
  {
    company: 'The Jamil Brothers Realty Group',
    role: 'SEO Specialist',
    period: 'April 2026 – July 2026',
    industry: 'Real estate · Northern Virginia, USA (remote)',
    evidence: 'Professional experience',
    summary:
      'Content strategy, AI Search Optimization (AIO/AEO) and technical SEO for a Northern Virginia real estate team, with seller-intent content cited in Google AI Overviews and ChatGPT answers.',
    work: [
      'Wrote SEO blogs for home sellers, downsizing and home-equity topics',
      'Published blog posts and content on Kajabi',
      'Re-optimized existing blogs for heading hierarchy, semantic keywords and search intent',
      'Optimized content for Google AI Overviews, ChatGPT and AEO/GEO visibility',
      'Resolved keyword cannibalization with content consolidation and 301 redirects',
      'Fixed FAQ schema validation and structured data issues',
      'Built topical and brand authority through directories, Web 2.0 backlinks and outreach',
      'Audited and repaired broken internal links',
    ],
  },
  {
    company: 'MyPortal Marketing Inc.',
    role: 'SEO Specialist',
    period: 'January 2024 – March 2026',
    industry: 'Digital marketing agency · dental, business brokerage, real estate, e-commerce',
    evidence: 'Professional experience',
    summary:
      'Full-cycle SEO (on-page, technical, off-page and local) across a multi-industry agency client portfolio, including the dental accounts shown on the Projects page.',
    work: [
      'Keyword research, competitor analysis, blog creation and internal linking',
      'Fixed broken links and 404 errors; managed robots.txt disallow rules',
      'Indexing and reindexing; Core Web Vitals and mobile page-speed work',
      'Google Business Profile posting, link building and local citations',
      'GBP optimization: NAP consistency, categories, subcategories, products and services',
    ],
  },
  {
    company: 'Zltoto Sports',
    role: 'SEO Specialist (iGaming client)',
    period: 'August 2023 – November 2023',
    industry: 'iGaming · South Korea',
    evidence: 'Professional experience',
    summary:
      'Built and optimized a WordPress website for an international iGaming client on a limited budget, prioritizing the highest-leverage technical and on-page SEO work.',
    work: [
      'Built the website on WordPress with an SEO-friendly site architecture',
      'On-page SEO focused where it had the most impact under budget',
      'Local SEO and local citations',
      'Google Search Console setup and Core Web Vitals optimization',
      'Mobile-first optimization for speed and usability',
    ],
  },
  {
    company: 'Ivy Flowers and Bouquet Shop',
    role: 'SEO Specialist (hands-on training client)',
    period: 'March 2023 – May 2023',
    industry: 'E-commerce · flowers and gifting',
    evidence: 'Training',
    summary:
      'Built a website from the ground up and set up its on-page and technical SEO foundation as part of hands-on SEO training.',
    work: [
      'Designed and built the website from scratch on WordPress',
      'Google Search Console and Google Analytics 4 setup',
      'XML sitemap submission, indexing and reindexing',
      'Keyword research and meta title / description optimization',
      'On-page SEO and local citation building',
    ],
  },
]

export const education = {
  school: 'Cebu Normal University',
  program: 'Computer Programming & Hardware Servicing',
  years: '2011 – 2012',
}

export const languages = ['English', 'Tagalog', 'Cebuano']

export const industries = [
  'Dental clinics',
  'Real estate',
  'Business brokerage',
  'E-commerce',
  'Restaurants',
  'iGaming',
]

export type Certificate = {
  title: string
  issuer: string
  date: string
  image: string
  thumb: string
  description: string
  evidence: Evidence
  /** Printed on the certificate itself. No verification URL is available. */
  credentialId?: string
  /** The original certificate file, when it was supplied as a PDF. */
  pdf?: string
}

export const certifications: Certificate[] = [
  {
    title: 'Online SEO Bootcamp',
    issuer: 'Pinoy SEO',
    date: 'May 2023',
    image: '/certificates/pinoy-seo-certificate.webp',
    thumb: '/certificates/pinoy-seo-certificate-sm.webp',
    description: 'Foundational SEO training covering core on-page and off-page SEO principles.',
    evidence: 'Certification',
  },
  {
    title: 'SEO Sprint',
    issuer: 'SEO Workout',
    date: '2025 · 15+ hours',
    image: '/certificates/seo-sprint-certificate.webp',
    thumb: '/certificates/seo-sprint-certificate-sm.webp',
    description: 'Applied SEO sprint covering SEO audits, SEO strategy and hands-on execution.',
    evidence: 'Certification',
  },
  {
    title: 'Technical SEO',
    issuer: 'SEO Workout',
    date: '2025 · 15+ hours',
    image: '/certificates/technical-seo-certificate.webp',
    thumb: '/certificates/technical-seo-certificate-sm.webp',
    description: 'Technical SEO training: crawlability, indexability, site health and Core Web Vitals.',
    evidence: 'Certification',
  },
  {
    title: 'Google Ads Training',
    issuer: 'Inspired Filipino Freelancers',
    date: 'September 2023',
    image: '/certificates/google-ads-certificate.webp',
    thumb: '/certificates/google-ads-certificate-sm.webp',
    description: 'Two-day Google Ads training within a Virtual Assistant Skills Enhancement Program.',
    evidence: 'Training',
  },
  {
    title: 'Facebook Ads Management',
    issuer: 'ProVA Virtual Assistant',
    date: 'November 2023',
    image: '/certificates/meta-ads-certificate.webp',
    thumb: '/certificates/meta-ads-certificate-sm.webp',
    description:
      'Ads structure, Ads Manager, campaign types, budgeting, split testing and scaling, and retargeting for lead generation.',
    evidence: 'Training',
  },
  {
    title: 'Digital Marketing VA',
    issuer: 'Margin & Momentum',
    date: 'August 2026 · Cohort 011',
    image: '/certificates/margin-momentum-certificate.webp',
    thumb: '/certificates/margin-momentum-certificate-sm.webp',
    description:
      'Systems-based program on building a digital marketing VA practice: niche clarity, proof of skill, portfolio and profiles, proposal systems and a 30-day client acquisition framework. All seven labs completed.',
    evidence: 'Certification',
    credentialId: 'VALS-001-0234',
  },
  {
    // From public/certificates/gohighlevel-certificate.pdf. The workshop date
    // (September 2026) is confirmed by Igel; the certificate carries no
    // credential ID, so none is given here.
    title: 'Certificate of Participation: 3-Hour Live GoHighLevel Workshop',
    issuer: 'Excelerate Digital Marketing',
    date: 'September 2026',
    image: '/certificates/gohighlevel-certificate.webp',
    thumb: '/certificates/gohighlevel-certificate-sm.webp',
    description: 'Participation in a 3-hour live GoHighLevel workshop.',
    evidence: 'Training',
    pdf: '/certificates/gohighlevel-certificate.pdf',
  },
]

export const timeline = [
  { year: '2023', label: 'Ivy Flowers and Bouquet Shop', detail: 'Hands-on training client: first WordPress build and SEO setup' },
  { year: '2023', label: 'Pinoy SEO Bootcamp', detail: 'Foundational SEO training' },
  { year: '2023', label: 'Zltoto Sports', detail: 'International iGaming client (South Korea): WordPress build and SEO' },
  { year: '2023', label: 'Google Ads & Facebook Ads training', detail: 'Inspired Filipino Freelancers and ProVA courses' },
  { year: '2024', label: 'MyPortal Marketing Inc.', detail: 'Multi-industry agency SEO role begins' },
  { year: '2025', label: 'SEO Workout', detail: 'SEO Sprint and Technical SEO certificates' },
  { year: '2026', label: 'The Jamil Brothers Realty Group', detail: 'Real estate SEO and AI Search Optimization' },
  { year: '2026', label: 'Margin & Momentum', detail: 'Digital Marketing VA certification' },
]

/** The skill hierarchy, strongest evidence first. */
export type SkillTier = { tier: string; note: string; skills: string[] }

export const skillTiers: SkillTier[] = [
  {
    tier: 'Core',
    note: 'Professional and client experience',
    skills: [
      'Technical SEO',
      'On-Page SEO',
      'Off-Page SEO',
      'Local SEO & Google Business Profile',
      'AI Search Optimization (AIO / AEO / GEO)',
      'Keyword research',
      'SEO audits',
      'Schema markup',
      'WordPress website builds',
      'Kajabi blog & content publishing',
      'Lofty CMS & SEO content management',
    ],
  },
  {
    tier: 'Trained',
    note: 'Formal training and certificates',
    skills: ['Google Ads', 'Meta / Facebook Ads', 'Campaign budgeting', 'Audience & retargeting setup', 'GoHighLevel (workshop)'],
  },
  {
    tier: 'Growing',
    note: 'Supporting capabilities, examples to be added',
    skills: [
      'GoHighLevel funnels',
      'AI automation',
      'Email marketing',
      'Social media management',
      'Elementor',
      'Shopify',
      'Duda',
    ],
  },
]
