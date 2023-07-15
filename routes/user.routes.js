const express = require("express");
const router = express.Router();

const createCalendar = require("../utils/generate-calendar");
const User = require("../models/User.model");
const Appointment = require("../models/Appointment.model");
const Calendar = require("../models/Calendar.model");
const Day = require("../models/Day.model");
const Pet = require("../models/Pet.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");

router.get("/profile", isLoggedIn, async (req, res, next) => {
  const user = req.session.currentUser;
  
  if (user.role === "Admin") {
    const calendarData = await Calendar.findOne({ userId: user._id })
      .populate("userId")
      .populate({
        path: "days",
        populate: {
          path: "appointments",
          model: "Appointment",
        },
      });

    const calendar = createCalendar(calendarData);
    res.render("profile", { user, rows: calendar.rows });
  } else {
    console.log(user);
    const populatedUser = await User.findById(user._id).populate("pets");
    res.render("profile", { user: populatedUser, isAdmin });
  }
});

router.get("/appointment-created", (req, res, next) => {
  res.render("appointment-created");
});

module.exports = router;
