import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile } from '../utils/motionUtils'
import './DoorScene.css'

gsap.registerPlugin(ScrollTrigger)

function DoorScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const deskGlowRef = useRef<HTMLDivElement>(null)
  const roomLightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const mobile = isMobile()

    const ctx = gsap.context(() => {
      const scene = sceneRef.current

      if (reducedMotion || !scene) {
        // Simple fade for reduced motion
        gsap.set(scene, { opacity: 1 })
        return
      }

      // Pinned cinematic sequence: darkness → workspace reveal → camera zoom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: mobile ? '+=150%' : '+=250%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: 'power2.inOut' },
      })

      // Start in complete darkness, gradually reveal the space
      tl.fromTo(
        atmosphereRef.current,
        { opacity: 0.2 },
        { opacity: 1, duration: 0.4 }
      )
        .fromTo(
          roomLightRef.current,
          { opacity: 0 },
          { opacity: 0.8, duration: 0.6 },
          0.1
        )
        .fromTo(
          deskGlowRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.8 },
          0.2
        )
        .to(
          scene,
          {
            '--door-scene-brightness': 1.2,
            duration: 0.5,
          },
          0.4
        )
        // Camera zoom into the workspace
        .to(
          scene,
          {
            '--door-scene-zoom': mobile ? 1.4 : 1.8,
            duration: 1,
            ease: 'power2.in',
          },
          0.6
        )
        .to(
          atmosphereRef.current,
          {
            opacity: 0.3,
            duration: 0.4,
          },
          1.4
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="door-scene" ref={sceneRef}>
      <div className="door-scene-atmosphere" ref={atmosphereRef}>
        {/* Darkness and depth */}
        <div className="door-darkness" />

        {/* Corridor/threshold silhouette */}
        <div className="door-frame">
          <div className="door-handle-left" />
          <div className="door-handle-right" />
        </div>

        {/* Room ambient light */}
        <div className="door-room-light" ref={roomLightRef} />

        {/* Desk in distance with monitor glow */}
        <div className="door-desk-silhouette">
          <div className="door-desk-glow" ref={deskGlowRef} />
        </div>
      </div>

      {/* Subtle environmental details */}
      <div className="door-scene-details">
        <div className="door-shelf-silhouette" />
        <div className="door-plant-silhouette" />
      </div>

      <div className="door-scene-noise" />
    </section>
  )
}

export default DoorScene
