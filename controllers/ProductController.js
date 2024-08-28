const User = require("../models/UserModel");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Product = require("../models/ProductModel");

// ... existing code ...

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, rating, img, userId } = req.body;
  try {
    const product = await Product.create({ name, rating, img, userId });
    res.status(200).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateVotes = async (req, res) => {
  const { id, type } = req.body; // Ensure 'id' is included in the request body
  try {
    const product = await Product.findById(id);
    if (product) {
      if (type === "like") {
        product.totalLikes += 1;
      } else if (type === "dislike") {
        product.totalDislikes += 1;
      }
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating votes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateVotes,
};
