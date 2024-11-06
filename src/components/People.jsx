import Person from './Person'

const People = ({persons,filter,deletePerson}) => {

	const personsToShow = filter
		? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
		: persons 

	return(
		<ul>
			{personsToShow.map(person => 
				<Person key={person.name} person={person} deletePerson={deletePerson}/>
			)}
		</ul>
	)
}

export default People
