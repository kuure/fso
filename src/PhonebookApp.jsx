import { useState,useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Notification from './components/Notification'


const App = () => {

	// data, 'persons' array
  const [persons, setPersons] = useState([]) 

	// new name state
	const [newName, setNewName] = useState('')
	
	// new number state
	const [newNumber, setNewNumber] = useState('')
	
	// new filter state
	const [filter, setFilter] = useState('')

	// notification messages
	const [message,setMessage] = useState(null)

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
		const personMatch = persons.filter(person => person.name === newName)

		if (personMatch.length !== 0) {

			if (window.confirm(`${newName} is already added to the phonebook, would you like to update?`)) {

				const updatedPerson = { ...personMatch[0], number: newNumber}

				//console.log(updatedPerson)

				personService
					.update(updatedPerson.id, updatedPerson)
					.then(returnedPerson => {
						setPersons(persons.map(person => person.id !== updatedPerson ? person : returnedPerson))
						setNewName('')
						setNewNumber('')
						setMessage(
							`${updatedPerson.name} was successfully updated`
						)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
					})
					.catch((error) => {
						console.log(error)
						setPersons(persons.filter(person => person.id !== updatedPerson.id))
						setNewName('')
						setNewNumber('')
						setMessage(
							`Error: ${updatedPerson.name} was already deleted from server`
						)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
					})
			}

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
					setMessage(
						`personService updated`
					)
					setTimeout(() => {
						setMessage(null)
					}, 5000)
				})
				.catch(error => {
					console.log("Error: ", error)
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

			<Notification message={message} />
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
