var express = require("express");
var router = express.Router();
const Order = require("../models/order");

router.post("/api/order/upload", async (req, res) => {
  if (
    req.body.order.order_item == "품목" ||
    req.body.order.order_quantity == "수량"
  ) {
    res.json({
      success: false,
      message: "Fill the form!",
    });
  } else {
    const new_orders = new Order({
      order_id: req.body.userid,
      order_number: req.body.userid + Math.floor(new Date().getTime() / 1000),
      order_item: req.body.order.order_item,
      order_quantity: req.body.order.order_quantity,
      order_price: req.body.order.order_price,
      order_status: 0,
      order_others: req.body.order.order_others,
    });
    await new_orders.save();
    res.json({
      success: true,
      message: "Success!",
    });
  }
});

router.post("/api/order/view", async (req, res) => {
  var orderList;
  if (req.body.loginUserRole == 0) {
    orderList = await Order.find({});
  } else {
    orderList = await Order.find({ userid: req.body.userid });
  }
  res.json({ orderList: orderList });
});

module.exports = router;
