import mongoose from 'mongoose'

const visitorSchema = new mongoose.Schema(
  {
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    page: { type: String, default: '/' },
    referrer: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Visitor', visitorSchema)
