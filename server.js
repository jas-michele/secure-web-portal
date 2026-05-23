const express = require('express');
const app =  express();

require('dotenv').config();
require('./config/db')
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const User = require('./models/userModel');

app.post("/test", async (req, res) => {
     try {

        const {username, email, password} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const newUser = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        });
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
})









app.listen(PORT, () => {
    console.log(`Running on localhost: ${PORT}`)
}) 