/**
 * Evidence levels. Every project, role, service and credential on the site
 * carries one, so a visitor can tell client work from training at a glance.
 *
 * The rule for this portfolio: never upgrade a level. Training stays
 * training, a practice build stays a practice build, and anything without
 * proof in the source material is marked NEEDS_VERIFICATION rather than
 * silently filled in.
 */
export type Evidence =
  | 'Client work'
  | 'Professional experience'
  | 'Practice project'
  | 'Demo'
  | 'Training'
  | 'Certification'
  | 'Supporting capability'
  | 'Needs verification'

/** Literal marker for unverified facts. Search the codebase for it. */
export const NEEDS_VERIFICATION = '[NEEDS VERIFICATION]'

/** Tone per level, read by the EvidenceTag styles. */
export const evidenceTone: Record<Evidence, 'strong' | 'solid' | 'learn' | 'soft' | 'warn'> = {
  'Client work': 'strong',
  'Professional experience': 'solid',
  Certification: 'learn',
  Training: 'learn',
  'Practice project': 'soft',
  Demo: 'soft',
  'Supporting capability': 'soft',
  'Needs verification': 'warn',
}
