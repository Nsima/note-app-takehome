import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:3001/api/notes';

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
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

  const addNote = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newNote.trim()) return;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newNote }),
    });
    const addedNote = await response.json();
    setNotes(prev => [...prev, addedNote]);
    setNewNote('');
  } catch (error) {
    console.error('Error adding note:', error);
    setError('Failed to add note. Please try again.');
  }
};

  const toggleComplete = async (id: any) => {
    try {
      
    } catch (error) {
      console.error('Error toggling note completion:', error);
      setError('Failed to update note. Please try again.');
    }
  };

  const deleteNote = async (id: any) => {
    try {
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
