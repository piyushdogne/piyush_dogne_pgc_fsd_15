const Cart = require('../models/Cart');
const mongoose = require('mongoose');


// Fetch the user's cart
exports.fetchCart = async (req, res) => {
  try {
    const userId = req.user.id;  // The user ID should be set by the authentication middleware

    // Check if the user is authenticated
    if (!userId) {
      return res.status(401).json({ message: 'User authentication failed' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Send the cart data
    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if both productId and quantity are provided
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    // Ensure productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    // Ensure that req.user is set by the authentication middleware
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: 'User authentication failed' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        items: [
          {
            productId: productId,
            quantity,
          },
        ],
      });
      await cart.save();
      return res.status(201).json({ message: 'Product added to cart', cart });
    }

    // Check if product already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Product does not exist, add it
      cart.items.push({
        productId: productId,
        quantity: quantity,
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    console.error(error);  // Log the error to debug if needed
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product quantity in cart
exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params; // Item ID in the cart

    // Ensure that id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Cart Item ID format' });
    }

    const cart = await Cart.findOne({ 'items._id': id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Default behavior: decrement the quantity
    item.quantity -= 1;

    if (item.quantity <= 0) {
      // Remove the item if quantity becomes zero
      item.remove();
    }

    await cart.save();

    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure that id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Cart Item ID format' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { items: { _id: id } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
