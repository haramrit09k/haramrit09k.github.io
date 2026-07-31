import React, { useEffect, useState } from 'react';
import './App.css';

const impact = [
  { value: '2K', label: 'change tickets automated / month' },
  { value: '67%', label: 'faster application build' },
  { value: '150K', label: 'rows synchronized daily' },
];

const caseStudies = [
  {
    id: '01',
    label: 'Self-service operations',
    title: 'Removed the Ops queue from change management.',
    summary:
      'Architected ServiceNow change-ticket automation for DBaaS self-service workflows, making ticket creation instant and fully automated.',
    outcome: '300–2,000 tickets automated monthly',
    stack: ['Java', 'Spring Boot', 'ServiceNow'],
    detail:
      'The system eliminated manual Ops-team involvement—even through high-volume MongoDB release windows—without compromising the regulated change process.',
  },
  {
    id: '02',
    label: 'Frontend architecture',
    title: 'Made a shared platform build 67% faster.',
    summary:
      'Owned the Angular 19 upgrade for the MaaS application and shared DBaaS component library across four consumer teams.',
    outcome: '4m48s → 1m34s build time',
    stack: ['Angular 19', 'TypeScript', 'Architecture'],
    detail:
      'Breaking changes were coordinated across MSaaS, OraaS, PgaaS, and CaaS while 10 unused components and three dead services were removed.',
  },
  {
    id: '03',
    label: 'Data infrastructure',
    title: 'Rebuilt a platform-wide data sync for real scale.',
    summary:
      'Migrated a raw SQL cronjob into a GraphQL-based Spring Boot worker that powers authentication and approval routing.',
    outcome: '150K rows × 130 columns daily',
    stack: ['GraphQL', 'Spring Boot', 'JDBC'],
    detail:
      'In a related 30K-row extraction flow, benchmarking exposed a scaling risk and drove a normalized schema that cut bulk insert time in half.',
  },
];

const experience = [
  {
    years: '2022 — NOW',
    company: 'Citi',
    role: 'Software Engineer · Enterprise DBaaS',
    copy: 'Owning automation, platform architecture, and production reliability for DBaaS services in a regulated enterprise environment.',
  },
  {
    years: '2021 — 2022',
    company: 'Optimal Satcom',
    role: 'Software Engineer',
    copy: 'Modernized enterprise SATCOM tooling, stabilized high-risk modules, and redesigned core database workflows.',
  },
  {
    years: '2020',
    company: 'Nexus 8 International',
    role: 'Software Engineer Intern',
    copy: 'Built HIPAA-compliant healthcare features and reduced patient-record upload time by 30%.',
  },
];

const selectedProjects = [
  {
    title: 'Distributed ML',
    type: 'Published research · ICAC3 / IEEE',
    image: '/images/portfolio/dist-ml.png',
    href: 'https://ieeexplore.ieee.org/document/9036818',
    note: '10% faster training · no accuracy loss',
  },
  {
    title: 'LogScribe-MCP',
    type: 'Local agent tooling',
    image: '/images/portfolio/numpy-for-c.png',
    href: 'https://github.com/haramrit09k',
    note: 'Python · MCP · log pattern detection',
  },
  {
    title: 'Local Resume Pipeline',
    type: 'Offline LLM workflow',
    image: '/images/portfolio/portfolio.png',
    href: 'https://github.com/haramrit09k',
    note: 'MCP · Ollama · private by design',
  },
];

