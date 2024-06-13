const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

const upload = multer({
    storage: storage,
    // fileFilter: fileFilter
})

module.exports = {
    upload
}

// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb){
//         const name = file.originalname;
//         cb(null, name, function(error1, success1){
//             if(error1) throw error1
//         })
//     }
// })

// const upload = multer({
//     storage: storage,
// })

// module.exports = {
//     upload
// }


