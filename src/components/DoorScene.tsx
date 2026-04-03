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
  const darknessRef = useRef<HTMLDivElement>(null)

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
          end: mobile ? '+=98%' : '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: 'power2.inOut' },
      })

      // Start in complete darkness, gradually reveal the space
      tl.fromTo(
        atmosphereRef.current,
        { opacity: 0.46 },
        { opacity: 1, duration: 0.32 }
      )
        .fromTo(
          roomLightRef.current,
          { opacity: 0.24 },
          { opacity: 0.88, duration: 0.45 },
          0.06
        )
        .fromTo(
          deskGlowRef.current,
          { opacity: 0.48, scale: 0.9 },
          { opacity: 0.96, scale: 1, duration: 0.58 },
          0.14
        )
        .to(
          darknessRef.current,
          {
            opacity: 0.82,
            duration: 0.42,
          },
          0.24
        )
        .to(
          scene,
          {
            '--door-scene-brightness': 1.06,
            duration: 0.4,
          },
          0.26
        )
        // Camera zoom into the workspace
        .to(
          scene,
          {
            '--door-scene-zoom': mobile ? 1.2 : 1.44,
            duration: 0.78,
            ease: 'power2.inOut',
          },
          0.42
        )
        .to(
          atmosphereRef.current,
          {
            opacity: 0.6,
            duration: 0.28,
          },
          0.9
        )
        .to(
          scene,
          {
            yPercent: -4,
            opacity: 0.94,
            duration: 0.32,
          },
          0.9
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="door-scene" ref={sceneRef}>
      <div className="door-scene-atmosphere" ref={atmosphereRef}>
        {/* Darkness and depth */}
        <div className="door-darkness" ref={darknessRef} />

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
