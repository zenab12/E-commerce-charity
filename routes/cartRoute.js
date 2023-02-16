const express = require("express");


const { addProductToCart, getLoggedUserCart, removeSpecificCartItem, clearCart, updateCartItemQuantity } = require("../controllers/cartService");

const { protect, authorize } = require("../middlewares/auth")

const router = express.Router();
router.use(protect, authorize('user'));    /// only logged in user can do this
router
    .route("/")
    .post(
        // protect,
        //authorize('user'),
        addProductToCart
    )
    .get(getLoggedUserCart)
    .delete(clearCart)

router.route("/:itemId").delete(removeSpecificCartItem).put(updateCartItemQuantity)

module.exports = router;
