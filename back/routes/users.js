var express = require("express");
var router = express.Router();
const User = require("../models/user");

router.post("/api/import/upload", async (req, res) => {
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

router.post("/api/import/view", async (req, res) => {
  var userinfo;
  var productList = [];
  if (req.body.loginUserRole == 0) {
    userinfo = await User.find({});
    userinfo.forEach(function (item1) {
      item1["productList"].forEach(function (item2) {
        let item3 = item2.toJSON();
        item3.userid = item1.userid;
        productList.push(item3);
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
