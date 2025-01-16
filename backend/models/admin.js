const mongoose = require('mongoose')

const adminschma = new mongoose.Schema({
    Username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true

    },
    Content:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content'
        }],

        Childs:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Childs'
        }],
        
});
const Admins = mongoose.model('Admins', adminschma);
module.exports = {Admins};