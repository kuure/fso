<<<<<<< HEAD
import { useState } from 'react'
import Note from './components/Note'


const App = (props) => {

	// note state
	const [notes, setNotes] = useState(props.notes)

	// new note state
	const [newNote, setNewNote] = useState('')

	// determine what ones to show
	const [showAll,setShowAll] = useState(true)
=======
import { useState,useEffect } from 'react'
import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './components/Notification'
import noteService from './services/notes'






const App = () => {

	// note state
	const [notes, setNotes] = useState(null)
	// new note state
	const [newNote, setNewNote] = useState('')
	// determine what ones to show
	const [showAll,setShowAll] = useState(true)
	// error messages
	const [errorMessage,setErrorMessage] = useState(null)

	// get the data right when the page loads
	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	if (!notes) {
		return null
	}
>>>>>>> 3a


	// add a new note
	const addNote = (event) => {
		event.preventDefault()
<<<<<<< HEAD
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
=======

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
			.update(id,changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id===id ? returnedNote : note ))

			})

			.catch(error => {
				setErrorMessage(
					`the note '${note.content}' was already deleted from the server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				},5000)
				//setNotes(notes.filter(n => n.id !== id))
			})
	}



	// deal with edits
	const handleNoteChange = (event) => {
		//console.log(event.target.value)
>>>>>>> 3a
		setNewNote(event.target.value)
	}

	// which notes to display?
	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)



<<<<<<< HEAD
=======
	// GUI stuff
>>>>>>> 3a
	return (
		<div>

			<h1>Notes</h1>

<<<<<<< HEAD
=======
			<Notification message={errorMessage} />

>>>>>>> 3a
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
<<<<<<< HEAD

			<ul>
				{notesToShow.map(note => 
					<Note key={note.id} note={note} />
=======
	
			<ul>
				{notesToShow.map(note =>
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
>>>>>>> 3a
				)}
			</ul>

			<form onSubmit={addNote}>

				<input
					value={newNote}
					onChange={handleNoteChange}
				/>

				<button type="submit">save</button>

			</form>

<<<<<<< HEAD
=======
			<Footer />

>>>>>>> 3a
		</div>
	)
}

export default App 
