import { useEffect } from 'react'
import { applyShellScroller } from '@/lib/scrolltrigger'

/**
 * The shell pins the page to the viewport and scrolls this element instead of
 * the document, so every scroll read - Lenis, ScrollTrigger, the nav progress -
 * has to be pointed at it rather than at `window`.
 */
export const SCROLLER_ID = 'main-content'

export function getScroller(): HTMLElement | null {
  return document.getElementById(SCROLLER_ID)
}

/**
 * Smooth-scroll the entire page with Lenis and feed every scroll tick to
 * GSAP ScrollTrigger so any pin / scrub animation reads the smoothed
 * position rather than the raw native scroll.
 *
 * This is the standard Lenis + GSAP integration pattern documented at
 * https://lenis.darkroom.engineering/. Without this wiring, ScrollTrigger
 * would compute progress against the pre-smoothed native scrollY and
 * pinned elements would jitter.
 *
 * Reduced-motion users skip Lenis entirely and let the browser do native
 * scrolling so nothing forces inertia on them.
 *
 * Lenis + GSAP are dynamically imported here (and in PainPoints) so the
 * ~80KB of scroll-engine JS is code-split out and NEVER fetched on touch
 * devices, which use native momentum scroll instead.
 */
/** The running instance, so a route change can reset it (resetShellScroll). */
type LenisLike = { resize: () => void; scrollTo: (t: number, o?: { immediate?: boolean; force?: boolean }) => void }
let active: LenisLike | null = null

/**
 * Put the scroller back at the top after a route change. The panel (desktop)
 * or the document (phones) is reset natively, and Lenis - which keeps its own
 * scroll position and page height - is told too. Without that, Lenis carried
 * the previous page's position and height into the next one: a new page could
 * be scrolled past its own heading, or refuse to scroll at all.
 */
export function resetShellScroll() {
  getScroller()?.scrollTo({ top: 0, behavior: 'auto' })
  window.scrollTo({ top: 0, behavior: 'auto' })
  if (active) {
    active.resize()
    active.scrollTo(0, { immediate: true, force: true })
  }
}

export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Skip Lenis on mobile / tablet devices. Native momentum scroll on
    // those is hardware-accelerated and feels better than Lenis-smoothed
    // scroll fighting touch input. Mid-range Android GPUs burn CPU on
    // the JS-driven scroll loop, causing the laggy feel.
    //
    // Detection: `(pointer: coarse) and (hover: none)` matches phones +
    // tablets but excludes touch-screen LAPTOPS (which have a mouse +
    // touch and benefit from Lenis the same as a desktop). Anchor-click
    // smooth-scroll is handled by `html { scroll-behavior: smooth }` on
    // mobile so navigation still glides.
    const isMobile = window.matchMedia('(pointer: coarse) and (hover: none)').matches
    // Also skip on any narrow viewport - including a resized desktop window.
    // Below 900px the horizontal-pin sections are disabled and the page is a
    // plain vertical stack, where native scroll feels direct. Lenis smoothing
    // on a narrow window reads as "heavy / takes too much scrolling".
    const isNarrow = window.innerWidth < 900
    if (isMobile || isNarrow) return

    let cancelled = false
    let cleanup = () => {}

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      applyShellScroller(ScrollTrigger)

      // Below 1100px the shell dissolves and the document scrolls again, so
      // the wrapper is only handed over when the panel is actually the
      // scroller. Passing a non-scrolling wrapper freezes the page.
      const panel = getScroller()
      const usesPanel = !!panel && window.innerWidth >= 1100
      const content = panel?.firstElementChild as HTMLElement | undefined

      const lenis = new Lenis({
        // Bind to the panel even when the lazy route has not rendered yet;
        // falling back to the window left the panel unscrollable by wheel.
        ...(usesPanel && panel ? { wrapper: panel, content: content ?? panel } : {}),
        // Shorter duration + steeper exponential easing makes the wheel feel
        // responsive instead of heavy. 1.1s read as "the page is sluggish".
        // 0.9s with a steeper curve still smooths native step jumps but
        // settles fast enough that input does not feel disconnected.
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      })

      // Hand every Lenis scroll update to ScrollTrigger.
      lenis.on('scroll', ScrollTrigger.update)
      active = lenis

      // Each route swaps the panel's content element, and Lenis only watches
      // the one it started with. Re-measure whenever the content is replaced
      // or changes size (lazy routes, accordions, images loading).
      const sizeWatch = new ResizeObserver(() => lenis.resize())
      const watchContent = () => {
        sizeWatch.disconnect()
        const el = panel?.firstElementChild
        if (el) sizeWatch.observe(el)
        lenis.resize()
      }
      // A swapped child means a new route has rendered. Lazy routes arrive
      // after App's route-change reset, and a smooth scroll still running from
      // the last page would otherwise carry on into this one - the new page
      // opened scrolled past its own heading. Start it at the top. (A hash
      // target, like /about#credentials, scrolls later, in the page's own
      // effect, so it still wins.)
      const swapWatch = panel
        ? new MutationObserver(() => {
            watchContent()
            lenis.scrollTo(0, { immediate: true, force: true })
            panel.scrollTop = 0
          })
        : null
      if (panel && swapWatch) {
        swapWatch.observe(panel, { childList: true })
        watchContent()
      }

      // Drive Lenis from GSAP's ticker so RAF stays unified.
      const tick = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      // Intercept in-page anchor clicks (#about, #works, #contact, etc.)
      // and smooth-scroll via Lenis instead of letting the browser hard-jump.
      const NAV_OFFSET = -88 // height of the floating nav pill + breathing room
      const onAnchorClick = (e: MouseEvent) => {
        // Honor modifier keys (open in new tab, etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]')
        if (!link) return
        const href = link.getAttribute('href')
        if (!href || href === '#') return
        // Let the skip link route through native focus management.
        if (href === `#${SCROLLER_ID}`) return

        if (href === '#top') {
          e.preventDefault()
          lenis.scrollTo(0, { duration: 1.1 })
          history.replaceState(null, '', ' ')
          return
        }
        const target = document.querySelector(href) as HTMLElement | null
        if (!target) return
        e.preventDefault()
        lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.1 })
        history.replaceState(null, '', href)
      }
      document.addEventListener('click', onAnchorClick)

      cleanup = () => {
        document.removeEventListener('click', onAnchorClick)
        gsap.ticker.remove(tick)
        swapWatch?.disconnect()
        sizeWatch.disconnect()
        if (active === lenis) active = null
        lenis.destroy()
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])
}
