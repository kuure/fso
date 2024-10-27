import React from 'react'

const Part = ({part,exercises}) => {
	return (
		<article>
			<h2>Part</h2>
			<p>{part}</p>
			<p>{exercises}</p>
		</article>
	)
}

export default Part
