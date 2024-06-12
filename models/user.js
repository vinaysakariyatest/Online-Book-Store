const mongoose = require('mongoose');

const useerSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    address:{
        type:String,
    },
    phone:{
        type:Number,
    }
})

module.exports = mongoose.model('user',useerSchema);