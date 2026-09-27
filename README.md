# Igel G. Cudiera — Portfolio

Full-Stack SEO & Web Development | GoHighLevel Funnels & AI Automation.

Built on [brewed-ops/portfolio-template](https://github.com/brewed-ops/portfolio-template) (MIT, see `LICENSE`):
Vite + React 19 + TypeScript, react-router, three.js (contour background and 3D showcase carousel), GSAP
(the SEO process workflow on Services), Lenis smooth scroll, light/dark themes and an accessibility menu.

## Pages

| Route | Content |
|---|---|
| `/` | Headline, subheading, availability, tools marquee, bento index of every page |
| `/about` | Background, four SEO roles, certificates (with lightbox), timeline, skill tiers |
| `/projects` | Wincrest case study, dental SEO programs, AI search citations, industry case studies, evidence gallery, websites & funnels showcase |
| `/services` | Primary, specialist and supporting service tiers, each with an evidence label |
| `/testimonials` | Empty state until verified testimonials exist |
| `/faqs` | Grouped FAQs |
| `/contact` | Engagement types, direct contact routes, contact form |

There is no blog.

## Where the content lives

Everything factual is in `src/data/`:

- `profile.ts` — name, headline, contact routes, availability
- `about.ts` — experience, education, certifications, timeline, skills
- `projects.ts` — case studies, metrics, screenshots, AI-search queries, website builds
- `services.ts` — service tiers and evidence notes
- `faqs.ts` — FAQ groups
- `showcase.ts` — the 3D carousel items (currently empty on purpose)
- `evidence.ts` — the evidence labels (Client work, Professional experience, Training, …)

Anything not yet verified is marked `[NEEDS VERIFICATION]` in the data. Search for it before publishing updates.

## Evidence rule

Never upgrade a claim. Training stays training, demos stay demos, and nothing without proof is shown as
client work. Every project, role, service and certificate carries an evidence label.

## Adding showcase items (websites, funnels, GHL / automation demos)

See the comment at the top of `src/data/showcase.ts`. Screenshot-only items need a 3:4 thumbnail in
`public/showcase/thumbs/`; local demo pages go in `public/showcase/` and `npm run thumbs` renders their
thumbnails. When the list has items, the Projects page shows the 3D carousel instead of the
"Showcase coming soon" state.

## Search visibility: noindex

The site is public but intentionally **noindex**:

- `index.html` has `<meta name="robots" content="noindex, nofollow">` (and a `googlebot` equivalent).
- `vercel.json` sends `X-Robots-Tag: noindex, nofollow` on every path.
- `public/robots.txt` allows crawling on purpose, so crawlers can actually read the noindex directive.

## Scripts

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve dist/ locally
npm run lint
npm run thumbs     # render showcase demo thumbnails
```

## Deploying

`vercel.json` includes the SPA rewrite (deep links like `/projects` load `index.html`), the noindex header, and
redirects from the previous site's URLs (`/experience`, `/certifications`, `/case-studies`, `/services/*`,
`/blog*`).
