import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "./data.js";

const sections = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["journey", "Journey"],
  ["contact", "Contact"],
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="arrow-icon"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  function sendMessage(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${form.get("name")}`);
    const body = encodeURIComponent(
      `${form.get("message")}\n\nFrom: ${form.get("name")} (${form.get("email")})`,
    );
    window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label={`${portfolio.name}, home`}>
          <span className="brand-mark">rk<span>.</span></span>
          <span className="brand-name">{portfolio.name}</span>
        </a>
        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`} aria-label="Main navigation">
          {sections.map(([id, label]) => (
            <a
              key={id}
              className={activeSection === id ? "nav-link active" : "nav-link"}
              href={`#${id}`}
              onClick={closeMenu}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="theme-toggle icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☼" : "☾"}
          </button>
          <a className="nav-contact" href="#contact">
            Let&apos;s talk <ArrowIcon diagonal />
          </a>
          <button
            className="menu-toggle icon-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="canva-hero" id="top" aria-label="Featured Canva portfolio design">
          <iframe
            className="canva-embed"
            src="https://www.canva.com/design/DAHZJhE-fRQ/jtq1ZBAdsFFYEpY56MARfw/view?embed"
            title="R Kasinadh portfolio design on Canva"
            allowFullScreen
          >
            <a href="https://www.canva.com/design/DAHZJhE-fRQ/jtq1ZBAdsFFYEpY56MARfw/view">
              View the portfolio design on Canva
            </a>
          </iframe>
        </section>

        <section className="section-wrap content-section about-section" id="about">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Curiosity, meet code.">
            Here&apos;s what I&apos;m learning, building, and working toward.
          </SectionHeading>
          <div className="about-grid">
            <div className="profile-card">
              <div className="profile-glow" />
              <div className="profile-initials" role="img" aria-label="Initials RK, photo placeholder">
                RK
              </div>
              <span className="profile-caption">A work in progress, like my code.</span>
              <span className="profile-decoration decoration-one" />
              <span className="profile-decoration decoration-two" />
              <span className="profile-decoration decoration-three" />
            </div>
            <div className="about-content">
              <p className="about-bio">{portfolio.bio}</p>
              <div className="facts-grid">
                <div className="fact-card">
                  <span className="fact-icon">⌂</span>
                  <span className="fact-label">COLLEGE</span>
                  <strong>{portfolio.education.college}</strong>
                  <span>{portfolio.education.location}</span>
                </div>
                <div className="fact-card">
                  <span className="fact-icon">◎</span>
                  <span className="fact-label">CURRENTLY</span>
                  <strong>{portfolio.education.year}</strong>
                  <span>Computer Science &amp; Engineering</span>
                </div>
                <div className="fact-card">
                  <span className="fact-icon">↗</span>
                  <span className="fact-label">GRADUATING</span>
                  <strong>Class of 2028</strong>
                  <span>{portfolio.education.years}</span>
                </div>
                <div className="fact-card">
                  <span className="fact-icon">✳</span>
                  <span className="fact-label">AIMING FOR</span>
                  <strong>Developer roles</strong>
                  <span>Software &amp; AI/ML</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap content-section skills-section" id="skills">
          <SectionHeading eyebrow="MY TOOLKIT" title="Skills I’m growing.">
            Technologies I&apos;ve explored through coursework and projects.
          </SectionHeading>
          <div className="skills-grid">
            {portfolio.skills.map((skill, index) => (
              <motion.article
                className="skill-card"
                key={skill.group}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className={`skill-number skill-number-${index + 1}`}>0{index + 1}</div>
                <h3>{skill.group}</h3>
                <div className="badge-list">
                  {skill.items.map((item) => <span className="skill-badge" key={item}>{item}</span>)}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-wrap content-section projects-section" id="projects">
          <SectionHeading eyebrow="SELECTED WORK" title="Projects, in progress.">
            Small steps, practical experiments, and things I&apos;ve made along the way.
          </SectionHeading>
          <div className="projects-grid">
            {portfolio.projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.title}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
              >
                <div className={`project-visual project-visual-${index + 1}`} aria-hidden="true">
                  <span className="project-visual-index">0{index + 1}</span>
                  <span className="project-visual-mark">
                    {["⌕", "✳", "▦", "♫", "↗"][index]}
                  </span>
                  <span className="project-visual-type">{project.category}</span>
                  <span className="visual-orbit" />
                </div>
                <div className="project-body">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <ArrowIcon diagonal />
                  </div>
                  <p>{project.description}</p>
                  {project.tags.length > 0 && (
                    <div className="project-tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                  <div className="project-links">
                    {project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowIcon diagonal /></a>
                    ) : (
                      <span className="link-todo">GitHub link TODO</span>
                    )}
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">Live project <ArrowIcon diagonal /></a>
                    ) : (
                      <span className="link-todo">Live link TODO</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-wrap content-section journey-section" id="journey">
          <SectionHeading eyebrow="THE JOURNEY SO FAR" title="Learning, one step at a time.">
            Education, courses, certificates, and events that have shaped my path.
          </SectionHeading>
          <div className="journey-layout">
            <div className="education-feature">
              <span className="education-icon">✳</span>
              <p className="eyebrow">CURRENT CHAPTER</p>
              <h3>{portfolio.education.degree}</h3>
              <p>{portfolio.education.college}</p>
              <p>{portfolio.education.location}</p>
              <div className="education-meta">
                <span>{portfolio.education.years}</span>
                <span>Expected graduation · 2028</span>
              </div>
            </div>
            <div className="credentials-grid">
              {portfolio.credentials.filter((item) => item.type !== "Education").map((item) => (
                <article className="credential-card" key={item.title}>
                  <span className="credential-type">{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.organization || "Organization TODO"}</p>
                  <span className="credential-date">{item.date || "Date TODO"}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="achievement-band" aria-labelledby="achievement-title">
          <div className="section-wrap achievement-inner">
            <div className="achievement-mark" aria-hidden="true">✳</div>
            <div>
              <p className="eyebrow">BUILDING WITH OTHERS</p>
              <h2 id="achievement-title">Hackathons are part of the journey.</h2>
              <p>{portfolio.achievement}</p>
            </div>
            <span className="achievement-spark" aria-hidden="true">✳</span>
          </div>
        </section>

        <section className="section-wrap content-section contact-section" id="contact">
          <SectionHeading eyebrow="YOUR TURN" title="Have a project in mind?">
            I&apos;m open to conversations, collaborations, and new opportunities.
          </SectionHeading>
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="contact-note">Whether it&apos;s a project idea, a question, or just a hello — my inbox is open.</p>
              <a className="email-link" href={`mailto:${portfolio.contact.email}`}>
                {portfolio.contact.email} <ArrowIcon diagonal />
              </a>
              <div className="social-list">
                {portfolio.contact.socials.map((social) => (
                  <a href={social.url} key={social.label} target="_blank" rel="noreferrer">
                    <span>{social.label}</span>
                    <span className="social-handle">{social.handle}</span>
                    <ArrowIcon diagonal />
                  </a>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={sendMessage}>
              <label>
                Your name
                <input name="name" autoComplete="name" placeholder="Jane Doe" required />
              </label>
              <label>
                Email address
                <input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />
              </label>
              <label>
                Your message
                <textarea name="message" rows="4" placeholder="Tell me what’s on your mind…" required />
              </label>
              <button className="button button-primary form-submit" type="submit">
                Send a message <ArrowIcon />
              </button>
              <p className="form-hint">Opens your email app with the message ready to send.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <a className="brand" href="#top" aria-label="Back to top">
            <span className="brand-mark">rk<span>.</span></span>
            <span className="brand-name">{portfolio.name}</span>
          </a>
          <span>Designed &amp; built with curiosity.</span>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href={`mailto:${portfolio.contact.email}`}>Email</a>
          </div>
          <span className="copyright">© {new Date().getFullYear()} {portfolio.name}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
