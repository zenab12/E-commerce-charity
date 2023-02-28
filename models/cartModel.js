const mongoose = require('mongoose');
const { Schema }=  mongoose;
const cartSchema = new mongoose.Schema({
    cartItems : [{
        product: {
            type: Schema.Types.ObjectId,
            ref: ' Product '
        },
        quantity: {
            type : Number,
            default: 1
        }, 
        // color: String,
        price: Number
    }],
    totalCartDonation: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: ' User '
    }
},{ timeStamps: true }
);



module.exports= mongoose.model('Cart',cartSchema);