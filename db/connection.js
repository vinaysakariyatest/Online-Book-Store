const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB)
.catch((err) => {
    console.log(`Connection Failed`)
})