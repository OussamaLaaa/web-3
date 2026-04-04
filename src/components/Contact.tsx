import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motionUtils'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const contactTextRef = useRef<HTMLParagraphElement>(null)
  const contactLinkRef = useRef<HTMLAnchorElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const handoffRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        return
      }

      // Cinematic handoff entrance
      gsap.from(handoffRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 25%',
          scrub: 1.4,
        },
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'left center',
        ease: 'power2.out',
      })

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
        <span className="handoff-trail" />
        <span className="handoff-glow" />
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
    </section>
  )
}

export default Contact
