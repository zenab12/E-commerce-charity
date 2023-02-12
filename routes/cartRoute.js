const express = require("express");


const { addProductToCart } = require("../controllers/cartService");

const { protect, authorize } = require("../middlewares/auth")

const router = express.Router();

router
    .route("/")
    .post(
        protect,
        authorize('user'),
        addProductToCart
    );



module.exports = router;
