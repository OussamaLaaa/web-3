import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile, getParallaxIntensity } from '../utils/motionUtils'
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
    const mobile = isMobile()
    const pinDuration = mobile ? '100%' : '200%'

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Simple fade entrance for reduced motion
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from([titleRef.current, subtitleRef.current, identityRef.current], {
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        })
        return
      }

      const parallaxIntensity = getParallaxIntensity(1)

      // Pinned cinematic timeline for Hero entrance
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

      // Scene progression with layered parallax
      tl
        // Phase 1: Atmosphere zoom in (0-30%)
        .from(atmosphereRef.current, {
          scale: 1.3,
          opacity: 0.5,
          duration: 1.5,
          ease: 'power2.out',
        }, 0)

        // Phase 2: Depth layers parallax (0-40%)
        .from(depthLayer1Ref.current, {
          y: 100 * parallaxIntensity,
          opacity: 0,
          duration: 2,
          ease: 'power2.out',
        }, 0)
        .from(depthLayer2Ref.current, {
          y: 60 * parallaxIntensity,
          opacity: 0,
          duration: 2,
          ease: 'power2.out',
        }, 0.2)

        // Phase 3: Identity reveal - designed entrance (20-60%)
        .from(identityRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1.5,
          ease: 'power3.out',
        }, 0.8)
        .from(titleRef.current, {
          y: 80 * parallaxIntensity,
          opacity: 0,
          duration: 1.8,
          ease: 'power3.out',
        }, 1)

        // Phase 4: Subtitle entrance (40-70%)
        .from(subtitleRef.current, {
          y: 50 * parallaxIntensity,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
        }, 1.8)

        // Phase 5: Camera push forward / zoom (70-100%)
        .to(atmosphereRef.current, {
          scale: 1.8,
          opacity: 0.3,
          duration: 1.2,
          ease: 'power2.in',
        }, 3)
        .to([depthLayer1Ref.current, depthLayer2Ref.current], {
          y: -100 * parallaxIntensity,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.in',
          stagger: 0.1,
        }, 3)
        .to([titleRef.current, subtitleRef.current], {
          y: -60 * parallaxIntensity,
          opacity: 0.3,
          duration: 1.2,
          ease: 'power2.in',
        }, 3)
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
            Creating Digital
            <br />
            Experiences
          </h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            A creative developer crafting elegant solutions through design and code
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
