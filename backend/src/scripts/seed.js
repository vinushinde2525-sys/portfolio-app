import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Admin from '../models/Admin.js'
import Project from '../models/Project.js'
import Skill from '../models/Skill.js'

const adminEmail    = process.env.SEED_ADMIN_EMAIL    || 'admin@vinayakshinde.dev'
const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'

const PROJECTS = [
  {
    title:       '3D Café — Full-Stack Food Ordering Platform',
    description: 'Full-stack TypeScript MERN platform with interactive 3D product viewer (React Three Fiber), admin ERP (inventory, CRM, HR). JWT auth, Google OAuth, RBAC, Socket.IO real-time order tracking, 66 automated tests, GitHub Actions CI/CD, Docker Compose.',
    category:    'fullstack',
    featured:    true,
    tags:        ['React','TypeScript','Node.js','Express','MongoDB','Three.js','Socket.IO','Redux','JWT','Docker'],
    github:      'https://github.com/vinushinde2525-sys/3D-Cafe-FullStack-Platform',
    live:        'https://threed-cafe-fullstack-platform-1.onrender.com/',
    image:       '/assets/project-3dcafe.png',
  },
  {
    title:       'Grilli — Fine Dining & Reservation Platform',
    description: 'Full-stack restaurant platform with menu browsing, table reservations, persistent cart, auth-gated checkout. JWT Express API, MongoDB Atlas, Socket.IO real-time notifications, Redux Toolkit + React Query, GitHub Actions CI.',
    category:    'fullstack',
    featured:    true,
    tags:        ['React','Redux Toolkit','React Query','Node.js','Express','MongoDB','Socket.IO','JWT'],
    github:      'https://github.com/vinushinde2525-sys/Grilli-fine-dining-fullstack-app',
    live:        'https://grilli-fine-dining-fullstack-ic67m47po.vercel.app/',
    image:       '/assets/project-grilli.png',
  },
  {
    title:       'Tourly — Premium Travel Platform',
    description: 'Premium travel booking platform built with React and Vite. Features destination showcases, tour packages, Express.js REST API, and reusable component architecture.',
    category:    'frontend',
    featured:    false,
    tags:        ['React','Vite','Express.js','JavaScript','CSS3'],
    github:      'https://github.com/vinushinde2525-sys/tourly-premium-travel-platform',
    live:        'https://tourlywebapp.netlify.app/',
    image:       '/assets/project-tourly.png',
  },
  {
    title:       'Homeverse — Real Estate Application',
    description: 'Modern real estate platform using React with TanStack Query for server state, Zustand for client state, and React Hook Form for form validation.',
    category:    'fullstack',
    featured:    false,
    tags:        ['React','TanStack Query','Zustand','React Hook Form','Express'],
    github:      'https://github.com/vinushinde2525-sys/homeverse-react-express-application',
    live:        'https://statuesque-pasca-fd6143.netlify.app/',
    image:       '/assets/project-homeverse.png',
  },
  {
    title:       'SecretCoder — Developer Community Platform',
    description: 'Developer community platform with Three.js / React Three Fiber 3D animated interface, Framer Motion transitions, and a full MERN backend.',
    category:    'fullstack',
    featured:    false,
    tags:        ['React','Three.js','Framer Motion','Node.js','MongoDB','Express'],
    github:      'https://github.com/vinushinde2525-sys/secret.coder-frontend',
    live:        'https://secretfrontend.netlify.app/',
    image:       '/assets/project-secretcoder.png',
  },
]

const SKILLS = [
  // Frontend
  { name:'React.js',        category:'Frontend',      level:90 },
  { name:'JavaScript ES6+', category:'Frontend',      level:88 },
  { name:'HTML5 & CSS3',    category:'Frontend',      level:92 },
  { name:'Tailwind CSS',    category:'Frontend',      level:85 },
  { name:'Redux Toolkit',   category:'Frontend',      level:80 },
  { name:'Framer Motion',   category:'Frontend',      level:75 },
  { name:'TypeScript',      category:'Frontend',      level:72 },
  // Backend
  { name:'Node.js',         category:'Backend',       level:85 },
  { name:'Express.js',      category:'Backend',       level:83 },
  { name:'REST APIs',       category:'Backend',       level:88 },
  { name:'JWT Auth',        category:'Backend',       level:82 },
  { name:'Socket.IO',       category:'Backend',       level:75 },
  // Database
  { name:'MongoDB',         category:'Database',      level:85 },
  { name:'Mongoose',        category:'Database',      level:83 },
  { name:'MongoDB Atlas',   category:'Database',      level:80 },
  // Tools
  { name:'Git & GitHub',    category:'Tools',  level:88 },
  { name:'GitHub Actions',  category:'DevOps', level:75 },
  { name:'Docker',          category:'DevOps', level:68 },
  { name:'Vercel/Netlify',  category:'DevOps', level:85 },
  { name:'Jest / Vitest',   category:'Tools',  level:72 },
]

const seed = async () => {
  console.log('🌱 Starting database seed...')
  await connectDB()

  // ── Admin ──────────────────────────────────────────
  const existing = await Admin.findOne({ email: adminEmail })
  if (!existing) {
    await Admin.create({ name:'Vinayak Shinde', email:adminEmail, password:adminPassword, role:'superadmin' })
    console.log(`✅ Admin created: ${adminEmail} / ${adminPassword}`)
  } else {
    console.log('ℹ️  Admin already exists — skipping.')
  }

  // ── Projects ───────────────────────────────────────
  await Project.deleteMany({})
  await Project.insertMany(PROJECTS)
  console.log(`✅ ${PROJECTS.length} projects seeded.`)

  // ── Skills ─────────────────────────────────────────
  await Skill.deleteMany({})
  await Skill.insertMany(SKILLS)
  console.log(`✅ ${SKILLS.length} skills seeded.`)

  console.log('\n🎉 Seeding complete!')
  console.log(`\n📋 Admin credentials:`)
  console.log(`   Email:    ${adminEmail}`)
  console.log(`   Password: ${adminPassword}`)
  console.log(`\n🌐 Admin panel: http://localhost:5173/admin/login`)

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
