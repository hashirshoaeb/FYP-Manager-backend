const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
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
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not same",
    },
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
userSchema.pre("save", async function (next) {
  //only run this function if password was actually modify
  if (!this.isModified("password")) return next();
  //hash the psword with hash 12 encript
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = function (candidate, userPassword) {
  return bcrypt.compare(candidate, userPassword);
};
const User = mongoose.model("Users", userSchema);
module.exports = User;
