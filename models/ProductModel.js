// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   rating: {
//     type: mongoose.Schema.Types.Decimal128,
//     min: 0,
//     max: 5,
//   },
//   img: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   totalLikes: {
//     type: Number,
//     default: 0,
//   },
//   totalDislikes: {
//     type: Number,
//     default: 0,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   description: {
//     type: String,
//   },
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // rating: {
  //   type: mongoose.Schema.Types.Decimal128,
  //   min: 0,
  //   max: 10,
  //   default: 0,
  // },
  img: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  votes: {
    type: [Number],
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
