const express = require("express");
const authServices = require("../controllers/auth");
const router = express.Router();

const { createCashOrder,
        findAllOrders,
        findSpecificOrder,
        filterOrderForLoggedUser,
        updateOrderToPaid,
        updateOrderToDelivered
} = require("../controllers/orderService");


router.use(authServices.protect,);


router.route("/:cartId").post(authServices.allowedTo('user'),createCashOrder);

router.get('/',
           authServices.allowedTo('user','admin','manager'),
           filterOrderForLoggedUser,
           findAllOrders);
router.get('/:id',findSpecificOrder);

router.put('/:id/pay',
           authServices.allowedTo('admin','manager'),
           updateOrderToPaid);

router.put('/:id/Deliver',
           authServices.allowedTo('admin','manager'),
           updateOrderToDelivered);           



module.exports = router;
