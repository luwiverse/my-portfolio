import { useEffect, useLayoutEffect, useState } from "react";
import profileImage from "./assets/profile-new.jpg";
import aboutImage from "./assets/about-photo.png";

function App() {
  const [loading, setLoading] = useState(true);
  const [hideLoader, setHideLoader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState(() => new Set());
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");

    if (savedTheme) {
      return savedTheme === "light";
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLightTheme);
    window.localStorage.setItem("portfolio-theme", isLightTheme ? "light" : "dark");
  }, [isLightTheme]);

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

  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        const enteringSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (enteringSections.length > 0) {
          setVisibleSections((currentSections) => {
            const nextSections = new Set(currentSections);
            enteringSections.forEach((sectionId) => nextSections.add(sectionId));
            return nextSections;
          });
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8%" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* AMBIENT BACKGROUND */}
      <div className="ambient-background" aria-hidden="true">
        <span className="ambient-scan" />
      </div>

      {/* LOADING SCREEN */}
      {loading && (
        <div className={`loader ${hideLoader ? "loader-hide" : ""}`}>
          <div className="loader-content">
            <div className="loader-text" aria-label="LUWI">
              <div className="loader-row"><strong>L</strong><span>Listen</span></div>
              <div className="loader-row"><strong>U</strong><span>Understand</span></div>
              <div className="loader-row"><strong>W</strong><span>Work</span></div>
              <div className="loader-row"><strong>I</strong><span>Innovate</span></div>
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
          <a href="#home" aria-label="Home" data-tooltip="Home"><span aria-hidden="true">⌂</span></a>
          <a href="#about" aria-label="About" data-tooltip="About"><span aria-hidden="true">◎</span></a>
          <a href="#projects" aria-label="Projects" data-tooltip="Projects"><span aria-hidden="true">▦</span></a>
          <a href="#certifications" aria-label="Certifications" data-tooltip="Certifications"><span aria-hidden="true">✦</span></a>
        </div>

        <div className="nav-actions">
          <a href="#contact" className="contact-link">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      <button
        className="theme-toggle"
        type="button"
        aria-label={`Switch to ${isLightTheme ? "dark" : "light"} theme`}
        data-tooltip={isLightTheme ? "Dark theme" : "Light theme"}
        onClick={() => setIsLightTheme((currentTheme) => !currentTheme)}
      >
        <span aria-hidden="true">{isLightTheme ? "☾" : "☼"}</span>
      </button>

      {/* CONTENT */}
      <main>
        <section
          id="home"
          className={`home-section reveal-section ${visibleSections.has("home") ? "is-visible" : ""}`}
        >
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

        <section
          id="about"
          className={`content-section about-section reveal-section ${visibleSections.has("about") ? "is-visible" : ""}`}
        >
          <div className="about-heading">
            <p className="section-kicker">A little about me</p>
            <h2>About <em>Me</em></h2>
            <span className="about-heading-rule" aria-hidden="true" />
          </div>
          <div className="about-content">
            <div className="about-portrait-wrap">
              <div className="about-portrait-ring">
                <img src={aboutImage} alt="Portrait of Louis A." />
              </div>
            </div>
            <div className="about-copy">
              <p><strong>Louis A.</strong> is a full-stack developer who enjoys turning curious ideas into useful digital experiences.</p>
              <p>From machine learning and computer vision to thoughtful interfaces, I build with equal parts precision, experimentation, and care.</p>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className={`content-section projects-section reveal-section ${visibleSections.has("projects") ? "is-visible" : ""}`}
        >
          <div className="section-label">02 / Selected work</div>
          <div className="section-heading"><h2>A few things I&apos;ve made</h2></div>
            <div className="project-grid">
              <article className="project-card project-featured"><div className="project-art project-image"><img src="/smart-violations.png" alt="Smart Violation login screen at Laguna State Polytechnic University" /></div><div className="project-info"><div><span className="project-number">01</span><h3>Smart Violation</h3></div><p>A campus-focused system for managing and monitoring violations.</p><div className="project-tags"><span>Flask</span><span>YOLOv8</span><span>RTSP</span><span>Chart.js</span><span>SQLite</span><span>Machine learning</span><span>NLP</span><span>SQL</span></div></div></article>
              <article className="project-card"><div className="project-art art-grid"><span className="grid-word">RAG</span><span className="grid-shape" aria-hidden="true" /></div><div className="project-info"><div><span className="project-number">02</span><h3>RAG Prototype</h3></div><p>An experiment in grounding intelligent answers with relevant knowledge.</p><div className="project-tags"><span>Python</span><span>Embeddings</span><span>Retrieval</span><span>LLM</span></div></div></article>
          </div>
        </section>

        <section
          id="certifications"
          className={`content-section certifications-section reveal-section ${visibleSections.has("certifications") ? "is-visible" : ""}`}
        >
          <div className="cert-wip" aria-label="Certifications work in progress">WIP</div>
        </section>

        <section
          id="contact"
          className={`contact-section reveal-section ${visibleSections.has("contact") ? "is-visible" : ""}`}
        >
          <div className="contact-panel">
            <p className="section-kicker">Have a good idea?</p>
            <h2>Get in Touch</h2>
            <span className="contact-rule" aria-hidden="true" />
            <p className="contact-description">Need a thoughtful build or want to collaborate? Message me.</p>
            <div className="contact-socials">
              <a className="contact-icon" href="mailto:agorluwi@gmail.com" aria-label="Email Louis">✉</a>
              <a className="contact-icon" href="https://github.com/luwiverse" target="_blank" rel="noreferrer" aria-label="Louis on GitHub">
                <svg aria-hidden="true"><use href="/icons.svg#github-icon" /></svg>
              </a>
            </div>
            <div className="contact-details">
              <a className="contact-email" href="mailto:agorluwi@gmail.com">agorluwi@gmail.com</a>
              <span>© 2025 Louis A.</span>
              <span>Designed &amp; developed with curiosity</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;