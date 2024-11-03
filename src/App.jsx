import { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {

	// data, 'persons' array
  const [persons, setPersons] = useState([]) 

	// new name state
	const [newName, setNewName] = useState('')
	
	// new number state
	const [newNumber, setNewNumber] = useState('')
	
	// new filter state
	const [newFilter, setNewFilter] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log(response.data)
				setPersons(response.data)
			})
	},[])


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
	const handleNameChange = () => {
		console.log(event.target)
		setNewName(event.target.value)
	}


	const handleNumberChange = () => setNewNumber(event.target.value)
	const handleFilterChange = () => setNewFilter(event.target.value)


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
				<Filter persons={persons} name={newFilter} />
			</ul>

		</div>
	)
}
export default App



