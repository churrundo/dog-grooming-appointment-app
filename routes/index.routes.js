const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');



/* GET home page */
router.get("/", isLoggedIn, async (req, res, next) => {
  console.log(req.session.currentUser);
  const user = req.session.currentUser
  res.render("index", { user });  
});



module.exports = router;
