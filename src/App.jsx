import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';

const impact = [
  { value: '~2.5K', label: 'MongoDB clusters on the DBaaS platform', caseId: '01' },
  { value: '1.4 GB → 470 MB', label: 'peak JVM heap in metadata ingestion', caseId: '02' },
  { value: '67%', label: 'faster Angular application build', caseId: '06' },
];

const caseStudies = [
  {
    id: '01', label: 'Production GenAI',
    title: 'LLM-assisted MongoDB diagnostics.',
    summary: 'Built a production diagnostics workflow at Citi using an internal enterprise framework based on Google ADK. Natural-language issues become targeted database checks through a Mongo-focused MCP server invoking Apigee-backed APIs.',
    outcome: 'Shipped read-only diagnostics and grounded guidance',
    stack: ['LLM orchestration', 'MCP', 'Apigee', 'MongoDB DBaaS'],
    detail: 'Evaluated an Approve button for low-risk remediation, but kept the shipped workflow read-only because of production-data sensitivity and probabilistic model behavior. The internal platform supports roughly 2,500 clusters, 600 daily UI users, and 7,000–8,000 API requests per day.',
  },
  {
    id: '02', label: 'Java performance',
    title: 'Reduced memory use in high-volume ingestion.',
    summary: 'Redesigned a metadata ingestion workflow handling roughly 49K records with more than 150 fields.',
    outcome: 'Peak heap: ~1.4 GB → 470 MB',
    stack: ['Java', 'Streaming', 'Large-payload processing'],
    detail: 'Focused on memory optimization and streaming in a workflow processing large metadata payloads.',
  },
  {
    id: '03', label: 'Database performance',
    title: 'Optimized a production-critical Oracle workflow.',
    summary: 'Moved a problematic GraphQL/data-access path to efficient JDBC to improve a production-critical workflow.',
    outcome: 'Oracle plan cost: ~20,000 → 370; response under 10 seconds',
    stack: ['Oracle', 'JDBC', 'SQL'],
    detail: 'Reworked the database access path and optimized execution to bring response times below 10 seconds.',
  },
  {
    id: '04', label: 'Enterprise automation',
    title: 'Automated change-ticket preparation.',
    summary: 'Automated ServiceNow CHG creation for three critical MongoDB operations, deriving required change metadata from platform context.',
    outcome: 'Three operations live with approval controls preserved',
    stack: ['Java', 'Spring Boot', 'ServiceNow'],
    detail: 'Eliminated repetitive manual ticket preparation. Expansion to more change-gated operations is planned, rather than presented as already shipped.',
  },
  {
    id: '05', label: 'Asynchronous workflows',
    title: 'Automated CyberArk account migrations.',
    summary: 'Automated FID migrations after cluster topology and capacity changes, replacing an incident-driven manual process.',
    outcome: 'Job tracking, per-account status, and escalation on failure',
    stack: ['CyberArk', 'Asynchronous jobs', 'Platform integration'],
    detail: 'Jobs can run for roughly 24 hours. Conservative hourly polling and on-demand refresh provide visibility without excessive downstream requests.',
  },
  {
    id: '06', label: 'Platform modernization',
    title: 'Made the Angular application build 67% faster.',
    summary: 'Modernized the frontend from Angular 16 to 19 and services from Spring Boot 2.7 to 3.3.',
    outcome: 'Build time: 4m48s → 1m34s',
    stack: ['Angular', 'TypeScript', 'Spring Boot'],
    detail: 'Also owned releases across roughly four microservices and four or more teams, and built a Playwright nightly regression suite integrated with Jenkins.',
  },
];

const experience = [
  {
    years: 'DEC 2022 — NOW',
    company: 'Citi',
    role: 'Senior Software Engineer (AVP)',
    copy: 'Building enterprise database-platform features, production LLM-assisted diagnostics, performance improvements, and workflow automation since December 2022.',
  },
  {
    years: 'JUN 2021 — OCT 2022',
    company: 'Optimal Satcom',
    role: 'Software Engineer',
    copy: 'Modernized enterprise SATCOM tooling, stabilized high-risk modules, and redesigned core database workflows.',
  },
  {
    years: 'MAY — AUG 2020',
    company: 'Nexus 8 International',
    role: 'Software Engineer Intern',
    copy: 'Built HIPAA-compliant healthcare features and reduced patient-record upload time by 30%.',
  },
  {
    years: 'JAN 2020 — MAY 2021',
    company: 'George Mason University',
    role: 'Teaching Assistant · Applied IT Programming',
    copy: 'Teaching assistant for Applied IT Programming while completing my M.S. in Computer Science.',
  },
];

