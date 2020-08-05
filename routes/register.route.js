const express = require("express");

var authMiddleWare = require('../../middleware/auth.middleware');

var controller = require('../controller/register.controller');
//var validation = require('../validation/a.validation');

var router = express.Router(); 

router.get('/',controller.index);

module.exports = router;