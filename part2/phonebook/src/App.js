import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './Filter'
import Personform from './Personform'
import Persons from './Persons'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {setPersons(response.data)})
  }, [])


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
      number: newNum,
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