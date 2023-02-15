import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

const createVote = anecdote => {
  return async dispatch => {
    await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteForAnecdote(anecdote.id))
  }
}

export const { createAnecdote, voteForAnecdote, setAnecdote } = anecdoteSlice.actions
export { initializeAnecdotes, addAnecdote, createVote}
export default anecdoteSlice.reducer