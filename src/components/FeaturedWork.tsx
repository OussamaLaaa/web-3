import { CSSProperties, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FeaturedWork.css'

gsap.registerPlugin(ScrollTrigger)

interface WorkItem {
  id: number
  title: string
  category: string
  year: string
  description: string
  focus: string
  deliverables: string[]
  accent: string
  accentSoft: string
}

function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const workItemsRef = useRef<(HTMLDivElement | null)[]>([])

  const works: WorkItem[] = [
    {
      id: 1,
      title: 'Lumen Design OS',
      category: 'Product Systems',
      year: '2024',
      description: 'Unified design infrastructure for a multi-product platform. Built the visual grammar, interaction model, and multi-device standards that keep teams aligned.',
      focus: 'Design language & motion grammar',
      deliverables: ['Design system spine', 'Micro-interactions kit', 'Cinematic walkthrough'],
      accent: '#7ad0ff',
      accentSoft: 'rgba(122, 208, 255, 0.2)',
    },
    {
      id: 2,
      title: 'Northwind Commerce',
      category: 'Experience Lead',
      year: '2024',
      description: 'High-touch shopping journey with editorial pacing. Elevated the visual framing, crafted tactile product storytelling, and tuned checkout for momentum.',
      focus: 'Immersive retail narrative',
      deliverables: ['Spatial gallery layout', 'Adaptive checkout', 'Art direction system'],
      accent: '#ffb26f',
      accentSoft: 'rgba(255, 178, 111, 0.22)',
    },
    {
      id: 3,
      title: 'Oro Studio',
      category: 'Mobile Craft',
      year: '2023',
      description: 'Creative suite for on-the-go teams. Delivered a calming mobile experience with confident typography, guided flows, and responsive motion.',
      focus: 'Tactile mobile craft',
      deliverables: ['Motion cues library', 'Guided creation flows', 'Haptic-informed system'],
      accent: '#b59bff',
      accentSoft: 'rgba(181, 155, 255, 0.22)',
    },
  ]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const ctx = gsap.context(() => {
      // Section title reveal
      gsap.from(sectionTitleRef.current, {
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      if (!prefersReducedMotion) {
        gsap.fromTo(
          railRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
            },
          }
        )

        gsap.fromTo(
          atmosphereRef.current,
          { y: 80, opacity: 0.3 },
          {
            y: -80,
            opacity: 0.8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        )
      }

      // Staggered work items reveal
      workItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
            y: 80,
            opacity: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
          })

          if (!prefersReducedMotion && !isMobile) {
            gsap.to(item, {
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
              yPercent: -6,
            })
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="featured-work" ref={sectionRef}>
      <div className="featured-atmosphere" ref={atmosphereRef} aria-hidden="true" />
      <div className="scene-rail" ref={railRef}>
        <span className="scene-label">Scene 02</span>
        <span className="scene-divider" />
        <span className="scene-caption">Selected work — corridor of prototypes</span>
      </div>
      <div className="featured-work-container">
        <h2 className="section-title" ref={sectionTitleRef}>
          Featured Work
        </h2>
        <div className="work-grid">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="work-item"
              ref={(el) => (workItemsRef.current[index] = el)}
              style={
                {
                  '--accent': work.accent,
                  '--accent-soft': work.accentSoft,
                } as CSSProperties
              }
            >
              <div className="work-header">
                <div className="work-labels">
                  <span className="work-index">0{index + 1}</span>
                  <span className="work-pill">{work.category}</span>
                </div>
                <div className="work-timestamp">
                  <span className="work-year">{work.year}</span>
                  <span className="work-focus">{work.focus}</span>
                </div>
              </div>

              <div className="work-body">
                <div className="work-visual">
                  <div className="visual-grid"></div>
                  <div className="visual-beam"></div>
                  <div className="visual-band"></div>
                  <div className="visual-caption">
                    <span className="caption-label">Focus</span>
                    <span className="caption-value">{work.focus}</span>
                  </div>
                </div>

                <div className="work-details">
                  <div className="work-text">
                    <h3 className="work-title">{work.title}</h3>
                    <p className="work-description">{work.description}</p>
                  </div>
                  <div className="work-deliverables">
                    {work.deliverables.map((item) => (
                      <span key={item} className="deliverable-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="scene-transition work-transition" aria-hidden="true">
        <div className="transition-line" />
      </div>
    </section>
  )
}

export default FeaturedWork
