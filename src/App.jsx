import { useState } from 'react'
import Person from './components/Person'

const App = () => {

	// data, 'persons' array
  const [persons, setPersons] = useState([
		{ name: 'jeff', number: "6307" },
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

	]) 

	// new name state
	const [newName, setNewName] = useState('')
	
	// new number state
	const [newNumber, setNewNumber] = useState('')
	
	// new filter state
	const [newFilter, setNewFilter] = useState('')


	// add a new person
	const addPerson = (event) => {
		event.preventDefault()

		// template for person
		const personObject = {
			name: newName,
			number: newNumber,
			id: String(persons.length + 1),
		}

		// is there a person in the book with the same name?
		const personMatch = persons.some(person => person.name === newName)
		if (personMatch) {
			window.confirm( `${newName} is already added to the phonebook`)
		}
		else {
			// change the state for newName and newNumber
			setNewName(newName)
			setNewNumber(newNumber)
			// add the personObject to the persons array
			setPersons(persons.concat(personObject))
		}
	}

	// event handlers
	const handleNameChange = () => setNewName(event.target.value)
	const handleNumberChange = () => setNewNumber(event.target.value)
	const handleFilterChange = () => setNewFilter(event.target.value)


	const personsToShow = newName ? persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase())) : persons 
	console.log(personsToShow)
	console.log(newName)


	// GUI stuff
	return (
		<div>

			<h2>Phonebook</h2>
			<div>
				filter: <input value={newFilter} onChange={handleFilterChange}/>
			</div>
			<form onSubmit={addPerson}>
				<div>name : <input value={newName} onChange={handleNameChange} /> </div>
				<div>number: <input value={newNumber} onChange={handleNumberChange} /> </div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Numbers</h2>
			<ul>
				{ personsToShow.map(person => <Person key={person.name} person={person} />)}
			</ul>

			<div>debug: {newNumber}</div>

		</div>
	)
}
export default App



