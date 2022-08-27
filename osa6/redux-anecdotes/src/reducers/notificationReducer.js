import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload
        }
    }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(createNotification(message))
        setTimeout(() => {
            dispatch(createNotification(null))
        }, time * 1000)
    }
}

export default notificationSlice.reducer