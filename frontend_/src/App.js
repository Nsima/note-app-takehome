import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend URL - Bug #1: Hardcoded URL instead of environment variable
  const API_URL = 'http://localhost:3001/api/notes';

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      // Bug #2: Not checking if response is ok
      const data = await response.json();
      setNotes(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    
    if (!newNote.trim()) {
      setError('Note cannot be empty');
      return;
    }
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newNote }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      
      const addedNote = await response.json();
      // Bug #3: Using push instead of creating a new array
      notes.push(addedNote);
      setNotes(notes);
      setNewNote('');
      setError(null);
    } catch (error) {
      console.error('Error adding note:', error);
      setError('Failed to add note. Please try again.');
    }
  };

  const toggleComplete = async (id) => {
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      
      if (!noteToUpdate) {
        throw new Error('Note not found');
      }
      
      // Bug #4: Not sending the complete note data
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !noteToUpdate.completed }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      
      const updatedNote = await response.json();
      
      setNotes(notes.map(note => 
        note.id === id ? updatedNote : note
      ));
      
      setError(null);
    } catch (error) {
      console.error('Error toggling note completion:', error);
      setError('Failed to update note. Please try again.');
    }
  };

  const deleteNote = async (id) => {
    try {
      // Bug #5: Using string concatenation instead of template literals
      const response = await fetch(API_URL + '/' + id, {
        method: 'DELETE',
      });
      
      // Bug #6: Not checking response.ok
      await response.json();
      
      setNotes(notes.filter(note => note.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Notes App</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form className="note-form" onSubmit={addNote}>
        <input
          type="text"
          className="note-input"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter a new note..."
        />
        <button type="submit" className="add-button">Add Note</button>
      </form>
      
      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes yet. Add one above!</p>
      ) : (
        <ul className="notes-list">
          {/* Bug #7: Not sorting notes by any criteria */}
          {notes.map(note => (
            <li
              key={note.id}
              className={`note-item ${note.completed ? 'completed' : ''}`}
            >
              <span className="note-text">{note.text}</span>
              <div className="note-actions">
                <button
                  className="complete-button"
                  onClick={() => toggleComplete(note.id)}
                >
                  {note.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
