const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username must not be empty"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "a email is required "],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "a password is required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "a passwordConfirm is required"],
    validate: {
      //this only works on create and save!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not same!",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
