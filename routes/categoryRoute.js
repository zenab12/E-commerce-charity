const express = require('express');

const {getCaterogyValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deteleCategoryValidator}
    =require('../utils/validators/categoryValidator');

const {getCategories,
       getCaterogy,
       createCategory,
       updateCategory,
       deteleCategory}
       =require('../controllers/categoryService');

const router = express.Router();

router.route('/')
      .get(getCategories)
      .post(createCategoryValidator,createCategory);

router.route('/:id')
      .get(getCaterogyValidator,getCaterogy)
      .put(updateCategoryValidator,updateCategory)
      .delete(deteleCategoryValidator,deteleCategory);


module.exports=router;

