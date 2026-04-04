import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motionUtils'
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

    const ctx = gsap.context(() => {
      const scene = sceneRef.current

      if (!scene || reducedMotion) {
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
          start: 'top 78%',
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
            scale: 1.02,
            y: -8,
            duration: 0.62,
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
          scene,
          {
            '--identity-light-handoff': 0.45,
            duration: 0.72,
          },
          0.66
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="framed-identity" ref={sceneRef}>
      <div className="framed-identity-atmosphere" />
      <div className="framed-wall-rail framed-wall-rail-top" aria-hidden="true" />
      <div className="framed-wall-rail framed-wall-rail-bottom" aria-hidden="true" />
      <div className="framed-wall-grid" />

      <div className="identity-frame-wrap" ref={frameWrapRef}>
        <div className="identity-mount-shadow" aria-hidden="true" />
        <div className="identity-mount-bracket" aria-hidden="true" />
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
