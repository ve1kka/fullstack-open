const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Best blog',
    author: 'aa',
    url: 'blog.com',
    likes: 1,
  },
  {
    title: 'New blog',
    author: 'AAA',
    url: 'blog.com',
    likes: 10,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'testi', author: 'aaa', url: 'aba' })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}