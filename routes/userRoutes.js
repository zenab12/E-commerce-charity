const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/auth");
const router = express.Router();
const userValidator = require("../utils/validators/userValidator");
const authValidator = require("../utils/validators/authValidator");

const { protect, authorize } = require('./../middlewares/auth');
// router.get("/", userController.getUsers);
// //create user and test users db
// router.post("/", userController.createUser);
const { hash } = require('../middlewares/auth')
router
  .route("/")
  .get(userController.getUsers)
  .post(
    userController.uploadUserImg,
    userController.resizeUserImg,
    (req, res, next) => {
      // console.log("this req.file from create route"+req.file);
      console.log("this req.body from create route", req.body);
      next();
    },
      // userValidator.createUserValidator,
      hash,
/*protect, authorize("admin"),*/userController.createUser,
  );
router
  .route("/:id")
  .get(userValidator.getUserValidator,protect, /* authorize("admin"),*/ userController.getUser)
  .patch(
    userController.uploadUserImg,
    userController.resizeUserImg,
    userValidator.updateUserValidator, protect, hash,
    userController.updateUser
  )
  .delete(userValidator.deleteUserValidator,/* protect, authorize("admin"),*/ userController.deleteUser);

  // router.post('/login',authController.login)
  // router.post('/register',authController.register)


module.exports = router;
