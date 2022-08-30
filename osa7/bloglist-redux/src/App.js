import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  initializeBlogs,
  createBlog,
  removeBlog,
  likeBlog,
} from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
  }

  const newBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      )

      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
    }
  }

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      try {
        dispatch(removeBlog(blogObject))
        dispatch(
          setNotification(
            `blog ${blogObject.title} by ${blogObject.author} deleted`
          )
        )
      } catch (exception) {
        dispatch(setNotification(exception.response.data.error))
      }
    }
  }

  const updateLikes = async (blogObject) => {
    try {
      dispatch(likeBlog(blogObject))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
    }
  }

  const blogFormRef = useRef()
  const errorMessage = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const copyBlogs = [...blogs]

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      {user.name} logged in<button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={newBlog} />
      </Togglable>
      {copyBlogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog">
            <Blog
              blog={blog}
              handleLikes={() => updateLikes(blog)}
              handleDelete={() => deleteBlog(blog)}
              isUser={user.id === blog.user.id}
            />
          </div>
        ))}
    </div>
  )
}

export default App
