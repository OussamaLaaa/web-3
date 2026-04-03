import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

const identityChips = ['Strategic', 'Collaborative', 'Creative', 'Product-minded']

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const chipsRef = useRef<HTMLSpanElement[]>([])
  const actionsRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const heroElement = heroRef.current
      const firstWorkItem = document.querySelector('.featured-work .work-item')

      if (prefersReducedMotion || !heroElement) {
        gsap.set([heroElement, firstWorkItem], { clearProps: 'all' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.from(roleRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          titleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.4'
        )
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
          },
          '+=0.3'
        )

      const chipElements = chipsRef.current.filter(Boolean)

      if (chipElements.length) {
        tl.from(
          chipElements,
          {
            y: 16,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
          },
          '-=0.4'
        )
      }

      tl.from(
        actionsRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.9,
        },
        '+=0.2'
      )
        .from(
          panelRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.5'
        )
        .from(
          scrollIndicatorRef.current,
          {
            y: 10,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )

      const scrollTl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: heroElement,
          start: 'top top',
          end: '+=120%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      scrollTl
        .to(
          heroElement,
          {
            '--hero-dim': 0.35,
            duration: 1.2,
          },
          0
        )
        .to(
          '.hero-inner',
          {
            scale: 0.96,
            opacity: 0.7,
            duration: 1.2,
          },
          0
        )

      if (firstWorkItem) {
        scrollTl.fromTo(
          firstWorkItem,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power2.out',
          },
          0.35
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector)
    if (target) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-atmosphere">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-role" ref={roleRef}>
            <span className="hero-role-accent" />
            <span className="hero-role-label">UX/UI &amp; Product Designer</span>
          </div>

          <h1 className="hero-title" ref={titleRef}>
            Understanding your users,
            <span className="hero-title-emphasis"> designing your success.</span>
          </h1>

          <p className="hero-subtitle" ref={subtitleRef}>
            Powered by AI-driven insight, product thinking, and user-centered design.
          </p>

          <div className="hero-chips">
            {identityChips.map((chip, index) => (
              <span
                key={chip}
                className="chip hero-chip"
                ref={(el) => {
                  if (el) {
                    chipsRef.current[index] = el
                  }
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="hero-actions" ref={actionsRef}>
            <button
              className="button button-primary"
              onClick={() => scrollToSection('.featured-work')}
              type="button"
            >
              View Selected Work
            </button>
            <button
              className="button button-ghost"
              onClick={() => scrollToSection('.contact')}
              type="button"
            >
              Let’s Work Together
            </button>
          </div>
        </div>

        <div className="hero-panel" ref={panelRef} aria-hidden="true">
          <div className="hero-panel-frame">
            <div className="hero-panel-grid" />
            <div className="hero-panel-light" />
            <div className="hero-panel-outline" />
            <div className="hero-panel-core">
              <div className="hero-panel-bar" />
              <div className="hero-panel-bar thin" />
              <div className="hero-panel-dot" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
