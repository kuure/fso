import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

	const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

	const [value, setValue] = useState('')
	const [countries, setCountries] = useState(null)



	
	useEffect(() => {
		console.log('effect run, country is now', countries)
		// skip if countries is not defined
		if (countries) {
			console.log('fetching country info...')
			axios
				.get(`${baseUrl}/all`)
				.then(response => {
					console.log("Value",value)
					setCountries(response.data)
				})
		}
	}, [])






	const handleChange = (event) => {
		setValue(event.target.value)
	}

	const onSearch = (event) => {
		event.preventDefault()
		setCountries(value)
	}

	return (
		<div>
			<form onSubmit={onSearch}>
				country: <input value={value} onChange={handleChange} />
				<button type="submit">country info</button>
			</form>
			<pre>
				{JSON.stringify(countries, null, 2)}
			</pre>
		</div>
	)
}

export default App
