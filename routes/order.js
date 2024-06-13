const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const order = require('../controller/order');

router.post('/place-order',auth,order.cartOrder);
router.post('/order',auth,order.placeOrder);
router.get('/my-order',auth,order.viewOrder);

module.exports = router
