const mongoose = require('mongoose');

require('dotenv').config();
const mongoUrl = process.env.DB_URL;
console.log(mongoUrl)
mongoose.connect('mongodb+srv://darshanjadhav775:7499873469%40Dd@cluster0.0yqvag5.mongodb.net/', {

});

const db = mongoose.connection;
db.on('connected', () => {
    console.log('online connected');
});
db.on('disconnected', () => {
    console.log('disconnected');
});
db.on('error', (err) => {
    console.error('connection error:', err);
});

module.exports = db;
