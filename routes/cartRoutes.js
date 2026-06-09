const express = require("express");
const Cart = require("../models/cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Product to Cart
router.post("/add", protect, async (req, res) => {
  try {
    console.log("User:", req.user);
    console.log("Body:", req.body);

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
    console.error("