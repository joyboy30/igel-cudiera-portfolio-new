import { useEffect } from 'react'
import { PAGE_META, type PageKey } from '@/data/pageMeta'

/**
 * Per-route title and description. Each route's HTML file is built with its
 * own pair (see the route-meta plugin in vite.config.ts); this keeps them in
 * step on client-side navigation by updating the one existing <title> and
 * description tag in place, never adding a second.
 * (The site is noindex by design; this is for tabs, history and sharing.)
 */
export function usePageMeta(page: PageKey) {
  useEffect(() => {
    const { title, description } = PAGE_META[page]
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [page])
}
