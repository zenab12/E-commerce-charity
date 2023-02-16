
const BrandModel = require("../models/brandModel");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { uploadSingleImg } = require("../middlewares/uploadImage");
const { v4: uuid4 } = require("uuid");
const factory=require('./handlersFactory');


//upload image
exports.uploadBrandImg = uploadSingleImg("image");
//image processing
exports.resizeBrandImg = expressAsyncHandler(async (req, res, next) => {
  const filename = `brand-${uuid4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(300, 300)
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);
  //save image in db
  req.body.image = filename;
  next();
});

const ApiError = require("../utils/ApiError");
const ApiFeature = require("../utils/apiFeatures");




//All Brands

exports.getBrands = factory.getAll(BrandModel);

//Brand By ID
exports.getBrand = factory.getOne(BrandModel);

//Create Brand
exports.createBrand = factory.createOne(BrandModel);

// Update Brand
exports.updateBrand = factory.updateOne(BrandModel);

//Delete Brand
exports.deteleBrand = factory.deleteOne(BrandModel);
