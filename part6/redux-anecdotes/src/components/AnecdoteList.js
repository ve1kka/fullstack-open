import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
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
        .sort((min, max) => max.votes - min.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

export default AnecdoteList