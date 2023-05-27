const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  url: String,
  filename: String,
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    code: {
      type: String,
      required: [true],
      unique: [true],
    },
    category: {
      type: String,
      required: [true],
    },
    image: {
      type: ImageSchema,
      required: [true],
    },
    description: {
      type: String,
      required: [true],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
