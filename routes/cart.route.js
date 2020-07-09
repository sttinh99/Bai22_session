const express = require("express");
var shortid = require("shortid");

var authMiddleWare = require('../middleware/auth.middleware');

var controller = require('../controller/cart.controller');
//var validation = require('../validation/a.validation');
var db = require('../db');

var router = express.Router(); 

router.get('/add/:bookId',controller.addToCart);
router.get('/',authMiddleWare.requireAuth,controller.cart);
router.get('/trans/:bookId',authMiddleWare.requireAuth,controller.transBook);
module.exports = router;