// controllers/cartController.js
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);
        let cart = await Cart.findById(req.body.cartId);
        console.log(cart, "carttttt addd")
        if (!cart) {
            cart = new Cart({ products: [], totalPrice: 0 });
        }
        cart.products.push(product);
        cart.totalPrice += product.price;
        const savedCart = await cart.save();
        res.json(savedCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('products');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
