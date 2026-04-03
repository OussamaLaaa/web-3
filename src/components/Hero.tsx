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
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const ctx = gsap.context(() => {
      const heroElement = heroRef.current
      const select = gsap.utils.selector(heroElement)

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(select('.hero-layer'), {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        delay: 0.1,
      })
        .from(
          roleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.4'
        )
        .from(
          titleRef.current,
          {
            y: 90,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.35'
        )
        .from(
          subtitleRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.5'
        )

      const chipElements = chipsRef.current.filter(Boolean)

      if (chipElements.length) {
        tl.from(
          chipElements,
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          '-=0.4'
        )
      }

      tl.from(
        actionsRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.85,
        },
        '-=0.35'
      )
        .from(
          panelRef.current,
          {
            y: 70,
            opacity: 0,
            duration: 1,
          },
          '-=0.7'
        )
        .from(
          scrollIndicatorRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.55'
        )

      if (!prefersReducedMotion) {
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroElement,
            start: 'top top',
            end: isMobile ? '+=90%' : '+=140%',
            scrub: true,
            pin: !isMobile,
            anticipatePin: 1,
          },
        })

        scrollTl
          .to(select('.hero-atmosphere'), { y: -60, opacity: 0.95 }, 0)
          .to(select('.hero-foreground'), { y: -40, opacity: 0.85 }, 0)
          .to(panelRef.current, { scale: 1.04, yPercent: -4, transformOrigin: '50% 40%' }, 0)
          .to(select('.hero-content'), { yPercent: -6 }, 0)
          .to(scrollIndicatorRef.current, { opacity: 0, y: -12 }, 0.05)
          .to(select('.hero-transition'), { opacity: 1, y: 0 }, 0.2)
          .to(select('.hero-panel-frame'), { filter: 'saturate(1.05) brightness(1.05)' }, 0.15)
          .to(select('.hero-grid-overlay'), { opacity: 0.16 }, 0.1)
          .to(select('.hero-ambient-lines'), { opacity: 0.4, y: -30 }, 0.1)
          .to(select('.hero-transition-line'), { scaleX: 1, transformOrigin: '0% 50%' }, 0.35)
          .to(select('.hero-transition-glow'), { opacity: 0.85 }, 0.35)
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
      <div className="hero-atmosphere hero-layer">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-grid-overlay" />
        <div className="hero-ambient-lines" />
        <div className="hero-lens-veil" />
        <div className="hero-noise" />
      </div>

      <div className="hero-foreground hero-layer">
        <div className="hero-desk-horizon" />
        <div className="hero-desk-lights" />
        <div className="hero-screen-glow" />
        <div className="hero-focus-arc" />
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

      <div className="hero-transition hero-layer">
        <div className="hero-transition-glow" />
        <div className="hero-transition-line" />
      </div>
    </section>
  )
}

export default Hero
