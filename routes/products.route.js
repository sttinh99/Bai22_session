const express = require("express");
var db = require('../db');

var controller = require('../controller/products.controller');

var router = express.Router();


router.get("/", controller.index);

module.exports = router