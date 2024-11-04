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
	const [newFilter, setNewFilter] = useState('')



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

	// event handlers
	const handleNameChange = () => { setNewName(event.target.value) }
	const handleNumberChange = () => setNewNumber(event.target.value)
	const handleFilterChange = () => setNewFilter(event.target.value)


	// GUI stuff
	return (
		<div>

			<h2>Phonebook</h2>

			<Filter filter={newFilter} handleFilterChange={handleFilterChange} />

			<h2>Numbers</h2>

			<PersonForm
				addPerson = {addPerson}
				newName = {newName}
				handleNameChange = {handleNameChange}
				newNumber = {newNumber}
				handleNumberChange = {handleNumberChange}
			/>

			<People persons={persons} name={newFilter} />

		</div>
	)
}
export default App

