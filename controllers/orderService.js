const OrderModel = require("../models/orderModel");
const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");

const asyncHandler = require("express-async-handler");
const factory = require('./handlersFactory');
const ApiError = require("../utils/ApiError");
const { updateOne } = require("../models/orderModel");

//create cash order
exports.createCashOrder = asyncHandler(async (req, res, next) => {
    console.log(req.params.cartId)
    console.log("hellllllos")
    //app setting  added by admin 
    const taxPrice = 0;
    const shippingPrice = 0;

    // 1) get cart depend on cardId
    const cart = await CartModel.findById(req.params.cartId);
    console.log(cart);
    if (!cart) {
        return next(
            new ApiError(`there is no Cart with id : ${req.params}`, 404));
    }

    //2) get oreder price depend on cart price "check if there is any discount"
    const cartPrice = cart.totalCartPrice;

    const totalOrderPrice = cartPrice;

    //3) create order by default paymentMethodType -> Cash
    const order = await OrderModel.create({
        user: req.user._id,
        cartItems: cart.cartItems,
        // shippingAddress:req.body.shippingAddress,
        totalOrderPrice
    });

    //4) after creating order , decrement product quantity , increment product sold 

    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
            }
        }))
        await ProductModel.bulkWrite(bulkOption, {});

        //5) clear cart depend on cartID
        await CartModel.findByIdAndDelete(req.params.cartId);
    }
    res.status(201).json({ status: 'success', data: order });
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if (req.user.role === 'user') req.filterObj = { user: req.user._id };
    next();
});

//get all orders 
exports.findAllOrders = factory.getAll(OrderModel);

//get order by id
exports.findSpecificOrder = factory.getOne(OrderModel);

//update order status to paid 
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
        return next(
            new ApiError(`there is no order with id : ${req.params.id}`, 404)
        )
    }

    //update order to paid
    order.isPaid = true;
    order.paidAt = Date.now();

    //save order
    const updateOrder = await order.save();
    res.status(200).json({ status: 'success', data: updateOrder });
});



//update order delivered status 
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
        return next(
            new ApiError(`there is no order with id : ${req.params.id}`, 404)
        )
    }

    //update order to paid
    order.isDeliverd = true;
    order.deliverdAt = Date.now();

    //save order
    const updateOrder = await order.save();
    res.status(200).json({ status: 'success', data: updateOrder });
});