import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`Created new anecdote: ${newAnecdote}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='newAnecdote' />
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default AnecdoteForm