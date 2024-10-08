const mongoose = require('mongoose');
const Content = require('./content');
const usershema = new mongoose.Schema({
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

    parent: {
        type: Parents
    },
    child: {
        type: Childs
    }





});
const Users = mongoose.model('Users', usershema);


const parentschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    profession: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true

    },
    address: {
        type: String,
        require: false

    }



});
const Parents = mongoose.model('Parents', parentschema);

const childschema = new mongoose.Schema({
    name: {
        type: String,
        require: true

    },
    DOB: {
        type: Date,
        require: true
    },
    Hobbies: {
        type: Array,
        require: false

    },
    school_name: {
        type: String,
        require: false
    },
    class: {
        type: Number,
        require: true
    },
    content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],
});



const Childs = mongoose.model('Childs', childschema);





module.exports = Users, Parents, Childs;