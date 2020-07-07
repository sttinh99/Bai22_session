const express = require("express");
var shortid = require("shortid");

var controller = require('../controller/cart.controller');
//var validation = require('../validation/a.validation');
var db = require('../db');

var router = express.Router(); 

router.get('/add/:bookId',controller.addToCart);

module.exports = router;