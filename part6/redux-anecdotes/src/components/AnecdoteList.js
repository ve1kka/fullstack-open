import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    })
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(createVote(anecdote))
    dispatch(createNotification(`Voted for: ${anecdote.content}`, 5))
  }

  const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
          has <b>{anecdote.votes}</b>{' '}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {anecdotes
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

export default AnecdoteList