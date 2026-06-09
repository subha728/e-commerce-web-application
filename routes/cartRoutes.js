const express = require("express");
const Cart = require("../models/cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Product to Cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    console.log("User:", req.user);
    console.log("Body:", req.body);

    let userCart = await Cart.findOne({
      user: req.user.id,
    });

    if (!userCart) {
      userCart = await Cart.create({
        user: req.user.id,
        products: [
          {
            product: productId,
            quantity,
          },
        ],
      });
    } else {
      userCart.products.push({
        product: productId,
        quantity,
      });

      await userCart.save();
    }

    res.status(201).json(userCart);
  } catch (error) {
    console.error("ADD CART ERROR:", error);

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

// Get User Cart
router.get("/", protect, async (req, res) => {
  try {
    console.log("User from token:", req.user);

    const userCart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    console.log("Cart Found:", userCart);

    res.json(userCart);
  } catch (error) {
    console.error("GET CART ERROR:", error);

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;