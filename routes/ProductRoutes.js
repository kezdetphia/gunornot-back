const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Register a new user
router.post("/addproduct", ProductController.createProduct);

router.get("/getproducts", ProductController.getProducts);

router.post("/updatevotes", ProductController.updateVotes);

router.post("/getmyproducts", ProductController.getMyProducts); //this is post because we are sending an array of product ids

// router.get("/getuserwithguns/:id", UserController.getUserWithGuns);

module.exports = router;
