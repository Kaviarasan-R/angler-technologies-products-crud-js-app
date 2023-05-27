const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const addProduct = require("../controllers/products/addProduct");
const updateProduct = require("../controllers/products/updateProduct");
const deleteProduct = require("../controllers/products/deleteProduct");
const {
  getProduct,
  searchProduct,
} = require("../controllers/products/getProduct");

const protect = require("../middleware/protectRoutes");

router
  .get("/get-product", protect, getProduct)
  .get("/search-product", protect, searchProduct)
  .post("/add-product", protect, upload.single("image"), addProduct)
  .put("/update-product", protect, upload.single("image"), updateProduct)
  .delete("/delete-product/:id", protect, deleteProduct);

module.exports = router;
