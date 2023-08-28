var express = require("express");
var router = express.Router();
const Sort = require("../models/sortsample");

router.get("/api/statistics/view", async (req, res) => {
    try {
        console.log("statics");

        const uniqueUsercodes = await Sort.distinct('usercode');
      
      res.json({
        success:true,
         message: "조회가 완료되었습니다.", user_info: uniqueUsercodes });
    } catch (err) {
      success: false,
      res.send(err);
    }
  });

  router.post("/api/statistics/select", async (req, res) => {
    try {
        console.log("req"+req.body.usercode);
        
        const documents = await Sort.find({usercode:req.body.usercode});
        let total=0;
        documents.forEach(doc => {
          console.log(doc);
          console.log(doc.get('price'));
          const price = parseFloat(doc.get('price'));
          const quantity = parseFloat(doc.get('price'));
          console.log("pri"+price);
          total += price*quantity;
        });
        console.log(total);
      
      res.json({
        success:true,
         message: "조회가 완료되었습니다.", totalPrice: total });
    } catch (err) {
      success: false,
      res.send(err);
    }
  });
  module.exports = router;