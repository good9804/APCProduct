var express = require("express");
var router = express.Router();
const Product = require("../models/product");

router.post("/api/register", async (req, res) => {
  try {
    const new_products = new Product({
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

router.get("/api/product/view", async (req, res) => {
  try {
    const productList = await Product.find({});
    res.json({ productList: productList, message: "success" });
  } catch {
    res.json({ message: "fail" });
  }
});

router.get("/api/product/admin/view", async (req, res) => {
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

router.post("/api/product/delete", async (req, res) => {
  //유저 삭제
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

module.exports = router;
