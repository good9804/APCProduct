var express = require("express");
var router = express.Router();
const Product = require("../models/product");

router.post("/api/upload", async (req, res) => {
  if (
    req.body.product.item == "품목" ||
    req.body.product.kind == "품종" ||
    req.body.product.boxcolor == "색상"
  ) {
    res.json({
      success: false,
      message: "Fill the form!",
    });
  } else {
    const new_product = new Product({
      userid: req.body.userid,
      item: req.body.product.item,
      kind: req.body.product.kind,
      boxcolor: req.body.product.boxcolor,
      kg: req.body.product.kg,
      quantity: req.body.product.quantity,
      others: req.body.product.others,
    });
    await new_product.save();
    res.json({
      success: true,
      message: "Success!",
    });
  }
});

router.post("/api/view", async (req, res) => {
  var productList;
  if (req.body.loginUserRole == 0) {
    productList = await Product.find({});
  } else {
    productList = await Product.find({ userid: req.body.userid });
  }
  res.json({ productList: productList });
});

module.exports = router;
