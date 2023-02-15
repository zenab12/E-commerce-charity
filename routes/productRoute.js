const express = require("express");

const { protect, authorize } = require('../middlewares/auth');

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deteleProductValidator,
} = require("../utils/validators/productValidator");

const {
  getproducts,
  getProduct,
  createProduct,
  updateProduct,
  deteleProduct,
  uploadofImages,
  reziseMixofImages,
} = require("../controllers/productServices");

const router = express.Router();

router
  .route("/")
  .get(getproducts)
  .post(
    uploadofImages,
    reziseMixofImages,
    (req, res, next) => {
      console.log(req.file);
      console.log(req.body);
      next();
    },
    createProductValidator,
    protect,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(uploadofImages, updateProductValidator, updateProduct)
  .delete(deteleProductValidator, deteleProduct);

module.exports = router;
