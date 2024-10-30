import { useState } from 'react'

const App = () => {

	// data, 'persons' array
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' },
	]) 

	// new name state
	const [newName, setNewName] = useState('')

	// add a new person
	const addPerson = (event) => {

		console.log('addPerson event', event)
		event.preventDefault()

		const personObject = {
			name: newName,
			id: String(persons.length + 1),
		}

		console.log("New Person Object Before:", persons)
		setPersons(persons.concat(personObject))
		setNewName(newName)
		console.log("New Person Object After:", persons)
	}

	const handlePersonChange = () => {
		//console.log("handlePersonChange", event.target.value)
		setNewName(event.target.value)
		//console.log("newName", newName)
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



