const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config({ path: './.env'})
require('./db/connection')

app.use(express.json())

const adminRoute = require('./routes/admin')
const authorRoute = require('./routes/author')

app.use('/admin',adminRoute)
app.use('/author',authorRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT ,() => {
    console.log(`Server is running at PORT Number: ${PORT}`)
})