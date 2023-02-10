const expressAsyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const ApiError = require("../utils/ApiError");
const { v4: uuid4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const uploadSingleImg = require("../middlewares/uploadImage");

//upload image
const uploadUserImg = uploadSingleImg("profileImg");
//image processing
const resizeUserImg = expressAsyncHandler(async (req, res, next) => {
  const filename = `user-${uuid4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(300, 300)
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${filename}`);
  //save image in db
  req.body.profileImg = filename;
  next();
});

//@desc create user
//@route POST /users
//@access public
const createUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.create({
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });

  //another solution
  //   const user = new User({ name, email, password, gender, phone, address });
  //   user
  //     .save()
  //     .then((doc) => {
  //       res.json(doc);
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
});

//@desc get users
//@route GET /users
//@access admin
const getUsers = expressAsyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const users = await User.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
  //another solution
  //   const users = User.find({})
  //     .then((doc) => {
  //       res.json(doc);
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
  //   res.send(users);
});

//@desc get users
//@route GET /user
//@access admin
const getUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new ApiError(`User not found`, 404));
  } else {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
});

//@desc update user
//@route put /user
//@access admin,public
const updateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, profileImg, email, address, phone } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, phone, email, address, profileImg },
    { new: true }
  );
  if (!user) {
    return next(new ApiError(`User not found`, 404));
  } else {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
});

//@desc delete user
//@route put /user
//@access admin,public
const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id }, { new: true });
  if (!user) {
    return next(new ApiError(`User not found`, 404));
  } else {
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImg,
  resizeUserImg,
};
