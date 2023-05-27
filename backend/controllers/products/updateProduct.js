const asynchandler = require("express-async-handler");
const Product = require("../../models/product");
const { cloudinary } = require("../../config/cloudinary");

// Update by id
const updateProduct = asynchandler(async (req, res) => {
  const { name, id, category, description } = req.body;
  let updatedProduct = null;
  const matches = await Product.findById(id);
  if (!req.file && matches.author.toString() === req.user._id.toString()) {
    updatedProduct = await Product.findByIdAndUpdate(id, {
      name: name,
      category: category,
      description: description,
    });
  } else if (
    req.file &&
    matches.author.toString() === req.user._id.toString()
  ) {
    const result = await cloudinary.uploader.upload(req.file.path);
    updatedProduct = await Product.findByIdAndUpdate(id, {
      name: name,
      category: category,
      image: { filename: result.original_filename, url: result.url },
      description: description,
    });
  }
  if (updatedProduct) {
    res.status(200).json({
      message: "Product updated successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

module.exports = updateProduct;
