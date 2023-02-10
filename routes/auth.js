const express = require('express');
const userController = require("./../controllers/userController");
const userValidator = require("../utils/validators/userValidator");
const authController = require("./../controllers/auth");
const router = express.Router();
const { register, login } = require('../controllers/auth');



const { protect, authorize, hash } = require('./../middlewares/auth');
// router.get("/", userController.getUsers);
// //create user and test users db
// router.post("/", userController.createUser);





router.post('/register', userController.uploadUserImg,
userController.resizeUserImg,
(req, res, next) => {
    next();
},
userValidator.createUserValidator,hash, register);
router.post('/login',userValidator.loginValidator, login)    //// validation middle ware not working

module.exports = router;