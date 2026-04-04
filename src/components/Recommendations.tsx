import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motionUtils'
import './Recommendations.css'

gsap.registerPlugin(ScrollTrigger)

const RECOMMENDATIONS_SCROLL = {
  sectionStart: 'top bottom',
  sectionEnd: '34% top',
  titleStart: 'top 80%',
  itemRevealStart: 'top 85%',
  itemParallaxStart: 'top 88%',
  itemParallaxEnd: 'bottom 22%',
} as const

const RECOMMENDATION_PARALLAX = {
  fromY: 28,
  toY: -4,
} as const

interface Recommendation {
  id: number
  name: string
  role: string
  company: string
  text: string
}

function Recommendations() {
  const sectionRef = useRef<HTMLElement>(null)
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const recommendationItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const handoffRef = useRef<HTMLDivElement>(null)
  const roomGlowRef = useRef<HTMLDivElement>(null)

  const recommendations: Recommendation[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Head of Design',
      company: 'Acme Corporation',
      text: "Exceptional attention to detail and a rare ability to balance aesthetics with usability. Brought our design system to life in ways we hadn't imagined.",
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Product Director',
      company: 'Vertex Labs',
      text: 'A true collaborator who listens deeply and translates complex problems into elegant solutions. The kind of designer every team wants to work with.',
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'CEO',
      company: 'Lumina Studios',
      text: 'Delivered beyond expectations on every front. Their work elevated our brand and created experiences that users genuinely love.',
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
          start: RECOMMENDATIONS_SCROLL.sectionStart,
          end: RECOMMENDATIONS_SCROLL.sectionEnd,
          scrub: 1,
        },
      })
        .fromTo(
          sectionRef.current,
          {
            '--recommendation-room-dim': 0.1,
            '--recommendation-room-focus': 0.2,
          },
          {
            '--recommendation-room-dim': 0.42,
            '--recommendation-room-focus': 1,
            ease: 'none',
          },
          0
        )
        .fromTo(
          handoffRef.current,
          {
            xPercent: -16,
            opacity: 0.36,
          },
          {
            xPercent: 0,
            opacity: 0.82,
            ease: 'none',
          },
          0
        )
        .fromTo(
          roomGlowRef.current,
          {
            yPercent: 6,
            opacity: 0.22,
          },
          {
            yPercent: 0,
            opacity: 0.95,
            ease: 'none',
          },
          0
        )

      // Section title reveal
      gsap.from(sectionTitleRef.current, {
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: RECOMMENDATIONS_SCROLL.titleStart,
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Staggered recommendation items reveal
      recommendationItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: RECOMMENDATIONS_SCROLL.itemRevealStart,
            },
            y: 60,
            opacity: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
          })

          gsap.fromTo(
            item,
            {
              y: RECOMMENDATION_PARALLAX.fromY,
            },
            {
              y: RECOMMENDATION_PARALLAX.toY,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: RECOMMENDATIONS_SCROLL.itemParallaxStart,
                end: RECOMMENDATIONS_SCROLL.itemParallaxEnd,
                scrub: 1,
              },
            }
          )
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="recommendations" ref={sectionRef}>
      <div className="recommendations-handoff" ref={handoffRef} aria-hidden="true">
        <span className="recommendations-handoff-line" />
        <span className="recommendations-handoff-dot" />
      </div>
      <div className="recommendations-room-glow" ref={roomGlowRef} aria-hidden="true" />
      <div className="recommendations-container">
        <h2 className="section-title" ref={sectionTitleRef}>
          Recommendations
        </h2>
        <div className="recommendations-grid">
          {recommendations.map((rec, index) => (
            <div
              key={rec.id}
              className="recommendation-item"
              ref={(el) => (recommendationItemsRef.current[index] = el)}
            >
              <p className="recommendation-text">{rec.text}</p>
              <div className="recommendation-author">
                <div className="author-info">
                  <p className="author-name">{rec.name}</p>
                  <p className="author-role">
                    {rec.role}, {rec.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recommendations
