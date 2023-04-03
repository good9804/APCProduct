const mongoose = require("mongoose");

// Define Schemes
const productSchema = new mongoose.Schema(
  {
    userid: { type: String },
    item: { type: String },
    kind: { type: String },
    boxcolor: { type: String },
    kg: { type: Number },
    quantity: { type: Number },
    others: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Product", productSchema);
