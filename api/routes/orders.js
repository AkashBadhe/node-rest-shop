const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order'); // Import the Order model

const router = express.Router();
const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

// Get all orders
router.get('/', (req, res) => {
  Order.find()
    .select('products _id') // Select specific fields to return
    .populate('products.product', 'name price') // Populate product details for each product
    .exec()
    .then((orders) => {
      res.status(200).json({
        count: orders.length,
        orders: orders.map((order) => ({
          _id: order._id,
          products: order.products.map((item) => ({
            product: item.product,
            quantity: item.quantity,
          })),
          request: {
            type: 'GET',
            url: `${baseUrl}/orders/${order._id}`,
          },
        })),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

// Create a new order
router.post('/', (req, res) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    products: req.body.products, // Expect an array of products with product IDs and quantities
  });

  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Order created successfully',
        createdOrder: {
          _id: result._id,
          products: result.products.map((item) => ({
            product: item.product,
            quantity: item.quantity,
          })),
          request: {
            type: 'GET',
            url: `${baseUrl}/orders/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

// Get a specific order by ID
router.get('/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .select('products _id')
    .populate('products.product', 'name price') // Populate product details for each product
    .exec()
    .then((order) => {
      if (order) {
        res.status(200).json({
          order: {
            _id: order._id,
            products: order.products.map((item) => ({
              product: item.product,
              quantity: item.quantity,
            })),
          },
          request: {
            type: 'GET',
            url: '${baseUrl}/orders',
          },
        });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

// Delete an order by ID
router.delete('/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  Order.deleteOne({ _id: orderId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Order deleted successfully',
        request: {
          type: 'POST',
          url: '${baseUrl}/orders',
          body: { products: [{ product: 'Product ID', quantity: 'Number' }] },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
