const Product = require("../../models/product");
const asynchandler = require("express-async-handler");
const limit = 8;

const getProduct = asynchandler(async (req, res) => {
  const page = req.query.page;
  const sort = req.query.sort ? req.query.sort : 1;
  const category = req.query.category;
  let query = {};
  if (category) {
    // query = { category: category };
    query = { category: { $regex: new RegExp(category, "i") } }; // Case-insensitive search using regex
  }
  const result = await Product.find(query)
    .sort({ updatedAt: sort })
    .skip((page - 1) * limit)
    .limit(limit);
  if (result) {
    console.log("Get products called.");
    res.status(200).json(result);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const searchProduct = asynchandler(async (req, res) => {
  const page = req.query.page;
  const search = req.query.search;
  const result = await Product.find({ name: { $regex: search, $options: "i" } })
    .skip((page - 1) * limit)
    .limit(limit);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});
module.exports = { getProduct, searchProduct };
