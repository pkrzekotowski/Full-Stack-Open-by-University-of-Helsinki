import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Persons = ({ person, handleDeletion }) => (
  <div>
    {person.name} {person.number} <button onClick={() => handleDeletion(person.id, person.name)} >delete</button>
   </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: '', number: '', id: ''})
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personsService
      .getAll()
      .then(allPersons =>
        setPersons(allPersons)
      )
    }, [])

  useEffect(() => {
    console.log(`Current name: ${newPerson.name}, Current number: ${newPerson.number}`)
  }, [newPerson])

  const handleFormChange = (e, field) =>
    setNewPerson({...newPerson, [field]: e.target.value})

  const handleFiltering = (e) => setFilter(e.target.value)

  const handleDeletion = (id, name) => {
    if (window.confirm(`Delete ${name}?`) === false)
      return

    personsService
      .remove(id)
      .then(removedPerson =>
        setPersons(persons.filter(person => person.id !== removedPerson.id))
      )
  }

  const addNewPerson = (e) => {
    e.preventDefault()
    const { name, number } = newPerson
    const isPersonInPhonebook = persons.some(person => person.name.toLowerCase() === name.toLowerCase())

    if (isPersonInPhonebook) {

      if (window.confirm(`${newPerson.name} is already to the phonebook, replece the old number with a new one?`) === true) {
        const person = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
        const changedPerson = {...person, number: number}
        const id = person.id

        personsService
          .update(id, changedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewPerson({ name: '', number: '', id: ''})
          })
      } else {
        return
      }
    } else {
        const personObject = {
          name,
          number,
        }

        personsService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewPerson({ name: '', number: '', id: ''})
     }) }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFiltering={handleFiltering} />
      <h3>add a new</h3>
      <PersonForm addNewPerson={addNewPerson} newPerson={newPerson} handleFormChange={handleFormChange} />
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <Persons key={person.id} person={person} handleDeletion={handleDeletion} />
      )}
    </div>
  )
}

export default App
