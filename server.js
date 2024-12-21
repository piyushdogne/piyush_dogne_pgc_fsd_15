const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
