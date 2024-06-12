const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config({ path: './.env'})
require('./db/connection')

app.use(express.json())

const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

app.use('/admin',adminRoute)
app.use('/user',userRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT ,() => {
    console.log(`Server is running at PORT Number: ${PORT}`)
})