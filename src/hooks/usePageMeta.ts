import { useEffect } from 'react'

// index.html carries Home's title and description. Read them once, before any
// route's effect can overwrite them, so Home can put them back.
const HOME_TITLE = document.title
const HOME_DESCRIPTION = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

/**
 * Per-route title and description. The site is a client-rendered SPA with one
 * index.html, so each view sets its own tab title and description on mount.
 * Called with no arguments (Home), it restores the index.html values.
 * (The site is noindex by design; this is for tabs, history and sharing.)
 */
export function usePageMeta(title: string = HOME_TITLE, description: string = HOME_DESCRIPTION) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
