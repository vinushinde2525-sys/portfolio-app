// ── REAL DATA ONLY — sourced from uploaded resume & certificates ──

export const profile = {
  name:      'Vinayak Madan Shinde',
  role:      'MERN Stack Developer',
  tagline:   'Fresher Software Developer',
  location:  'Wakadai Nagar, Mangaon, Raigad, Maharashtra 402104',
  email:     'vinushinde2525@gmail.com',
  phone:     '+91 7058816692',
  whatsapp:  'https://wa.me/917058816692',
  resumeUrl: '/resume-latest.pdf',
  bio:       "MERN Stack Developer fresher with hands-on experience building, testing, and deploying production-style full-stack JavaScript applications. Proficient in React.js, Node.js, Express.js, and MongoDB, with practical experience implementing JWT authentication, real-time features (Socket.IO), and RESTful API design.",
  social: {
    github:   'https://github.com/vinushinde2525-sys',
    linkedin: 'https://www.linkedin.com/in/vinu-shinde-930507351/',
  },
}

export const stats = [
  { label: 'Projects Built',    value: 5,    suffix: '',  icon: '◇' },
  { label: 'Technologies',      value: 20,   suffix: '+', icon: '◈' },
  { label: 'Automated Tests',   value: 66,   suffix: '+', icon: '◉' },
  { label: 'Always Learning',   value: '∞',  suffix: '',  icon: '★' },
]

export const techStack = ['React','Node.js','MongoDB','Express','TypeScript','Three.js']

// ── REAL SKILLS (from resume) ────────────────────────────────
export const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name:'React.js',        level:90 },
      { name:'JavaScript ES6+', level:88 },
      { name:'HTML5 & CSS3',    level:92 },
      { name:'Tailwind CSS',    level:85 },
      { name:'Redux Toolkit',   level:80 },
      { name:'Framer Motion',   level:75 },
      { name:'TypeScript',      level:72 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name:'Node.js',      level:85 },
      { name:'Express.js',   level:83 },
      { name:'REST API',     level:88 },
      { name:'JWT Auth',     level:82 },
      { name:'Socket.IO',    level:75 },
      { name:'RBAC',         level:72 },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name:'MongoDB',      level:85 },
      { name:'Mongoose',     level:83 },
      { name:'MongoDB Atlas',level:80 },
      { name:'PostgreSQL',   level:45 },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name:'Git & GitHub',      level:88 },
      { name:'GitHub Actions CI', level:75 },
      { name:'Docker',            level:68 },
      { name:'Vercel / Netlify',  level:85 },
      { name:'Jest / Vitest',     level:72 },
      { name:'Three.js / R3F',    level:70 },
    ],
  },
]

// ── REAL EXPERIENCE (fresher — no fake companies) ────────────
export const experience = [
  {
    period: '2022 — Present',
    title: 'Self-Directed Full Stack Development',
    company: 'Independent Learning & Projects',
    desc: 'Built multiple production-grade full-stack MERN applications with real features: JWT auth, Socket.IO real-time, CI/CD pipelines, automated testing (66+ tests), Docker, and 3D interfaces. Deployed to Vercel, Render, and Netlify.',
    tags: ['React','Node.js','MongoDB','Express','Socket.IO','JWT','Docker','CI/CD'],
  },
  {
    period: '2021 — 2022',
    title: 'Programming Foundations',
    company: 'Disha Computer Institute',
    desc: 'Completed Certificate Course in Programming (HTML 85, CSS 80, JavaScript 65) and Advance Diploma in Software Programming (C 90, C++ 85, Python 75, Data Structures 75). Certificate IDs: D4971921629, D7965332439.',
    tags: ['HTML','CSS','JavaScript','C','C++','Python','Data Structures'],
  },
]

// ── REAL EDUCATION (from resume) ────────────────────────────
export const education = [
  {
    year: '2022 — 2026',
    title: 'Bachelor of Science in Information Technology (BSc IT)',
    inst: 'D.G. Tatkare Mahavidyalay, University of Mumbai',
    detail: 'CGPI: 7.18 | 6th Sem: 7.40',
  },
  {
    year: '2022',
    title: 'Higher Secondary Certificate (HSC)',
    inst: 'Maharashtra Board',
    detail: '73.17%',
  },
  {
    year: '2020',
    title: 'Secondary School Certificate (SSC)',
    inst: 'Maharashtra Board',
    detail: '86.80%',
  },
]

