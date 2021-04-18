//npm i multer --save
const multer = require('multer'); //file upload
const router = require('../route/AdminRoute');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"./images/")
    }, 
    filename:function(req, file, cb){
        cb(null,Date.now() + file.originalname)
    }
})

//cb = call back
const fileFilter = function(req, file,cb){
    if(file.mimetype =="image/jpeg" || file.mimetype =="image/jpg" ||file.mimetype =="image/png"){
        cb(null, true)
    }else(
        cb(null, false)
    )
}

const upload = multer({
    storage : storage, 
    fileFilter :fileFilter
});


module.exports= upload