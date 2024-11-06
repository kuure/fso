import { useState,useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'


const App = () => {

	// data, 'persons' array
  const [persons, setPersons] = useState([]) 

	// new name state
	const [newName, setNewName] = useState('')
	
	// new number state
	const [newNumber, setNewNumber] = useState('')
	
	// new filter state
	const [filter, setFilter] = useState('')


	// get the data right when the page loads
	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	},[])


	// add a new person
	const addPerson = (event) => {
		event.preventDefault()

		// is there a person in the book with the same name?
		const personMatch = persons.some(person => person.name === newName)
		if (personMatch) {
			window.confirm( `${newName} is already added to the phonebook`)
		}
		else {
			
			// template for person
			const personObject = {
				name: newName,
				number: newNumber,
			}

			personService
				.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})
		}
	}


	const deletePerson = (deleteId) => {

		const personToDelete = persons.filter(person => person.id === deleteId)	
		const {name, id} = personToDelete[0]

		if (window.confirm(`Delete ${name} ?`)) {
			personService
				.deletePerson(id)
				.then(() =>
					setPersons(persons.filter(person => person.id !== id)))
			console.log(`${name} successfully deleted`)
		}

	}





	// event handlers
	const handleNameChange = () => { setNewName(event.target.value) }
	const handleNumberChange = () => setNewNumber(event.target.value)
	const handleFilterChange = () => setFilter(event.target.value)


	// GUI stuff
	return (
		<div>

			<h2>Phonebook</h2>

			<Filter 
				filter={filter} 
				handleFilterChange={handleFilterChange} 
			/>

			<h2>Numbers</h2>

			<PersonForm
				addPerson = {addPerson}
				newName = {newName}
				handleNameChange = {handleNameChange}
				newNumber = {newNumber}
				handleNumberChange = {handleNumberChange}
			/>

			<People
				deletePerson={deletePerson}
				persons={persons}
				filter={filter}
			/>

		</div>
	)
}
export default App
