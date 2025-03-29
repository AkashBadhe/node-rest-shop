const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      }, // Reference to Product model
      quantity: { type: Number, default: 1 }, // Quantity for each product
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
