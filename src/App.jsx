import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import projectMetrics from './data/project-metrics.json';

const impact = [
  { value: '≤2K', label: 'change tickets automated / month' },
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
    id: 'homeos',
    title: 'HomeOS',
    type: 'A useful object, not a demo',
    lenses: ['systems'],
    signal: 'Raspberry Pi · Angular · PWA',
    hook: 'I gave away my Echo Show—then built the one I actually wanted.',
    story:
      'A used monitor and Raspberry Pi became an ambient home dashboard. Because it was a one-person system, Google Sheets was enough for the first data layer; a private API and phone PWA made it controllable from anywhere.',
    decision:
      'The PWA was deliberate: free iOS provisioning expires after seven days, while a paid membership made little sense for a private utility. A home-screen app removed that signing lifecycle.',
    proof: 'Built over a few weeks · still controlled from an installed PWA',
    preview: {
      webm: '/media/homeos-demo.webm',
      mp4: '/media/homeos-demo.mp4',
      poster: '/media/homeos-demo-poster.jpg',
      alt: 'HomeOS phone control surface syncing a todo, grocery item, and persistent alert to the Raspberry Pi display',
    },
    href: 'https://demo.homeos-hub.xyz/',
    linkLabel: 'Try the phone control surface',
    secondaryHref: 'https://demo.homeos-hub.xyz/display',
    secondaryLinkLabel: 'Watch the ambient display',
    demoHint: 'Open both views side by side: changes made in the control surface appear on the display in real time. The display was composed for a dedicated monitor, so adjust your browser zoom until the scale feels right for your screen.',
  },
  {
    id: 'spaceterra',
    repo: 'spaceterra',
    title: 'SpaceTerra',
    type: 'The first scale experiment',
    lenses: ['systems'],
    signal: 'Node.js · Phaser · MongoDB · Socket.IO',
    hook: 'My first Node.js project began as a two-day challenge to myself.',
    story:
      'I built the browser game independently for Teknack in 2017 to see whether my first Node.js project could survive event-scale interest. Google Analytics recorded roughly 20,000 plays.',
    decision:
      'Years later I revived it with Google authentication, MongoDB Atlas score persistence, and a real-time leaderboard—giving a two-day festival game identity and durable state.',
    proof: '≈20K plays during its original run · individual build',
    preview: {
      webm: '/media/spaceterra-demo.webm',
      mp4: '/media/spaceterra-demo.mp4',
      poster: '/media/spaceterra-demo-poster.jpg',
      alt: 'SpaceTerra gameplay progressing from live scoring to the persisted leaderboard',
    },
    href: 'https://github.com/haramrit09k/spaceterra',
    linkLabel: 'Inspect the source',
    secondaryHref: 'https://spaceterra.herokuapp.com/',
    secondaryLinkLabel: 'Play SpaceTerra',
    demoHint: 'The independently hosted game may take a few seconds to wake before it loads.',
  },
  {
    id: 'rockx',
    repo: 'rockX',
    title: 'Portal Search Desk',
    type: 'An API failure became a product pivot',
    lenses: ['systems'],
    signal: 'Angular 11 · GraphQL · Apollo · Docker',
    hook: 'The SpaceX API failed, so I rebuilt the product around a healthier graph.',
    story:
      'RockX began as a SpaceX launch browser. When its upstream stopped working, I treated the dependency failure as a product constraint and rebuilt it as Portal Search Desk—an exploration interface over the Rick and Morty graph.',
    decision:
      'The experience follows relationships instead of isolated result pages: search leads to a character file, its appearance trail, an episode dossier, and the full cast. Debounced search cancels stale requests, Apollo uses a cache-first policy, and favorites stay browser-local.',
    proof: 'Live GraphQL search · character → episode → cast traversal · deployed on Heroku',
    preview: {
      webm: '/media/rockx-demo.webm',
      mp4: '/media/rockx-demo.mp4',
      poster: '/media/rockx-demo-poster.jpg',
      alt: 'Portal Search Desk searching for Pickle Rick, opening the character appearance trail, and traversing to the episode cast',
    },
    href: 'https://github.com/haramrit09k/rockX',
    linkLabel: 'Inspect the rebuild',
    secondaryHref: 'https://portal-search-desk-359b5c84a84b.herokuapp.com/',
    secondaryLinkLabel: 'Search the multiverse',
  },
  {
    id: 'classifai',
    repo: 'classifAI',
    title: 'classifAI',
    type: 'My first complete ML lifecycle',
    lenses: ['ml'],
    signal: 'TF-IDF · Logistic regression · FastAPI',
    hook: 'I wanted machine learning to stop feeling like a black box.',
    story:
      'I took 322,641 app reviews through cleaning, weak labeling, training, evaluation, serialization, API serving, and prediction logging. The pipeline routes feedback into five operational classes.',
    decision:
      'I chose an interpretable classical NLP baseline and class weighting before reaching for a larger model. Its 84% score measures agreement with heuristic labels—not human accuracy—so the next step is a human-labeled benchmark and error analysis.',
    proof: '314K cleaned reviews · 5 classes · 63K pseudo-labeled holdout',
    href: 'https://github.com/haramrit09k/classifAI',
    linkLabel: 'Inspect the pipeline',
  },
  {
    id: 'distributed-ml',
    title: 'Distributed ML',
    type: 'Published research · IEEE',
    lenses: ['systems', 'ml'],
    signal: 'Distributed training · Electron.js · research',
    hook: 'What changes when model training becomes a systems problem?',
    story:
      'This published capstone distributed machine-learning workloads across machines and paired the experiments with a usable desktop interface.',
    decision:
      'We treated orchestration and usability as part of ML performance; the reported result was 10% faster training without accuracy loss.',
    proof: 'Published at ICAC3 / indexed by IEEE',
    preview: {
      webm: '/media/distributed-ml-demo.webm',
      mp4: '/media/distributed-ml-demo.mp4',
      poster: '/media/distributed-ml-demo-poster.jpg',
      alt: 'Distributed ML demonstration progressing from parameter-server architecture to a three-machine training run and comparison result',
    },
    href: 'https://ieeexplore.ieee.org/document/9036818',
    linkLabel: 'Read the publication',
    secondaryHref: 'https://youtu.be/q6aFGrotY4c',
    secondaryLinkLabel: 'Watch the full demonstration',
  },
  {
    id: 'session-todo',
    repo: 'sticky-todo-macos',
    title: 'Session Todo',
    type: 'Software shaped around attention',
    lenses: ['systems'],
    signal: 'Swift 6 · AppKit · local-only',
    hook: 'Most todo apps store work. I needed one to remember what I was doing.',
    story:
      'A floating macOS utility keeps one NOW task dominant and tucks the backlog away. A global shortcut retrieves it anywhere; optional nudges interrupt distraction without becoming another dashboard.',
    decision:
      'No accounts, sync, analytics, projects, labels, or streaks. Tasks stay on-device; the product is intentionally smaller because the constraint is the feature.',
    proof: 'Native AppKit · zero third-party dependencies · local persistence',
    preview: {
      webm: '/media/session-todo-demo.webm',
      mp4: '/media/session-todo-demo.mp4',
      poster: '/media/session-todo-demo-poster.jpg',
      alt: 'Session Todo capturing a task, queuing the next step, promoting it after completion, and delivering a focused check-in notification',
    },
    href: 'https://github.com/haramrit09k/sticky-todo-macos',
    linkLabel: 'See how it works',
  },
  {
    id: 'f1rstaid',
    repo: 'f1rstaid',
    title: 'F1rstAid',
    type: 'Retrieval for a high-stakes domain',
    lenses: ['ml'],
    signal: 'RAG · FAISS · OpenAI · Streamlit',
    hook: 'Can an assistant make dense F-1 guidance easier to navigate?',
    story:
      'A retrieval-augmented prototype ingests government and university guidance, then retrieves context for questions about F-1 status, CPT, OPT, employment, and travel.',
    decision:
      'The important design question is evidence, not fluency. A production version needs source hierarchy, citations, recency checks, and a hard boundary between navigation help and legal advice.',
    proof: 'Crawler + ingestion pipeline + vector search + tested application',
    preview: {
      webm: '/media/f1rstaid-demo.webm',
      mp4: '/media/f1rstaid-demo.mp4',
      poster: '/media/f1rstaid-demo-poster.jpg',
      alt: 'F1rstAid calculating an initial OPT unemployment deadline and a SEVIS address-reporting deadline, then expanding the official DHS citation',
    },
    href: 'https://github.com/haramrit09k/f1rstaid',
    linkLabel: 'Inspect the prototype',
    secondaryHref: 'https://f1rstaid-064025a9fcc1.herokuapp.com/',
    secondaryLinkLabel: 'Try F1rstAid',
  },
];

