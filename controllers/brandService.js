const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler');
const BrandModel = require('../models/brandModel');

const ApiError = require('../utils/ApiError');
const ApiFeature = require('../utils/apiFeatures');


const factory=require('./handlersFactory');


//All Brands
exports.getBrands = factory.getAll(BrandModel);


//Brand By ID
exports.getBrand=factory.getOne(BrandModel);


//Create Brand 
exports.createBrand = factory.createOne(BrandModel);


// Update Brand
exports.updateBrand=factory.updateOne(BrandModel);


//Delete Brand
exports.deteleBrand=factory.deleteOne(BrandModel);


