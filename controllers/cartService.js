const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

const Cart = require("./../models/cartModel");
const Product = require("./../models/productModel");

const calcTotalCartDonation = (cart) => {
    let totalDonation = 0;
    cart.cartItems.forEach((item) => {
        console.log(item.quantity, "price", item.price);
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
    const product = await Product.findById(productId);
    // Get cart for logged user
    let cart = await Cart.findOne({ user: req.user._id }); /////  req.user comes from protect middleware
    // console.log("cart",cart)
    // console.log("req.user._id",req.user._id)
    if (!cart) {
        //create cart for this user and add this product
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [{ product: productId, price: product.price }],
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
            cart.cartItems.push({ product: productId, price: product.price });
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
        return next(ApiError("There is no cart for this user", 404));
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

exports.removeSpecificCartItem = expressAsyncHandler(async(req, res, next)=>{
    const cart = await Cart.findOneAndUpdate({user: req.user._id},
        {
            $pull: { cartItems: { _id : req.params.itemId } }
        },
        { new: true }
        );
        calcTotalCartDonation(cart);
        cart.save();
        res.status(200).json({
            status: "success",
            numOfCartItems: cart.cartItems.length,
            data: cart
        });
})