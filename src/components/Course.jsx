const Course = ({course}) => {

	const parts = course.parts

	const total = parts.reduce((sum, parts) => {
		return sum + parts.exercises;
	}, 0);

	console.log(total)

	return (
	<div>
		<Header course={course} />

		<Content>
			{parts.map(part => 
				<Part key={part.id} part={part} />
			)}
		</Content>

	</div>
	)
}

export default Course


const Header = ({course}) => {
	return (
		<header>
			<h1>{course.name}</h1>
		</header>
	)
}



const Content = ({children}) => {
	return (
		<main>
			{children}
		</main>
	)
}


const Part = ({part}) => {
	return (
		<article>
			<h2>Part</h2>
			<p>{part.name}</p>
			<p>{part.exercises}</p>
		</article>
	)
}



