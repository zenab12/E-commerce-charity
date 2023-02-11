const express = require("express");
const userController = require("./../controllers/userController");
const authValidator = require("../utils/validators/authValidator");
const authController = require("./../controllers/auth");
const router = express.Router();

const { register, login , getMe, forgotPassword} = require('../controllers/auth');

const { protect, authorize, hash } = require("./../middlewares/auth");
// router.get("/", userController.getUsers);
// //create user and test users db
// router.post("/", userController.createUser);


router.post('/register', userController.uploadUserImg,
userController.resizeUserImg,
(req, res, next) => {
    next();
},
authValidator.signupValidator, hash, register);
router.post('/login', authValidator.loginValidator, login)    //// validation middle ware not working
router.get('/me',protect,getMe)    
router.post('/forgotpassword',forgotPassword)    

module.exports = router;


