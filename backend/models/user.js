const mongoose = require('mongoose');

// Parent Schema (remains the same)
const parentschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    // ,
    // profession: {
    //     type: String,
    //     required: true
    // }
    ,
    phone_number: {
        type: Number,
        required: true,
        unique: true
    }
    // ,
    // address: {
    //     type: String,
    //     required: false
    // }
});

const Parents = mongoose.model('Parents', parentschema);

// Child Schema (remains the same)
const childschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    hobbies: {
        type: [String],
        required: false
    },
    school_name: {
        type: String,
        required: false
    },
    class: {
        type: Number,
        required: true
    }
});
const Childs = mongoose.model('Child', childschema);

// User Schema (child is no longer an array)
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parents'
    },
    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child'
    }
});
const Users = mongoose.model('Users', userschema);

module.exports = { Users, Parents, Childs };
