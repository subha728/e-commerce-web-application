const express = require("express");
const Cart = require("../models/cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Product to Cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

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
    console.log("Cart Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get User Cart
router.get("/", protect, async (req, res) => {
  try {
    const userCart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    res.json(userCart);
  } catch (error) {
    console.log("Cart Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;