import { useState } from 'react'
import Note from './components/Note'


const App = (props) => {

	// note state
	const [notes, setNotes] = useState(props.notes)

	// new note state
	const [newNote, setNewNote] = useState('')

	// determine what ones to show
	const [showAll,setShowAll] = useState(true)


	// add a new note
	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
			id: String(notes.length + 1),
		}
		setNotes(notes.concat(noteObject))
		setNewNote('')
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
					<Note key={note.id} note={note} />
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
