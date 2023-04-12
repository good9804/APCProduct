var express = require("express");
var router = express.Router();
const Counsel = require("../models/counsel");

router.post("/api/counsel/upload", async (req, res) => {
  if (
    req.body.counsel.counsel_item == "대분류" ||
    req.body.counsel.counsel_title == "제목" ||
    req.body.counsel.counsel_content == "내용"
  ) {
    res.json({
      success: false,
      message: "Fill the form!",
    });
  } else {
    const new_counsel = new Counsel({
      counsel_id: req.body.userid,
      counsel_item: req.body.counsel.counsel_item,
      counsel_title: req.body.counsel.counsel_title,
      counsel_content: req.body.counsel.counsel_content,
    });
    await new_counsel.save();
    res.json({
      success: true,
      message: "Success!",
    });
  }
});

router.post("/api/counsel/view", async (req, res) => {
  var counselList;
  if (req.body.loginUserRole == 0) {
    counselList = await Counsel.find({ counsel_check: false });
  } else {
    counselList = await Counsel.find({
      counsel_id: req.body.userid,
    });
  }
  res.json({ counselList: counselList });
});

router.post("/api/counsel/check", async (req, res) => {
  await Counsel.findOneAndUpdate(
    {
      counsel_id: req.body.userid,
      counsel_title: req.body.counselinfo.counsel_title,
      counsel_check: false,
    },
    { counsel_check: true }
  );
  if (req.body.loginUserRole == 0) {
    counselList = await Counsel.find({ counsel_check: false });
  } else {
    counselList = await Counsel.find({
      counsel_id: req.body.userid,
    });
  }
  res.json({ counselList: counselList });
});
module.exports = router;
