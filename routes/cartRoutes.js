// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { fetchCart , addToCart, updateCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, fetchCart);
router.post('/add', authMiddleware, addToCart);
router.put('/:id', authMiddleware, updateCart);
router.delete('/:id', authMiddleware, removeFromCart);

module.exports = router;
