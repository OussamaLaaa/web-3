import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Creating Digital
          <br />
          Experiences
        </h1>
        <p className="hero-subtitle">
          A creative developer crafting elegant solutions through design and code
        </p>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
