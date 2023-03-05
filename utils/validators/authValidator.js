const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validator");
const User = require("../../models/userModel");
const ApiError = require("../ApiError");

exports.signupValidator = [
    check('name')
        .notEmpty()
        .withMessage('User required')
        .isLength({ min: 3 })
        .withMessage('Too short User name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
            User.findOne({ email: val }).then((user) => {
                if (user) {
                    return Promise.reject(new ApiError('E-mail already exist', 401));
                }
            })
        ),

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
    // check("profileImg").optional(),
    // check("role").optional(),


    // check('password')
    //     .notEmpty()
    //     .withMessage('Password required')
    //     .isLength({ min: 6 })
    //     .withMessage('Password must be at least 6 characters')
    //     .custom((password, { req }) => {
    //         if (password !== req.body.passwordConfirm) {
    //             throw new Error('Password Confirmation incorrect');
    //         }
    //         return true;
    //     }),

    // check('passwordConfirm')
    //     .notEmpty()
    //     .withMessage('Password confirmation required'),

    validatorMiddleware,
];




exports.loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address'),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
];
