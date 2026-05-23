const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

module.exports = db;