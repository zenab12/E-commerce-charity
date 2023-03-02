const express = require("express");
var cors = require('cors')
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
router.use(cors())

router
  .route("/")
  .get(getproducts)
  .post(protect, authorize("admin"),
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
  .get(protect, getProductValidator, getProduct)
  .put(protect, authorize("admin"), uploadofImages, updateProductValidator, updateProduct)
  .delete(protect, authorize("admin"), protect, deteleProductValidator, deteleProduct);

module.exports = router;
