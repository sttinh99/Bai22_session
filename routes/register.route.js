const express = require("express");

var authMiddleWare = require('../middleware/auth.middleware');

var controller = require('../controller/register.controller');
const { route } = require("../api/routes/book.route");
//var validation = require('../validation/a.validation');

var router = express.Router(); 

router.get('/',controller.register);
router.get('/create',controller.postRegister)

module.exports = router;