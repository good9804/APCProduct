var express = require("express");
var router = express.Router();
const User = require("../models/user");
require("dotenv").config();

var firebase = require("firebase/compat/app");
require("firebase/compat/database");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
    const users = await User.findOne({ user_id: req.body.user_id });
    users.product_list.push({
      user_id: req.body.user_id,
      item: req.body.product.item,
      kind: req.body.product.kind,
      boxcolor: req.body.product.boxcolor,
      kg: req.body.product.kg,
      quantity: req.body.product.quantity,
      others: req.body.product.others,
    });

    var box_quantity = Math.ceil(
      (req.body.product.kg * req.body.product.quantity) / 30
    );

    var item = {
      user_id: req.body.user_id.toString(),
      box_quantity: box_quantity.toString(),
    };

    firebase.database().ref("/UserImport").push(item);

    await users.save();
    res.json({
      success: true,
      message: "Success!",
    });
  }
});

router.post("/api/import/view", async (req, res) => {
  try {
    var user_info;
    var product_list = [];
    if (req.body.login_user_role == 0) {
      user_info = await User.find({});
      user_info.forEach(function (item1) {
        item1["product_list"].forEach(function (item2) {
          let item3 = item2.toJSON();
          item3.user_id = item1.user_id;
          product_list.push(item3);
        });
      });
      res.json({ product_list: product_list });
    } else {
      user_info = await User.find({ user_id: req.body.user_id });
      await console.log(user_info);
      res.json({ product_list: user_info[0].product_list });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
