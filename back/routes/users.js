var express = require("express");
var router = express.Router();
const User = require("../models/user");

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
    const users = await User.findOne({ userid: req.body.userid });
    users.productList.push({
      userid: req.body.userid,
      item: req.body.product.item,
      kind: req.body.product.kind,
      boxcolor: req.body.product.boxcolor,
      kg: req.body.product.kg,
      quantity: req.body.product.quantity,
      others: req.body.product.others,
    });
    await users.save();
    res.json({
      success: true,
      message: "Success!",
    });
  }
});

router.post("/api/view", async (req, res) => {
  var userinfo;
  var productList = [];
  if (req.body.loginUserRole == 0) {
    userinfo = await User.find({});
    userinfo.forEach(function (item, index, arr2) {
      item["productList"].forEach(function (item, index, arr3) {
        productList.push(item);
      });
    });
    res.json({ productList: productList });
  } else {
    userinfo = await User.find({ userid: req.body.userid });
    console.log(userinfo, userinfo[0].productList);
    res.json({ productList: userinfo[0].productList });
  }
});

module.exports = router;
