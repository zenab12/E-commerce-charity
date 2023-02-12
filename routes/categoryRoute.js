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
       deteleCategory,
      uploadUserImg,
      resizeUserImg}
       =require('../controllers/categoryService');

const router = express.Router();

router.route('/')
      .get(getCategories)
      .post(uploadUserImg,resizeUserImg,createCategoryValidator,createCategory);

router.route('/:id')
      .get(getCaterogyValidator,getCaterogy)
      .put(updateCategoryValidator,uploadUserImg,resizeUserImg,updateCategory)
      .delete(deteleCategoryValidator,deteleCategory);


module.exports=router;

