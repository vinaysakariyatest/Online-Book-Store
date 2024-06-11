const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const author = require('../controller/author');

router.post('/register',author.register);
router.post('/login',author.login);

// Books
router.post('/book',auth,author.addBook);
router.delete('/book/:id',auth,author.deleteBook);
router.put('/book/:id',auth,author.updateBook);
router.get('/book',auth,author.viewAllBooks);
router.get('/myBook',auth,author.myBook);
router.get('/bookCategory/:id',auth,author.categoryBook);

// Category
router.get('/category',auth,author.viewCategory);

module.exports = router