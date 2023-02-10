const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler')
const CategoryModel = require('../models/categoryModel');

const factory=require('../utils/factory');

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

