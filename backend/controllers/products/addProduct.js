const asynchandler = require("express-async-handler");
const Product = require("../../models/product");
const { cloudinary } = require("../../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

const addProduct = asynchandler(async (req, res) => {
  if (!req.file.path) {
    res.status(400);
    throw new Error("Please provide image");
  }

  const result = await cloudinary.uploader.upload(req.file.path);
  const { name, category, description } = req.body;

  if (!name || !category || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const code = uuidv4();

  const product = Product.create({
    name: name,
    code: code,
    category: category,
    image: { filename: result.original_filename, url: result.url },
    description: description,
    author: req.user._id,
  });

  if (product) {
    res.status(201).json({
      message: "Product added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

module.exports = addProduct;
