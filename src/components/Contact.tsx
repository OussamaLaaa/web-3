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
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024. All rights reserved.</p>
      </footer>
    </section>
  )
}

export default Contact
