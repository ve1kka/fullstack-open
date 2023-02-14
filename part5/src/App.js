import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [toggle, setToggle] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  const [notificationStyle, setNotificationStyle] = useState('notification')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(async () => {
    const initialBlogs = await blogService.getAll()
    setBlogs( initialBlogs )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createNotification = (style, text) => {
    setNotificationStyle(style)
    setNotificationText(text)
    setToggle(!toggle)
    setTimeout(() => {
      setToggle(false)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    if (
      blogObject.title !== '' &&
      blogObject.author !== '' &&
      blogObject.url !== ''
    ) {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      createNotification(
        'notification',
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      )
    } else {
      createNotification(
        'warning',
        'You must fill all fields in order to add a blog'
      )
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      createNotification(
        'notification',
        `User ${user.username} is logged in`
      )
    } catch (exception) {
      createNotification(
        'warning',
        'Wrong username or password'
      )
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    document.location.reload()
  }

  const loginForm = () => (
    <Togglable buttonLabel='Log in' cancelButtonLabel='Cancel'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => {
    return (
      <Togglable
        buttonLabel='New blog'
        cancelButtonLabel='Cancel'
        ref={blogFormRef}
      >
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  const blogUpdate = async (blogId, blogObject) => {
    try {
      await blogService.update(blogId, blogObject)
      const updatedBlog = { ...blogObject, blogId }

      createNotification(
        'notification',
        `Updated ${updatedBlog.title}`
      )

      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (exception) {
        createNotification(
          'error',
          'Failed to update blog'
        )
    }
    
  }

  const blogRemove = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
      createNotification(
        'notification',
        'Removed blog'
      )
    } catch (exception) {
        createNotification(
          'error',
          'Failed to remove blog'
        )
    }
    
  }

  return (
    <div>
      <h1>Blogs</h1>
      {user && (
        <div className='log'>
          {user.name} is logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {toggle && (
        <Notification text={notificationText} style={notificationStyle} />
      )}
      {user === null ? (
        loginForm()
      ) : (
        <>
          {blogForm()}
          <div>
            {blogs
              .sort((min, max) => max.likes - min.likes)
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  blogUpdate={blogUpdate}
                  blogRemove={blogRemove}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App