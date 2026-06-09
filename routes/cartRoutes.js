const express = require("express");
<<<<<<< HEAD
const cart = require("../models/cart");
=======
const Cart = require("../models/cart");
>>>>>>> bfe0d8b58be8d267e871cbe959048a5d7e661706
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Product to Cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = await cart.create({
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
    const cart = await cart.findOne({
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