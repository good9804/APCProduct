const mongoose = require("mongoose");

// Define Schemes
const productSchema = new mongoose.Schema(
  {
    product_item: { type: String },
    product_detail: { type: String },
    product_price: { type: Number },
    product_made: { type: String },
    product_image: { type: Buffer },
    product_others: { type: String, default: "" },
    product_quantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Product", productSchema);
