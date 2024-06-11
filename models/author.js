const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    MobileNumber:{
        type:Number,
        unique:true,
    },
    isActive:{
        type:Boolean,
        default:false,
    },
    token:{
        type:String,
    }
})

module.exports = mongoose.model('author', authorSchema)