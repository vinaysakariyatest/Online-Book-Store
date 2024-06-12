const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        total: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Accepted','Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('order', OrderSchema)