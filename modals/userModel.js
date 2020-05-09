const mongoose = require("mongoose");
//const validator = require("validator");
// const bcrypt = require("bcrypt");
// const crypto = require("crypto");
const useSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
    //validate: [validator.isEmail, "please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please provide us password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["student", "supervisor", "admin"],
    default: "student",
  },
  passwordConfirm: {
    type: String,
    required: [true, "plz confirm your password"],
    // validate: {
    //   validator: function (el) {
    //     return el === this.password;
    //   },
    //   message: "passwords are not same",
    // },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  bio: String,
  qualification: String,
  catagory: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
const User = mongoose.model("Users", useSchema);
module.exports = User;
