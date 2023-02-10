const express = require('express');

const {getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deteleBrandValidator}
    =require('../utils/validators/brandValidator'); //'../utils/validators/categoryValidator'

const {getBrands,
       getBrand,
       createBrand,
       updateBrand,
       deteleBrand}
       =require('../controllers/brandService');

const router = express.Router();

router.route('/')
      .get(getBrands)
      .post(createBrandValidator,createBrand);

router.route('/:id')
      .get(getBrandValidator,getBrand)
      .put(updateBrandValidator,updateBrand)
      .delete(deteleBrandValidator,deteleBrand);


module.exports=router;
