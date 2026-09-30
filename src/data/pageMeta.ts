/**
 * Title and description for every route, in one place. Two readers:
 *   - usePageMeta sets them on client-side navigation;
 *   - the route-meta plugin in vite.config.ts stamps them into each route's
 *     own HTML file at build time, so the served source already matches.
 * Keys are the route's path segment (`home` is "/", `notFound` is 404.html).
 * Titles are 50-60 characters, descriptions 150-160.
 */
export const PAGE_META = {
  home: {
    title: 'Igel G. Cudiera | Full-Stack SEO & Web Development',
    description:
      'Full-Stack SEO & Web Development | GoHighLevel Funnels & AI Automation. Technical, on-page and local SEO, WordPress builds and AI search optimization.',
  },
  about: {
    title: 'About Igel G. Cudiera | SEO Specialist & Web Developer',
    description:
      'Meet Igel G. Cudiera, an SEO specialist and WordPress developer. See four SEO roles since 2023, certificates and training, career timeline and core skills.',
  },
  projects: {
    title: 'SEO Projects & Case Studies | Igel G. Cudiera Portfolio',
    description:
      'Documented SEO results with Ahrefs screenshots: Wincrest Orthodontics grew from 224 to 1,705 monthly organic visits, plus dental SEO and AI search citations.',
  },
  services: {
    title: 'Technical SEO & Web Development Services | Igel G. Cudiera',
    description:
      'SEO and web development, with specialist technical, on-page, local and AI search SEO, plus supporting GoHighLevel, automation, ads, social and email services.',
  },
  testimonials: {
    title: 'Client Testimonials & Verified Feedback | Igel G. Cudiera',
    description:
      'Read verified client testimonials about SEO and web development work with Igel Cudiera, shared in their own words and lightly edited only for readability.',
  },
  faqs: {
    title: 'SEO, Web Development & Hiring FAQs | Igel G. Cudiera',
    description:
      'Straight answers before you hire: working arrangements, pricing, SEO, AI search, web development, GoHighLevel funnels, AI automation and paid ads questions.',
  },
  contact: {
    title: 'Contact Igel G. Cudiera | SEO & Web Development Projects',
    description:
      'Contact Igel for part-time, project-based, freelance, contract or monthly retainer SEO and web development work. Expect a reply to your message within 24 hours.',
  },
  notFound: {
    title: 'Page Not Found | Igel G. Cudiera SEO & Web Development',
    description:
      'This page does not exist on the portfolio. Head back to the home page or browse the about, projects, services, testimonials, FAQs and contact pages instead.',
  },
} as const

export type PageKey = keyof typeof PAGE_META
