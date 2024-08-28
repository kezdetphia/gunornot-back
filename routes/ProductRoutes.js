const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Register a new user
router.post("/addproduct/:id", ProductController.createProduct);

router.get("/getproducts", ProductController.getProducts);

router.post("/updatevotes", ProductController.updateVotes);

// router.get("/getuserwithguns/:id", UserController.getUserWithGuns);

module.exports = router;
