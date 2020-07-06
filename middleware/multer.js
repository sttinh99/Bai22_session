var multer = require("multer")
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: function(req,file,cb){
        // if(file.mimetype.match(/jpe|jpeg|png|gif$i/)){
        //     cb(new Error('File is not supported'),false);
        //     return;
        // }
        cb(null,true)
    }
})