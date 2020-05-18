const User = require("./../modals/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  res.status(200).json({ status: "success", token, data: { user: newUser } });
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1)check if passord is exist
  if (!email || !password) {
    return next("provide password");
  }
  //2)check if user exist && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next("incorrect email or password");
  }
  //3)if every ok
  const token = signToken(user._id);
  res.status(200).json({ status: "success", token, data: { user } });
};
