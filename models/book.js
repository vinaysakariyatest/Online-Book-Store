const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    desc:{
        type: String,
    },
    image:{
        type: String,
    },
    price:{
        type:Number,
    },
    cat_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    auth_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'author'
    }
})

module.exports = mongoose.model('book', bookSchema)