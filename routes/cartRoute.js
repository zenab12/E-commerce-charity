const express = require("express");
var cors = require('cors')


const { addProductToCart, getLoggedUserCart, removeSpecificCartItem, clearCart, updateCartItemQuantity } = require("../controllers/cartService");

const { protect, authorize } = require("../middlewares/auth")

const router = express.Router();
router.use(protect);    /// only logged in user can do this
router.use(cors())
router
    .route("/")
    .post(addProductToCart)
    .get(getLoggedUserCart)
    .delete(clearCart)

router.route("/:itemId").delete(removeSpecificCartItem).put(updateCartItemQuantity)

module.exports = router;
