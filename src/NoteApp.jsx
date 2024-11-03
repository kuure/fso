import { useState,useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {

	// note state
	const [notes, setNotes] = useState([])
	// new note state
	const [newNote, setNewNote] = useState('')
	// determine what ones to show
	const [showAll,setShowAll] = useState(true)

	// get the data right when the page loads
	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	// add a new note
	const addNote = (event) => {
		event.preventDefault()

		// template for note
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		}
		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}


	// change importance of a note
	const toggleImportanceOf = (id) => {
		const note = notes.find(n => n.id === id)
		// the spread operator
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id===id ? returnedNote : note ))
			})
			.catch(error => {
				alert(`the note '${note.content}' was already deleted from the server`)
				setNotes(notes.filter(n => n.id !== id))
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
