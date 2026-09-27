import { evidenceTone, type Evidence } from '@/data/evidence'

/** A small pill naming how a claim is backed. See data/evidence.ts. */
export default function EvidenceTag({ level, className = '' }: { level: Evidence; className?: string }) {
  return (
    <span className={`evtag evtag--${evidenceTone[level]} ${className}`.trim()}>
      <span className="evtag__dot" aria-hidden="true" />
      {level}
    </span>
  )
}
