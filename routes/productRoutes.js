// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware ,getAllProducts);
router.post('/create', authMiddleware , createProduct);

module.exports = router;
