import { useState } from 'react'

const App = () => {

	// data, 'persons' array
	const [persons, setPersons] = useState([
		{ name: 'jeff' },
	]) 

	// new name state
	const [newName, setNewName] = useState('')

	// add a new person
	const addPerson = (event) => {

		event.preventDefault()

		const personObject = {
			name: newName,
			id: String(persons.length + 1),
		}

		const personMatch = persons.some(person => person.name === newName)
		if (personMatch) {
			window.confirm(
				`${newName} is already added to the phonebook`
			)
		}
		else {
			setPersons(persons.concat(personObject))
			setNewName(newName)
		}

	}

	const handlePersonChange = () => {
		setNewName(event.target.value)
	}


	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name :
					<input
						value={newName}
						onChange={handlePersonChange}
					/>
				</div>

				<div>
					<button type="submit">add</button>
				</div>

			</form>
			<h2>Numbers</h2>

			<ul>
				{persons.map(person => 
					<Person key={person.name} person={person} />
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



