const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/auth");
const router = express.Router();
const userValidator = require("../utils/validators/userValidator");

const { protect, authorize } = require('./../middlewares/auth');
// router.get("/", userController.getUsers);
// //create user and test users db
// router.post("/", userController.createUser);

router
  .route("/")
  .get(protect, authorize("admin"),userController.getUsers)
  .post(
    userController.uploadUserImg,
    userController.resizeUserImg,
    (req, res, next) => {
      console.log(req.file);
      console.log(req.body);
      next();
    },
      userValidator.createUserValidator,
        protect, authorize("admin"),userController.createUser,
  );
router
  .route("/:id")
  .get(userValidator.getUserValidator, protect, authorize("admin"), userController.getUser)
  .put(
    userController.uploadUserImg,
    userController.resizeUserImg,
    userValidator.updateUserValidator, protect,
    userController.updateUser
  )
  .delete(userValidator.deleteUserValidator, protect, authorize("admin"), userController.deleteUser);

  router.post('/login',authController.login)
  router.post('/register',authController.register)

module.exports = router;
