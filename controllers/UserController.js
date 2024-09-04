const User = require("../models/UserModel");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const signUp = async (req, res) => {
  try {
    const { formData } = req.body;

    // Validate username and password length
    if (formData.username.length < 4) {
      return res
        .status(400)
        .json({ msg: "Username must be at least 4 characters long" });
    }

    if (formData.password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long" });
    }

    if (formData.password !== formData.passwordRepeat) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // Check if user already exists
    let user = await User.findOne({ email: formData.email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(formData.password, salt);

    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ msg: "Email address or username already exists" });
    } else {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log("SignIn request received:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      console.log("Password is incorrect for user:", email);
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "365d" } // Optional: Set token expiration time
    );

    console.log("token", token);

    // Ensure user._doc exists and destructure safely
    const {
      __v,
      updatedAt,
      password: userPassword,
      ...userData
    } = user._doc || {};
    console.log("User authenticated successfully:", userData);

    res
      .status(200)
      .json({ userData: { ...userData }, token, message: "Successful login" });
  } catch (err) {
    console.error("Server error during signIn:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id).populate("conversations");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getMyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//Might implement something like this later if we wanna check out other profiles too
// const getUserWithGuns = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id).populate("myGuns");
//     if (user) {
//       const { password, ...userWithoutPassword } = user.toObject();
//       console.log(userWithoutPassword);
//       res.status(200).json(userWithoutPassword);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching user with corps:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = {
  signUp,
  signIn,
  getUser,
  // getUserWithGuns,
  getMyUser,
};
