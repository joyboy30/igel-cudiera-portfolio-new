import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import { profile } from '@/data/profile'
import ToolsMarquee from './ToolsMarquee'
import HomeBento from './HomeBento'
import { HomeProfile, HomeStats, HomeExplore } from './HomeMobile'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useIsPhone } from '@/hooks/useMediaQuery'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * Home. One viewport, three bands, no scroll:
 *
 *   head       the headline the intro writes, the subheading, and the ways
 *              to work together
 *   tools      "Tools I work with" beside the marquee, on its own plate
 *   showcase   the bento - one card per view, see HomeBento - on its own
 *
 * The grid is `auto auto 1fr` so the showcase absorbs the slack instead of
 * pushing the panel into a scrollbar.
 *
 * On a phone the page becomes an app screen: a profile header where the rail
 * used to be, the proof stats under the lede, and the bento replaced by a
 * snap row of tiles (HomeMobile).
 *
 * `.home__title` is also the intro's landing target: IntroOverlay measures it
 * and flies its copy into this exact rect, so the line the visitor watched
 * being written is the line that stays on the page.
 */
export default function Home() {
  useScrollReveal()
  usePageMeta()
  const phone = useIsPhone()
  const { displayName, hero, engagements } = profile

  return (
    <section className="home" aria-labelledby="home-title">
      {phone && <HomeProfile />}

      <div className="home__head">
        <div className="home__headline">
          <h1 className="home__title" id="home-title">
            <span className="home__line">
              {displayName.line1} {displayName.line2}
            </span>
          </h1>

          {!phone && (
            <div className="home__ctas">
              <Link className="home__cta" to="/contact">
                Start a project
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </Link>
              <Link className="home__cta home__cta--ghost" to="/projects">
                See the results
              </Link>
            </div>
          )}
        </div>

        <p className="home__lede home__lede--services">{hero.body}</p>

        <div className="home__avail">
          <span className="home__avail-label">
            <span className="home__avail-dot" aria-hidden="true" />
            Available for
          </span>
          <ul className="home__avail-list" role="list">
            {engagements.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        {phone && <HomeStats />}
        {phone && (
          <div className="home__ctas home__ctas--phone">
            <Link className="home__cta" to="/contact">
              Start a project
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
            <Link className="home__cta home__cta--ghost" to="/projects">
              See the results
            </Link>
          </div>
        )}
      </div>

      <div className="home__glass home__glass--tools">
        <div className="home__tools">
          <div className="home__tools-head">
            <span className="home__tools-eyebrow">Platforms & tools</span>
            <h2 className="home__tools-label">What I work in</h2>
          </div>
          <ToolsMarquee />
        </div>
      </div>

      {phone ? (
        <HomeExplore />
      ) : (
        <div className="home__glass home__glass--showcase">
          <div className="home__showcase">
            <HomeBento />
          </div>
        </div>
      )}
    </section>
  )
}
