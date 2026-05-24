const router = require('express').Router();
const Note = require('../models/bookmarkModel');
const { authMiddleware} = require('../utils/auth');

router.use(authMiddleware);

router.get('/', async (req, res ) => {

    try {
        const notes = await Note.find({user: req.user._id});
        res.json(notes);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/new', async (req, res) => {
    try {
        const note = await Note.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id, req.body, { new: true });
        if (!note) {
            return res.status(404).json({ message: 'No note found with this id'});
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'User is not authorized to update this note'
            })
        }

        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );

        res.json(updateNote);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.find(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'No note found with this id'});
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'User is not authorized to delete this note'
            })
        }

        await Note.findByIdAndDelete(req.params.id)

        res.json({ message: 'Note deleted'});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;