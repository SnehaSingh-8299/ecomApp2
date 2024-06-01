const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    chargeId: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);