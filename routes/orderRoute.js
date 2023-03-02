const express = require("express");
const { authorize, protect } = require("../middlewares/auth");
const router = express.Router();

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
