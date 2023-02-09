const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator");

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
    .withMessage("too long username"),
  validatorMiddleware,
];

const updateUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({ min: 3 })
    .withMessage("user name is so short ")
    .isLength({ max: 20 })
    .withMessage("too long username"),
  validatorMiddleware,
];
const deleteUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({ min: 3 })
    .withMessage("user name is so short ")
    .isLength({ max: 20 })
    .withMessage("too long username"),
  validatorMiddleware,
];
module.exports = {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
};
