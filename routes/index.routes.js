const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const isLoggedIn = require('../middleware/isLoggedIn');
const Calendar = require('../models/Calendar.model');
const Day = require('../models/Day.model');
const calendar = require('../utils/create-calendar');


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/profile', isLoggedIn, async (req, res, next) => {
  const user = req.user;
  if (user.role === "Admin") {
      const calendarData = await Calendar.findOne({ userId: user._id })
      .populate('userId')
      .populate({
           path: 'days'
      })

      const calendar = createCalendar(calendarData)
      res.redirect('dashboard', { rows: calendar.rows });
  } else {
      res.render('profile', { user });
  }
});

module.exports = router