import Person from './Person'

const Filter = ({persons,name}) => {

	const personsToShow = name
		? persons.filter(person => person.name.toLowerCase().includes(name.toLowerCase()))
		: persons 

	return(
		<ul>
			{personsToShow.map(person => <Person key={person.name} person={person} />)}
		</ul>
	)

}

export default Filter

