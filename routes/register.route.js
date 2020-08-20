const express = require("express");

var multer  = require('multer');
require('../server/cloudinary');
require('dotenv').config();

var upload = require('../middleware/multer')

var authMiddleWare = require('../middleware/auth.middleware');

var controller = require('../controller/register.controller');
//var validation = require('../validation/a.validation');

var router = express.Router(); 

router.get('/register',controller.register);
router.post('/register',upload.single('avatar'),controller.postRegister)

module.exports = router;