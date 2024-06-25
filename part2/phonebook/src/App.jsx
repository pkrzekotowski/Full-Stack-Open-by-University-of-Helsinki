import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFiltering }) => {
  return(
    <div>
      filter shown with: <input
        value={filter}
        onChange={handleFiltering}
      />
    </div>
 )
}

const PersonForm = ({ addNewPerson, newPerson, handleFormChange }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newPerson.name} onChange={event => handleFormChange(event, 'name')} />
      </div>
      <div>
        number: <input value={newPerson.number} onChange={event => handleFormChange(event, 'number')} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
        )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const handleFormChange = (event, field) => {
    const fieldValue = event.target.value
    setNewPerson({...newPerson, [field]: fieldValue})
  }

  useEffect(() => {
    console.log(`Current name: ${newPerson.name}, Current number: ${newPerson.number}`)
  }, [newPerson])

  const handleFiltering = (e) => {
    const keyword = e.target.value.toLowerCase()
    setFilter(keyword)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(keyword)))
  }

  const isContactInPhonebook = () =>
    persons.some(obj => obj.name.toLowerCase() === newName.toLowerCase())

  const addNewPerson = (e) => {
    e.preventDefault()

    if (isContactInPhonebook()) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const newPersons = persons.concat(newPerson)

    setPersons(newPersons)
    setFilteredPersons(newPersons)

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFiltering={handleFiltering}
      />
      <h3>add a new</h3>
      <PersonForm addNewPerson={addNewPerson} newPerson={newPerson} handleFormChange={handleFormChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
