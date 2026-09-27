import { useEffect } from 'react'

const SITE = 'Igel G. Cudiera'

/**
 * Per-route title and description. The site is a client-rendered SPA with one
 * index.html, so each view sets its own tab title and description on mount.
 * (The site is noindex by design; this is for tabs, history and sharing.)
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Full-Stack SEO & Web Development`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
