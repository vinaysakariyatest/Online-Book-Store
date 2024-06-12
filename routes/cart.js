const express = require('express')
const router = express.Router();
const cart = require('../controller/cart')
const auth = require('../middleware/auth')

router.post('/add-to-cart/:id',auth,cart.addToCart);
router.get('/myCart',auth,cart.viewCart);

module.exports = router