const archiveProjects = [
  ['LogScribe MCP', 'A local MCP server for reading, searching, filtering, and summarizing log files.', 'Python · MCP', 'https://github.com/haramrit09k/logscribe-mcp'],
  ['H-1B Decision Tree', 'A visual decision aid for navigating time-sensitive layoff scenarios.', 'Next.js · TypeScript', 'https://github.com/haramrit09k/h1b-layoff-decision-tree'],
  ['HelpChess', 'Open-source web work supporting a nonprofit growing chess access in India.', 'JavaScript · open source', 'https://github.com/haramrit09k/helpchess'],
  ['IPL Predictor', 'An academic comparison of machine-learning approaches for match prediction.', 'Python · neural networks', 'https://github.com/haramrit09k/ipl-predictor'],
  ['Signature Verification', 'An early computer-vision experiment for comparing handwritten signatures.', 'OpenCV · scikit-learn', 'https://github.com/haramrit09k/signature-verification'],
  ['What’s My Neuron', 'A web explorer that retrieves neuron records from the NeuroMorpho API.', 'Django · APIs', 'https://github.com/haramrit09k/whats-my-neuron'],
  ['Firechat', 'A lightweight real-time chat-room experiment built with React and Firebase.', 'React · Firebase', 'https://github.com/haramrit09k/firechat'],
  ['SWE 645', 'A containerized student-survey application deployed with Docker and Kubernetes.', 'Docker · Kubernetes', 'https://github.com/haramrit09k/swe645'],
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

function formatProbeTime(milliseconds) {
  return milliseconds >= 1000
    ? `${(milliseconds / 1000).toFixed(1)}s`
    : `${milliseconds}ms`;
}

function LiveSystemSignal({ metric }) {
  if (!metric || metric.status !== 'healthy') return null;

  const signals = [
    'Online',
    `${formatProbeTime(metric.warmMs)} warm response`,
    metric.coldStartVisible ? `${formatProbeTime(metric.wakeMs)} wake` : null,
    ...metric.facts,
  ].filter(Boolean);

  return (
    <div className="live-signal" title={`Measured ${projectMetrics.generatedAt}. ${projectMetrics.cadence}.`}>
      <span className="live-signal-label"><i aria-hidden="true"></i> {metric.label}</span>
      <span className="live-signal-data">
        {signals.map((signal) => <span key={signal}>{signal}</span>)}
      </span>
      <a href={metric.endpoint} target="_blank" rel="noreferrer">Health <Arrow /></a>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [activeCase, setActiveCase] = useState('01');
  const [projectLens, setProjectLens] = useState('all');
  const [expandedProject, setExpandedProject] = useState('homeos');
  const lensConsoleRef = useRef(null);
  const projectVideoRefs = useRef({});

  const toggleProject = (projectId) => {
    const video = projectVideoRefs.current[projectId];

    if (video?.paused) {
      const playbackAttempt = video.play();
      playbackAttempt?.catch(() => {});
    }

    setExpandedProject((currentProject) => (
      currentProject === projectId ? null : projectId
    ));
  };

  const openProjectFullscreen = async (projectId) => {
    const video = projectVideoRefs.current[projectId];
    if (!video) return;

    video.controls = true;

    const restoreInlineVideo = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        video.controls = false;
        document.removeEventListener('fullscreenchange', restoreInlineVideo);
        document.removeEventListener('webkitfullscreenchange', restoreInlineVideo);
      }
    };

    try {
      if (video.requestFullscreen) {
        document.addEventListener('fullscreenchange', restoreInlineVideo);
        await video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        document.addEventListener('webkitfullscreenchange', restoreInlineVideo);
        video.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.addEventListener('webkitendfullscreen', () => {
          video.controls = false;
        }, { once: true });
        video.webkitEnterFullscreen();
      } else {
        video.controls = false;
      }
    } catch {
      video.controls = false;
      document.removeEventListener('fullscreenchange', restoreInlineVideo);
      document.removeEventListener('webkitfullscreenchange', restoreInlineVideo);
    }
  };

  const changeProjectLens = (value) => {
    const previousTop = lensConsoleRef.current
      ? lensConsoleRef.current.getBoundingClientRect().top
      : null;
    const firstMatch = selectedProjects.find(
      (project) => value === 'all' || project.lenses.includes(value)
    );

    setProjectLens(value);
    setExpandedProject(firstMatch ? firstMatch.id : null);

    window.requestAnimationFrame(() => {
      if (previousTop === null || !lensConsoleRef.current) return;
      const nextTop = lensConsoleRef.current.getBoundingClientRect().top;
      window.scrollBy(0, nextTop - previousTop);
    });
  };

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
          <span className="wordmark-type" aria-hidden="true">HK<span className="wordmark-dot">.</span></span>
          <img className="wordmark-icon" src="/favicon copy.png" alt="" />
        </a>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#lab" onClick={() => setMenuOpen(false)}>Personal systems</a>
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
              <a href="#lab" onClick={() => setIndexOpen(false)}><span>02</span> Personal systems <Arrow /></a>
              <a href="#experience" onClick={() => setIndexOpen(false)}><span>03</span> Experience <Arrow /></a>
              <a href="#about" onClick={() => setIndexOpen(false)}><span>04</span> The engineer <Arrow /></a>
              <a href="/resume/master_resume.pdf" target="_blank" rel="noreferrer"><span>05</span> Résumé <Arrow /></a>
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
            <p className="hero-role-signal reveal reveal-1">
              Engineering range / <span>Software systems</span> / <span>Applied ML</span>
            </p>
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
          <span>Applied ML</span>
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

        <section className="lab-section section" id="lab" aria-labelledby="lab-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Personal systems / decision traces</p>
              <h2 id="lab-title">The reason came first.</h2>
            </div>
            <p>These are not technology showcases. Each began with a real constraint, then became a way to learn the system underneath it.</p>
          </div>
          <div className="lens-console" aria-label="Filter projects by role lens" ref={lensConsoleRef}>
            <p><span className="status-dot"></span> Read the work through a lens</p>
            <div>
              {[
                ['all', 'Complete signal'],
                ['systems', 'Software systems'],
                ['ml', 'Applied ML'],
              ].map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={projectLens === value ? 'is-active' : ''}
                  aria-pressed={projectLens === value}
                  onClick={() => changeProjectLens(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="trace-list">
            {selectedProjects
              .filter((project) => projectLens === 'all' || project.lenses.includes(projectLens))
              .map((project, index) => (
                <details
                  className="trace-card"
                  key={`${projectLens}-${project.id}`}
                  open={expandedProject === project.id}
                >
                  <summary onClick={(event) => {
                    event.preventDefault();
                    toggleProject(project.id);
                  }}>
                    <span className="trace-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="trace-title">
                      <small>{project.type}</small>
                      <strong>{project.title}</strong>
                    </span>
                    <span className="trace-hook">{project.hook}</span>
                    {project.preview && (
                      <span className="trace-preview">
                        <video
                          ref={(node) => { projectVideoRefs.current[project.id] = node; }}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          poster={project.preview.poster}
                          aria-label={project.preview.alt}
                        >
                          <source src={project.preview.mp4} type="video/mp4" />
                          <source src={project.preview.webm} type="video/webm" />
                        </video>
                        <img
                          className="trace-preview-fallback"
                          src={project.preview.poster}
                          alt={project.preview.alt}
                        />
                      </span>
                    )}
                    <span className="trace-toggle" aria-hidden="true">+</span>
                  </summary>
                  {project.preview && expandedProject === project.id && (
                    <div className="trace-media-actions" aria-label={`${project.title} demo controls`}>
                      <button type="button" onClick={() => openProjectFullscreen(project.id)}>
                        View fullscreen <Arrow />
                      </button>
                    </div>
                  )}
                  <div className="trace-body">
                    <p className="trace-signal">{project.signal}</p>
                    {project.href ? (
                      <div className="trace-links">
                        <a href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <Arrow /></a>
                        {project.secondaryHref && (
                          <a href={project.secondaryHref} target="_blank" rel="noreferrer">{project.secondaryLinkLabel} <Arrow /></a>
                        )}
                        {project.demoHint && <p>{project.demoHint}</p>}
                      </div>
                    ) : (
                      <p className="private-label">{project.linkLabel} · source remains private</p>
                    )}
                    <LiveSystemSignal metric={projectMetrics.projects[project.id]} />
                    <div>
                      <span>Origin</span>
                      <p>{project.story}</p>
                    </div>
                    <div>
                      <span>Decision trace</span>
                      <p>{project.decision}</p>
                    </div>
                    <div className="trace-proof">
                      <span>Evidence</span>
                      <strong>{project.proof}</strong>
                    </div>
                  </div>
                </details>
              ))}
          </div>

          <div className="archive-heading">
            <p className="kicker">Earlier explorations / archive</p>
            <p>Smaller experiments that document range, repetition, and a long habit of building to learn.</p>
          </div>
          <div className="archive-grid">
            {archiveProjects.map(([title, description, stack, href], index) => (
              <a href={href} target="_blank" rel="noreferrer" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <small>{stack}</small>
                </div>
                <Arrow />
              </a>
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
