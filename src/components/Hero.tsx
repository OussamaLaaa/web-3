import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, getParallaxIntensity } from '../utils/motionUtils'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const sceneRef = useRef<HTMLElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const depthLayer1Ref = useRef<HTMLDivElement>(null)
  const depthLayer2Ref = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const identityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Simple fade entrance for reduced motion
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from([atmosphereRef.current, identityRef.current], {
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        })
        return
      }

      const parallaxIntensity = getParallaxIntensity(1)

      // Clean entrance animation on page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl
        // Atmosphere fades in
        .from(atmosphereRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 1.5,
        }, 0)

        // Depth layers emerge with parallax
        .from(depthLayer1Ref.current, {
          opacity: 0,
          y: 40 * parallaxIntensity,
          duration: 1.2,
        }, 0.3)
        .from(depthLayer2Ref.current, {
          opacity: 0,
          y: 25 * parallaxIntensity,
          duration: 1.2,
        }, 0.4)

        // Identity content reveals
        .from(identityRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
        }, 0.6)
        .from(titleRef.current, {
          y: 50 * parallaxIntensity,
          opacity: 0,
          duration: 1.4,
        }, 0.8)
        .from(subtitleRef.current, {
          y: 30 * parallaxIntensity,
          opacity: 0,
          duration: 1.2,
        }, 1.2)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero hero-cinematic" ref={sceneRef}>
      {/* Atmospheric layers for depth */}
      <div className="hero-atmosphere" ref={atmosphereRef}>
        <div className="atmosphere-gradient"></div>
        <div className="atmosphere-particles"></div>
        <div className="atmosphere-window-light"></div>
      </div>

      {/* Depth layers for parallax - workspace environment */}
      <div className="hero-depth-layer hero-depth-1" ref={depthLayer1Ref}>
        <div className="workspace-silhouette"></div>
        <div className="desk-edge"></div>
      </div>
      <div className="hero-depth-layer hero-depth-2" ref={depthLayer2Ref}>
        <div className="ambient-objects"></div>
      </div>

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-identity" ref={identityRef}>
          <h1 className="hero-title" ref={titleRef}>
            Oussama Laaroussi
          </h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            Creative Developer • Crafting elegant digital experiences through design and code
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
