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

const PersonForm = ({ addNewPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
        value={newNumber}
        onChange={handleNumberChange}
        />
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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

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
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
