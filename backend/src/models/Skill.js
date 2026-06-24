import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'Tools', 'DevOps'], default: 'Frontend' },
    level: { type: Number, min: 0, max: 100, default: 80 },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Skill', skillSchema)
