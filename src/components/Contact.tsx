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
          start: 'top 70%',
        },
        defaults: { ease: 'power3.out' },
      })

      tl.from(sectionTitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
      })
        .from(
          contactTextRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          contactLinkRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1,
          },
          '-=0.5'
        )
        .from(
          socialLinksRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 1,
          },
          '-=0.5'
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact">
      <div className="contact-container">
        <h2 className="section-title" ref={sectionTitleRef}>
          Let's Create Together
        </h2>
        <div className="contact-content">
          <p className="contact-text" ref={contactTextRef}>
            Ready to bring your vision to life? Let's collaborate on something exceptional.
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
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Oussama Laaroussi. All rights reserved.</p>
      </footer>
    </section>
  )
}

export default Contact
