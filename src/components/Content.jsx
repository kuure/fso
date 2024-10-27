import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
	return (
		<main>
			{parts.map((part, i) =>
				<Part key={i} part={part.name} exercises={part.exercises} />
			)}
		</main>
	)
}

export default Content
