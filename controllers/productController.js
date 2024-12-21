// controllers/productController.js
const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description,  category, imageUrl } = req.body;
    const newProduct = new Product({ name, price, description,  category, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: 'Product created', newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
