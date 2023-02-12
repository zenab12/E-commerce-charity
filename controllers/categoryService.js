const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuid4 } = require("uuid");


const ApiError = require('../utils/ApiError');

const ApiFeature = require('../utils/apiFeatures');



const factory=require('./handlersFactory');


//All Categories
exports.getCategories =factory.getAll(CategoryModel);


//Category By ID
exports.getCaterogy=factory.getOne(CategoryModel);

//Create Category 
exports.createCategory = factory.createOne(CategoryModel);


// Update Category
exports.updateCategory=factory.updateOne(CategoryModel);


//Delete Category
exports.deteleCategory=factory.deleteOne(CategoryModel);


const { uploadSingleImg } = require("../middlewares/uploadImage");

//upload image
exports.uploadUserImg = uploadSingleImg("image");
//image processing
exports.resizeUserImg = expressAsyncHandler(async (req, res, next) => {
  const filename = `user-${uuid4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(300, 300)
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${filename}`);
  //save image in db
  req.body.profileImg = filename;
  next();
});
