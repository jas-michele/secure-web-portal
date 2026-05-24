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