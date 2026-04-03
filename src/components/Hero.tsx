import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motionUtils'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const glowLeftRef = useRef<HTMLDivElement>(null)
  const glowRightRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const deskRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      const titleLines = titleRef.current?.querySelectorAll('.hero-title-line') ?? []

      if (!reduceMotion) {
        const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        introTl
          .from([glowLeftRef.current, glowRightRef.current], {
            opacity: 0,
            scale: 0.9,
            duration: 1.4,
            stagger: 0.12,
          })
          .from(
            beamRef.current,
            {
              opacity: 0,
              y: -30,
              duration: 1.1,
            },
            '-=1.0'
          )
          .from(
            panelsRef.current,
            {
              opacity: 0,
              y: 40,
              duration: 1,
            },
            '-=0.8'
          )
          .from(
            deskRef.current,
            {
              opacity: 0,
              y: 60,
              duration: 1.1,
            },
            '-=0.7'
          )
          .from(
            titleLines,
            {
              y: 80,
              opacity: 0,
              duration: 1.1,
              stagger: 0.12,
            },
            '-=0.5'
          )
          .from(
            subtitleRef.current,
            {
              y: 32,
              opacity: 0,
              duration: 0.9,
            },
            '-=0.6'
          )
          .from(
            metaRef.current,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.6'
          )
          .from(
            scrollIndicatorRef.current,
            {
              y: 24,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.6'
          )

        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: '+=140%',
              scrub: true,
            },
          })
          .to(glowRightRef.current, { xPercent: 8, opacity: 0.6 }, 0)
          .to(glowLeftRef.current, { xPercent: -6, opacity: 0.5 }, 0)
          .to(beamRef.current, { yPercent: -14 }, 0)
          .to(deskRef.current, { yPercent: 8 }, 0)
          .to(panelsRef.current, { yPercent: -4 }, 0)
          .to(titleRef.current, { yPercent: -6 }, 0)
          .to(subtitleRef.current, { yPercent: -4 }, 0)
      } else {
        gsap.set(
          [
            glowLeftRef.current,
            glowRightRef.current,
            beamRef.current,
            deskRef.current,
            panelsRef.current,
            titleLines,
            subtitleRef.current,
            metaRef.current,
            scrollIndicatorRef.current,
          ],
          { clearProps: 'all' }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-atmosphere">
        <div className="hero-glow hero-glow--left" ref={glowLeftRef} />
        <div className="hero-glow hero-glow--right" ref={glowRightRef} />
        <div className="hero-beam" ref={beamRef} />
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="hero-desk" ref={deskRef}>
          <span className="hero-desk-edge" />
          <span className="hero-desk-light" />
          <span className="hero-desk-screen" />
        </div>
        <div className="hero-panels" ref={panelsRef}>
          <div className="hero-panel hero-panel--main">
            <span className="hero-panel-label">live workspace</span>
            <span className="hero-panel-bar" />
          </div>
          <div className="hero-panel hero-panel--secondary">
            <span className="hero-panel-pill" />
            <div className="hero-panel-lines">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-identity">
          <span className="hero-kicker">Oussama · UI/UX Designer</span>
          <h1 className="hero-title" ref={titleRef}>
            <span className="hero-title-line">Cinematic digital worlds</span>
            <span className="hero-title-line">crafted for modern products</span>
          </h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            Designing immersive product experiences with film-like pacing, layered depth, and intentional motion that
            keeps interfaces calm, focused, and alive.
          </p>
          <div className="hero-meta" ref={metaRef}>
            <span className="hero-meta-chip">Interaction direction</span>
            <span className="hero-meta-chip">Spatial UI systems</span>
            <span className="hero-meta-chip">Cinematic storytelling</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll to enter the workspace</span>
      </div>
    </section>
  )
}

export default Hero
