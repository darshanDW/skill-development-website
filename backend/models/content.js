const mongoose = require('mongoose');
const Admins = require('./admin');
const contentschema = new mongoose.Schema({

topic:{
    type:String,
    require:true
},
content_link:{
    type:{type:String,
        require:false
    },
    require:false

},
admin:{
    type:Admins,
    require:true
},




});
const Content = mongoose.model('Content', contentschema);
module.exports = Content;