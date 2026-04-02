import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isMobile, getParallaxIntensity } from '../utils/motionUtils'
import './WorkGateway.css'

gsap.registerPlugin(ScrollTrigger)

function WorkGateway() {
  const gatewayRef = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const mobile = isMobile()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Simple fade-in for reduced motion
        gsap.from(gatewayRef.current, {
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: gatewayRef.current,
            start: 'top 80%',
          },
        })
        return
      }

      const parallaxIntensity = getParallaxIntensity(1)

      // Gateway entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gatewayRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
      })

      tl
        // Monitor frame emergence
        .from(frameRef.current, {
          scale: 0.8,
          opacity: 0,
          rotationX: 45,
          transformOrigin: 'center center',
          duration: 1.5,
          ease: 'power2.out',
        }, 0)

        // Screen activation
        .from(screenRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: 'power2.out',
        }, 0.5)

        // Glow effect
        .from(glowRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 1.5,
          ease: 'power2.out',
        }, 0.6)

        // Label reveal
        .from(labelRef.current, {
          opacity: 0,
          y: 30 * parallaxIntensity,
          duration: 1,
          ease: 'power3.out',
        }, 1)

      // Transform takeover - monitor expands to fill screen as user scrolls into work section
      const expandTl = gsap.timeline({
        scrollTrigger: {
          trigger: gatewayRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      })

      expandTl
        // Monitor expands
        .to(monitorRef.current, {
          scale: mobile ? 2.5 : 3,
          y: mobile ? -100 * parallaxIntensity : -150 * parallaxIntensity,
          duration: 1.5,
          ease: 'power2.inOut',
        }, 0)

        // Frame fades away
        .to(frameRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
        }, 0.3)

        // Label fades away
        .to(labelRef.current, {
          opacity: 0,
          y: -20 * parallaxIntensity,
          duration: 0.8,
          ease: 'power2.in',
        }, 0.2)

        // Gateway background darkens
        .to(gatewayRef.current, {
          backgroundColor: '#000000',
          duration: 1,
          ease: 'power1.inOut',
        }, 0)
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="work-gateway" ref={gatewayRef}>
      <div className="gateway-content">
        {/* Desk surface and environment */}
        <div className="gateway-desk">
          <div className="desk-surface"></div>
          <div className="desk-items">
            <div className="desk-item keyboard"></div>
            <div className="desk-item mouse"></div>
            <div className="desk-item notebook"></div>
            <div className="desk-item coffee"></div>
          </div>
        </div>

        {/* Monitor/Screen - the portal to work */}
        <div className="gateway-monitor" ref={monitorRef}>
          {/* Monitor stand */}
          <div className="monitor-stand"></div>

          {/* Monitor frame */}
          <div className="monitor-frame" ref={frameRef}>
            <div className="frame-edge frame-top"></div>
            <div className="frame-edge frame-bottom"></div>
            <div className="frame-edge frame-left"></div>
            <div className="frame-edge frame-right"></div>
          </div>

          {/* Screen content */}
          <div className="monitor-screen" ref={screenRef}>
            <div className="screen-content">
              <div className="screen-grid"></div>
              <div className="screen-gradient"></div>
              <div className="screen-reflection"></div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="monitor-glow" ref={glowRef}></div>
        </div>

        {/* Label */}
        <div className="gateway-label" ref={labelRef}>
          <span className="label-text">Selected Work</span>
        </div>
      </div>
    </div>
  )
}

export default WorkGateway
