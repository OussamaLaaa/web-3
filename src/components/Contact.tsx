import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const contactTextRef = useRef<HTMLParagraphElement>(null)
  const contactLinkRef = useRef<HTMLAnchorElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact">
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
