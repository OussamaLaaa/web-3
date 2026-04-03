import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const contactTextRef = useRef<HTMLParagraphElement>(null)
  const contactLinkRef = useRef<HTMLAnchorElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const ctx = gsap.context(() => {
      // Contact section entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' },
      })

      tl.from(sectionTitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      })
        .from(
          contactTextRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          contactLinkRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          socialLinksRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )

      if (!prefersReducedMotion) {
        gsap.fromTo(
          railRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
            },
          }
        )

        gsap.fromTo(
          atmosphereRef.current,
          { y: 60, opacity: 0.35 },
          {
            y: -60,
            opacity: 0.8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.05,
            },
          }
        )

        if (!isMobile) {
          gsap.fromTo(
            '.contact',
            { backgroundPosition: '50% 120%' },
            {
              backgroundPosition: '50% 80%',
              ease: 'none',
              scrollTrigger: {
                trigger: '.contact',
                start: 'top bottom',
                end: 'center center',
                scrub: 1.1,
              },
            }
          )
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact" ref={sectionRef}>
      <div className="contact-atmosphere" ref={atmosphereRef} aria-hidden="true" />
      <div className="scene-rail" ref={railRef}>
        <span className="scene-label">Scene 04</span>
        <span className="scene-divider" />
        <span className="scene-caption">Final note — open the line</span>
      </div>
      <div className="contact-container">
        <h2 className="section-title" ref={sectionTitleRef}>
          Get In Touch
        </h2>
        <div className="contact-content">
          <p className="contact-text" ref={contactTextRef}>
            Let's collaborate on your next project or just have a conversation about design and technology.
          </p>
          <div className="contact-links">
            <a
              href="mailto:hello@example.com"
              className="contact-link"
              ref={contactLinkRef}
            >
              hello@example.com
            </a>
            <div className="contact-social" ref={socialLinksRef}>
              <span className="social-link">LinkedIn</span>
              <span className="social-link">GitHub</span>
              <span className="social-link">Twitter</span>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
      <div className="scene-transition contact-transition" aria-hidden="true">
        <div className="transition-line" />
        <div className="transition-glow" />
      </div>
    </section>
  )
}

export default Contact
