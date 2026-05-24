const router = require('express').Router();
const User = require('../models/userModel');
const { signToken } = require('../utils/auth');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body;

        const existingUser = await User.findOne({ email });

        const existingUsername = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists"
            })
        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = signToken(user);

        res.status(201).json({ token, user });
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})

module.exports = router;