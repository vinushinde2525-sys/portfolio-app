import Skill from '../models/Skill.js'

export const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}
    const skills = await Skill.find(filter).sort({ category: 1, order: 1 })
    res.json({ skills, count: skills.length })
  } catch (err) {
    next(err)
  }
}

export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body)
    res.status(201).json(skill)
  } catch (err) {
    next(err)
  }
}

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!skill) return res.status(404).json({ message: 'Skill not found' })
    res.json(skill)
  } catch (err) {
    next(err)
  }
}

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    if (!skill) return res.status(404).json({ message: 'Skill not found' })
    res.json({ message: 'Skill deleted' })
  } catch (err) {
    next(err)
  }
}
