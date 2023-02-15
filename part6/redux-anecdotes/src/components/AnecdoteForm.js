import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(addAnecdote(anecdote))
    dispatch(createNotification(`Created new anecdote: ${anecdote}`, 5))
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleAnecdote}>
        <input name='newAnecdote' />
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default AnecdoteForm