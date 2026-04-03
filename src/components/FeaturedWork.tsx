import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, getParallaxIntensity } from '../utils/motionUtils'
import './FeaturedWork.css'

gsap.registerPlugin(ScrollTrigger)

interface WorkItem {
  id: number
  title: string
  category: string
  year: string
  description: string
}

function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const project1Ref = useRef<HTMLDivElement>(null)
  const project2Ref = useRef<HTMLDivElement>(null)
  const project3Ref = useRef<HTMLDivElement>(null)

  // Exactly 3 projects as specified
  const works: WorkItem[] = [
    {
      id: 1,
      title: 'Project Alpha',
      category: 'Web Development',
      year: '2024',
      description: 'Full-stack application with real-time collaboration features',
    },
    {
      id: 2,
      title: 'Design System',
      category: 'UI/UX Design',
      year: '2024',
      description: 'Comprehensive component library and design tokens',
    },
    {
      id: 3,
      title: 'Mobile Experience',
      category: 'Mobile Development',
      year: '2023',
      description: 'Native iOS and Android application with offline support',
    },
  ]

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Simple scroll-triggered fades for reduced motion
        gsap.from([headerRef.current, project1Ref.current, project2Ref.current, project3Ref.current], {
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

      // Subtle atmosphere fade-in
      gsap.from(atmosphereRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
      })

      // Refined entrance animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1.2,
        },
      })

      tl
        // Header elegant entrance
        .from(headerRef.current, {
          opacity: 0,
          y: 30 * parallaxIntensity,
          duration: 0.6,
        }, 0)

        // Projects with elegant stagger and subtle horizontal shift
        .from(project1Ref.current, {
          opacity: 0,
          x: -20 * parallaxIntensity,
          y: 40 * parallaxIntensity,
          duration: 0.8,
        }, 0.25)
        .from(project2Ref.current, {
          opacity: 0,
          x: -15 * parallaxIntensity,
          y: 40 * parallaxIntensity,
          duration: 0.8,
        }, 0.4)
        .from(project3Ref.current, {
          opacity: 0,
          x: -10 * parallaxIntensity,
          y: 40 * parallaxIntensity,
          duration: 0.8,
        }, 0.55)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="featured-work" ref={sectionRef}>
      {/* Atmospheric layers */}
      <div className="work-atmosphere" ref={atmosphereRef}>
        <div className="atmosphere-ambient"></div>
        <div className="atmosphere-desk-hint"></div>
        <div className="atmosphere-side-glow"></div>
      </div>

      <div className="work-container">
        <div className="work-header" ref={headerRef}>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">Featured projects and case studies</p>
        </div>

        <div className="work-grid">
          {/* Project 1 */}
          <article className="work-card" ref={project1Ref}>
            <div className="work-visual">
              <div className="work-thumbnail"></div>
              <span className="work-number">01</span>
            </div>
            <div className="work-content">
              <div className="work-meta">
                <span className="work-category">{works[0].category}</span>
                <span className="work-year">{works[0].year}</span>
              </div>
              <h3 className="work-title">{works[0].title}</h3>
              <p className="work-description">{works[0].description}</p>
            </div>
          </article>

          {/* Project 2 */}
          <article className="work-card" ref={project2Ref}>
            <div className="work-visual">
              <div className="work-thumbnail"></div>
              <span className="work-number">02</span>
            </div>
            <div className="work-content">
              <div className="work-meta">
                <span className="work-category">{works[1].category}</span>
                <span className="work-year">{works[1].year}</span>
              </div>
              <h3 className="work-title">{works[1].title}</h3>
              <p className="work-description">{works[1].description}</p>
            </div>
          </article>

          {/* Project 3 */}
          <article className="work-card" ref={project3Ref}>
            <div className="work-visual">
              <div className="work-thumbnail"></div>
              <span className="work-number">03</span>
            </div>
            <div className="work-content">
              <div className="work-meta">
                <span className="work-category">{works[2].category}</span>
                <span className="work-year">{works[2].year}</span>
              </div>
              <h3 className="work-title">{works[2].title}</h3>
              <p className="work-description">{works[2].description}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
