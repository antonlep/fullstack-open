import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {
  initializeBlogs,
  createBlog,
  removeBlog,
  likeBlog,
} from './reducers/blogReducer'
import { login, setUser, setToken } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
    </div>
  )
}

const Blogs = ({
  blogFormRef,
  newBlog,
  copyBlogs,
  updateLikes,
  deleteBlog,
  user,
}) => {
  return (
    <div>
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

const Users = ({ users }) => {
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON !== null) {
      const userParsed = JSON.parse(loggedUserJSON)
      dispatch(setUser(userParsed))
      dispatch(setToken(userParsed.token))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(
      login({
        username,
        password,
      })
    ).catch((error) => dispatch(setNotification('wrong credentials')))
    setUsername('')
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    setUsername('')
    setPassword('')
    dispatch(setToken(null))
  }

  const newBlog = async (blogObject) => {
    dispatch(createBlog(blogObject))
      .catch((exception) =>
        dispatch(setNotification(exception.response.data.error))
      )
      .then(
        dispatch(
          setNotification(
            `a new blog ${blogObject.title} by ${blogObject.author} added`
          )
        )
      )
    blogFormRef.current.toggleVisibility()
  }

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      dispatch(removeBlog(blogObject)).catch((exception) =>
        dispatch(setNotification(exception.response.data.error))
      )
      dispatch(
        setNotification(
          `blog ${blogObject.title} by ${blogObject.author} deleted`
        )
      )
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
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

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
      <Menu />
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      {user.name} logged in<button onClick={handleLogout}>logout</button>
      <Routes>
        <Route
          path="/blogs"
          element={
            <Blogs
              blogFormRef={blogFormRef}
              newBlog={newBlog}
              copyBlogs={copyBlogs}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
        <Route path="/" element={<div></div>} />
        <Route path="/users" element={<Users users={users} />} />
      </Routes>
    </div>
  )
}

export default App