// ── REAL CERTIFICATES ONLY ────────────────────────────────────
export const certifications = [
  {
    title:   'Advance Diploma in Software Programming',
    issuer:  'Disha Computer Institute',
    year:    'Sep 2025',
    id:      'D7965332439',
    score:   '70.71%',
    file:    '/certificate-disha-advanced.pdf',
  },
  {
    title:   'Certificate Course in Programming',
    issuer:  'Disha Computer Institute',
    year:    'Apr 2025',
    id:      'D4971921629',
    score:   '76.67%',
    file:    '/resume.pdf',  // Second Disha cert bundled in first PDF upload
  },
  {
    title:   'Ultimate Web Development Course 2025',
    issuer:  'CodeWithHarry',
    year:    'Nov 2025',
    id:      'CWH-THE-ULTIMATE-WEB-DEV-COURSE-K8SHN077',
    score:   'Completed',
    file:    '/certificate-codewithharry.pdf',
  },
]

// ── REAL PROJECTS (all 5 with real links & images) ────────────
export const projectsSeed = [
  {
    _id: 'p1',
    title: '3D Café — Full-Stack Food Ordering Platform',
    category: 'fullstack',
    featured: true,
    image: '/assets/project-3dcafe.png',
    description: 'Full-stack TypeScript MERN platform with interactive 3D product viewer (React Three Fiber), admin ERP system (inventory, CRM, HR & payroll). JWT auth, Google OAuth, RBAC, Socket.IO real-time order tracking, 66 automated tests, GitHub Actions CI/CD, Docker Compose.',
    tags: ['React','TypeScript','Node.js','Express','MongoDB','Three.js / R3F','Socket.IO','Redux','JWT','Docker','CI/CD'],
    github: 'https://github.com/vinushinde2525-sys/3D-Cafe-FullStack-Platform',
    live:   'https://threed-cafe-fullstack-platform-1.onrender.com/',
  },
  {
    _id: 'p2',
    title: 'Grilli — Fine Dining & Reservation Platform',
    category: 'fullstack',
    featured: true,
    image: '/assets/project-grilli.png',
    description: 'Full-stack restaurant platform with menu browsing, table reservations, persistent cart, auth-gated checkout, order history. JWT Express API, MongoDB Atlas, Socket.IO real-time notifications, Redux Toolkit + React Query, automated test suite, GitHub Actions CI.',
    tags: ['React','Redux Toolkit','React Query','Node.js','Express','MongoDB','Socket.IO','JWT','Vercel'],
    github: 'https://github.com/vinushinde2525-sys/Grilli-fine-dining-fullstack-app',
    live:   'https://grilli-fine-dining-fullstack-ic67m47po.vercel.app/',
  },
  {
    _id: 'p3',
    title: 'Tourly — Premium Travel Platform',
    category: 'frontend',
    featured: false,
    image: '/assets/project-tourly.png',
    description: 'Premium travel booking platform built with React and Vite. Features destination showcases, tour packages, Express.js REST API, reusable component architecture, and custom hooks.',
    tags: ['React','Vite','Express.js','JavaScript','CSS3'],
    github: 'https://github.com/vinushinde2525-sys/tourly-premium-travel-platform',
    live:   'https://tourlywebapp.netlify.app/',
  },
  {
    _id: 'p4',
    title: 'Homeverse — Real Estate Application',
    category: 'fullstack',
    featured: false,
    image: '/assets/project-homeverse.png',
    description: 'Modern real estate platform using React with TanStack Query for server state, Zustand for client state, and React Hook Form for form validation. Clean, responsive property listing UI.',
    tags: ['React','TanStack Query','Zustand','React Hook Form','Express','JavaScript'],
    github: 'https://github.com/vinushinde2525-sys/homeverse-react-express-application',
    live:   'https://statuesque-pasca-fd6143.netlify.app/',
  },
  {
    _id: 'p5',
    title: 'SecretCoder — Developer Community Platform',
    category: 'fullstack',
    featured: false,
    image: '/assets/project-secretcoder.png',
    description: 'Developer community platform with Three.js / React Three Fiber 3D animated interface, Framer Motion transitions, and a full MERN backend. Showcases advanced 3D/WebGL animation-driven UI.',
    tags: ['React','Three.js / R3F','Framer Motion','Node.js','MongoDB','Express'],
    github: 'https://github.com/vinushinde2525-sys/secret.coder-frontend',
    live:   'https://secretfrontend.netlify.app/',
  },
]

// services kept minimal / factual
export const services = [
  { title:'Full Stack MERN',      desc:'End-to-end apps with React, Node.js, Express, and MongoDB.' },
  { title:'REST API Engineering', desc:'Scalable JWT-authenticated APIs with role-based access control.' },
  { title:'Real-Time Features',   desc:'Socket.IO live updates, order tracking, notifications.' },
  { title:'Testing & CI/CD',      desc:'Jest, Vitest, GitHub Actions pipelines on every push.' },
]
