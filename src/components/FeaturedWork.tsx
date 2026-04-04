import { CSSProperties, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motionUtils'
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
  artifactLabel: string
  material: string
  code: string
  accent: string
  accentSoft: string
}

function FeaturedWork() {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const workItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const handoffAnchorRef = useRef<HTMLDivElement>(null)
  const roomShellRef = useRef<HTMLDivElement>(null)

  const setWorkItemRef = (index: number) => (el: HTMLDivElement | null) => {
    workItemsRef.current[index] = el
  }

  const works: WorkItem[] = [
    {
      id: 1,
      title: 'Lumen Design OS',
      category: 'Product Systems',
      year: '2024',
      description: 'Unified design infrastructure for a multi-product platform. Built the visual grammar, interaction model, and multi-device standards that keep teams aligned.',
      focus: 'Design language & motion grammar',
      deliverables: ['Design system spine', 'Micro-interactions kit', 'Cinematic walkthrough'],
      artifactLabel: 'System Artifact',
      material: 'Glass + paper composite',
      code: 'ARCH-01',
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
      artifactLabel: 'Narrative Board',
      material: 'Matte film + steel pin',
      code: 'ARCH-02',
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
      artifactLabel: 'Preserved Piece',
      material: 'Smoked acrylic',
      code: 'ARCH-03',
      accent: '#b59bff',
      accentSoft: 'rgba(181, 155, 255, 0.22)',
    },
  ]

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        return
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: '38% top',
          scrub: 1,
        },
      })
        .fromTo(
          sectionRef.current,
          {
            '--archive-handoff': 0.25,
            '--archive-focus': 0.12,
            '--work-section-brightness': 0.9,
          },
          {
            '--archive-handoff': 1,
            '--archive-focus': 0.8,
            '--work-section-brightness': 1,
            ease: 'none',
          },
          0
        )
        .fromTo(
          handoffAnchorRef.current,
          {
            xPercent: -10,
          },
          {
            xPercent: 8,
            ease: 'none',
          },
          0
        )
        .fromTo(
          roomShellRef.current,
          {
            yPercent: 8,
            opacity: 0.74,
          },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
          },
          0
        )

      // Section title reveal
      gsap.from(sectionTitleRef.current, {
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })

      // Staggered work items reveal
      workItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
            },
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            delay: index * 0.12,
            ease: 'power3.out',
          })

          const visual = item.querySelector('.work-visual')
          const details = item.querySelector('.work-details')

          if (visual || details) {
            gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: 'top 82%',
                end: 'top 36%',
                scrub: 1,
              },
            })
              .fromTo(
                item,
                {
                  '--artifact-active': 0.2,
                },
                {
                  '--artifact-active': 1,
                  ease: 'none',
                },
                0
              )
              .fromTo(
                visual,
                {
                  yPercent: 8,
                },
                {
                  yPercent: -3,
                  ease: 'none',
                },
                0
              )
              .fromTo(
                details,
                {
                  yPercent: 5,
                  opacity: 0.82,
                },
                {
                  yPercent: -1,
                  opacity: 1,
                  ease: 'none',
                },
                0
              )
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="featured-work" ref={sectionRef}>
      <div className="featured-work-container">
        <div className="archive-transition-anchor" ref={handoffAnchorRef} aria-hidden="true">
          <span className="archive-handoff-rail" />
          <span className="archive-handoff-lens" />
        </div>
        <div className="archive-room-shell" ref={roomShellRef} aria-hidden="true">
          <span className="shell-edge shell-edge-left" />
          <span className="shell-edge shell-edge-right" />
          <span className="shell-top-light" />
          <span className="archive-shelf archive-shelf-left" />
          <span className="archive-shelf archive-shelf-right" />
          <span className="archive-cabinet archive-cabinet-left" />
          <span className="archive-cabinet archive-cabinet-right" />
        </div>
        <div className="archive-header">
          <p className="archive-kicker">Workspace Archive</p>
          <h2 className="section-title" ref={sectionTitleRef}>
            Featured Work
          </h2>
          <p className="archive-subline">
            Preserved case artifacts arranged on the studio presentation wall.
          </p>
        </div>
        <div className="work-grid">
          {works.map((work, index) => (
              <div
                key={work.id}
                className="work-item"
                ref={setWorkItemRef(index)}
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
                <div
                  className="work-visual"
                >
                  <span className="artifact-pin artifact-pin-left" aria-hidden="true" />
                  <span className="artifact-pin artifact-pin-right" aria-hidden="true" />
                  <span className="artifact-tag">{work.artifactLabel}</span>
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
                  <div className="artifact-meta" aria-label="Archive metadata">
                    <span className="artifact-meta-item">{work.material}</span>
                    <span className="artifact-meta-divider" aria-hidden="true">•</span>
                    <span className="artifact-meta-item">{work.code}</span>
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
    </section>
  )
}

export default FeaturedWork
