import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      id: persons.length,
    }
    if (persons.map(p => p.name).includes(newName))
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat(person))

    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <p key={p.id}>{p.name}</p> 
      ))}
    </div>
  )

}

export default App