const express = require('express');
const router = express.Router();

const User = require('../models/User.model');

router.get('/profile', async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id);
    res.render('user/profile', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/appointment-created', (req, res, next) => {
  res.render('appointment-created')
})

module.exports = router;