const selectedProjects = [
  {
    id: 'interview-mentor', title: 'AI Interview Prep Mentor',
    type: 'LLM application', lenses: ['ml', 'systems'],
    signal: 'React · TypeScript · Express · Gemini · PostgreSQL · Redis · Stripe',
    hook: 'AI-generated interview questions with evaluation and feedback.',
    story: 'An interview-preparation application with Gemini-generated questions tailored to your skill and chosen difficulty, plus AI evaluation of responses. You can also add specific questions you have encountered elsewhere and an ideal answer to practice against.',
    decision: 'Built the product around Google login, Stripe quotas, Redis caching, and a PostgreSQL production database.',
    proof: 'Deployed at ace-interview.app',
    preview: {
      webm: '/media/ace-interview-demo.webm',
      mp4: '/media/ace-interview-demo.mp4',
      poster: '/media/ace-interview-demo-poster.jpg',
      alt: 'ACE interface preview showing skill selection, practice-session setup, and adding a custom interview question',
    },
    demoHint: 'Interface preview: choose a difficulty for AI-generated questions, or add specific questions you want to practice.',
    href: 'https://ace-interview.app', linkLabel: 'Open AI Interview Prep Mentor',
  },
  {
    id: 'f1rstaid',
    repo: 'f1rstaid',
    title: 'F1rstAid',
    type: 'F-1 immigration RAG assistant',
    lenses: ['ml'],
    signal: 'Python · LangChain · OpenAI · FAISS · Streamlit',
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
  {
    id: 'homeos',
    title: 'HomeOS',
    type: 'Home dashboard',
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
    type: 'Browser game',
    lenses: ['systems'],
    signal: 'Node.js · Phaser · MongoDB · Socket.IO',
    hook: 'My first Node.js project began as a two-day challenge to myself.',
    story:
      'I built the browser game independently for Teknack in 2017 to see whether my first Node.js project could survive event-scale interest. The game reached more than 12,000 players.',
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
    type: 'API explorer',
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
    type: 'Review classification',
    lenses: ['ml'],
    signal: 'TF-IDF · Logistic regression · FastAPI',
    hook: 'I wanted machine learning to stop feeling like a black box.',
    story:
      'I took 322,641 app reviews through cleaning, weak labeling, training, evaluation, serialization, API serving, and prediction logging. The pipeline routes feedback into five operational classes.',
    decision:
      'I chose an interpretable classical NLP baseline and class weighting before reaching for a larger model. Its 84% score measures agreement with heuristic labels—not human accuracy—so the next step is a human-labeled benchmark and error analysis.',
    proof: '314K cleaned reviews · 5 classes · 63K pseudo-labeled holdout',
    preview: {
      webm: '/media/classifai-demo.webm',
      mp4: '/media/classifai-demo.mp4',
      poster: '/media/classifai-demo-poster.jpg',
      alt: 'ClassifAI receiving an app review, sending it through the hosted model, and returning a Bug Report classification',
    },
    href: 'https://github.com/haramrit09k/classifAI',
    linkLabel: 'Inspect the pipeline',
    secondaryHref: 'https://classifai-rsy8.onrender.com/docs',
    secondaryLinkLabel: 'Try the live model API',
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
    type: 'Task management',
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

];

// Hero Featured Projects: edit these IDs to choose and order the carousel.
// Names, media, and metadata come from the project entries above.
const featuredProjectIds = ['homeos', 'spaceterra', 'f1rstaid'];
const featuredProjects = featuredProjectIds.map((id) => selectedProjects.find((project) => project.id === id));

const archiveProjects = [
  ['LogScribe MCP', 'Structured log-search, filtering, and analytics tools for Claude Desktop.', 'Python · MCP · Pytest', 'https://github.com/haramrit09k/logscribe-mcp'],
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
  ['Runtime & delivery', 'OpenShift · Docker · Playwright · Jenkins'],
  ['Data & integration', 'Oracle · PostgreSQL · SQL Server · JDBC · MongoDB DBaaS / Ops Manager'],
  ['Frontend', 'Angular · React · TypeScript'],
  ['GenAI & agents', 'LLM applications · MCP · Gemini · RAG · LangChain · FAISS · OpenAI APIs'],
  ['Enterprise AI', 'Internal enterprise framework based on Google ADK · Apigee · read-only diagnostics'],
];

const technologyIcons = {
  Java: 'java.jpg', 'Spring Boot': 'spring-boot.png', Angular: 'angular.png',
  'Node.js': 'node.svg', Docker: 'docker.png', Playwright: 'playwright.png',
  Oracle: 'oracle-sql.png', React: 'react.jpg', Python: 'python.png',
  GraphQL: 'graphql.png', MongoDB: 'mongo.jpg', 'MongoDB DBaaS': 'mongo.jpg',
  'MongoDB DBaaS / Ops Manager': 'mongo.jpg',
  OpenShift: 'simple-icons/redhatopenshift.svg', Jenkins: 'simple-icons/jenkins.svg',
  PostgreSQL: 'simple-icons/postgresql.svg', TypeScript: 'simple-icons/typescript.svg',
  Gemini: 'simple-icons/googlegemini.svg', LangChain: 'simple-icons/langchain.svg',
  'Next.js': 'simple-icons/nextdotjs.svg', JavaScript: 'simple-icons/javascript.svg',
  OpenCV: 'simple-icons/opencv.svg', 'scikit-learn': 'simple-icons/scikitlearn.svg',
  Django: 'simple-icons/django.svg', Firebase: 'simple-icons/firebase.svg',
  Kubernetes: 'simple-icons/kubernetes.svg', Pytest: 'simple-icons/pytest.svg',
  MCP: 'simple-icons/modelcontextprotocol.svg',
  REST: 'lucide/network.svg', APIs: 'lucide/network.svg', Apigee: 'lucide/network.svg',
  'LLM applications': 'lucide/brain-circuit.svg', 'LLM orchestration': 'lucide/workflow.svg',
  RAG: 'lucide/search.svg', FAISS: 'lucide/database.svg',
  'SQL Server': 'lucide/database.svg', SQL: 'lucide/database.svg', JDBC: 'lucide/plug.svg',
  'OpenAI APIs': 'lucide/bot.svg',
  'Internal enterprise framework based on Google ADK': 'lucide/bot.svg',
  'read-only diagnostics': 'lucide/shield-check.svg', CyberArk: 'lucide/shield-check.svg',
  ServiceNow: 'lucide/ticket-check.svg', Streaming: 'lucide/layers.svg',
  'Large-payload processing': 'lucide/file-code.svg', 'Asynchronous jobs': 'lucide/workflow.svg',
  'Platform integration': 'lucide/plug.svg', 'open source': 'lucide/git-fork.svg',
  'neural networks': 'lucide/brain-circuit.svg',

};
const companyLogos = {
  Citi: '/images/work/citi.png',
  'Optimal Satcom': '/images/work/optimal.png',
  'Nexus 8 International': '/images/work/nexus.png',
  'George Mason University': '/images/education/gmu.png',
};

function TechnologyLabel({ name }) {
  const icon = technologyIcons[name] || 'lucide/code.svg';
  return <span className="technology-label">{icon && <img className="technology-icon" src={`/images/tech/${icon}`} alt="" aria-hidden="true" width="26" height="26" loading="lazy" />}<span>{name}</span></span>;
}

function HeroNetwork() {
  const paths = ['M30 190 H190 V75 H410 V155 H620 V65 H850', 'M90 420 H300 V310 H530 V385 H760 V245 H970', 'M410 155 V310', 'M620 155 H760 V245'];
  return <svg className="hero-network" viewBox="0 0 1000 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g className="network-wires">{paths.map(path => <path key={path} d={path} />)}</g>
    <g className="network-pulses">{paths.slice(0, 2).map((path, index) => <path key={path} d={path} style={{ animationDelay: `${index * -7}s` }} />)}</g>
    <g className="network-nodes">{[[190,190],[190,75],[410,75],[410,155],[620,155],[620,65],[850,65],[300,420],[300,310],[530,310],[530,385],[760,385],[760,245]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />)}</g>
  </svg>;
}

const outcomeCharts = {
  '02': { title: 'Peak JVM heap', before: '≈1.4 GB', after: '470 MB', ratio: 470 / 1400 },
  '06': { title: 'Angular build time', before: '4m 48s', after: '1m 34s', ratio: 94 / 288 },
};

function OutcomeChart({ caseId }) {
  const chart = outcomeCharts[caseId];
  if (!chart) return null;
  return <figure className="outcome-chart" aria-label={`${chart.title}: before ${chart.before}, after ${chart.after}`}>
    <figcaption>{chart.title}</figcaption>
    <div className="outcome-chart-row"><span>Before</span><div className="outcome-chart-track"><span className="outcome-bar before" /></div><strong>{chart.before}</strong></div>
    <div className="outcome-chart-row"><span>After</span><div className="outcome-chart-track"><span className="outcome-bar after" style={{ width: `${chart.ratio * 100}%` }} /></div><strong>{chart.after}</strong></div>
  </figure>;
}

function DiagnosticFlow() {
  const steps = [
    ['Question', 'Natural-language issue', 'lucide/brain-circuit.svg'],
    ['Diagnostic tools', 'Read-only checks via MCP', 'simple-icons/modelcontextprotocol.svg'],
    ['Grounded guidance', 'Based on diagnostic results', 'lucide/shield-check.svg'],
  ];
  return <ol className="diagnostic-flow" aria-label="Diagnostics workflow">
    {steps.map(([title, detail, icon], index) => <li key={title} style={{ '--step': index }}>
      <img src={`/images/tech/${icon}`} width="24" height="24" alt="" aria-hidden="true" />
      <strong>{title}</strong><span>{detail}</span>
      {index < steps.length - 1 && <span className="flow-connector" aria-hidden="true"><span /></span>}
    </li>)}
  </ol>;
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

// Sound effects sourced from Mixkit (mixkit.co), free license, no attribution required.
// See public/sounds/SOUNDS-LICENSE.txt for details.
const motifSoundSrc = {
  pickleball: '/sounds/pickleball-dink.mp3',
  terminal: '/sounds/keyboard-key.mp3',
  location: '/sounds/flight-takeoff.mp3',
  gaming: '/sounds/arcade-coin.mp3',
};

function playMotifSound(kind) {
  const src = motifSoundSrc[kind];
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.5;
  audio.play().catch(() => {});
}

function App() {
  const [spotlight, setSpotlight] = useState(0);
  const spotlightProject = featuredProjects[spotlight];
  const [motionPaused, setMotionPaused] = useState(false);
  const [carouselInteracting, setCarouselInteracting] = useState(false);
  const [carouselInView, setCarouselInView] = useState(true);
  const [carouselDocumentVisible, setCarouselDocumentVisible] = useState(document.visibilityState === 'visible');
  const [carouselCycle, setCarouselCycle] = useState(0);
  const studioRef = useRef(null);
  const progressRef = useRef(null);
  const heroVideoRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState('01');
  const [projectLens, setProjectLens] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const lensConsoleRef = useRef(null);
  const projectVideoRefs = useRef({});
  const projectCardRefs = useRef({});
  const filterSnapshot = useRef(null);
  const filterAnimations = useRef([]);
  const filterButtonsRef = useRef(null);
  const filterIndicatorRef = useRef(null);
  const traceListRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !studioRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setCarouselInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(studioRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setCarouselDocumentVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (motionPaused || carouselInteracting || !carouselInView || !carouselDocumentVisible || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setSpotlight((current) => (current + 1) % featuredProjects.length), 9000);
    return () => window.clearTimeout(timer);
  }, [spotlight, carouselCycle, motionPaused, carouselInteracting, carouselInView, carouselDocumentVisible]);

  const chooseSpotlight = (index) => {
    setSpotlight((index + featuredProjects.length) % featuredProjects.length);
    setCarouselCycle((cycle) => cycle + 1);
  };

  const chooseCase = (caseId, event, allowCollapse = false) => {
    const nextCase = allowCollapse && activeCase === caseId ? null : caseId;
    setActiveCase(nextCase);
    if (!nextCase || !window.matchMedia?.('(max-width: 760px)').matches) return;
    event?.preventDefault();
    window.requestAnimationFrame(() => {
      document.getElementById(`tab-${caseId}`)?.scrollIntoView?.({
        block: 'start',
        behavior: motionPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
  };

  useEffect(() => {
    const diagrams = document.querySelectorAll('.case-panel.is-active .diagnostic-flow, .case-panel.is-active .outcome-chart');
    if (!diagrams.length) return;
    if (!('IntersectionObserver' in window)) {
      diagrams.forEach((diagram) => diagram.classList.add('is-in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-in-view', entry.isIntersecting));
    }, { threshold: 0.2 });
    diagrams.forEach((diagram) => observer.observe(diagram));
    return () => {
      observer.disconnect();
      diagrams.forEach((diagram) => diagram.classList.remove('is-in-view'));
    };
  }, [activeCase]);

  useLayoutEffect(() => {
    const buttons = filterButtonsRef.current;
    const updateIndicator = () => {
      const active = buttons?.querySelector('[aria-pressed="true"]');
      if (!active || !filterIndicatorRef.current) return;
      filterIndicatorRef.current.style.setProperty('--indicator-left', `${active.offsetLeft}px`);
      filterIndicatorRef.current.style.setProperty('--indicator-top', `${active.offsetTop}px`);
      filterIndicatorRef.current.style.setProperty('--indicator-width', `${active.offsetWidth}px`);
      filterIndicatorRef.current.style.setProperty('--indicator-height', `${active.offsetHeight}px`);
    };
    updateIndicator();
    if (!buttons || !('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(updateIndicator);
    observer.observe(buttons);
    return () => observer.disconnect();
  }, [projectLens]);

  useLayoutEffect(() => {
    filterAnimations.current.forEach(animation => animation.cancel());
    filterAnimations.current = [];
    const snapshot = filterSnapshot.current;
    filterSnapshot.current = null;
    if (!snapshot || motionPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timing = { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)' };
    Object.entries(projectCardRefs.current).forEach(([id, card]) => {
      if (!card?.isConnected || !card.animate) return;
      const previous = snapshot.positions[id];
      const offset = previous === undefined ? 24 : previous - card.getBoundingClientRect().top;
      filterAnimations.current.push(card.animate([
        { transform: `translateY(${offset}px)`, opacity: previous === undefined ? 0 : 1 },
        { transform: 'translateY(0)', opacity: 1 },
      ], timing));
    });
    const list = traceListRef.current;
    if (list?.animate) filterAnimations.current.push(list.animate([
      { height: `${snapshot.height}px`, overflow: 'clip' },
      { height: `${list.getBoundingClientRect().height}px`, overflow: 'clip' },
    ], timing));
  }, [projectLens, motionPaused]);

  useEffect(() => () => filterAnimations.current.forEach(animation => animation.cancel()), []);

  const projectMotionSnapshot = useRef([]);
  const projectAnimations = useRef([]);

  useLayoutEffect(() => {
    projectAnimations.current.forEach((animation) => animation.cancel());
    projectAnimations.current = [];
    const snapshots = projectMotionSnapshot.current;
    projectMotionSnapshot.current = [];
    if (motionPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timing = { duration: 720, easing: 'cubic-bezier(.22, 1, .36, 1)' };
    snapshots.forEach(({ card, height, open, previewRect }) => {
      if (!card.isConnected || card.open === open || !card.animate) return;
      const nextHeight = card.getBoundingClientRect().height;
      projectAnimations.current.push(card.animate([
        { height: `${height}px`, overflow: 'clip' },
        { height: `${nextHeight}px`, overflow: 'clip' },
      ], timing));
      const preview = card.querySelector('.trace-preview');
      if (preview && previewRect) {
        const next = preview.getBoundingClientRect();
        if (next.width && next.height) {
          projectAnimations.current.push(preview.animate([
            { transformOrigin: 'top left', transform: `translate(${previewRect.left - next.left}px, ${previewRect.top - next.top}px) scale(${previewRect.width / next.width}, ${previewRect.height / next.height})` },
            { transformOrigin: 'top left', transform: 'translate(0, 0) scale(1)' },
          ], timing));
        }
      }
    });
  }, [expandedProject, motionPaused]);

  useEffect(() => () => projectAnimations.current.forEach((animation) => animation.cancel()), []);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const elements = document.querySelectorAll('.section-heading, .timeline-row, .archive-grid > a, .about-portrait, .about-copy, .contact-section h2, .trace-card summary, .testimonial, .case-grid, .impact-stat');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => {
      if (element.matches('.about-portrait, .about-copy')) element.dataset.revealDirection = element.matches('.about-portrait') ? 'left' : 'right';
      if (element.matches('.timeline-row')) {
        const index = Array.from(element.parentElement.children).indexOf(element);
        element.dataset.revealDirection = index % 2 === 0 ? 'left' : 'right';
        element.style.setProperty('--reveal-delay', `${index % 3 * 110}ms`);
      }
      if (element.matches('.archive-grid > a, .impact-stat')) {
        element.style.setProperty('--reveal-delay', `${Array.from(element.parentElement.children).indexOf(element) % 3 * 90}ms`);
      }
      element.classList.add('scroll-reveal');
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('scroll-reveal'));
    };
  }, [projectLens]);

  useEffect(() => {
    let frame;
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
      const sections = ['work', 'lab', 'experience', 'about'];
      let current = '';
      sections.forEach((id) => {
        if (document.getElementById(id)?.getBoundingClientRect().top <= 180) current = id;
      });
      setActiveSection(current);
      if (studioRef.current) studioRef.current.style.setProperty('--hero-drift', `${Math.min(window.scrollY * .09, 36)}px`);
      frame = null;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const sync = () => {
      document.querySelectorAll('video').forEach((video) => {
        if (motionPaused || preference?.matches) video.pause();
        else video.play()?.catch(() => {});
      });
    };
    sync();
    preference?.addEventListener?.('change', sync);
    return () => preference?.removeEventListener?.('change', sync);
  }, [motionPaused, projectLens, spotlight]);

  const moveStudio = (event) => {
    if (motionPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--tilt-x', `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${((event.clientY - rect.top) / rect.height - .5) * -7}deg`);
  };

  const movePortrait = (event) => {
    if (motionPaused || event.pointerType !== 'mouse' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100));
    const y = Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100));
    event.currentTarget.style.setProperty('--portrait-x', `${x}%`);
    event.currentTarget.style.setProperty('--portrait-y', `${y}%`);
    event.currentTarget.dataset.pointerActive = 'true';
  };

  const toggleProject = (projectId) => {
    projectMotionSnapshot.current = Object.values(projectCardRefs.current).filter(Boolean).map((card) => ({
      card, height: card.getBoundingClientRect().height, open: card.open,
      previewRect: card.querySelector('.trace-preview')?.getBoundingClientRect(),
    }));
    const video = projectVideoRefs.current[projectId];

    if (video?.paused && !motionPaused && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
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
    if (value === projectLens) return;
    filterSnapshot.current = {
      height: traceListRef.current?.getBoundingClientRect().height || 0,
      positions: Object.fromEntries(Object.entries(projectCardRefs.current).filter(([, card]) => card?.isConnected).map(([id, card]) => [id, card.getBoundingClientRect().top])),
    };
    const previousTop = lensConsoleRef.current
      ? lensConsoleRef.current.getBoundingClientRect().top
      : null;
    setProjectLens(value);
    setExpandedProject(null);

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
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);


  return (
    <div className={motionPaused ? 'site-shell motion-paused' : 'site-shell'}>
      <div className="reading-progress" ref={progressRef} aria-hidden="true" />
      <div className="quick-access" aria-label="Quick access">
        <a href="/resume/master_resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
        <a href="mailto:haramrit09k@gmail.com">Get in touch <Arrow /></a>
        <button type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? 'Resume motion' : 'Pause motion'}</button>
      </div>
      <a className="skip-link" href="#main">Skip to main content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Haramrit Khurana, home">
          <span className="wordmark-type" aria-hidden="true">HK<span className="wordmark-dot">.</span></span>
          <img className="wordmark-icon" src="/favicon copy.png" alt="" />
        </a>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation">
          <a href="#work" aria-current={activeSection === 'work' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#lab" aria-current={activeSection === 'lab' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Personal projects</a>
          <a href="#experience" aria-current={activeSection === 'experience' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#about" aria-current={activeSection === 'about' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <a className="header-resume" href="/resume/master_resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
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

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <HeroNetwork />
          <div className="hero-main">
            <div className="eyebrow reveal reveal-1">
              <span className="status-dot"></span>
              Software engineer · Dallas–Fort Worth
            </div>
            <p className="hero-role-signal reveal reveal-1">
              Focus / <span>Backend systems</span> / <span>Platform engineering</span> / <span>GenAI</span>
            </p>
            <p className="role-context reveal reveal-1"><strong>Senior Software Engineer (AVP) at Citi</strong><span>December 2022–present</span></p>
            <h1 id="hero-title" className="reveal reveal-2">
              <span className="headline-line"><span>Hi, I’m Haramrit.</span></span>
              <em><span className="headline-line"><span>I like figuring</span></span><span className="headline-line"><span>things out.</span></span></em>
            </h1>
            <p className="hero-copy reveal reveal-3">
              I build systems that help engineering teams ship faster. At Citi, I work on enterprise MongoDB DBaaS platforms and production LLM-assisted diagnostics. Outside work, I build AI applications and developer tools.
            </p>
            <p className="hero-stack reveal reveal-3">{['Java', 'Spring Boot', 'Angular', 'LLM applications', 'MCP', 'RAG'].map(name => <TechnologyLabel key={name} name={name} />)}</p>
            <div className="hero-actions reveal reveal-4">
              <a className="text-link" href="/resume/master_resume.pdf" target="_blank" rel="noreferrer">
                View résumé <Arrow />
              </a>
              <a className="text-link quiet-link" href="#work">Explore my work ↓</a>
            </div>
          </div>

          <div className="hero-studio reveal reveal-3" ref={studioRef} onPointerMove={moveStudio} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg'); }}>
            <figure className="hero-portrait" onPointerMove={movePortrait} onPointerLeave={(event) => { delete event.currentTarget.dataset.pointerActive; event.currentTarget.style.removeProperty('--portrait-x'); event.currentTarget.style.removeProperty('--portrait-y'); }}>
              <img className="portrait-base" src="/images/hero-portrait-2026.jpg" alt="Haramrit standing outdoors in warm sunlight" fetchpriority="high" draggable="false" />
              <span className="portrait-light" aria-hidden="true" />
            </figure>
            <div className="studio-carousel" role="region" aria-roledescription="carousel" aria-label="Featured project previews"
              data-rotating={!motionPaused && !carouselInteracting && carouselInView && carouselDocumentVisible}
              onPointerEnter={() => setCarouselInteracting(true)} onPointerLeave={(event) => { if (!event.currentTarget.contains(document.activeElement)) { setCarouselInteracting(false); setCarouselCycle((cycle) => cycle + 1); } }}
              onFocusCapture={() => setCarouselInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setCarouselInteracting(false); setCarouselCycle((cycle) => cycle + 1); } }}>
              <a className="studio-preview" href={`#project-${spotlightProject.id}`} key={spotlightProject.id} onClick={() => { setProjectLens('all'); setExpandedProject(spotlightProject.id); }}>
                <span className="studio-media"><video ref={heroVideoRef} muted loop playsInline preload="metadata" poster={spotlightProject.preview.poster} aria-label={spotlightProject.preview.alt}><source src={spotlightProject.preview.mp4} type="video/mp4" /><source src={spotlightProject.preview.webm} type="video/webm" /></video><img src={spotlightProject.preview.poster} alt={spotlightProject.title + ' project preview'} /></span>
                <span><small>Project {String(spotlight + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')} · {spotlightProject.type}</small><strong>{spotlightProject.title}</strong><span>Explore this project <Arrow /></span></span>
              </a>
              <div className="carousel-progress" aria-hidden="true"><span key={`${spotlight}-${carouselCycle}-${carouselInView}-${carouselDocumentVisible}-${motionPaused}`} /></div>
              <div className="carousel-controls">
                <span className="carousel-caption">Featured projects</span>
                <div className="carousel-arrows">
                  <button type="button" aria-label="Previous project preview" onClick={() => chooseSpotlight(spotlight - 1)}>←</button>
                  <button type="button" aria-label="Next project preview" onClick={() => chooseSpotlight(spotlight + 1)}>→</button>
                </div>
              </div>
              <div className="spotlight-picker" aria-label="Choose a project preview">
                {featuredProjects.map((project, index) => <button key={project.id} type="button" aria-pressed={spotlight === index} onClick={() => chooseSpotlight(index)}>{project.title}</button>)}
              </div>
            </div>
          </div>

          <aside className="impact-rail reveal reveal-3" aria-label="Selected impact">
            {impact.map((item, index) => (
              <a className="impact-stat" key={item.label} href="#work" onClick={(event) => chooseCase(item.caseId, event)}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>See the engineering behind it <Arrow /></small>
              </a>
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
          <span>GenAI &amp; applied ML</span>
          <span>Agent tooling</span>
        </section>

        <section className="work-section section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Citi / Enterprise platforms &amp; GenAI</p>
              <h2 id="work-title">Selected work.</h2>
            </div>
            <p>Production AI, database performance, and automation work on Citi’s internal MongoDB DBaaS platform.</p>
          </div>

          <div className="case-grid">
            <div className="case-tabs" role="tablist" aria-label="Case studies">
              {caseStudies.map((item, index) => (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={activeCase === item.id}
                  aria-expanded={activeCase === item.id}
                  aria-controls={`panel-${item.id}`}
                  style={{ '--mobile-case-order': index * 2 }}
                  className={activeCase === item.id ? 'case-tab is-active' : 'case-tab'}
                  onClick={(event) => chooseCase(item.id, event, true)}
                >
                  <span>{item.id}</span>
                  <strong>{item.title}<small className="case-tab-result">{item.outcome}</small></strong>
                  <i aria-hidden="true">→</i>
                </button>
              ))}
            </div>

            {!activeCase && <div className="case-panel case-placeholder"><p className="kicker">Case studies</p><h3>Choose a case study.</h3><p className="case-summary">Select an outcome to see the problem, approach, and result.</p></div>}
            {caseStudies.map((item, index) => (
              <article
                key={item.id}
                id={`panel-${item.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${item.id}`}
                style={{ '--mobile-case-order': index * 2 + 1 }}
                className={activeCase === item.id ? 'case-panel is-active' : 'case-panel'}
                aria-hidden={activeCase !== item.id}
                inert={activeCase !== item.id ? '' : undefined}
              >
                <div className="case-panel-content">
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
                {item.id === '01' && <DiagnosticFlow />}
                <OutcomeChart caseId={item.id} />
                <p className="case-detail">{item.detail}</p>
                <ul className="tag-list" aria-label="Technologies and strengths">
                  {item.stack.map((tech) => <li key={tech}><TechnologyLabel name={tech} /></li>)}
                </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lab-section section" id="lab" aria-labelledby="lab-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Personal projects</p>
              <h2 id="lab-title">Things I’ve built.</h2>
            </div>
            <p>Projects I’ve built to solve everyday problems and explore new technologies.</p>
          </div>
          <div className="lens-console" aria-label="Filter projects by role lens" ref={lensConsoleRef}>
            <p><span className="status-dot"></span> Filter projects</p>
            <div ref={filterButtonsRef} className="filter-buttons">
              <span ref={filterIndicatorRef} className={projectLens ? 'filter-indicator is-visible' : 'filter-indicator'} aria-hidden="true" />
              {[
                ['all', 'All projects'],
                ['systems', 'Software systems'],
                ['ml', 'GenAI & ML'],
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
          <div className="trace-list" ref={traceListRef}>
            {selectedProjects
              .filter((project) => !projectLens || projectLens === 'all' || project.lenses.includes(projectLens))
              .map((project, index) => (
                <details
                  ref={(node) => { projectCardRefs.current[project.id] = node; }}
                  className="trace-card"
                  id={`project-${project.id}`}
                  key={project.id}
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
                    <div>
                      <span>The problem</span>
                      <p>{project.story}</p>
                    </div>
                    <div>
                      <span>What I chose and why</span>
                      <p>{project.decision}</p>
                    </div>
                    <div className="trace-proof">
                      <span>The result</span>
                      <strong>{project.proof}</strong>
                    </div>
                  </div>
                </details>
              ))}
          </div>

          <div className="archive-heading">
            <p className="kicker">More projects</p>
            <p>Other projects and open-source contributions.</p>
          </div>
          <div className="archive-grid">
            {archiveProjects.map(([title, description, stack, href], index) => (
              <a href={href} target="_blank" rel="noreferrer" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <small className="archive-tools">{stack.split(' · ').map(name => <TechnologyLabel key={name} name={name} />)}</small>
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
              <h2 id="experience-title">Experience.</h2>
            </div>
          </div>
          <div className="timeline">
            {experience.map((job, index) => (
              <article className="timeline-row" key={job.company}>
                <span className="timeline-index">0{index + 1}</span>
                <p className="timeline-years">{job.years}</p>
                <div>
                  <h3 className="company-heading">{companyLogos[job.company] && <img className="company-logo" src={companyLogos[job.company]} alt="" aria-hidden="true" width="48" height="40" loading="lazy" />}<span>{job.company}</span></h3>
                  <p className="timeline-role">{job.role}</p>
                </div>
                <p className="timeline-copy">{job.copy}</p>
              </article>
            ))}
          </div>
          <blockquote className="testimonial">
            <p><a className="recommendation-quote" href="https://www.linkedin.com/in/haramrit09k/details/recommendations/?detailScreenTabIndex=0#:~:text=if%20you%20need%20someone%20who%20takes%20initiative%2C%20drives%20projects%20forward%2C%20and%20lifts%20everyone%20around%20him%2C%20Haramrit%E2%80%99s%20your%20guy">“If you need someone who takes initiative, drives projects forward, and lifts everyone around him, Haramrit’s your guy.”</a></p>
            <cite>Nestor Hernandez · Vice President, DBaaS at Citi</cite>

          </blockquote>
        </section>

        <section className="about-section section" id="about" aria-labelledby="about-title">
          <div className="about-portrait">
            <img src="/images/about-portrait-2026.jpg" alt="Haramrit smiling by the water in a white cap and red sunglasses" loading="lazy" />
            <div className="portrait-label"><span className="status-dot"></span> Haramrit Khurana</div>
          </div>
          <div className="about-copy">
            {/* Adapted Material Symbols by Google; see public/images/tech/material-symbols-LICENSE.txt. */}
            <div className="about-motifs" aria-hidden="true">
              <span className="about-motif about-motif-pickleball" data-tip="🥒-ball" onClick={() => playMotifSound('pickleball')}>
                <svg viewBox="0 -960 960 960" fill="currentColor">
                  <path d="M283-381q19 19 42 28t48 9q25 0 48-9t42-28l36-36q19-19 28-42t9-48q0-25-9-47.5T499-596L347-748q-12-12-28.5-12T290-748L132-589q-12 12-12 28t12 28l151 152ZM743-80 508-315q-29 26-64.5 38T372-265q-40 0-77.5-15T227-325L75-476q-17-17-26-39.5T40-561q0-23 9-45.5T75-646l159-159q17-17 39.5-26t45.5-9q23 0 45.5 9t39.5 26l151 152q30 30 45 67.5t15 77.5q0 36-12.5 71.5T564-372l236 236-57 56Zm37-520q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T840-740q0-25-17.5-42.5T780-800q-25 0-42.5 17.5T720-740q0 25 17.5 42.5T780-680Z" />
                </svg>
              </span>
              <span className="about-motif about-motif-location" data-tip="Fav site: Expedia" onClick={() => playMotifSound('location')}>
                <svg viewBox="0 -960 960 960" fill="currentColor">
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
                </svg>
              </span>
              <span className="about-motif about-motif-terminal" data-tip="sudo fix-everything" onClick={() => playMotifSound('terminal')}>
                <svg viewBox="0 -960 960 960" fill="currentColor">
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z" />
                </svg>
              </span>
              <span className="about-motif about-motif-gaming" data-tip="Fortnite?" onClick={() => playMotifSound('gaming')}>
                <svg viewBox="0 -960 960 960" fill="currentColor">
                  <path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm482-154q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-80-120q17 0 28.5-11.5T640-600q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600q0 17 11.5 28.5T600-560ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Z" />
                </svg>
              </span>
            </div>
            <p className="kicker">The engineer</p>
            <h2 id="about-title">Human behind the systems</h2>
            <p className="about-lead">
              I’m at my best when I’m solving messy engineering problems, figuring out why something behaves the way it does, and turning that understanding into something simpler and more reliable.
            </p>
            <p>
              Outside work, I’m usually building side projects, playing pickleball, gaming, traveling, or finding some new thing to learn more deeply than I probably need to.
            </p>
            <p>I like technology, but I care even more about understanding how things work and building things that are genuinely useful.</p>
            <div className="background-facts">
              <p><strong>Certification</strong><span>AWS Solutions Architect – Associate · 2020–2023</span></p>
            </div>
            <div className="strength-list">
              {strengths.map(([title, tools], index) => (
                <div key={title}>
                  <span>0{index + 1}</span>
                  <strong>{title}</strong>
                  <p className="skill-tools">{tools.split(' · ').map(name => <TechnologyLabel key={name} name={name} />)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">

          <p className="kicker">Contact</p>
          <h2 id="contact-title">Let’s talk.</h2>
          <p>You can reach me by email or on LinkedIn.</p>
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
