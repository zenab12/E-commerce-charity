const User = require("./../models/userModel");

exports.getUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      user: users,
    },
  });
};

exports.getUserbyId = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
