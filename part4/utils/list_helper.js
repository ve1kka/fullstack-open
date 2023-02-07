var _ = require('lodash')

const dummy = (blogs) => {
  if (blogs)
    return 1

  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current
  }, 0)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null

  let count = _.countBy(blogs, 'author')

  let author = ''
  let max = 0
  _.forEach(count, (numOfBlogs, authorName) => {
    if (numOfBlogs > max) {
      max = numOfBlogs
      author = authorName
    }
  })

  return { author : author, blogs : max }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
