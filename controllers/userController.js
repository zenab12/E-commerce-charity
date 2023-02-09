const expressAsyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const ApiError = require("../utils/ApiError");
const { v4: uuid4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp/lib/sharp");
// import sharp from "sharp";
// const storageMulter = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/users");
//   },
//   filename: function (req, file, cb) {
//     const extension = file.mimetype.split("/")[1];
//     const filename = `user-${uuid4()}-${Date.now()}.${extension}`;
//     cb(null, filename);
//   },
// });

//memory storage for files
const storageMulter = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("not an image,only image allowed", 400), false);
  }
};

const resizeUserImg = (req, res, next) => {
  const filename = `user-${uuid4()}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(600, 600)
    .toForamt("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${filename}`)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  console.log(req.file);
  next();
};
const upload = multer({ storage: storageMulter, fileFilter: multerFilter });

const uploadUserImg = upload.single("profileImg");
//@desc create user
//@route POST /users
//@access public
const createUser = expressAsyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const address = req.body.address;
  const user = await User.create({
    name,
    email,
    password,
    gender,
    phone,
    address,
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
  const name = req.body.name;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, phone, password, address },
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
