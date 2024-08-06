const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Get all notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});


// Add a new note using: POST "/api/notes/addnotes". Login required
router.post('/addnotes', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
      title, description, tag, user: req.user.id
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Update an existing Note using: POST "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 })
  ], async (req, res) => {
    const { title, description, tag } = req.body;
  
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      // Create a newNote object
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;
  
      // Find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
  
      // Allow updation only if user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json(note);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });


// Delete an existing Note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
      // Find the note to be deleted and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
  
      // Allow deletion only if user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ success: "Note has been deleted" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;
