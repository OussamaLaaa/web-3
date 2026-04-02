import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, getParallaxIntensity } from '../utils/motionUtils'
import './Recommendations.css'

gsap.registerPlugin(ScrollTrigger)

interface Recommendation {
  id: number
  name: string
  role: string
  company: string
  text: string
}

function Recommendations() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rec1Ref = useRef<HTMLDivElement>(null)
  const rec2Ref = useRef<HTMLDivElement>(null)
  const rec3Ref = useRef<HTMLDivElement>(null)

  // Curated LinkedIn recommendations
  const recommendations: Recommendation[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Product Designer',
      company: 'TechCorp',
      text: 'Exceptional talent in bridging design and development. Oussama\'s attention to detail and technical execution made our collaboration seamless and productive.',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Engineering Manager',
      company: 'StartupXYZ',
      text: 'One of the most skilled creative developers I\'ve worked with. Consistently delivers elegant solutions to complex problems with remarkable efficiency.',
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'VP of Design',
      company: 'DesignStudio',
      text: 'Outstanding work ethic and creative problem-solving abilities. Oussama brings both technical depth and design sensibility to every project.',
    },
  ]

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Simple scroll-triggered fades for reduced motion
        gsap.from([headerRef.current, rec1Ref.current, rec2Ref.current, rec3Ref.current], {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        })
        return
      }

      const parallaxIntensity = getParallaxIntensity(1)

      // Scroll-triggered entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
      })

      tl
        // Header fades in
        .from(headerRef.current, {
          opacity: 0,
          y: 40 * parallaxIntensity,
          duration: 0.8,
        }, 0)

        // Recommendations stagger in as artifacts
        .from(rec1Ref.current, {
          opacity: 0,
          y: 50 * parallaxIntensity,
          rotateX: 5,
          duration: 1,
        }, 0.3)
        .from(rec2Ref.current, {
          opacity: 0,
          y: 50 * parallaxIntensity,
          rotateX: 5,
          duration: 1,
        }, 0.5)
        .from(rec3Ref.current, {
          opacity: 0,
          y: 50 * parallaxIntensity,
          rotateX: 5,
          duration: 1,
        }, 0.7)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="recommendations" ref={sectionRef}>
      <div className="recommendations-container">
        <div className="recommendations-header" ref={headerRef}>
          <h2 className="section-title">Recommendations</h2>
          <p className="section-subtitle">Feedback from collaborators</p>
        </div>

        <div className="recommendations-grid">
          {/* Recommendation 1 */}
          <article className="recommendation-card" ref={rec1Ref}>
            <div className="recommendation-content">
              <p className="recommendation-text">&ldquo;{recommendations[0].text}&rdquo;</p>
              <div className="recommendation-author">
                <div className="author-info">
                  <h4 className="author-name">{recommendations[0].name}</h4>
                  <p className="author-role">{recommendations[0].role}</p>
                  <p className="author-company">{recommendations[0].company}</p>
                </div>
              </div>
            </div>
            <div className="card-pin"></div>
          </article>

          {/* Recommendation 2 */}
          <article className="recommendation-card" ref={rec2Ref}>
            <div className="recommendation-content">
              <p className="recommendation-text">&ldquo;{recommendations[1].text}&rdquo;</p>
              <div className="recommendation-author">
                <div className="author-info">
                  <h4 className="author-name">{recommendations[1].name}</h4>
                  <p className="author-role">{recommendations[1].role}</p>
                  <p className="author-company">{recommendations[1].company}</p>
                </div>
              </div>
            </div>
            <div className="card-pin"></div>
          </article>

          {/* Recommendation 3 */}
          <article className="recommendation-card" ref={rec3Ref}>
            <div className="recommendation-content">
              <p className="recommendation-text">&ldquo;{recommendations[2].text}&rdquo;</p>
              <div className="recommendation-author">
                <div className="author-info">
                  <h4 className="author-name">{recommendations[2].name}</h4>
                  <p className="author-role">{recommendations[2].role}</p>
                  <p className="author-company">{recommendations[2].company}</p>
                </div>
              </div>
            </div>
            <div className="card-pin"></div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Recommendations
