const { defaults } = require('joi');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    price:{
        type: Number,
    },
    qty:{
        type: Number,
        default: 1
    },
    total:{
        type:Number,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('cart',cartSchema);