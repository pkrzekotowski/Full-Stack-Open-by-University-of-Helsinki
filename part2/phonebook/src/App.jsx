import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFiltering }) => <div>filter shown with: <input value={filter} onChange={handleFiltering} /> </div>

const PersonForm = ({ addNewPerson, newPerson, handleFormChange }) => (
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

const Persons = ({ persons, keyword }) => (
  <div>
    {persons
        .filter(person => person.name.toLowerCase().includes(keyword.toLowerCase()))
        .map(person => <div key={person.id}>{person.name} {person.number}</div>)
      }
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: '', number: '', id: ''})
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  useEffect(() => {
    console.log(`Current name: ${newPerson.name}, Current number: ${newPerson.number}`)
  }, [newPerson])

  const handleFormChange = (e, field) =>
    setNewPerson({...newPerson, [field]: e.target.value})

  const handleFiltering = (e) => setFilter(e.target.value)

  const addNewPerson = (e) => {
    e.preventDefault()
    const { name, number } = newPerson

    if (persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already in the phonebook`)
      return
    }

    const personObject = {
      name,
      number,
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        const note = response.data
        setPersons(persons.concat(note))
        console.log('added new person:', `name: ${name}, phone: ${number}, id: ${personObject.id}`)
        setNewPerson({ name: '', number: '', id: ''})
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFiltering={handleFiltering} />
      <h3>add a new</h3>
      <PersonForm addNewPerson={addNewPerson} newPerson={newPerson} handleFormChange={handleFormChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} keyword={filter} />
    </div>
  )
}

export default App
