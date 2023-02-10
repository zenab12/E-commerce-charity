const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler')
const productModel = require('../models/productModel');

const factory=require('../utils/factory');

//All products
exports.getproducts = factory.getAll(productModel);


//product By ID
exports.getProduct= factory.getOne(productModel);


//Create Product 
exports.createProduct =factory.createOne(productModel);


// Updateb Product
exports.updateProduct=factory.updateOne(productModel);


//Delete Product
exports.deteleProduct= factory.deleteOne(productModel);


