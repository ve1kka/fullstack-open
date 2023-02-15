import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(_state, action) {
			const notification = action.payload
			return notification
		},
		removeNotification(_state, _action) {
			return initialState
		}
	}
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer