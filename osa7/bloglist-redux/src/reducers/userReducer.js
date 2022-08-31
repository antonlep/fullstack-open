import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    setToken(state, action) {
      const token = action.payload
      blogService.setToken(token)
    },
  },
})

export const { setUser, setToken, setUsers } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await userService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch(setToken(user.token))
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
