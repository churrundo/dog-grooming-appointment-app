const express = require("express");
const Pet = require("../models/Pet.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/add-pet", (req, res, next) => {
  res.render("pets/add-pet");
});

router.post("/add", async (req, res, next) => {
  console.log("req.body: ", req.body);
  const { name, petType, petBreed } = req.body;
  const { _id: userId } = req.session.currentUser;

  const newPet = await Pet.create({ name, petType, petBreed });

  await User.findByIdAndUpdate(
    userId,
    { $push: { pets: newPet._id } },
    { new: true }
  );

  res.redirect(`/user/profile`);
});

module.exports = router;
