const router = require('express').Router();
const User = require('../models/userModel');
const { signToken } = require('../utils/auth');

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = signToken(user);
        res.status(201).json({ token, user });
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})