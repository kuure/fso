import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

	const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

	const [searchTerm, setSearchTerm] = useState('')
	const [countries, setCountries] = useState(null)
	const [selectedCountry,setSelectedCountry] = useState(null)

	useEffect(() => {
		if (!countries) {
			console.log('fetching country info...')
			axios
				.get(`${baseUrl}/all`)
				.then(response => {
					console.log("Search Term",searchTerm)
					setCountries(response.data)
				})
		}
	}, [countries])





	const handleChange = (event) => {
		setSearchTerm(event.target.value)
	}

	const onSearch = (event) => {
		event.preventDefault()
		setCountries(searchTerm)
	}

	return (
		<div>
			<form onSubmit={onSearch}>
				country: <input value={searchTerm} onChange={handleChange} />
				<button type="submit">country info</button>
			</form>
			<pre>
				{JSON.stringify(countries, null, 2)}
			</pre>
		</div>
	)
}

export default App
