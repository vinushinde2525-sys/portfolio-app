import Project from '../models/Project.js'

export const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query
    const filter = {}
    if (category && category !== 'all') filter.category = category
    if (featured) filter.featured = featured === 'true'
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ projects, count: projects.length })
  } catch (err) {
    next(err)
  }
}

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json(project)
  } catch (err) {
    next(err)
  }
}

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    next(err)
  }
}

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json(project)
  } catch (err) {
    next(err)
  }
}

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    next(err)
  }
}
