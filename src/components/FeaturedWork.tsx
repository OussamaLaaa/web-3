import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile, getParallaxIntensity } from '../utils/motionUtils'
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
  const reelRef = useRef<HTMLElement>(null)
  const reelContainerRef = useRef<HTMLDivElement>(null)
  const project1Ref = useRef<HTMLDivElement>(null)
  const project2Ref = useRef<HTMLDivElement>(null)
  const project3Ref = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

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
    const mobile = isMobile()
    const pinDuration = mobile ? '300%' : '400%'

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Simple scroll-triggered fades for reduced motion
        gsap.from([project1Ref.current, project2Ref.current, project3Ref.current], {
          scrollTrigger: {
            trigger: reelRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          duration: 0.8,
          stagger: 0.3,
        })
        return
      }

      const parallaxIntensity = getParallaxIntensity(1)

      // Pinned cinematic reel timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: reelRef.current,
          start: 'top top',
          end: `+=${pinDuration}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Scene progression through 3 projects
      tl
        // Beat 1: First project emerges from portal (0-25%)
        .from(project1Ref.current, {
          opacity: 0,
          scale: 0.85,
          y: 100 * parallaxIntensity,
          duration: 1.5,
          ease: 'power2.out',
        }, 0)

        // Beat 1 hold: First project visible (25-35%)
        .to({}, { duration: 0.5 }, 1.5)

        // Beat 2: Transition to second project (35-55%)
        .to(project1Ref.current, {
          opacity: 0,
          scale: 0.95,
          y: -80 * parallaxIntensity,
          duration: 1,
          ease: 'power2.inOut',
        }, 2)
        .from(project2Ref.current, {
          opacity: 0,
          scale: 0.85,
          y: 100 * parallaxIntensity,
          duration: 1.5,
          ease: 'power2.out',
        }, 2.2)

        // Beat 2 hold: Second project visible (55-65%)
        .to({}, { duration: 0.5 }, 3.7)

        // Beat 3: Transition to third project (65-85%)
        .to(project2Ref.current, {
          opacity: 0,
          scale: 0.95,
          y: -80 * parallaxIntensity,
          duration: 1,
          ease: 'power2.inOut',
        }, 4.2)
        .from(project3Ref.current, {
          opacity: 0,
          scale: 0.85,
          y: 100 * parallaxIntensity,
          duration: 1.5,
          ease: 'power2.out',
        }, 4.4)

        // Beat 3 hold: Third project visible (85-100%)
        .to({}, { duration: 0.8 }, 5.9)

        // Final fade: Overlay intensifies as reel concludes
        .to(overlayRef.current, {
          opacity: 0.6,
          duration: 0.5,
          ease: 'power1.in',
        }, 6.2)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="featured-work-reel" ref={reelRef}>
      <div className="reel-container" ref={reelContainerRef}>
        {/* Monitor display overlay - maintains in-world feeling */}
        <div className="reel-overlay" ref={overlayRef}>
          <div className="scan-line"></div>
          <div className="vignette"></div>
        </div>

        {/* Project 1 */}
        <div className="project-frame" ref={project1Ref} data-project="1">
          <div className="project-content">
            <div className="project-visual">
              <div className="project-thumbnail"></div>
              <div className="project-number">01</div>
            </div>
            <div className="project-details">
              <div className="project-meta-top">
                <span className="project-category">{works[0].category}</span>
                <span className="project-year">{works[0].year}</span>
              </div>
              <h3 className="project-title">{works[0].title}</h3>
              <p className="project-description">{works[0].description}</p>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="project-frame" ref={project2Ref} data-project="2">
          <div className="project-content">
            <div className="project-visual">
              <div className="project-thumbnail"></div>
              <div className="project-number">02</div>
            </div>
            <div className="project-details">
              <div className="project-meta-top">
                <span className="project-category">{works[1].category}</span>
                <span className="project-year">{works[1].year}</span>
              </div>
              <h3 className="project-title">{works[1].title}</h3>
              <p className="project-description">{works[1].description}</p>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="project-frame" ref={project3Ref} data-project="3">
          <div className="project-content">
            <div className="project-visual">
              <div className="project-thumbnail"></div>
              <div className="project-number">03</div>
            </div>
            <div className="project-details">
              <div className="project-meta-top">
                <span className="project-category">{works[2].category}</span>
                <span className="project-year">{works[2].year}</span>
              </div>
              <h3 className="project-title">{works[2].title}</h3>
              <p className="project-description">{works[2].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
