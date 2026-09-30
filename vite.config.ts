import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { PAGE_META } from './src/data/pageMeta'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * One HTML file per route, each with that route's own <title> and description.
 * The app is a client-rendered SPA: without this, every URL is served Home's
 * index.html and only gets its own metadata once React mounts, so the page
 * source and the rendered page disagree. After the build this rewrites the one
 * title and the one description tag (it fails the build if there is not
 * exactly one of each) and writes the result to `about/index.html` and so on.
 * `404.html` is what vercel.json serves for any path that is not a route.
 */
function routeMeta(): Plugin {
  let outDir = ''
  const TITLE = /<title>[\s\S]*?<\/title>/g
  const DESCRIPTION = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/g
  return {
    name: 'route-meta',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const shell = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const titles = shell.match(TITLE)?.length ?? 0
      const descriptions = shell.match(DESCRIPTION)?.length ?? 0
      if (titles !== 1 || descriptions !== 1) {
        throw new Error(
          `route-meta: index.html needs exactly one <title> and one description, found ${titles} and ${descriptions}`,
        )
      }
      for (const [page, meta] of Object.entries(PAGE_META)) {
        const file = page === 'home' ? 'index.html' : page === 'notFound' ? '404.html' : `${page}/index.html`
        const html = shell
          .replace(TITLE, () => `<title>${escapeHtml(meta.title)}</title>`)
          .replace(DESCRIPTION, () => `<meta name="description" content="${escapeHtml(meta.description)}" />`)
        fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true })
        fs.writeFileSync(path.join(outDir, file), html)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), routeMeta()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    // Dev-time security headers. In production these MUST be set at the
    // reverse proxy (Nginx) along with CSP, HSTS, and a stricter
    // Permissions-Policy. Do not duplicate them in Nginx config blindly -
    // some headers (e.g. CSP) need values that differ between dev and prod.
    headers: {
      // SAMEORIGIN (not DENY) so the Funnels + SamplePlan modals can
      // iframe their own /funnels/*.html and /sample-automation-plan.html
      // documents. Cross-origin framing is still blocked.
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
})
