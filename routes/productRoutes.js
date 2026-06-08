const express = require("express");
const product = require("../models/product");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Add Product (Admin Only)
router.post("/add", protect, admin, async (req, res) => {
  try {
    const product = await product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Product By ID
router.get("/:id", async (req, res) => {
  try {
    const product = await product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Product (Admin Only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Product (Admin Only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;