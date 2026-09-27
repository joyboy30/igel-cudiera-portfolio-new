export type QA = { q: string; a: string }
export type FaqGroup = { id: string; label: string; items: QA[] }

/**
 * FAQs for the /faqs page. Condensed from the previous portfolio's 21 answers
 * (components/sections/faq.tsx), with claims the evidence does not support
 * removed ("I run Google Ads and Meta Ads campaigns end-to-end", "more than a
 * dozen dental accounts", a two-year Wincrest timeline), plus new answers on
 * working arrangements, GoHighLevel, funnels, automation and Lofty that state
 * the current evidence plainly.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'working-together',
    label: 'Working together',
    items: [
      {
        q: 'What kind of work arrangements do you take?',
        a: 'Part-time, project-based, freelance, contract, monthly retainers and long-term remote support. My current OnlineJobs.ph listing is part-time, 4 hours a day. For a fixed project I quote on scope; for ongoing SEO a monthly retainer usually fits best.',
      },
      {
        q: 'Where are you based and what hours do you work?',
        a: 'Medellin, Cebu, Philippines (GMT+8). I work remotely and have worked with clients in the United States, Canada and South Korea, so I am used to overlapping with North American and Asian business hours.',
      },
      {
        q: 'How do we start?',
        a: 'Send a message through the contact form, email or WhatsApp with your site and what you need. A small first step, like a technical SEO audit or a single page fix, is a low-risk way to see if we work well together before a longer engagement.',
      },
      {
        q: 'How much does it cost?',
        a: 'It depends on scope. A one-time technical audit is the smallest engagement; ongoing SEO management is priced monthly. I price on the actual work rather than a flat package, because a local dental clinic and an e-commerce store need very different effort.',
      },
    ],
  },
  {
    id: 'seo',
    label: 'SEO',
    items: [
      {
        q: 'What SEO results can you show?',
        a: 'The clearest one is Wincrest Orthodontics: average monthly organic traffic went from 224 to 1,705 in Ahrefs. Six more dental accounts grew between 38% and 288% with keyword optimization and guest-post link building. The screenshots are on the Projects page.',
      },
      {
        q: 'What is technical SEO and why does it matter?',
        a: 'Technical SEO makes sure search engines and AI crawlers can reach, render and understand a site: robots.txt, sitemaps, canonicals, redirects, internal links, structured data and Core Web Vitals. If a page cannot be crawled or indexed, no content or links will help it rank.',
      },
      {
        q: 'What is included in a technical SEO audit?',
        a: 'Crawlability and indexation, site speed and Core Web Vitals, architecture and internal links (broken links, redirect chains, orphan pages), structured data validation, and duplicate or cannibalized content. You get a prioritized fix list ranked by impact and effort, not a raw crawl export.',
      },
      {
        q: 'How does local SEO help a small business?',
        a: 'Local SEO gets a business into map-pack and "near me" results through Google Business Profile optimization, NAP consistency, citations and location pages. Those searches carry strong intent, so they turn into calls and visits.',
      },
      {
        q: 'How long does SEO take to show results?',
        a: 'Usually 3 to 6 months for measurable movement and longer for compounding growth, depending on the site’s starting condition and competition. Local SEO tends to move faster. Sites with technical problems need those fixed first.',
      },
      {
        q: 'How do you fix keyword cannibalization?',
        a: 'Find the pages competing for the same queries in Search Console or Ahrefs, decide whether to merge or differentiate them, then consolidate into the strongest page with 301 redirects and updated internal links. I did this on a real estate blog where several posts overlapped.',
      },
      {
        q: 'Which SEO tools do you use?',
        a: 'Google Search Console, Google Analytics 4, Ahrefs, Semrush, Screaming Frog and Google Business Profile, plus Claude and ChatGPT for drafting and research, with every piece edited by hand.',
      },
    ],
  },
  {
    id: 'ai-search',
    label: 'AI search',
    items: [
      {
        q: 'What is the difference between AIO, AEO, GEO and traditional SEO?',
        a: 'Traditional SEO ranks a page in the classic results. AI Search Optimization (AIO) structures a whole site for AI retrieval, Answer Engine Optimization (AEO) formats content so a direct answer can be lifted from it, and Generative Engine Optimization (GEO) focuses on being cited when tools like ChatGPT combine sources. All three sit on top of solid technical SEO, not instead of it.',
      },
      {
        q: 'Can you get my business cited in Google AI Overviews or ChatGPT?',
        a: 'Nobody can guarantee it. What has worked for my clients is specific, question-shaped content with a direct answer near the top, clean headings, FAQ schema and consistent entity signals. That approach got seven client sites cited for real estate, dental, brokerage and restaurant queries, all listed on the Projects page.',
      },
    ],
  },
  {
    id: 'web',
    label: 'Web development',
    items: [
      {
        q: 'Do you build websites?',
        a: 'Yes, mainly on WordPress, built to be SEO-ready from launch. I built the Zltoto Sports site for an iGaming client and the Ivy Flowers site during hands-on training. Screenshots and live links for these builds are still being gathered, and the Projects page says so.',
      },
      {
        q: 'Do you work with Elementor, Lofty, Shopify, Duda or Kajabi?',
        a: 'These are platforms I list as tools. WordPress is where my documented build work is. For Elementor, Lofty, Shopify, Duda and Kajabi I will add examples to the showcase as they are verified, and I will tell you honestly how much I have done on a platform before you hire me for it.',
      },
      {
        q: 'Can you speed up my existing site?',
        a: 'Yes. Website optimization covers Core Web Vitals, mobile-first fixes, image and script weight, broken links and redirects. I have done this work on client sites at MyPortal Marketing and for Zltoto Sports.',
      },
    ],
  },
  {
    id: 'ghl-automation',
    label: 'GoHighLevel & automation',
    items: [
      {
        q: 'Do you build GoHighLevel funnels and automations?',
        a: 'GoHighLevel funnels and automations are services I offer and am actively building. I do not have documented GHL client work yet, so examples I publish will be labelled as GoHighLevel demos or practice projects until client work is verified.',
      },
      {
        q: 'What does AI automation mean in your work?',
        a: 'Today it means AI-assisted content (drafting and research with Claude, reviewed by hand) and AI ad creative with Gemini, ChatGPT and Canva. Trigger-to-follow-up automation flows are a growing service, and any examples will be labelled as demos.',
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Paid ads & marketing',
    items: [
      {
        q: 'Do you manage Google Ads and Meta Ads?',
        a: 'I am trained in both: Google Ads Training (Inspired Filipino Freelancers, 2023) and Facebook Ads Management (ProVA, 2023). I can set up and run small campaigns that complement SEO, but I do not have documented client ad campaigns yet, and I will not claim results I cannot show.',
      },
      {
        q: 'Can Google Ads and SEO work together?',
        a: 'Yes. Paid search brings leads while SEO builds up, and ad data shows which keywords convert, which is useful for choosing what to target organically. A keyword that converts well in ads usually deserves its own optimized page.',
      },
      {
        q: 'Do you offer social media management and email marketing?',
        a: 'Yes, as supporting services: consistent posting, Google Business Profile posts, and simple welcome or nurture email sequences. These are not where my documented results are, and examples will be labelled as demos until client work exists.',
      },
    ],
  },
]

/** Flat list, used by the Home FAQs card. */
export const FAQS: QA[] = FAQ_GROUPS.flatMap((g) => g.items)
