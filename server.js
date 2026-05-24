const express = require('express');
const app =  express();

require('dotenv').config();
require('./config/db')
const PORT = process.env.PORT;

const Routes = require('./routes/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const User = require('./models/userModel');

app.use('/api', Routes);









app.listen(PORT, () => {
    console.log(`Running on localhost: ${PORT}`)
}) 