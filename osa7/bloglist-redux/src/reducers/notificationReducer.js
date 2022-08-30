import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

export const { createNotification } = notificationSlice.actions

let timeId = null

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(createNotification(message))
    if (timeId !== null) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      dispatch(createNotification(null))
    }, 5000)
  }
}

export default notificationSlice.reducer
