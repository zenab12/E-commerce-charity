const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuid4 } = require("uuid");

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
//All Categories
exports.getCategories = asyncHandler(async (req, res) => {
  // pagenation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  // attach pagenation
  const categorires = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categorires.length, page, data: categorires });
});

//Category By ID
exports.getCaterogy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.find(id);
  if (!category) {
    res.status(404).json({ msg: `No Category For the is id : ${id} ` });
  }
  res.status(200).json({ data: category });
});

//Create Category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// Update Category
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findByOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    res.status(404).json({ msg: `No Category For the is id : ${id} ` });
  }
  res.status(200).json({ data: category });
});

//Delete Category
exports.deteleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    res.status(404).json({ msg: `No Category For the is id : ${id} ` });
  }
  res.status(204).send();
});
