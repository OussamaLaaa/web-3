import './Contact.css'

function Contact() {
  return (
    <section className="contact">
      <div className="contact-container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p className="contact-text">
            Let's collaborate on your next project or just have a conversation about design and technology.
          </p>
          <div className="contact-links">
            <a href="mailto:hello@example.com" className="contact-link">
              hello@example.com
            </a>
            <div className="contact-social">
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
