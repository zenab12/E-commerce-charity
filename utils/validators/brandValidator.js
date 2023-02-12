const {check,body} =require('express-validator');
const { default: slugify } = require('slugify');

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
    .withMessage('Brand title should be more than 30 characters ')
    .custom((value, {req}) => {
        req.body.slug=slugify(value);
        return true;
    }),
    check('image').optional(),
    ValidatorMiddleware,
];

exports.updateBrandValidator=[
    check('id')
    .isMongoId()
    .withMessage('Invalid Brand ID Formate'),
    body('name').custom((value, {req}) => {
        req.body.slug=slugify(value);
        return true;
    }),
    ValidatorMiddleware,
];

exports.deteleBrandValidator=[
    check('id')
    .isMongoId()
    .withMessage('Invalid Brand ID Formate'),
    ValidatorMiddleware,
];