const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://askext:${process.env.MONGO_ATLAS_PW}@learningcluster.pcy5ikr.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=LearningCluster`
  )
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Middleware to parse request bodies
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: false })); // Built-in middleware for parsing URL-encoded data
app.use(morgan('dev')); // Logging middleware

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Use the product and order routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Handle errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
