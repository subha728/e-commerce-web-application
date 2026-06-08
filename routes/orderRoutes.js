const express = require("express");
const Order = require("../models/Order");
const cart = require("../models/cart");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Place Order From Cart
router.post("/place", protect, async (req, res) => {
  try {
    const cart = await cart.findOne({
      user: req.user.id,
    });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "cart is empty",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      products: cart.products,
    });

    await cart.findOneAndDelete({
      user: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get My Orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await order.find({
      user: req.user.id,
    }).populate("products.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Order Status (Admin Only)
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;