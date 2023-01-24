import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Persons from './components/Persons'
import personService from './services/Personservice'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {setPersons(initialPersons)})
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

  const addPerson = (person) => {
    personService
      .create(person)
      .then(_response => {
        setPersons(persons.concat(person))
      })
  }

  const updatePerson = (name, newNum) => {
    const oldPerson = persons.find(p => p.name === name)
    const changedPerson = { ...oldPerson, number: newNum }

    personService
      .update(oldPerson.id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
      })
      .catch(_error => {
        alert(
          `the note '${oldPerson.content}' was already deleted from the server`
        )
      })
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)){
        personService.deletePerson(id).then(_response => {
          const updated = persons.filter(p => p.id !== id)
          setPersons(updated)
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      id: (new Date()).getTime(),
      number: newNum,
    }

    if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePerson(newName, newNum)

        setNewName('')
        setNewNum('')
        return
      }
    }

    addPerson(person)

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

      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App