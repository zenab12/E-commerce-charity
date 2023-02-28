const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validator");
const User = require("../../models/userModel");

const ApiError = require("../ApiError");
const ApiFeature = require("../apiFeatures");

const getUserValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  validatorMiddleware,
];

const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({ min: 3 })
    .withMessage("user name is so short ")
    .isLength({ max: 20 })
    .withMessage("too long username")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email address is invalid")
    .custom(async (val, { req }) => {
      User.findOne({ email: val }).then((User) => {
        if (User) {
          return Promise.reject(new ApiError("email already exists",401));
          // return Promise.reject(new ApiError("email already exists",401));
        } else {
          return true;
        }
      });
    }),
  check("phone")
    .optional()
    .isMobilePhone([
      "ar-EG",
      "ar-JO",
      "ar-AE",
      "ar-BH",
      "ar-DZ",
      "ar-SA",
      "ar-LB",
      "ar-LY",
      "ar-OM",
      "ar-PS",
    ])
    .withMessage("invalid phone number accept only arabic countries numbers"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("min length for password is 6 "),
  check("profileImg").optional(),
  check("role").optional(),

  validatorMiddleware,
];

const updateUserValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  check("name")
    .isLength({ min: 3 })
    .withMessage("user name is so short ")
    .isLength({ max: 20 })
    .withMessage("too long username")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .isEmail()
    .withMessage("email address is invalid")
    .optional()
    .custom(async (val, { req }) => {
      User.findOne({ email: val }).then((User) => {
        if (User) {
          // return Promise.reject(new ApiError("email already exists",401));
          // return Promise.reject(new ApiError("email already exists",401));

          return new ApiError("email already exists",401);
        } else {
          return true;
        }
      });
    }),
    
  check("phone")
    .optional()
    .isMobilePhone([
      "ar-EG",
      "ar-JO",
      "ar-AE",
      "ar-BH",
      "ar-DZ",
      "ar-SA",
      "ar-LB",
      "ar-LY",
      "ar-OM",
      "ar-PS",
    ])
    .withMessage("invalid phone number accept only arabic countries numbers"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("min length for password is 6 ")
    .optional(),
  check("profileImg")
  .optional(),
  validatorMiddleware,
];
const deleteUserValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  validatorMiddleware,
];
module.exports = {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
};
