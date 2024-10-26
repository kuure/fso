const Course = ({course}) => {
	return (
	<div>
		<Header course={course} />

		<Content>
			{course.parts.map(part => 
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



