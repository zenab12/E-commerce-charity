const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const ValidatorMiddleware = require("../../middlewares/validator");
const CategoryModel = require("../../models/categoryModel");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Product title should be more than 3 characters ")
    .notEmpty()
    .withMessage("Product title is required")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),

  check("description")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ max: 2000 })
    .withMessage("too long description"),

  // check("quantity")
  //   .notEmpty()
  //   .withMessage("Product quantity is required")
  //   .isNumeric()
  //   .withMessage("Product quantity Must Be a Number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity Must Be a Number"),

  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price Must Be a Number")
    .isLength({ max: 500 })
    .withMessage("too long price"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount Must Be a Number")
    .isFloat()
    .custom((value, { req }) => {
      if (req.body.price < value) {
        throw "priceAfterDiscount must be  lower than price";
      }
      return true;
    }),

  // check("imageCover").notEmpty().withMessage("Product imageCover is required").optional(),
  check("imageCover").optional(),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid ID Formate"),

  // check("brand")
  //   .notEmpty()
  //   .withMessage("Product brand is required")
  //   .isMongoId()
  //   .withMessage("Invalid ID Formate"),

  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingAverage Must Be a Number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5"),

  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid ID Formate")
    .custom((categoryid) =>
      CategoryModel.findById(categoryid).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category For this id: ${categoryid}`)
          );
        }
      })
    ),

  ValidatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID Formate"),

  // check("ratingAverage")
  //   .optional()
  //   .isNumeric()
  //   .withMessage("ratingAverage Must Be a Number")
  //   .isLength({ min: 1 })
  //   .withMessage("Rating must be above or equal 1")
  //   .isLength({ max: 5 })
  //   .withMessage("Rating must be below or equal 5"),
  ValidatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID Formate"),
  check("title")
    .isLength({ min: 3 })
    .withMessage("Product title should be more than 3 characters ")
    .optional(),

  check("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("too long description"),

  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("Product quantity Must Be a Number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity Must Be a Number"),

  check("price")
    .optional()
    .isNumeric()
    .withMessage("Product price Must Be a Number")
    .isLength({ max: 500 })
    .withMessage("too long price"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount Must Be a Number")
    .isFloat()
    .custom((value, { req }) => {
      if (req.body.price < value) {
        throw "priceAfterDiscount must be  lower than price";
      }
      return true;
    }),
  check("imageCover").optional(),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  check("category").optional().isMongoId().withMessage("Invalid ID Formate"),

  check("brand").optional().isMongoId().withMessage("Invalid ID Formate"),

  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingAverage Must Be a Number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5"),
  ValidatorMiddleware,
];

exports.deteleProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID Formate"),
  ValidatorMiddleware,
];
