const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");
const User = require("./../models/productModel");
const ApiError = require("../utils/ApiError");
const { v4: uuid4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const { uploadMixofImages } = require("../middlewares/uploadImage");

const storageMulter = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("not an image,only image allowed", 400), false);
  }
};

const upload = multer({ storage: storageMulter, fileFilter: multerFilter });

exports.uploadofImages = uploadMixofImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 3,
  },
]);

exports.reziseMixofImages = expressAsyncHandler(async (req, res, next) => {
  console.log(req.files);
  if (req.files.imageCover) {
    const imageCoverFilename = `product-${uuid4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFilename}`);
    req.body.imageCover = imageCoverFilename;
  }

  if (req.files.images) {
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (file, i) => {
        const imageFilename = `product-${uuid4()}-${Date.now()}-image-${
          i + 1
        }.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imageFilename}`);
        req.body.images.push(imageFilename);
      })
    );
    next();
  }
});

//All products
exports.getproducts = asyncHandler(async (req, res) => {
  // pagenation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  // attach pagenation
  const products = await productModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: products.length, page, data: products });
});

//product By ID
exports.getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.find(id);
  if (!product) {
    res.status(404).json({ msg: `No Product For the is id : ${id} ` });
  }
  res.status(200).json({ data: product });
});

//Create Product
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// Updateb Product
exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);

  const product = await productModel.findByOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    res.status(404).json({ msg: `No Product For the is id : ${id} ` });
  }
  res.status(200).json({ data: product });
});

//Delete Product
exports.deteleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    res.status(404).json({ msg: `No Product For the is id : ${id} ` });
  }
  res.status(204).send();
});
