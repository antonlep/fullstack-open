import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            if (!action.payload) {
                return null
            }
            return action.payload.message
        }
    }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        const timeId = setTimeout(() => {
            dispatch(createNotification(null))
        }, time * 1000)
        dispatch(createNotification({ message: message, timeId: timeId }))
    }
}

export default notificationSlice.reducer