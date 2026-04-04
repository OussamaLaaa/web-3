import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motionUtils'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const contactTextRef = useRef<HTMLParagraphElement>(null)
  const contactLinkRef = useRef<HTMLAnchorElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)
  const handoffRef = useRef<HTMLDivElement>(null)
  const finalGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        return
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: '34% top',
          scrub: 1,
        },
      })
        .fromTo(
          sectionRef.current,
          {
            '--contact-handoff': 0.12,
            '--contact-focus': 0.2,
          },
          {
            '--contact-handoff': 1,
            '--contact-focus': 1,
            ease: 'none',
          },
          0
        )
        .fromTo(
          handoffRef.current,
          {
            xPercent: -18,
            opacity: 0.3,
          },
          {
            xPercent: 0,
            opacity: 0.9,
            ease: 'none',
          },
          0
        )
        .fromTo(
          finalGlowRef.current,
          {
            yPercent: 8,
            opacity: 0.22,
          },
          {
            yPercent: 0,
            opacity: 0.9,
            ease: 'none',
          },
          0
        )

      // Contact section entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact" ref={sectionRef}>
      <div className="contact-handoff" ref={handoffRef} aria-hidden="true">
        <span className="contact-handoff-line" />
        <span className="contact-handoff-dot" />
      </div>
      <div className="contact-final-glow" ref={finalGlowRef} aria-hidden="true" />
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
    </section>
  )
}

export default Contact
