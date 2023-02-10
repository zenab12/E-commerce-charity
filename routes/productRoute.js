const express = require('express');

const {createProductValidator,
    getProductValidator,
    updateProductValidator,
    deteleProductValidator}
    =require('../utils/validators/productValidator');

const {getproducts,
       getProduct,
       createProduct,
       updateProduct,
       deteleProduct}
       =require('../controllers/productServices');

const router = express.Router();

router.route('/')
      .get(getproducts)
      .post(createProductValidator,createProduct);

router.route('/:id')
      .get(getProductValidator,getProduct)
      .put(updateProductValidator,updateProduct)
      .delete(deteleProductValidator,deteleProduct);


module.exports=router;

