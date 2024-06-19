const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        // const name = Date.now() + '-' + file.originalname;
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        // cb(null, name)
    }
})

const upload = multer({
    storage: storage,
    // fileFilter: fileFilter
})

module.exports = {
    upload
}




