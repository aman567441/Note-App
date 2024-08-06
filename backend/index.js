const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors())

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the notes routes
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
