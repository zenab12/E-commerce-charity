const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();
const userValidator = require("../utils/validators/userValidator");

// router.get("/", userController.getUsers);
// //create user and test users db
// router.post("/", userController.createUser);

router
  .route("/")
  .get(userController.getUsers)
  .post(
    userController.uploadUserImg,
    userController.resizeUserImg,
    (req, res, next) => {
      console.log(req.file);
      console.log(req.body);
      next();
    },
    userController.createUser
  );
router
  .route("/:id")
  .get(userValidator.getUserValidator, userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
