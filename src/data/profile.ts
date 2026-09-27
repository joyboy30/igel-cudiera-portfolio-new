/**
 * Identity. Everything that says who Igel is lives here: name, photo,
 * contact routes, the Home headline and the availability line.
 *
 * Every value is taken from the previous portfolio (site-config.ts, hero.tsx,
 * about.tsx) or from Igel's own instructions for this rebuild. Nothing here is
 * inferred.
 *
 * Contact links live here once and every component reads them from this file
 * (rail, Contact, the phone header). The WhatsApp link uses the number Igel
 * supplied for it; the number itself is not printed anywhere as text.
 */

import { Briefcase, ChartLineUp, Clock, type Icon } from '@/components/slab'

const WHATSAPP = 'https://wa.me/639196098689'
const LINKEDIN = 'https://www.linkedin.com/in/igelcudiera/'
const GITHUB = 'https://github.com/joyboy30'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the tick next to the name. */
  verifiedLabel: string
  email: string
  location: string
  timezone: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  /** The intro types this, then flies it into the Home headline. */
  displayName: { line1: string; line2: string }
  hero: {
    /** The subheading under the headline. */
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  /** Engagement types, shown as chips on Home and Contact. */
  engagements: string[]
  /** The current OnlineJobs.ph listing. Shown small, never as the pitch. */
  availability: { mode: string; hours: string; rate: string; source: string }
  resumeSrc: string
  whatsapp: string
  linkedin: string
  github: string
  /** Third-party talent profile linked from the previous hero. */
  sova: string
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Igel G. Cudiera',
  firstName: 'Igel',
  handle: 'SEO & Web Development',
  role: 'Cebu, PH · Remote',
  avatarSrc: '/images/avatar.webp',
  verifiedLabel: 'SEO training: Pinoy SEO (2023), SEO Workout (2025)',
  email: 'igel.cudiera31@gmail.com',
  location: 'Medellin, Cebu, Philippines',
  timezone: 'GMT+8 (Philippine Time)',
  stats: [
    { value: '3+ yrs', label: 'Hands-on SEO', Icon: Briefcase },
    { value: '224→1,705', label: 'Wincrest monthly visits', Icon: ChartLineUp },
    { value: 'GMT+8', label: 'Remote from Cebu', Icon: Clock },
  ],
  displayName: {
    line1: 'Full-Stack SEO & Web Development |',
    line2: 'GoHighLevel Funnels & AI Automation',
  },
  hero: {
    body: 'Technical, On-Page & Local SEO • WordPress Web Development • GHL Funnel Building • AI Automation • Social Media Management • Email Marketing • Google Ads • Meta Ads',
    portraitSrc: '/images/igel-cudiera.webp',
    portraitAlt: 'Igel G. Cudiera, SEO specialist and web developer',
  },
  engagements: ['Part-time', 'Project-based', 'Freelance', 'Contract', 'Monthly retainer', 'Long-term remote support'],
  availability: { mode: 'Part-time', hours: '4 hours/day', rate: '$9/hour', source: 'OnlineJobs.ph' },
  resumeSrc: '/resume/Igel-Cudiera-Resume.pdf',
  whatsapp: WHATSAPP,
  linkedin: LINKEDIN,
  github: GITHUB,
  sova: 'https://sovatalents.com/talent/igel-cudiera/',
  socials: [
    { label: 'WhatsApp', href: WHATSAPP, iconPath: '/icons/social/whatsapp.svg' },
    { label: 'LinkedIn', href: LINKEDIN, iconPath: '/icons/social/linkedin.svg' },
    { label: 'GitHub', href: GITHUB, iconPath: '/icons/social/github.svg' },
  ],
}
