import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile } from '../utils/motionUtils'
import './FramedIdentity.css'

gsap.registerPlugin(ScrollTrigger)

function FramedIdentity() {
  const sceneRef = useRef<HTMLElement>(null)
  const frameWrapRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLElement>(null)
  const frameGlowRef = useRef<HTMLDivElement>(null)
  const handoffRef = useRef<HTMLDivElement>(null)
  const plaqueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const mobile = isMobile()

    const ctx = gsap.context(() => {
      const scene = sceneRef.current
      const featuredSection = document.querySelector('.featured-work') as HTMLElement | null
      const firstWorkItem = document.querySelector('.featured-work .work-item:first-child') as HTMLDivElement | null
      const firstVisual = document.querySelector('.featured-work .work-item:first-child .work-visual') as HTMLDivElement | null

      if (!scene) {
        return
      }

      if (reducedMotion) {
        gsap.set(scene, { clearProps: 'all' })
        return
      }

      gsap.from(frameWrapRef.current, {
        scrollTrigger: {
          trigger: scene,
          start: 'top 88%',
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: mobile ? '+=110%' : '+=165%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: 'power2.out' },
      })

      tl.to(
        scene,
        {
          '--identity-room-dim': 0.35,
          duration: 0.45,
        },
        0
      )
        .to(
          frameGlowRef.current,
          {
            opacity: 1,
            duration: 0.5,
          },
          0.08
        )
        .to(
          frameRef.current,
          {
            scale: mobile ? 1.02 : 1.05,
            y: mobile ? -8 : -14,
            duration: 0.75,
          },
          0.12
        )
        .to(
          plaqueRef.current,
          {
            y: 0,
            opacity: 0.95,
            duration: 0.58,
          },
          0.2
        )
        .to(
          handoffRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
          },
          0.48
        )
        .to(
          frameWrapRef.current,
          {
            xPercent: mobile ? 0 : -10,
            y: mobile ? -8 : -12,
            scale: mobile ? 0.98 : 0.94,
            filter: 'saturate(0.88)',
            duration: 0.9,
          },
          0.64
        )
        .to(
          scene,
          {
            '--identity-light-handoff': 1,
            duration: 0.85,
          },
          0.66
        )

      const handoffStartTime = 0.7
      const timelineStaggerOffset = 0.02
      let timelinePosition = handoffStartTime

      if (featuredSection) {
        tl.fromTo(
          featuredSection,
          { y: 100, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          timelinePosition
        )
        timelinePosition += timelineStaggerOffset
      }

      if (firstWorkItem) {
        tl.fromTo(
          firstWorkItem,
          { opacity: 0, y: 80, filter: 'blur(5px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
          },
          timelinePosition
        )
        timelinePosition += timelineStaggerOffset
      }

      if (firstVisual) {
        tl.fromTo(
          firstVisual,
          { scale: 0.97, y: 10 },
          {
            scale: 1,
            y: 0,
            duration: 0.95,
          },
          timelinePosition
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="framed-identity" ref={sceneRef}>
      <div className="framed-identity-atmosphere" />
      <div className="framed-wall-grid" />

      <div className="identity-frame-wrap" ref={frameWrapRef}>
        <div className="identity-frame-glow" ref={frameGlowRef} />
        <article className="identity-frame" ref={frameRef}>
          <div className="identity-frame-inner">
            <div className="identity-portrait" aria-hidden="true">
              <span className="portrait-halo" />
              <span className="portrait-silhouette" />
              <span className="portrait-signature" />
            </div>

            <div className="identity-text">
              <p className="identity-kicker">Studio Presence</p>
              <h2 className="identity-name">Oussama Laa</h2>
              <p className="identity-line">
                Product designer shaping calm, strategic experiences with a cinematic eye.
              </p>
            </div>
          </div>
        </article>

        <div className="identity-plaque" ref={plaqueRef}>
          <span>Curiosity · Craft · Clarity</span>
        </div>
      </div>

      <div className="identity-handoff" ref={handoffRef} aria-hidden="true">
        <span className="handoff-line" />
        <span className="handoff-dot" />
      </div>
    </section>
  )
}

export default FramedIdentity
