const express = require('express')
const router = express.Router();

const user = require('../controller/user');
const auth = require('../middleware/auth')

router.post('/register',user.register);
router.post('/login',user.login);
router.put('/update-password',auth,user.updatePassword);
router.get('/profile',auth,user.viewProfile);
router.put('/update-profile',auth,user.updateProfile);
router.post('/forget-password',user.forget_password);
router.get('/reset-password',user.rest_password);

// Book
router.get('/book',user.viewAllBooks);
router.get('/book/:id',user.categoryBook);

module.exports = router