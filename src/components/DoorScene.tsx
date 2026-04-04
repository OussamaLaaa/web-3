import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../utils/motionUtils'
import './DoorScene.css'

function DoorScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const deskGlowRef = useRef<HTMLDivElement>(null)
  const roomLightRef = useRef<HTMLDivElement>(null)
  const darknessRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      const scene = sceneRef.current

      if (reducedMotion || !scene) {
        // Simple fade for reduced motion
        gsap.set(scene, { opacity: 1 })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
      })

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
        .to(
          scene,
          {
            '--door-scene-zoom': 1.06,
            duration: 0.52,
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
            opacity: 0.98,
            duration: 0.24,
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
