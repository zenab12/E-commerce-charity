const express = require("express");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deteleBrandValidator,
} = require("../utils/validators/brandValidator");

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
  .get(getBrands)
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
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImg, resizeBrandImg, updateBrandValidator, updateBrand)
  .delete(deteleBrandValidator, deteleBrand);

module.exports = router;

