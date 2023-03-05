const express = require("express");
const cors = require('cors');


const router = express.Router();
router.use(cors());



const { authorize, protect } = require("../middlewares/auth");
const { createCashOrder,
    findAllOrders,
    findSpecificOrder,
    filterOrderForLoggedUser,
    updateOrderToPaid,
    updateOrderToDelivered
} = require("../controllers/orderService");


// router.use(authorize.protect);


router.route("/:cartId").post(protect, authorize('user'), createCashOrder);

router.get('/',
    protect,
    authorize('user', 'admin'),
    filterOrderForLoggedUser,
    findAllOrders);
router.get('/:id', findSpecificOrder);

router.put('/:id/pay',
    authorize('admin'),
    updateOrderToPaid);

router.put('/:id/Deliver',
    authorize('admin'),
    updateOrderToDelivered);



module.exports = router;
