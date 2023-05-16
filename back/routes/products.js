var express = require("express");
var router = express.Router();
const Product = require("../models/product");

router.post("/api/register", async (req, res) => {
  try {
    const new_products = new Product({
      product_number: Math.floor(new Date().getTime() / 1000),
      product_item: req.body.product_item,
      product_detail: req.body.product_detail,
      product_price: req.body.product_price,
      product_made: req.body.product_made,
      product_image: req.files.file.data,
    });
    await new_products.save();
    res.json({ message: "success" });
  } catch {
    res.json({ message: "fail" });
  }
});

router.get("/api/view", async (req, res) => {
  try {
    const productList = await Product.find({});
    res.json({ productList: productList, message: "success" });
  } catch {
    res.json({ message: "fail" });
  }
});

router.post("/api/detail/view", async (req, res) => {
  try {
    const product_info = await Product.findOne({
      product_number: req.body.product_number,
    });
    res.json({ product_info: product_info, message: "success" });
  } catch {
    res.json({ message: "fail" });
  }
});

router.get("/api/admin/view", async (req, res) => {
  try {
    var productList = [];
    const productLists = await Product.find({});
    await productLists.forEach(async (element) => {
      await productList.push({
        product_item: element["product_item"],
        product_detail: element["product_detail"],
      });
    });
    res.json({ productList: productList, message: "success" });
  } catch {
    res.json({ message: "fail" });
  }
});

router.post("/api/delete", async (req, res) => {
  try {
    var productList = [];
    await Product.deleteOne({
      product_item: req.body.product_item,
      product_detail: req.body.product_detail,
    });
    const productLists = await Product.find({});
    await productLists.forEach(async (element) => {
      await productList.push({
        product_item: element["product_item"],
        product_detail: element["product_detail"],
      });
    });
    res.send(productList);
  } catch (err) {
    console.log(1);
    res.send(err);
  }
});

router.post("/api/upload/review", async (req, res) => {
  try {
    const product = await Product.findOne({
      product_number: req.body.product_number,
    });
    await product.review_list.push({
      review_title: req.body.review.review_title,
      review_item: req.body.review.review_item,
      review_content: req.body.review.review_content,
      review_quantity: req.body.review.review_quantity,
      review_user_id: req.body.review.review_user_id,
      review_order_date: req.body.review.review_order_date,
    });

    await product.save();
    res.json({ message: "success" });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
