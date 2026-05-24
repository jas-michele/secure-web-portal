const express = require('express');
const app =  express();

require('dotenv').config();
require('./config/db')
const PORT = process.env.PORT;
const passport = require('./config/passport');
const Routes = require('./routes/index')

app.use(passport.initialize())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const User = require('./models/userModel');

app.use('/api', Routes);









app.listen(PORT, () => {
    console.log(`Running on localhost: ${PORT}`)
}) 