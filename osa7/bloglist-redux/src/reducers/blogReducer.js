import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      const blog = action.payload
      return state.map((a) => (a.id === blog.id ? blog : a))
    },
    remove(state, action) {
      const blog = action.payload
      return state.filter((a) => a.id !== blog.id)
    },
  },
})

export const { setBlogs, appendBlog, setBlog, remove, setToken } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(blogObject)
    dispatch(setBlog(likedBlog))
  }
}

export const removeBlog = (blogObject) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(blogObject)
    dispatch(remove(removedBlog))
  }
}

export default blogSlice.reducer
