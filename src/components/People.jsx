import Person from './Person'

const People = ({persons,newFilter}) => {

	const personsToShow = newFilter
		? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
		: persons 

	return(
		<ul>
			{personsToShow.map(person => <Person key={person.name} person={person} />)}
		</ul>
	)
}

export default People

