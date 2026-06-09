const express = require("express");
const Cart = require("../models/cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Product to Cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        products: [
          {
            product: productId,
            quantity,
          },
        ],
      });
    } else {
      cart.products.push({
        product: productId,
        quantity,
      });

      await cart.save();
    }

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get User Cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;