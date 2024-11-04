import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
	}


const create = newObject => {
	const request = axios.get(baseUrl,newObject)
	console.log(request)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => {
		console.log(response.data)
		response.data
	})
}

export default { getAll, create, update }
