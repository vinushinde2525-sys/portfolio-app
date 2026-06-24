import Message from '../models/Message.js'
import { sendNotificationEmail } from '../utils/email.js'

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' })
    }
    const doc = await Message.create({ name, email, subject, message })

    sendNotificationEmail({ name, email, subject, message }).catch((e) =>
      console.error('Email notification failed:', e.message)
    )

    res.status(201).json({ message: 'Message sent successfully', id: doc._id })
  } catch (err) {
    next(err)
  }
}

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json({ messages, count: messages.length })
  } catch (err) {
    next(err)
  }
}

export const markMessageRead = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    if (!msg) return res.status(404).json({ message: 'Message not found' })
    res.json(msg)
  } catch (err) {
    next(err)
  }
}

export const deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id)
    if (!msg) return res.status(404).json({ message: 'Message not found' })
    res.json({ message: 'Message deleted' })
  } catch (err) {
    next(err)
  }
}
