import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import anecdoteService from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const result = useQuery('anecdotes', anecdoteService.getAll)
  const anecdotes = result.data
  const queryCLient = useQueryClient()
  const updateAnecdoteMutation = useMutation(anecdoteService.updateAnecdote, {
    onSuccess: (updatedObject) => {
      queryCLient.setQueryData(
        'anecdotes', 
        anecdotes
          .map(anecdote => 
            anecdote.id === updatedObject.id
            ? updatedObject
            : anecdote)
          .sort((a, b) => b.votes - a.votes)
      )
    }
  })

  if (!result.isSuccess) {
    return <div>anecdoteService not working as intended</div>
  }
  


  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'SET', payload: `Voted anecdote: ${anecdote.content}`})
    setTimeout(() => { notificationDispatch({ type: 'NULL'}) }, 5000)
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm anecdotes={anecdotes}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} {' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App