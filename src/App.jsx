import { useState } from 'react'

const App = () => {

	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	]) 

	const [newName, setNewName] = useState('')


	// add a new person
	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			content: newName,
			id: String(persons.length + 1),
		}
		setPersons(persons.concat(personObject))
		setNewName('')
	}







	return (
		<div>
			<h2>Phonebook</h2>

			<form onSubmit={addPerson}>
				<div>
					name: <input />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Numbers</h2>

			<ul>
				{persons.map(person => 
					<Person key={person.id} person={person} />
				)}
			</ul>


			<div>debug: {newName}</div>

		</div>
	)
}

export default App


const Person = ({person}) => {
	return (
		<p>{person.name}</p>
	)
}



