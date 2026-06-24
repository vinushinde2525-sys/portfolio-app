import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Admin from '../models/Admin.js'
import Project from '../models/Project.js'
import Skill from '../models/Skill.js'

const seed = async () => {
  await connectDB()

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@vinayakshinde.dev'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'

  const existing = await Admin.findOne({ email: adminEmail })
  if (!existing) {
    await Admin.create({ name: 'Vinayak Shinde', email: adminEmail, password: adminPassword, role: 'superadmin' })
    console.log(`Admin created: ${adminEmail} / ${adminPassword}`)
  } else {
    console.log('Admin already exists, skipping.')
  }

  const projectCount = await Project.countDocuments()
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: 'E-Learning Platform',
        description: 'Full-stack e-learning platform with video courses, payments, and an admin dashboard.',
        category: 'fullstack',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
        github: 'https://github.com/vinayakshinde/elearning',
        live: 'https://elearning-demo.vercel.app',
        featured: true,
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task manager with real-time updates and team workspaces.',
        category: 'fullstack',
        tags: ['React', 'Express', 'MongoDB', 'Socket.io'],
        github: 'https://github.com/vinayakshinde/taskapp',
        live: 'https://taskapp-demo.vercel.app',
        featured: true,
      },
      {
        title: 'ShopHub E-commerce',
        description: 'Full-featured e-commerce platform with admin dashboard and Razorpay integration.',
        category: 'fullstack',
        tags: ['MERN', 'Razorpay', 'Redux'],
        github: 'https://github.com/vinayakshinde/shophub',
        live: 'https://shophub-demo.vercel.app',
        featured: true,
      },
    ])
    console.log('Sample projects seeded.')
  }

  const skillCount = await Skill.countDocuments()
  if (skillCount === 0) {
    await Skill.insertMany([
      { name: 'React', category: 'Frontend', level: 95 },
      { name: 'JavaScript', category: 'Frontend', level: 92 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
      { name: 'Node.js', category: 'Backend', level: 88 },
      { name: 'Express.js', category: 'Backend', level: 87 },
      { name: 'MongoDB', category: 'Database', level: 88 },
      { name: 'Git & GitHub', category: 'Tools', level: 90 },
    ])
    console.log('Sample skills seeded.')
  }

  console.log('Seeding complete.')
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
