const expressAsyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const ApiError = require("../utils/ApiError");
const { v4: uuid4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");

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
const uploadSingleImg = (fieldName) => {
  const storageMulter = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("not an image,only image allowed", 400), false);
    }
  };

  const upload = multer({ storage: storageMulter, fileFilter: multerFilter });

  return upload.single(fieldName);
};

module.exports = uploadSingleImg;
