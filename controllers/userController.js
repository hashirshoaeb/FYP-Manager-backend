const User = require("./../modals/userModel");
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(500).json({ status: "success", data: { users } });
};
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.
      status(500).json({
        status: "sccuess",
        data: { newUser },
      });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { err },
    });
  }
};

exports.getUser = async (req, res) => {
  let query = await User.findById(req.params.id);

  res.status(500).json({
    status: "success",
    data: { query },
  });
};
exports.updateUser = (req, res) => {
  // const id = req.params.id * 1;
  // const user = users.find((el) => el.id === id);
  // res.status(500).json({
  //   status: "delete",
  //   data: { user },
  // });
};

exports.deleteUser = (req, res) => {
  // console.log(req.params.id);
  // const id = req.params.id * 1;
  // const user = users.find((el) => el.id === id);
  // res.status(500).json({
  //   status: "sccuess",
  //   data: { user },
  // });
};
