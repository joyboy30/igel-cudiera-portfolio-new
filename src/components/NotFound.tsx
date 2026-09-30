import { ArrowLeft } from '@/components/slab'
import { Link, useNavigate } from 'react-router-dom'
import { RAIL_LINKS } from './Rail'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function NotFound() {
  const navigate = useNavigate()
  usePageMeta('notFound')

  return (
    <main className="legal-page" aria-label="Page not found">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <p className="legal-page__updated">404</p>
        <h1 className="legal-page__title">Page not found.</h1>

        <div className="legal-page__body">
          <p>
            That page does not exist on this site. The portfolio now has seven pages:
          </p>
          <ul className="nf-links">
            {RAIL_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
