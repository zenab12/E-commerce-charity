const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartItems : [{
        // product: {
        //     type:mongoose.Schema.ObjectId,
        //     ref: ' Product '
        // },
        quantity: {
            type : Number,
            default: 1
        }, 
        // color: String,
        price: Number
    }],
    totalDonation: Number,
    user: {
        type:mongoose.Schema.ObjectId,
        ref: ' User '
    }
},{ timeStamps: true }
);



module.exports= mongoose.model('Cart',cartSchema);