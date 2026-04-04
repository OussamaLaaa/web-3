import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motionUtils'
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
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const recommendationItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)

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

      // Cinematic entrance: atmosphere reveal
      gsap.from(atmosphereRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1.2,
        },
        opacity: 0,
        scale: 0.88,
        ease: 'power2.out',
      })

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

      // Staggered recommendation items reveal
      recommendationItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
            y: 60,
            opacity: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="recommendations" ref={sectionRef}>
      <div className="recommendations-atmosphere" ref={atmosphereRef} aria-hidden="true" />
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
