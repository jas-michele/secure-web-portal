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
});

router.post('/login', async (req, res) => {

    try {
    const user = await User.findOne({ email: req.body.email});


    if (!user) {
        return res.status(400).json({ message: "Invalid email or password"});
    }

    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password'});
    }

    const token = signToken(user);
    res.json({ token, user})

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router;