// Renders 3:4 carousel thumbnails for local showcase demos, with the local
// Playwright (npx playwright install chromium, or set PW_CHANNEL=msedge to use
// the installed Edge).
//
//   public/showcase/<name>.html  ->  public/showcase/thumbs/<name>.jpeg (1080x1440)
//
// Then add an entry to src/data/showcase.ts with
//   demo: '/showcase/<name>.html', thumb: '/showcase/thumbs/<name>.jpeg'
// Screenshot-only items do not need this script: drop a 3:4 image in
// public/showcase/thumbs/ yourself.
//
// Run: npm run thumbs
import { existsSync, readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'

const dir = join(process.cwd(), 'public', 'showcase')
if (!existsSync(dir)) {
  console.log('No public/showcase folder yet - nothing to render.')
  process.exit(0)
}
mkdirSync(join(dir, 'thumbs'), { recursive: true })

const files = readdirSync(dir).filter((f) => f.endsWith('.html'))
const browser = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {})
for (const f of files) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1440 } })
  await page.goto(pathToFileURL(join(dir, f)).href)
  await page.screenshot({ path: join(dir, 'thumbs', f.replace('.html', '.jpeg')), type: 'jpeg', quality: 82 })
  await page.close()
}
await browser.close()
console.log(`${files.length} showcase thumbnail(s) written`)
