import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas',  phonenumber: "040-1234567" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhonenumberChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      id: persons.length,
      phonenumber: newNum,
    }
    if (persons.map(p => p.name).includes(newName))
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat(person))

    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handlePhonenumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <p key={p.id}>{p.name} {p.phonenumber}</p> 
      ))}
    </div>
  )

}

export default App