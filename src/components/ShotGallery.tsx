import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CaretLeft, CaretRight, MagnifyingGlassPlus } from '@/components/slab'
import type { Shot } from '@/data/projects'

/**
 * A grid of evidence screenshots. Each opens full size in the site's mac
 * window lightbox (the .wfs__modal styles), stacked above the Projects dialog.
 * Arrow keys step through the set; Escape and the backdrop close it; focus
 * returns to the thumbnail that opened it.
 */
export default function ShotGallery({ shots, className = '' }: { shots: Shot[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setIndex(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close()
      } else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    // Capture phase: the Projects dialog under this one also listens for
    // Escape, and only the top layer should close.
    document.addEventListener('keydown', onKey, true)
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => document.removeEventListener('keydown', onKey, true)
  }, [index, close, step])

  const active = index === null ? null : shots[index]

  return (
    <>
      <ul className={`shots ${className}`.trim()} role="list">
        {shots.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              className="shots__item"
              onClick={(e) => {
                triggerRef.current = e.currentTarget
                setIndex(i)
              }}
              aria-label={`Open screenshot: ${s.label}`}
            >
              <img src={s.thumb} alt="" loading="lazy" decoding="async" />
              <span className="shots__label">{s.label}</span>
              <span className="shots__zoom" aria-hidden="true">
                <MagnifyingGlassPlus size={14} weight="bold" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active &&
        createPortal(
          <div
            className="wfs__modal wfs__modal--top"
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <div className="wfs__window">
              <div className="wfs__bar">
                <span className="wfs__bar-dots" aria-hidden="true">
                  <span className="wfs__dot wfs__dot--r" />
                  <span className="wfs__dot wfs__dot--y" />
                  <span className="wfs__dot wfs__dot--g" />
                </span>
                <span className="wfs__bar-title">{active.label}</span>
                {shots.length > 1 && (
                  <span className="shots__nav">
                    <button type="button" className="wfs__close" onClick={() => step(-1)} aria-label="Previous screenshot">
                      <CaretLeft weight="bold" size={16} aria-hidden="true" />
                    </button>
                    <button type="button" className="wfs__close" onClick={() => step(1)} aria-label="Next screenshot">
                      <CaretRight weight="bold" size={16} aria-hidden="true" />
                    </button>
                  </span>
                )}
                <button ref={closeRef} type="button" className="wfs__close" onClick={close} aria-label="Close screenshot">
                  <X weight="bold" size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="wfs__imgwrap">
                <img className="wfs__full" src={active.src} alt={active.label} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
