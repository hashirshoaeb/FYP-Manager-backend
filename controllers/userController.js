const fs = require("fs");

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

exports.getAllUsers = (req, res) => {
  res.status(500).json({ status: "success", data: { users } });
};
exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;

  const Newuser = Object.assign({ id: newId }, req.body);
  users.push(Newuser);
  res.status(500).json({
    status: "sccuess",
    data: { Newuser },
  });
};

exports.getUser = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  res.status(500).json({
    status: "success",
    data: { user },
  });
};
exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  res.status(500).json({
    status: "delete",
    data: { user },
  });
};

exports.deleteUser = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  res.status(500).json({
    status: "sccuess",
    data: { user },
  });
};
