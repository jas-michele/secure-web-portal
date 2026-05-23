const express = require('express');
const app =  express();

require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());



app.use("/", (req, res) => {
    res.send("Teasting...")
})













app.listen(PORT, () => {
    console.log(`Running on localhost: ${PORT}`)
}) 