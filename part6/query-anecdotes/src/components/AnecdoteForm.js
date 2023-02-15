import { useMutation, useQueryClient } from "react-query"
import anecdoteService from '../requests'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({ anecdotes }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryCLient = useQueryClient()
  const newAnecdoteMutation = useMutation(anecdoteService.createNew, { 
    onError: error => {
      notificationDispatch({ type: 'SET', payload: error.response.data.error},
      setTimeout(() => { notificationDispatch({ type: 'NULL'}) }, 5000))
    },
    onSuccess: content => {
      queryCLient.setQueryData('anecdotes', anecdotes.concat(content))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    notificationDispatch({ type: 'SET', payload: `Added anecdote: ${content}`})
    setTimeout(() => { notificationDispatch({ type: 'NULL'}) }, 5000)
}

  return (
    <div>
      <h3>Add new anecdote </h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm