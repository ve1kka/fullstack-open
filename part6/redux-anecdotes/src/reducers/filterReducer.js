import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState: '',
	reducers: {
		filterChange(_state, action) {
			const filter = action.payload
			return filter
		}
	}
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer