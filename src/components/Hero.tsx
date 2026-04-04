import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile } from '../utils/motionUtils'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const identityChips = ['Strategic', 'Collaborative', 'Creative', 'Product-minded']

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const chipsRef = useRef<HTMLSpanElement[]>([])
  const actionsRef = useRef<HTMLDivElement>(null)
  const heroInnerRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const deskItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const mobile = isMobile()

    const ctx = gsap.context(() => {
      const heroElement = heroRef.current
      if (reducedMotion) {
        gsap.set(heroElement, { clearProps: 'all' })
        return
      }
      if (!heroElement) {
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      // Desk items reveal first (subtle workspace atmosphere)
      tl.from(deskItemsRef.current, {
        opacity: 0,
        y: 6,
        duration: 1.05,
      })
        .from(veilRef.current, {
          opacity: 0.35,
          duration: 1,
        }, '-=0.9')
        .from(
          gridRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          '-=1'
        )
        .from(
          roleRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.8'
        )
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
          '+=0.25'
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
          '-=0.35'
        )
      }

      tl.from(
        actionsRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.9,
        },
        '+=0.25'
      )
        .from(
          panelRef.current,
          {
            y: 18,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.55'
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
          end: reducedMotion ? '+=80%' : mobile ? '+=110%' : '+=160%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      scrollTl
        .to(
          heroElement,
          {
            '--hero-dim': 0.28,
            duration: 1.1,
          },
          0
        )
        .to(
          deskItemsRef.current,
          {
            opacity: 0.4,
            y: -6,
            duration: 1,
          },
          0
        )
        .to(
          veilRef.current,
          {
            opacity: 0.18,
            duration: 1.1,
          },
          0
        )
        .to(
          heroInnerRef.current,
          {
            scale: mobile ? 0.99 : 0.96,
            y: mobile ? -6 : -10,
            duration: 1.05,
          },
          0
        )
        .to(
          heroContentRef.current,
          {
            opacity: 0.96,
            duration: 1.1,
          },
          0.1
        )
        .to(
          panelRef.current,
          {
            scale: 1.03,
            y: -8,
            duration: 1.05,
          },
          0.2
        )
        .to(
          gridRef.current,
          {
            opacity: 0.16,
            duration: 1,
          },
          0.2
        )
        .to(
          '.hero-panel-light',
          {
            opacity: 0.9,
            duration: 0.95,
          },
          0.2
        )
        .to(
          heroContentRef.current,
          {
            opacity: 0.9,
            y: -6,
            duration: 1,
          },
          0.62
        )
        .to(
          heroInnerRef.current,
          {
            filter: 'saturate(0.95)',
            duration: 0.95,
          },
          0.62
        )
        .fromTo(
          '.framed-identity',
          { y: 56, opacity: 0.74 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power2.out',
          },
          0.74
        )
        .fromTo(
          '.framed-identity .identity-frame-wrap',
          { opacity: 0, y: 72, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
          },
          0.76
        )

    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector)
    if (target) {
      const reducedMotion = prefersReducedMotion()
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-atmosphere">
        <div className="hero-veil" ref={veilRef} />
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-grid-overlay" ref={gridRef} />
        <div className="hero-noise" />
      </div>

      {/* Workspace desk items */}
      <div className="hero-desk-items" ref={deskItemsRef}>
        <div className="desk-keyboard" />
        <div className="desk-mouse" />
        <div className="desk-notebook" />
        <div className="desk-coffee" />
      </div>

      <div className="hero-inner" ref={heroInnerRef}>
        <div className="hero-content" ref={heroContentRef}>
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
