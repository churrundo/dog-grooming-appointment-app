const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  /*const adminsList = User.find({ role: "Admin" });
  const adminCalendars = adminsList.map((admin) => {
    return Calendar.findOne({ userId: admin._id }).populate("userId").populate({
      path: "days",
    });
  });*/
  res.render("index");
});



module.exports = router;
