const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./api_testhelper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

var token = null
var testUserId = null

beforeAll(async () => {
  await User.deleteMany({})
  const testUser = await new User({
    username: 'aaaa',
    passwordHash: await bcrypt.hash('password', 10),
  }).save()

  await api.post('/api/login').send({ username: 'aaaa', password: 'password' })

  token = jwt.sign(
    { username: 'aaaa', id: testUser.id },
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  testUserId = testUser.id
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('testing formatting', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog has a unique id named \'id\'', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('GET requests', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Best blog'
    )
  })

  test('a specific blog can be viewed', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToView = initialBlogs[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('search nonexisting blog', async () => {
    const invalidId = await helper.nonExistingId()
    await api.get(`/api/blogs/${invalidId}`).expect(404)
  })

  test('invalid id', async () => {
    const invalidId = 'aaaa'
    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})




describe('POST requests', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Testaaja',
      author: 'Aaa',
      url: 'blog.net',
      likes: 1,
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const finalBlogs = await helper.blogsInDb()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const contents = finalBlogs.map(n => n.title)
    expect(contents).toContain(
      'Testaaja'
    )
  })

  test('request with no likes property', async () => {
    const newBlog = {
      title: 'titteli',
      author: 'tekija',
      url: 'aa.fi',
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()
    const likesOfAdded = finalBlogs[finalBlogs.length - 1].likes

    expect(likesOfAdded).toBe(0)
  })
})


describe('improperly formatted POST requests', () => {
  test('blog without content is not added', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const finalBlogs = await helper.blogsInDb()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'aba',
      author: 'aaa',
      likes: 1,
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog).expect(400)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'abaa',
      url: 'aaa',
      likes: 1,
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog).expect(400)
  })

  test('blog without token is not added', async () => {
    const newBlog = {
      title: 'aba',
      author: 'aaa',
      likes: 1,
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'aa')
      .send(newBlog).expect(401)
  })
})

describe('delete and update requests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const newBlog = {
      title: 'ababa',
      author: 'aba aa',
      url: 'abaaaa',
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    return token
  })

  test('a blog can be deleted', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const finalBlogs = await helper.blogsInDb()

    expect(finalBlogs).toHaveLength(0)

    const contents = finalBlogs.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

  test('deleting nonexistent blog', async () => {
    const initialBlogs = await helper.blogsInDb()

    await api
      .delete('/api/blogs/ababababa')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const finalBlogs = await helper.blogsInDb()

    expect(initialBlogs).toEqual(finalBlogs)
  })

  test('blog can be updated', async () => {
    const newBlog = {
      title: 'Blog',
      author: 'Bart',
      url: 'blog.net',
      likes: 69,
      user: testUserId,
    }

    const initialBlogs = await helper.blogsInDb()
    const blogToUpdate = initialBlogs[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlog = blogsAfterUpdate[0]

    expect(blogsAfterUpdate).toHaveLength(1)
    expect(updatedBlog.likes).toBe(69)
    expect(updatedBlog.author).toBe('Bart')
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})