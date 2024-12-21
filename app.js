// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

require('dotenv').config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
