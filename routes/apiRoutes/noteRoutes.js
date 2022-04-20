const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../data/notes.json');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});
  
router.post('/notes', (req, res) => {
      // set id based on what the next index of the array will be
      req.body.id = notes.length.toString();
    
      // if any data in req.body is incorrect, send 400 error back
      if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
      } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
      }
});

// DELETE route

module.exports  = router;