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
  const nameRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const frameLightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const mobile = isMobile()

    const ctx = gsap.context(() => {
      const section = sectionRef.current

      if (reducedMotion || !section) {
        gsap.set([section], { clearProps: 'all' })
        return
      }

      // Pinned cinematic sequence: camera moves to the framed portrait
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: mobile ? '+=100%' : '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: 'power2.inOut' },
      })

      // Frame enters from darkness with illumination
      tl.fromTo(
        frameRef.current,
        { opacity: 0, scale: 0.92, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45 }
      )
        .fromTo(
          frameLightRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          0.1
        )
        .fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4 },
          0.2
        )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.35 },
          0.35
        )
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.45
        )
        .fromTo(
          detailsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.25 },
          0.55
        )
        // Dim the frame light as we prepare to transition
        .to(
          frameLightRef.current,
          { opacity: 0.6, duration: 0.3 },
          0.75
        )
        .to(
          section,
          { '--frame-dim': 0.5, duration: 0.35 },
          0.8
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="framed-identity" ref={sectionRef}>
      <div className="frame-atmosphere">
        <div className="frame-wall-gradient" />
        <div className="frame-light" ref={frameLightRef} />
      </div>

      <div className="identity-frame" ref={frameRef}>
        <div className="frame-border">
          <div className="frame-corner frame-corner-tl" />
          <div className="frame-corner frame-corner-tr" />
          <div className="frame-corner frame-corner-bl" />
          <div className="frame-corner frame-corner-br" />
        </div>

        <div className="frame-mat">
          <div className="portrait-container" ref={portraitRef}>
            <div className="portrait-placeholder">
              <div className="portrait-silhouette" />
              <div className="portrait-glow" />
            </div>
          </div>

          <div className="identity-content">
            <h2 className="identity-name" ref={nameRef}>
              Oussama Laaouaj
            </h2>
            <p className="identity-bio" ref={bioRef}>
              A designer who thrives at the intersection of user empathy and product strategy.
              I craft interfaces that feel intuitive, experiences that resonate, and systems
              that scale with intention.
            </p>
            <div className="identity-details" ref={detailsRef}>
              <div className="detail-item">
                <span className="detail-label">Based in</span>
                <span className="detail-value">Morocco</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Experience</span>
                <span className="detail-value">5+ Years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Approach</span>
                <span className="detail-value">Human-Centered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FramedIdentity
