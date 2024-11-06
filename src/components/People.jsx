import Person from './Person'

const People = ({persons,filter}) => {

	const personsToShow = filter
		? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
		: persons 

	return(
		<ul>
			{personsToShow.map(person => 
				<Person key={person.name} person={person}/>
			)}
		</ul>
	)
}

export default People
