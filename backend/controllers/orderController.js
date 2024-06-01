const Order = require('../models/order');
const Cart = require('../models/cart');
const stripe = require('stripe')('your_stripe_secret_key');

exports.createOrder = async (req, res) => {
    const { cartId, token } = req.body;
    try {
        const cart = await Cart.findById(cartId).populate('products');
        const charge = await stripe.charges.create({
            amount: cart.totalPrice * 100,
            currency: 'usd',
            source: token.id,
            description: 'E-commerce order',
        });
        const order = new Order({ cart, chargeId: charge.id });
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('cart');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
