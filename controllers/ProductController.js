const User = require("../models/UserModel");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Product = require("../models/ProductModel");

// ... existing code ...

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyProducts = async (req, res) => {
  const { productIds } = req.body;
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Server error");
  }
};

const createProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, img, userId, description } = req.body;
    // Validate input
    if (!name || !img || !userId || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create new product
    const newProduct = new Product({
      name,
      img,
      userId,
      description,
    });
    // Save product to database
    const savedProduct = await newProduct.save({ session });

    // Update user's products array
    await User.findByIdAndUpdate(
      userId,
      { $push: { products: savedProduct._id } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedProduct);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateVotes = async (req, res) => {
  const { id, type } = req.body;
  try {
    const product = await Product.findById(id);
    if (product) {
      if (type === "like") {
        product.totalLikes += 1;
      } else if (type === "dislike") {
        product.totalDislikes += 1;
      }

      // Calculate the new rating
      const totalVotes = product.totalLikes + product.totalDislikes;
      const ratingPercentage = totalVotes
        ? (product.totalLikes / totalVotes) * 100
        : 0;
      product.rating = (ratingPercentage / 100) * 5;

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

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the product to get the userId
    const product = await Product.findById(id).session(session);
    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await Product.findByIdAndDelete(id).session(session);

    // Remove the product reference from the user's products array
    await User.findByIdAndUpdate(
      product.userId,
      { $pull: { products: id } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateVotes,
  getMyProducts,
  deleteProduct,
};
