import type { Evidence } from './evidence'

/**
 * The 3D carousel (FunnelBarrel) and its preview dialog read from here.
 *
 * It holds only work with real screenshots behind it:
 *   - the GoHighLevel practice build (public/images/gohighlevel/, captured
 *     from a practice sub-account named "GHL Specialist Portfolio") plus a
 *     demo funnel for a fictional HVAC company ("ghl hvac *.jpg"), all
 *     labelled Practice project;
 *   - client website homepages (public/images/website design/), labelled
 *     Client work. Each is matched to its client by the domain in the
 *     screenshot's address bar.
 * If the list is ever emptied again, Projects falls back to a "Showcase
 * coming soon" state.
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
/** The HVAC screenshot filenames contain spaces, so encode them for the URL. */
const hvac = (name: string) => `${GHL}/${encodeURIComponent(`${name}.jpg`)}`
/** Client website screenshots; the folder and filenames contain spaces too. */
const site = (name: string) => `/images/${encodeURIComponent('website design')}/${encodeURIComponent(`${name}.jpg`)}`

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
  {
    id: 'ghl-hvac-funnel',
    label: 'HVAC service request funnel',
    category: 'Funnel',
    evidence: 'Practice project',
    platform: 'GoHighLevel Funnels',
    desc: 'A demo funnel for Summit Air & Heat, a fictional HVAC company in Phoenix, Arizona: a service page with repair and maintenance options, process steps, FAQs and calls to action, leading to a service request form and a request-received page. Labelled on the page itself as a fictional portfolio demo.',
    thumb: '/showcase/thumbs/ghl-hvac-funnel.jpeg',
    shots: [
      { src: hvac('ghl hvac service'), width: 1856, height: 900, alt: 'HVAC demo funnel hero: "Need HVAC Service? Request Help Today." with a Request HVAC Service button beside an outdoor AC unit', caption: 'HVAC Service Page: hero' },
      { src: hvac('ghl hvac service1'), width: 1768, height: 818, alt: 'HVAC service cards under "Expert Repairs & Maintenance": Emergency AC Repair, Heating Repair, HVAC Maintenance and Other HVAC Service', caption: 'HVAC Repairs & Maintenance' },
      { src: hvac('ghl hvac service2'), width: 1731, height: 649, alt: '"How Our Process Works" section with four steps: Submit Your Request, We Review Your Request, We Contact You, Service Is Scheduled', caption: 'HVAC Service Process' },
      { src: hvac('ghl hvac service3'), width: 1568, height: 683, alt: '"Common Questions" section with five HVAC service FAQs beside Service Request Review and Clear Service Information notes', caption: 'HVAC Service FAQs' },
      { src: hvac('ghl hvac service4'), width: 1748, height: 424, alt: 'Blue call-to-action band: "Ready to Request HVAC Service?" with a Request HVAC Service button and the note "Fictional portfolio demo funnel · Phoenix, Arizona"', caption: 'HVAC Service Call to Action' },
      { src: hvac('ghl hvac service solutions'), width: 1886, height: 840, alt: '"Comprehensive HVAC Solutions" section listing Emergency HVAC Repair, AC Repair, Heating Repair, HVAC Maintenance and HVAC Service', caption: 'HVAC Service Solutions' },
      { src: hvac('ghl hvac service request form'), width: 1097, height: 757, alt: '"Request HVAC Service" form with name, phone, email, service type, urgency, property type, ZIP code and preferred contact method fields', caption: 'HVAC Service Request Form' },
      { src: hvac('ghl hvac request received page'), width: 896, height: 803, alt: '"Request Received" confirmation page for Summit Air & Heat with a four-step "What Happens Next" list', caption: 'HVAC Request Received Page' },
    ],
  },
  {
    id: 'web-birthing-center-long-island',
    label: 'Birthing Center Long Island',
    category: 'Website',
    evidence: 'Client work',
    platform: 'Client website',
    desc: 'Homepage of the live Birthing Center Long Island site, a client web design.',
    thumb: '/showcase/thumbs/web-birthing-center-long-island.jpeg',
    url: 'https://birthingcenterlongisland.com/',
    shots: [
      { src: site('birthing center long island'), width: 1895, height: 963, alt: 'Birthing Center Long Island homepage: navigation, holiday announcement bar and the hero "A Birth Center on Long Island, Led by Midwives" with Contact Us and Schedule Tour buttons', caption: 'Homepage, birthingcenterlongisland.com' },
    ],
  },
  {
    id: 'web-birthing-center-nyc',
    label: 'Birthing Center NYC',
    category: 'Website',
    evidence: 'Client work',
    platform: 'Client website',
    desc: 'Homepage of the live Birthing Center NYC site, a client web design.',
    thumb: '/showcase/thumbs/web-birthing-center-nyc.jpeg',
    url: 'https://birthingcenternyc.com/',
    shots: [
      { src: site('birthing center nyc'), width: 1895, height: 968, alt: 'Birthing Center NYC homepage: navigation, holiday announcement bar and the hero "Holistic Birthing Center NYC" with Contact Us and Schedule Tour buttons', caption: 'Homepage, birthingcenternyc.com' },
    ],
  },
  {
    id: 'web-holistic-midwifery-ny',
    label: 'Holistic Midwifery New York',
    category: 'Website',
    evidence: 'Client work',
    platform: 'Client website',
    desc: 'Homepage of the live Holistic Midwifery New York site, a client web design.',
    thumb: '/showcase/thumbs/web-holistic-midwifery-ny.jpeg',
    url: 'https://holisticmidwiferyny.net/',
    shots: [
      { src: site('holistic midwifery ny'), width: 1895, height: 966, alt: 'Holistic Midwifery New York homepage: navigation, holiday announcement bar and the hero "Holistic Midwifery New York" with the tagline Home Birth, Birth Center, Planned Hospital Birth', caption: 'Homepage, holisticmidwiferyny.net' },
    ],
  },
  {
    id: 'web-jamil-brothers',
    label: 'The Jamil Brothers Realty Group',
    category: 'Website',
    evidence: 'Client work',
    platform: 'Lofty CMS',
    desc: 'Homepage of the live Jamil Brothers Realty Group site. My work here is Lofty CMS and SEO content management; developing the Lofty platform itself is not claimed.',
    thumb: '/showcase/thumbs/web-jamil-brothers.jpeg',
    url: 'https://www.thejamilbrothers.com/',
    shots: [
      { src: site('thejamil brothers'), width: 1891, height: 965, alt: 'The Jamil Brothers Realty Group homepage: navigation and the hero "Top-Rated DMV Real Estate Agents" with a Buy, Sell and Valuation home search', caption: 'Homepage, thejamilbrothers.com' },
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
