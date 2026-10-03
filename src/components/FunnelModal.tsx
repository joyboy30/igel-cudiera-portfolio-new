import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowSquareOut } from '@/components/slab'
import EvidenceTag from './EvidenceTag'
import type { ShowcaseItem } from '@/data/showcase'

/**
 * The carousel's preview: a browser-chrome dialog for one showcase item.
 *
 *   demo   a local, self-contained page, iframed (same origin only)
 *   shots  several screenshots, stacked in order with captions
 *   shot   a full-length screenshot, shown as an image
 *   url    a live site, linked out in a new tab - never framed, since most
 *          sites refuse to be embedded
 *
 * The address bar shows the real host when there is a live URL, otherwise the
 * item's category, so it never implies a domain that does not exist.
 */
export function useShowcaseModal() {
  const [item, setItem] = useState<ShowcaseItem | null>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const openItem = useCallback((next: ShowcaseItem, trigger?: HTMLElement | null) => {
    lastTriggerRef.current = trigger ?? (document.activeElement as HTMLElement | null)
    setItem(next)
  }, [])

  const close = useCallback(() => {
    setItem(null)
    requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }, [])

  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close()
      }
    }
    document.addEventListener('keydown', onKey, true)
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => document.removeEventListener('keydown', onKey, true)
  }, [item, close])

  const host = item?.url ? new URL(item.url).host : item?.category

  const modal =
    item &&
    createPortal(
      <div
        className="funnels__modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.label} preview`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="funnels__modal-shell">
          <div className="funnels__modal-bar">
            <div className="funnels__modal-lights" aria-hidden="true">
              <span className="funnels__modal-light funnels__modal-light--red" />
              <span className="funnels__modal-light funnels__modal-light--amber" />
              <span className="funnels__modal-light funnels__modal-light--green" />
            </div>
            <div className="funnels__modal-url" aria-hidden="true">
              <span className="funnels__modal-url-scheme">{host}</span>
              <span className="funnels__modal-url-path"> · {item.label}</span>
            </div>
            <div className="funnels__modal-actions">
              <EvidenceTag level={item.evidence} />
              {item.url && (
                <a className="funnels__modal-close" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.label} live site in a new tab`}>
                  <ArrowSquareOut weight="bold" size={18} aria-hidden="true" />
                </a>
              )}
              <button ref={closeRef} type="button" className="funnels__modal-close" onClick={close} aria-label="Close preview">
                <X weight="bold" size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          {item.demo ? (
            <iframe
              className="funnels__modal-iframe"
              src={item.demo}
              title={item.label}
              sandbox="allow-same-origin allow-forms allow-scripts allow-popups"
            />
          ) : item.shots?.length ? (
            <div className="funnels__modal-shot">
              <p className="funnels__modal-desc">
                {item.platform} · {item.desc}
              </p>
              {item.shots.map((s, i) => (
                <figure key={s.src} className="funnels__modal-figure">
                  <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading={i ? 'lazy' : 'eager'} decoding="async" />
                  {s.caption && <figcaption className="funnels__modal-desc">{s.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <div className="funnels__modal-shot">
              <img src={item.shot ?? item.thumb} alt={`${item.label} screenshot`} />
              <p className="funnels__modal-desc">
                {item.platform} · {item.desc}
              </p>
            </div>
          )}
        </div>
      </div>,
      document.body,
    )

  return { openItem, modal }
}
