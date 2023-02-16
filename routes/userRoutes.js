const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/auth");

const router = express.Router();

router.post("/signup", authController.signup);

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserbyId);

module.exports = router;
