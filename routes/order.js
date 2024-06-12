const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const order = require('../controller/order');

router.post('/place-order',auth,order.cartOrder);
router.post('/order',auth,order.placeOrder)

module.exports = router
