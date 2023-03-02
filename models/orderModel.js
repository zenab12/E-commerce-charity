const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            require: [true, "Order must belong to User"],
        },
        cartItems: [{
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
            color: String,
            price: Number
        }],
        taxPrice: {
            type: Number,
            default: 0
        },
        shippingAddress: {
            details: String,
            phone: String,
            city: String,
            postalCode: String
        },
        shippingPrice: {
            type: Number,
            default: 0
        },
        totalOredrPrice: {
            type: Number
        },
        paymentMethodType: {
            type: String,
            enum: ['cart', 'cash'],
            default: 'cash'
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: Date,
        isDeliverd: {
            type: Boolean,
            default: false,
        },
        deliverdAt: Date,
    },
    { timestamps: true }
);

//pre middleware for population
orderSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: 'name profileImg email phone' })
        .populate({ path: 'cartItems.product', select: 'title imageCover' });
    next();
});

module.exports = mongoose.model('Order', orderSchema);