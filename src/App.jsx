import { useState,useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = () => {

	const url = `http://localhost:3001/notes/`

	// note state
	const [notes, setNotes] = useState([])
	// new note state
	const [newNote, setNewNote] = useState('')
	// determine what ones to show
	const [showAll,setShowAll] = useState(true)

	// get the data right when the page loads
	useEffect(() => {
		console.log('effect')
		axios
			.get(url)
			.then(response => {
				setNotes(response.data)
			})
	}, [])

	// add a new note
	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		}
		axios
			.post(url,noteObject)
			.then(response => {
				console.log(response.data)
				setNotes(notes.concat(noteObject))
				setNewNote('')
			})
	}


	// change importance of a note
	const toggleImportanceOf = id => {

		const postUrl = `${url}${id}`
		const note = notes.find(n => n.id === id)

		// the spread operator
		const changedNote = { ...note, important: !note.important }

		axios.put(postUrl, changedNote).then(response => {
			setNotes(notes.map(n => n.id === id ? response.data : n))
		})

	}



	// deal with edits
	const handleNoteChange = (event) => {
		console.log(event.target.value)
		setNewNote(event.target.value)
	}

	// which notes to display?
	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)



	// GUI stuff
	return (
		<div>

			<h1>Notes</h1>

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
	
			<ul>
				{notesToShow.map(note =>
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				)}
			</ul>

			<form onSubmit={addNote}>

				<input
					value={newNote}
					onChange={handleNoteChange}
				/>

				<button type="submit">save</button>

			</form>

		</div>
	)
}

export default App 
