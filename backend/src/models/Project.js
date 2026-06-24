import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['fullstack', 'frontend', 'backend'], default: 'fullstack' },
    tags: [{ type: String }],
    coverImage: { type: String, default: '' },
    github: { type: String, default: '' },
    live: { type: String, default: '' },
    features: [{ type: String }],
    challenges: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
