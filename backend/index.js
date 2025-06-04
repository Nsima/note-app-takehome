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
  } catch (error) {
    return [];
  }
};

// Helper function to write notes
const saveNotes = (notes) => {
  try {
  } catch (error) {
  }
};

// Routes
app.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
});

app.put('/api/notes/:id', (req, res) => {
});

app.delete('/api/notes/:id', (req, res) => {
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
