import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          scrollIndicatorRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )

      // Scroll indicator animation (continuous)
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          Creating Digital
          <br />
          Experiences
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          A creative developer crafting elegant solutions through design and code
        </p>
      </div>
      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
