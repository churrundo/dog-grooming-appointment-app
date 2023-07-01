// TODO: Please make sure you edit the User model to whatever makes sense in this case
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/}
});


const User = mongoose.model('User', userSchema);

module.exports = User;