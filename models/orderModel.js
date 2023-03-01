const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Order must belong to User"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        color: String,
        price: Number,
      },
    ],
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOredrPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ["cart", "cash"],
      default: "cash",
    },
    isPaid: {
      type: boolean,
      default: false,
    },
    paidAt: Date,
    isDeliverd: {
      type: boolean,
      default: false,
    },
    Deliverd: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
