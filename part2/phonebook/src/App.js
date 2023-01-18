import { useState } from 'react'
import Filter from './Filter'
import Personform from './Personform'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas',  phonenumber: "040-1234567" },
    { id: 1, name: 'Ada Lovelace', phonenumber: '39-44-5323523' },
    { id: 2, name: 'Dan Abramov', phonenumber: '12-43-234345' },
    { id: 3, name: 'Mary Poppendieck', phonenumber: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhonenumberChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add new number</h2>
      <Personform handleSubmit={handleSubmit}
          newName={newName}
          handleNameChange={handleNameChange}
          newNum={newNum} 
          handlePhonenumberChange={handlePhonenumberChange} />

      <h2>Numbers</h2>

      <Persons newFilter={newFilter} persons={persons} />
    </div>
  )
}

export default App