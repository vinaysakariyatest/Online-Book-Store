const express = require('express')
const router = express.Router();

const admin = require('../controller/admin');
const auth = require('../middleware/auth')

router.post('/login',admin.login)


// Category
router.post('/category',auth,admin.addCategory)
router.put('/category/:id',auth,admin.editCategory)
router.delete('/category/:id',auth,admin.deleteCategory)
router.get('/category',admin.viewCategory)

// Books
router.post('/books',auth,admin.addBook)
router.get('/books',admin.viewAllBooks)
router.delete('/books/:id',auth,admin.deleteBook)
router.put('/books/:id',auth,admin.editBook)

// Order
router.put('/order/:id',admin.updateOrder)
router.get('/search/:status',admin.statusOrder)
router.get('/order',admin.viewOrder);
module.exports = router
