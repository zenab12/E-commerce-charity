const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  //   const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ id: newUser._id }, "secret");

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
};
