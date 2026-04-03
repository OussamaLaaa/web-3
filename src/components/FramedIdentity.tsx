import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile } from '../utils/motionUtils'
import './FramedIdentity.css'

gsap.registerPlugin(ScrollTrigger)

function FramedIdentity() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const signatureRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const plaqueRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const mobile = isMobile()

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const workSection = document.querySelector('.featured-work') as HTMLElement | null

      if (reducedMotion || !section) {
        gsap.set(section, { '--wall-illumination': 1 })
        return
      }

      if (workSection) {
        gsap.set(workSection, { '--archive-rail-intensity': 0 })
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: mobile ? '+=140%' : '+=190%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.from(section, { '--wall-illumination': 0.42, duration: 1.1 }, 0)
        .from(
          frameRef.current,
          {
            y: mobile ? 26 : 48,
            scale: mobile ? 0.97 : 0.9,
            opacity: 0.35,
            filter: 'blur(12px)',
            duration: 1.2,
          },
          0
        )
        .from(glassRef.current, { opacity: 0, duration: 1 }, 0.15)
        .from(
          portraitRef.current,
          {
            y: mobile ? 28 : 42,
            opacity: 0,
            scale: 0.95,
            duration: 1.15,
          },
          0.1
        )
        .from(signatureRef.current, { y: 18, opacity: 0, duration: 0.85 }, 0.35)
        .from(infoRef.current, { y: 30, opacity: 0, duration: 1 }, 0.25)
        .from(plaqueRef.current, { y: 18, opacity: 0, duration: 0.9 }, 0.45)
        .from(
          railRef.current,
          {
            scaleX: 0.2,
            opacity: 0,
            transformOrigin: 'left center',
            duration: 1,
          },
          0.55
        )
        .to(
          frameRef.current,
          {
            scale: mobile ? 1 : 1.08,
            y: mobile ? -6 : -24,
            duration: 1.1,
          },
          0.65
        )
        .to(glowRef.current, { opacity: 1, duration: 1 }, 0.65)
        .to(portraitRef.current, { filter: 'saturate(1.05) brightness(1.08)', duration: 1 }, 0.9)
        .to(railRef.current, { '--rail-intensity': 1, duration: 0.9 }, 0.85)

      if (workSection) {
        tl.to(
          workSection,
          {
            '--archive-rail-intensity': 1,
            duration: 1,
          },
          0.82
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="framed-identity" ref={sectionRef} aria-label="Framed identity reveal">
      <div className="identity-atmosphere">
        <div className="identity-wall-gradient" />
        <div className="identity-noise" />
        <div className="identity-sconce" ref={glowRef} />
      </div>

      <div className="framed-identity-container">
        <div className="identity-left">
          <div className="identity-pill">Inside the studio</div>
          <p className="identity-line">
            A quiet portrait pinned to the wall—reminding every interface to feel inhabited, crafted, and softly lit.
          </p>
          <div className="identity-trio" ref={infoRef}>
            <div className="identity-meta">
              <span className="meta-label">Disciplines</span>
              <span className="meta-value">Systems, Motion, Product voice</span>
            </div>
            <div className="identity-meta">
              <span className="meta-label">Based</span>
              <span className="meta-value">Remote — EU time</span>
            </div>
            <div className="identity-meta">
              <span className="meta-label">Focus</span>
              <span className="meta-value">Designing behavior like architecture</span>
            </div>
          </div>
        </div>

        <div className="identity-frame-stack" ref={frameRef}>
          <div className="frame-wire" />
          <div className="frame-pin" />
          <div className="frame-shadow" />
          <div className="identity-frame">
            <div className="frame-glass" ref={glassRef} />
            <div className="frame-border" />
            <div className="frame-matte">
              <div className="frame-portrait" ref={portraitRef}>
                <div className="portrait-light" />
                <div className="portrait-noise" />
                <div className="portrait-face">
                  <span className="portrait-initials">OL</span>
                  <span className="portrait-id">Oussama Laa — Product Design</span>
                </div>
              </div>
            </div>
            <div className="frame-signature" ref={signatureRef}>
              <span className="signature-mark">Oussama</span>
              <span className="signature-caption">Cinematic, deliberate product craft</span>
            </div>
          </div>
          <div className="identity-plaque" ref={plaqueRef}>
            <span className="plaque-label">Mediums</span>
            <span className="plaque-value">UI architecture, motion grammar, research synthesis</span>
          </div>
        </div>
      </div>

      <div className="identity-handoff">
        <div className="handoff-rail" ref={railRef} />
        <div className="handoff-glow identity-handoff-glow" />
        <div className="handoff-caption">Selected work waits just beyond this wall.</div>
      </div>
    </section>
  )
}

export default FramedIdentity
