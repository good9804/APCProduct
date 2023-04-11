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
    const find_orders = await Order.findOne({
      order_number: req.body.userid + Math.floor(new Date().getTime() / 1000),
    });
    if (find_orders) {
      res.json({
        success: false,
        message: "잠시후 시도하세요",
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

router.get("/api/order/view/decline", async (req, res) => {
  try {
    const orderList = await Order.find({ order_request_cancel: true });
    res.json({ orderList: orderList });
  } catch (err) {
    res.json({ orderList: [] });
  }
});

router.post("/api/order/decline", async (req, res) => {
  await Order.findOneAndUpdate(
    { order_number: req.body.orderinfo.order_number },
    { order_request_cancel: true }
  );
  res.json({
    success: true,
    message: "취소 신청 신청완료!",
  });
});

router.post("/api/order/decline/approve", async (req, res) => {
  try {
    await Order.deleteOne({
      order_number: req.body.order.order_number,
    });
    const orderList = await Order.find({ order_request_cancel: true });
    res.json({ orderList: orderList });
  } catch (err) {
    res.json({ orderList: [] });
  }
});

module.exports = router;
