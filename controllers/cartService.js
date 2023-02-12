const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

const Cart = require("./../models/cartModel");
const Product = require("./../models/productModel");

//@desc Add product to cart
//@route Post /cart
//@access private/User

exports.addProductToCart = expressAsyncHandler(async(req, res, next)=>{
    const { productId } = req.body;
    const product = await Product.findById(productId)
    // Get cart for logged user
    let cart = await Cart.findOne({user: req.user._id});    /////  where req.user._id come from 
    if(!cart){
        //create cart for this user and add this product
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [{ product: productId, price: product.price }]
        })
    }else{
        // product exist in cart , update quantity
        const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if(productIndex > -1){
            const cartItem = cart.cartItems[productIndex]
            cartItem.quantity += 1;
            cart.cartItems[productIndex] = cartItem;
        }else{
            // product not exist in cart, push product to cartItem array
            cart.cartItems.push({ product: productId, price: product.price })
        }



        console.log('there is cart');
    }

    await cart.save();
});
