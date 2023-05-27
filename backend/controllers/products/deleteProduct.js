const asynchandler = require("express-async-handler");
const Product = require("../../models/product");

// Delete by id using path parameter
const deleteProduct = asynchandler(async (req, res) => {
  const id = req.params.id;
  const result = await Product.findByIdAndDelete(id);
  if (result) {
    res.status(200);
    res.json({
      message: "Successfully deleted.",
    });
  } else {
    res.status(400);
    throw new Error("Please provide correct ID");
  }
});

module.exports = deleteProduct;
