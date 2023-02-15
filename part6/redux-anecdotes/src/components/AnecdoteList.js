import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter(anecdote => (
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(setNotification(`Voted for: ${anecdotes.find(anecdote => anecdote.id === id).content}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
          has <b>{anecdote.votes}</b>{' '}
          <button onClick={() => vote(anecdote.id)}>vote</button>
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