const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'notes.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize notes.json if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper function to read notes
const getNotes = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading notes:", error);
    return [];
  }
};

// Helper function to write notes
const saveNotes = (notes) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
};

// Routes
app.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = getNotes();
  const newNote = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  notes.push(newNote);
  saveNotes(notes);
  res.status(201).json(newNote);
});

app.put('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === noteId);

  if (index === -1) {
    return res.status(404).json({ message: 'Notes missing' });
  }

  notes[index].completed = !notes[index].completed;
  saveNotes(notes);
  res.json(notes[index]);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  let notes = getNotes();
  notes = notes.filter(note => note.id !== noteId);
  saveNotes(notes);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
