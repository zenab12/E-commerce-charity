const {check} =require('express-validator');

const ValidatorMiddleware =require('../../middlewares/validator');

exports.getBrandValidator=[
    check('id')
    .isMongoId()
    .withMessage('Invalid ID Formate'),
    ValidatorMiddleware,
];

exports.createBrandValidator=[
    check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({min : 3})
    .withMessage('Brand title should be more than 3 characters ')
    .isLength({max : 30})
    .withMessage('Brand title should be more than 30 characters '),
    ValidatorMiddleware,
];

exports.updateBrandValidator=[
    check('id')
    .isMongoId()
    .withMessage('Invalid Brand ID Formate'),
    ValidatorMiddleware,
];

exports.deteleBrandValidator=[
    check('id')
    .isMongoId()
    .withMessage('Invalid Brand ID Formate'),
    ValidatorMiddleware,
];