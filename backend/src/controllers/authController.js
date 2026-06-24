import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' })

    const match = await admin.comparePassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    const token = generateToken(admin._id)
    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    })
  } catch (err) {
    next(err)
  }
}

export const me = async (req, res) => {
  res.json({ admin: req.admin })
}
