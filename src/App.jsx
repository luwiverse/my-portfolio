import { useEffect, useState } from "react";
import Galaxy from "./components/Galaxy/Galaxy";
import profileImage from "./assets/profile-new.jpg";

const galaxyFocal = [0.5, 0.5];
const galaxyRotation = [1.0, 0.0];

function App() {
  const [loading, setLoading] = useState(true);
  const [hideLoader, setHideLoader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideLoader(true);

      setTimeout(() => {
        setLoading(false);
      }, 700);
    }, 1500);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* GALAXY BACKGROUND */}
      <div className="galaxy-background">
        <Galaxy
          focal={galaxyFocal}
          rotation={galaxyRotation}
          density={1.2}
          glowIntensity={0.35}
          saturation={0}
          starSpeed={0.5}
          rotationSpeed={0.05}
          mouseInteraction={true}
          mouseRepulsion={true}
          repulsionStrength={2}
          twinkleIntensity={0.4}
        />
      </div>

      {/* LOADING SCREEN */}
      {loading && (
        <div className={`loader ${hideLoader ? "loader-hide" : ""}`}>
          <div className="loader-content">
            <div className="loader-text">luwiverse</div>

            <div className="loader-bar">
              <div className="loader-progress"></div>
            </div>
          </div>
        </div>
      )}

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* NAVBAR */}
      <nav>
        <a href="#home" className="logo" aria-label="Luwi home">
          <span className="logo-mark">L</span>
          <span>LUWI</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
        </div>

        <a href="#contact" className="contact-link">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>

      {/* CONTENT */}
      <main>
        <section id="home" className="home-section">
          <div className="home-content">
            <p className="eyebrow"><span className="status-dot" /> Available for thoughtful builds</p>

            <h1>Ideas into <em>impact.</em></h1>

            <p className="description">
              I&apos;m Louis, a full-stack developer blending computer vision,
              machine learning, and expressive digital experiences.
            </p>

            <div className="home-buttons">
              <a href="/cv.pdf" download="Louis-A-CV.pdf" className="btn primary-btn">
                Download CV
              </a>

              <a href="#projects" className="btn secondary-btn">
                Projects
              </a>
            </div>

            <div className="hero-meta">
              <span>Based in the Philippines</span>
              <span className="meta-line" />
              <span>Building for the web &amp; beyond</span>
            </div>
          </div>

          <div className="profile-wrap">
            <div className="profile-frame-shell">
              <div className="profile-frame">
                <img src={profileImage} alt="Illustrated portrait of Louis A." />
                <img
                  className="profile-hover-image"
                  src="/profile-hover.png"
                  alt=""
                  aria-hidden="true"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <span className="pixel-overlay" aria-hidden="true" />
              </div>
            </div>
            <div className="profile-note"><span>01</span> The person behind the pixels</div>
          </div>
        </section>

        <section id="about" className="content-section about-section">
          <div className="section-label">01 / About</div>
          <div className="about-copy">
            <p className="section-kicker">Curious by default</p>
            <h2>Technology should feel <em>human.</em></h2>
            <p>I care about the space between a clever idea and a useful product. My work moves from data and models to interfaces that feel clear, considered, and genuinely good to use.</p>
            <div className="stats-row">
              <div><strong>03+</strong><span>Years learning<br />&amp; building</span></div>
              <div><strong>∞</strong><span>Questions worth<br />exploring</span></div>
            </div>
          </div>
          <div className="about-aside"><span>Currently exploring</span><strong>Machine perception<br />+ human connection</strong><div className="aside-rule" /></div>
        </section>

        <section id="projects" className="content-section projects-section">
          <div className="section-label">02 / Selected work</div>
          <div className="section-heading"><p className="section-kicker">A few things I&apos;ve made</p><h2>Built with intent.</h2></div>
          <div className="project-grid">
            <article className="project-card project-featured"><div className="project-art art-orbit"><span>CV</span><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core" /></div><div className="project-info"><div><span className="project-number">01</span><h3>Vision / Motion</h3></div><p>Making movement and visual data easier to understand.</p><span className="project-type">Computer vision</span></div></article>
            <article className="project-card"><div className="project-art art-grid"><span className="grid-word">FLOW</span><div className="grid-shape" /></div><div className="project-info"><div><span className="project-number">02</span><h3>Flow State</h3></div><p>A focused space for better creative work.</p><span className="project-type">Product design</span></div></article>
            <article className="project-card"><div className="project-art art-signal"><div className="signal-line" /><div className="signal-line" /><div className="signal-line" /></div><div className="project-info"><div><span className="project-number">03</span><h3>Signal / Noise</h3></div><p>Turning complex information into a clear next step.</p><span className="project-type">Full-stack build</span></div></article>
          </div>
        </section>

        <section id="certifications" className="content-section certifications-section">
          <div className="section-label">03 / Credentials</div>
          <div className="cert-intro"><p className="section-kicker">Always in progress</p><h2>Proof of <em>practice.</em></h2></div>
          <div className="cert-list"><div className="cert-item"><span>2025</span><strong>Full Stack Development</strong><small>Web technologies &amp; application architecture</small><b>↗</b></div><div className="cert-item"><span>2024</span><strong>Machine Learning Foundations</strong><small>Models, data, and responsible experimentation</small><b>↗</b></div><div className="cert-item"><span>2023</span><strong>Computer Science Graduate</strong><small>Systems thinking, built from the ground up</small><b>↗</b></div></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-mark">LUWI<span>®</span></div>
          <p className="section-kicker">Have a good idea?</p>
          <h2>Let&apos;s make it<br /><em>real.</em></h2>
          <a className="contact-email" href="mailto:hello@luwi.dev">hello@luwi.dev <span>↗</span></a>
          <div className="contact-footer"><span>© 2025 Louis A.</span><span>Designed &amp; developed with curiosity</span><span>Scroll to explore ↑</span></div>
        </section>
      </main>
    </>
  );
}

export default App;