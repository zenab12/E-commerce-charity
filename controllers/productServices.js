const productModel = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");
const User = require("./../models/productModel");
const ApiError = require("../utils/ApiError");
const { v4: uuid4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const { uploadMixofImages } = require("../middlewares/uploadImage");


const ApiFeature = require("../utils/apiFeatures");

const storageMulter = multer.memoryStorage();

const factory = require("./handlersFactory");



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

exports.getproducts = factory.getAll(productModel,'productModel');

//product By ID
exports.getProduct = factory.getOne(productModel);

//Create Product
exports.createProduct = factory.createOne(productModel);

// Updateb Product
exports.updateProduct = factory.updateOne(productModel);

//Delete Product
exports.deteleProduct = factory.deleteOne(productModel);
