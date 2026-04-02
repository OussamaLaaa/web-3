import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile, getParallaxIntensity } from '../utils/motionUtils'
import './DoorScene.css'

gsap.registerPlugin(ScrollTrigger)

function DoorScene() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const doorLeftRef = useRef<HTMLDivElement>(null)
  const doorRightRef = useRef<HTMLDivElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const lightBeamRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const mobile = isMobile()
    const pinDuration = mobile ? '100%' : '150%'

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Simple fade version for reduced motion
        gsap.from(sceneRef.current, {
          opacity: 0,
          duration: 0.5,
        })
        return
      }

      // Create pinned timeline for door opening sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: `+=${pinDuration}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Scene progression
      const parallaxIntensity = getParallaxIntensity(1)

      tl
        // Phase 1: Atmosphere reveal (0-25%)
        .from(atmosphereRef.current, {
          opacity: 0,
          scale: 1.2,
          duration: 1,
          ease: 'power2.out',
        }, 0)

        // Phase 2: Title fade in (10-35%)
        .from(titleRef.current, {
          opacity: 0,
          y: 30 * parallaxIntensity,
          duration: 1,
          ease: 'power3.out',
        }, 0.4)

        // Phase 3: Door opening starts (40-70%)
        .to(doorLeftRef.current, {
          x: '-100%',
          duration: 1.5,
          ease: 'power2.inOut',
        }, 1.6)
        .to(doorRightRef.current, {
          x: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
        }, 1.6)

        // Phase 4: Light beam reveal (50-80%)
        .from(lightBeamRef.current, {
          opacity: 0,
          scaleY: 0,
          duration: 1.2,
          ease: 'power2.out',
        }, 2)

        // Phase 5: Title fade out (75-100%)
        .to(titleRef.current, {
          opacity: 0,
          y: -50 * parallaxIntensity,
          duration: 1,
          ease: 'power2.in',
        }, 3)

        // Phase 6: Atmosphere transition (85-100%)
        .to(atmosphereRef.current, {
          opacity: 0.3,
          scale: 1.5,
          duration: 0.6,
          ease: 'power1.out',
        }, 3.4)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="door-scene" ref={sceneRef}>
      {/* Atmospheric background layers */}
      <div className="door-atmosphere" ref={atmosphereRef}>
        <div className="atmosphere-layer atmosphere-layer-1"></div>
        <div className="atmosphere-layer atmosphere-layer-2"></div>
        <div className="atmosphere-layer atmosphere-layer-3"></div>
      </div>

      {/* Door elements */}
      <div className="door-container">
        <div className="door-left" ref={doorLeftRef}>
          <div className="door-panel"></div>
        </div>
        <div className="door-right" ref={doorRightRef}>
          <div className="door-panel"></div>
        </div>

        {/* Light beam through opening door */}
        <div className="light-beam" ref={lightBeamRef}></div>
      </div>

      {/* Cinematic title */}
      <div className="door-title" ref={titleRef}>
        <span className="door-title-line">Enter</span>
      </div>
    </section>
  )
}

export default DoorScene
