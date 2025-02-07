const Person = ({person,deletePerson}) => {
	return (
		<li>Name: {person.name} Number: {person.number}
			<button type="button" onClick={() => deletePerson(person.id)}>Delete</button>
		</li>
	)
}
export default Person