const strengths = [
  ['Backend systems', 'Java · Spring Boot · REST · Node.js'],
  ['Runtime & platform', 'OpenShift · Kubernetes · Helm · CI/CD'],
  ['Data & integration', 'SQL · GraphQL · JDBC · performance'],
  ['Product & agents', 'Angular · TypeScript · MCP · local LLM tooling'],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [activeCase, setActiveCase] = useState('01');

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setIndexOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = indexOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [indexOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to main content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Haramrit Khurana, home">
          HK<span className="wordmark-dot">.</span>
        </a>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <button className="nav-index" type="button" onClick={() => { setMenuOpen(false); setIndexOpen(true); }}>
            System index +
          </button>
        </nav>
        <button className="index-trigger" type="button" onClick={() => setIndexOpen(true)} aria-haspopup="dialog">
          System index <span aria-hidden="true">+</span>
        </button>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span>
        </button>
      </header>

      {indexOpen && (
        <div className="index-overlay" role="dialog" aria-modal="true" aria-labelledby="index-title">
          <div className="index-bar">
            <p>HK / Portfolio system index</p>
            <button type="button" onClick={() => setIndexOpen(false)}>Close ×</button>
          </div>
          <div className="index-content">
            <div>
              <p className="kicker">Navigate</p>
              <h2 id="index-title">Everything has<br />a trace.</h2>
            </div>
            <nav aria-label="Portfolio index">
              <a href="#work" onClick={() => setIndexOpen(false)}><span>01</span> Selected systems <Arrow /></a>
              <a href="#experience" onClick={() => setIndexOpen(false)}><span>02</span> Experience <Arrow /></a>
              <a href="#about" onClick={() => setIndexOpen(false)}><span>03</span> The engineer <Arrow /></a>
              <a href="/resume/master_resume.pdf" target="_blank" rel="noreferrer"><span>04</span> Résumé <Arrow /></a>
            </nav>
            <div className="index-contact">
              <p>One quiet channel remains open.</p>
              <a href="mailto:haramrit09k@gmail.com">haramrit09k@gmail.com <Arrow /></a>
              <div>
                <a href="https://www.linkedin.com/in/haramrit09k/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com/haramrit09k" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-main">
            <div className="eyebrow reveal reveal-1">
              <span className="status-dot"></span>
              Software engineer · Dallas–Fort Worth
            </div>
            <h1 id="hero-title" className="reveal reveal-2">
              I build systems that help engineering teams <em>ship faster.</em>
            </h1>
            <p className="hero-copy reveal reveal-3">
              I turn operational drag into reliable platforms—so developers spend less time fighting workflows and more time delivering products.
            </p>
            <div className="hero-actions reveal reveal-4">
              <a className="text-link" href="/resume/master_resume.pdf" target="_blank" rel="noreferrer">
                View résumé <Arrow />
              </a>
              <a className="text-link quiet-link" href="#work">Trace the work ↓</a>
            </div>
          </div>

          <aside className="impact-rail reveal reveal-3" aria-label="Selected impact">
            {impact.map((item) => (
              <div className="impact-stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <i aria-hidden="true"></i>
              </div>
            ))}
            <div className="operational-status">
              <span className="status-dot"></span>
              <strong>Production-minded</strong>
              <span>/ built to be owned</span>
            </div>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Engineering profile">
          <span>Backend engineering</span>
          <span>Platform systems</span>
          <span>Regulated enterprise</span>
          <span>Agent tooling</span>
        </section>

        <section className="work-section section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Selected systems / 03</p>
              <h2 id="work-title">Proof, not promises.</h2>
            </div>
            <p>Three examples of ambiguous platform problems turned into measurable engineering outcomes.</p>
          </div>

          <div className="case-grid">
            <div className="case-tabs" role="tablist" aria-label="Case studies">
              {caseStudies.map((item) => (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={activeCase === item.id}
                  aria-controls={`panel-${item.id}`}
                  className={activeCase === item.id ? 'case-tab is-active' : 'case-tab'}
                  onClick={() => setActiveCase(item.id)}
                >
                  <span>{item.id}</span>
                  <strong>{item.title}</strong>
                  <i aria-hidden="true">→</i>
                </button>
              ))}
            </div>

            {caseStudies.map((item) => (
              <article
                key={item.id}
                id={`panel-${item.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${item.id}`}
                className={activeCase === item.id ? 'case-panel is-active' : 'case-panel'}
                hidden={activeCase !== item.id}
              >
                <div className="case-panel-top">
                  <p className="kicker">SYS—{item.id} · {item.label}</p>
                  <span className="case-number">/{item.id}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="case-summary">{item.summary}</p>
                <div className="case-outcome">
                  <span>Outcome</span>
                  <strong>{item.outcome}</strong>
                </div>
                <p className="case-detail">{item.detail}</p>
                <ul className="tag-list" aria-label="Technologies and strengths">
                  {item.stack.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading compact">
            <div>
              <p className="kicker">Trajectory</p>
              <h2 id="experience-title">Built by owning the hard parts.</h2>
            </div>
          </div>
          <div className="timeline">
            {experience.map((job, index) => (
              <article className="timeline-row" key={job.company}>
                <span className="timeline-index">0{index + 1}</span>
                <p className="timeline-years">{job.years}</p>
                <div>
                  <h3>{job.company}</h3>
                  <p className="timeline-role">{job.role}</p>
                </div>
                <p className="timeline-copy">{job.copy}</p>
              </article>
            ))}
          </div>
          <blockquote className="testimonial">
            <p>“If you need someone who takes initiative, drives projects forward, and lifts everyone around him, Haramrit’s your guy.”</p>
            <cite>Nestor Hernandez · Vice President, DBaaS at Citi</cite>
          </blockquote>
        </section>

        <section className="lab-section section" aria-labelledby="lab-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Outside the day job</p>
              <h2 id="lab-title">Curiosity, shipped.</h2>
            </div>
            <p>Published research and local-first experiments across distributed computing and agent tooling.</p>
          </div>
          <div className="project-grid">
            {selectedProjects.map((project, index) => (
              <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                <div className="project-image-wrap">
                  <img src={project.image} alt="" loading="lazy" />
                  <span>0{index + 1}</span>
                </div>
                <div className="project-meta">
                  <div>
                    <p>{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <Arrow />
                </div>
                <p className="project-note">{project.note}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section section" id="about" aria-labelledby="about-title">
          <div className="about-portrait">
            <img src="/images/profile-pic-new.png" alt="Haramrit Singh Khurana smiling outdoors" loading="lazy" />
            <div className="portrait-label"><span className="status-dot"></span> Human behind the systems</div>
          </div>
          <div className="about-copy">
            <p className="kicker">The engineer</p>
            <h2 id="about-title">Calm in the incident. Curious in the architecture.</h2>
            <p className="about-lead">
              I’m Haramrit—an engineer who likes the messy, consequential work between “something is broken” and “this now works for everyone.”
            </p>
            <p>
              My best work sits where backend systems, developer experience, and operational reliability meet. I ask the extra question, make the invisible problem visible, and leave teams with a path they can run without me.
            </p>
            <div className="strength-list">
              {strengths.map(([title, tools], index) => (
                <div key={title}>
                  <span>0{index + 1}</span>
                  <strong>{title}</strong>
                  <p>{tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-orbit" aria-hidden="true"><span>END OF TRANSMISSION</span></div>
          <p className="kicker">Signal / 00</p>
          <h2 id="contact-title">The rest is<br /><em>better live.</em></h2>
          <p>There’s always another system worth understanding.</p>
          <a className="signature-link" href="mailto:haramrit09k@gmail.com">
            haramrit09k@gmail.com <Arrow />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Haramrit Singh Khurana</p>
        <div>
          <a href="https://www.linkedin.com/in/haramrit09k/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a href="https://github.com/haramrit09k" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
