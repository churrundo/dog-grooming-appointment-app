// TODO: Please make sure you edit the User model to whatever makes sense in this case
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pet = require("./Pet.model.js");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    pets: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Pet" 
    }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
