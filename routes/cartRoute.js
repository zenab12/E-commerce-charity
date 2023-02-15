const express = require("express");


const { addProductToCart, getLoggedUserCart, removeSpecificCartItem } = require("../controllers/cartService");

const { protect, authorize } = require("../middlewares/auth")

const router = express.Router();
router.use(protect,authorize('user'));
router
    .route("/")
    .post(
        // protect,
        //authorize('user'),
        addProductToCart
    ).get(getLoggedUserCart)
router.route("/:itemId").delete(removeSpecificCartItem)


module.exports = router;
