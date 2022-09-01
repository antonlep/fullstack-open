/* eslint-disable indent */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({ ...body, user: user._id })

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      const newBlog = await savedBlog.populate('user', { username: 1, name: 1 })
      response.status(201).json(newBlog)
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = request.body

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 })
  response.json(updatedNote)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(400).json({
        error: 'blog doesnt exist',
      })
    }
    if (user.id.toString() !== blog.user.toString()) {
      return response
        .status(401)
        .json({ error: 'only creator can delete a blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 })
  response.json(updatedNote)
})

module.exports = blogsRouter
