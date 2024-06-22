import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
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
      name: newName
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
      <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App
