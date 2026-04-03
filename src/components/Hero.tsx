import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const identityChips = ['Strategic', 'Collaborative', 'Creative', 'Product-minded']

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const heroAtmosphereRef = useRef<HTMLDivElement>(null)
  const heroParallaxRef = useRef<HTMLDivElement>(null)
  const heroInnerRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const chipsRef = useRef<HTMLSpanElement[]>([])
  const actionsRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(roleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
      })
        .from(
          titleRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.4'
        )
        .from(
          subtitleRef.current,
          {
            y: 50,
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
          duration: 0.8,
        },
        '-=0.3'
      )
        .from(
          panelRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          scrollIndicatorRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )

      if (!prefersReducedMotion && heroParallaxRef.current) {
        tl.from(
          heroParallaxRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
      }

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      if (!prefersReducedMotion && heroRef.current && !isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=140%',
            scrub: 1.2,
            pin: true,
          },
        })

        scrollTl
          .to(panelRef.current, { y: -40, scale: 1.02, ease: 'none' }, 0)
          .to(heroInnerRef.current, { yPercent: -6, ease: 'none' }, 0)
          .to(heroAtmosphereRef.current, { yPercent: -10, opacity: 0.95, ease: 'none' }, 0)
          .to(heroParallaxRef.current, { yPercent: -12, opacity: 0.9, ease: 'none' }, 0)
          .to(scrollIndicatorRef.current, { opacity: 0, ease: 'none' }, 0.35)
      }
    }, heroRef)

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
      <div className="hero-atmosphere" ref={heroAtmosphereRef}>
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-grid-overlay" />
        <div className="hero-horizon" />
      </div>

      <div className="hero-parallax" ref={heroParallaxRef} aria-hidden="true">
        <div className="hero-parallax-line" />
        <div className="hero-parallax-line thin" />
        <div className="hero-parallax-node" />
      </div>

      <div className="hero-inner" ref={heroInnerRef}>
        <div className="hero-scene-meta">
          <span className="scene-label">Scene 01</span>
          <span className="scene-divider" />
          <span className="scene-caption">Arrival — inside the studio</span>
        </div>
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

      <div className="scene-transition hero-transition" aria-hidden="true">
        <div className="transition-line" />
        <div className="transition-glow" />
      </div>
    </section>
  )
}

export default Hero
