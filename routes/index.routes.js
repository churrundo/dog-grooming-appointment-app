const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const Calendar = require("../models/Calendar.model");
const Day = require("../models/Day.model");
const createCalendar = require("../utils/create-calendar");
const User = require("../models/User.model");
const Appointment = require('../models/Appointment.model')

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

router.get("/profile", isLoggedIn, async (req, res, next) => {
  const user = req.session.currentUser;
  if (user.role === "Admin") {
    const calendarData = await Calendar.findOne({ userId: user._id })
      .populate("userId")
      .populate({
        path: 'days', 
        populate: { 
           path: 'appointments', 
           model: 'Appointment'
       }
      });
      
    const calendar = createCalendar(calendarData);
    res.render("profile", { user, rows: calendar.rows });
  } else {
    res.render("profile", { user });
  }
});

module.exports = router;
