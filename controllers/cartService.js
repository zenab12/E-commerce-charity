const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

const Cart = require("./../models/cartModel");
const Product = require("./../models/productModel");

const calcTotalCartDonation = (cart) => {
    let totalDonation = 0;
    cart.cartItems.forEach((item) => {
        totalDonation += item.quantity * item.price;
    });
    cart.totalCartDonation = totalDonation;

    return totalDonation;
};

//@desc Add product to cart
//@route Post /cart
//@access private/User

exports.addProductToCart = expressAsyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const { minus } = req.body;
    const product = await Product.findById(productId);
    let cart = await Cart.findOne({ user: req.user._id });
    if (minus) {
        const productIndex = cart.cartItems.findIndex(
            (item) => item.product?.toString() === productId
        );
        if (product.quantity > 0) {
            const cartItem = cart.cartItems[productIndex];
            cartItem.quantity -= 1;
            cart.cartItems[productIndex] = cartItem;
        } else {
            cartItem.quantity = 0;
            cart.cartItems[productIndex] = cartItem;
        }
    } else {


        // Get cart for logged user
        // let cart = await Cart.findOne({ user: req.user._id }); /////  req.user comes from protect middleware
        if (!cart) {
            //create cart for this user and add this product
            cart = await Cart.create({
                user: req.user._id,
                cartItems: [{ product: productId, price: product.price, title: product.title }],
            });
        } else {
            // product exist in cart , update quantity
            const productIndex = cart.cartItems.findIndex(
                (item) => item.product?.toString() === productId
            );
            if (productIndex > -1) {
                const cartItem = cart.cartItems[productIndex];
                cartItem.quantity += 1;
                cart.cartItems[productIndex] = cartItem;
            } else {
                // product not exist in cart, push product to cartItem array
                cart.cartItems.push({ product: productId, price: product.price, title: product.title });
            }
        }

    }

    // calc total cart donation
    calcTotalCartDonation(cart);

    await cart.save();

    res.status(200).json({
        status: "success",
        message: "product added to cart successfully",
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});




//@desc Get logged user cart
//@route Get /cart
//@access private/User

exports.getLoggedUserCart = expressAsyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return next(new ApiError("There is no cart for this user", 404));
    }
    res.status(200).json({
        status: "success",
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});


//@desc remove specific cart item
//@route Get /cart/:itemId
//@access private/User

exports.removeSpecificCartItem = expressAsyncHandler(async (req, res, next) => {

    const cart = await Cart.findOneAndUpdate({ user: req.user._id },
        {
            $pull: { cartItems: { product: req.params.itemId } }
        },
        { new: true }
    );

    /// Another solution

    // const cart = await Cart.findOne({ user: req.user._id });
    // let cartItems = cart.cartItems;
    // cartItems = cartItems.filter(item => {
    //     return item.product === req.params.itemId
    // })


    calcTotalCartDonation(cart);
    cart.save();
    res.status(200).json({
        status: "success",
        numOfCartItems: cart.cartItems.length,
        data: cart
    });
})


//@desc clear logged user cart
//@route Delete /cart
//@access private/User
exports.clearCart = expressAsyncHandler(async (req, res, next) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(204).send();
})


//@desc Update specific cart item
//@route Put /cart/:itemId
//@access private/User
exports.updateCartItemQuantity = expressAsyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return next(new ApiError("There is no cart for this user", 404));
    }
    const productIndex = cart.cartItems.findIndex((item) => req.params.itemId === item.product?.toString());
    if (productIndex > -1) {
        const cartItem = cart.cartItems[productIndex];
        cartItem.quantity = req.body.quantity;
        cart.cartItems[productIndex] = cartItem;
    } else {
        return next(new ApiError(`There is no item for this id : ${req.params.itemId}`, 404));
    }
    calcTotalCartDonation(cart);
    await cart.save();
    res.status(200).json({
        status: "success",
        numOfCartItems: cart.cartItems.length,
        data: cart
    })
})