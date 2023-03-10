const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/auth");
const router = express.Router();
const userValidator = require("../utils/validators/userValidator");
const authValidator = require("../utils/validators/authValidator");

// var cors = require('cors')

const { protect, authorize } = require("./../middlewares/auth");
// router.use(cors())

const { hash } = require("../middlewares/auth");
router
  .route("/")
  .get(
    // protect,
    // authorize("admin"),
    userController.getUsers
  )
  .post(
    userController.uploadUserImg,
    (req, res, next) => {
      // console.log("this req.file from create route"+req.file);
      console.log("this req.body from create route", req.body);
      next();
    },
    // userValidator.createUserValidator,
    hash,
    protect,
    // authorize("admin"),
    userController.createUser
  );

// router.route("/").get(
//   userValidator.getUserValidator,
//   protect,
//   // authorize("admin"),
//   userController.getUserByEmail
// );
router
  .route("/:id")
  .get(
    userValidator.getUserValidator,
    protect,
    // authorize("admin"),
    userController.getUser
  )
  .patch(
    userController.uploadUserImg,
    userValidator.updateUserValidator,
    protect,
    hash,
    userController.updateUser
  )
  .delete(
    userValidator.deleteUserValidator,
    /* protect, authorize("admin"),*/ userController.deleteUser
  );

// router.post('/login',authController.login)
// router.post('/register',authController.register)

module.exports = router;
