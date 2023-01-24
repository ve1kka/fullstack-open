import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Persons from './components/Persons'
import personService from './services/Personservice'
import Notification from './components/Notification'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([]) 
  const [notificationToggle, setNotificationToggle] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  const [notificationName, setNotificationName] = useState()
  const [notificationStyle, setNotificationStyle] = useState('notification')

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

  const createNotification = (name, style, text) => {
    setNotificationStyle(style)
    setNotificationText(text)
    setNotificationName(name)
    if (!notificationToggle)
      setNotificationToggle(!notificationToggle)

    setTimeout(() => {
      setNotificationToggle(false)
    }, 5000)
  }

  const addPerson = (person) => {
    personService
      .create(person)
      .then(_response => {
        setPersons(persons.concat(person))
        createNotification(person.name, 'notification', 'Added ')
      })
  }

  const updatePerson = (name, newNum) => {
    const oldPerson = persons.find(p => p.name === name)
    const changedPerson = { ...oldPerson, number: newNum }

    personService
      .update(oldPerson.id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
        createNotification(oldPerson.name, 'notification', 'Updated ')
      })
      .catch(_error => {
        createNotification(oldPerson.name, 'warning', 'This person was already deleted from the phonebook: ')
      })
  }

  const deletePerson = (id) => {
    const delPerson = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${delPerson.name}?`)){
        personService.deletePerson(id).then(_response => {
          const updated = persons.filter(p => p.id !== id)
          setPersons(updated)
          createNotification(delPerson.name, 'notification', 'Successfully deleted ')
      })
      .catch(_error => {
        createNotification(delPerson.name, 'warning', 'Person already deleted from the phonebook')
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
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
      {notificationToggle && (
        <Notification text={notificationText}
          name={notificationName}
          style={notificationStyle}
        />
      )}
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