const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { verifyToken } = require("../middleware/verifyToken");

// Register a new user
router.post("/addproduct", verifyToken, ProductController.createProduct);

router.get("/getproducts", verifyToken, ProductController.getProducts);

router.post("/updatevotes", verifyToken, ProductController.updateVotes);

router.post("/getmyproducts", verifyToken, ProductController.getMyProducts); //this is post because we are sending an array of product ids

router.post("/deleteproduct", verifyToken, ProductController.deleteProduct);

// router.get("/getuserwithguns/:id", UserController.getUserWithGuns);

module.exports = router;
