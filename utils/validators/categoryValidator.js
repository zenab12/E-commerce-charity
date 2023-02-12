const slugify = require("slugify");
const { check, body } = require("express-validator");

const ValidatorMiddleware = require("../../middlewares/validator");

exports.getCaterogyValidator = [
  check("id").isMongoId().withMessage("Invalid ID Formate"),
  ValidatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("category Name should be more than 3 characters ")
    .isLength({ max: 30 })
    .withMessage("category Name should be more than 30 characters "),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  check("image")
    .optional()
    .custom((value, { req }) => {
      return true;
    }),

  ValidatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID Formate"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("image").optional(),
  ValidatorMiddleware,
];

exports.deteleCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID Formate"),
  ValidatorMiddleware,
];
