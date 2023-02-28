const express = require("express");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deteleBrandValidator,
} = require("../utils/validators/brandValidator"); //'../utils/validators/categoryValidator'

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deteleBrand,
  uploadBrandImg,
  resizeBrandImg,
} = require("../controllers/brandService");


const { protect, authorize } = require("../middlewares/auth")

const router = express.Router();

router
  .route("/")
  .get(protect, getBrands)
  .post(
    uploadBrandImg,
    resizeBrandImg,
    (req, res, next) => {
      console.log(req.file);
      console.log(req.body);
      next();
    },
    createBrandValidator,
    createBrand
  );

router
  .route("/:id")
  .get(protect, getBrandValidator, getBrand)
  .put(protect, authorize('admin'), uploadBrandImg, resizeBrandImg, updateBrandValidator, updateBrand)
  .delete(protect, authorize('admin'), deteleBrandValidator, deteleBrand);

module.exports = router;
