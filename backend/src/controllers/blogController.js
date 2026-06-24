import Blog from '../models/Blog.js'

export const getBlogs = async (req, res, next) => {
  try {
    const { category, search, tag } = req.query
    const filter = { published: true }
    if (category) filter.category = category
    if (tag) filter.tags = tag
    if (search) filter.title = { $regex: search, $options: 'i' }
    const blogs = await Blog.find(filter).sort({ createdAt: -1 })
    res.json({ blogs, count: blogs.length })
  } catch (err) {
    next(err)
  }
}

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    blog.views += 1
    await blog.save()
    res.json(blog)
  } catch (err) {
    next(err)
  }
}

export const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
  } catch (err) {
    next(err)
  }
}

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json(blog)
  } catch (err) {
    next(err)
  }
}

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json({ message: 'Blog deleted' })
  } catch (err) {
    next(err)
  }
}
