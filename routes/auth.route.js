const express = require("express");
var shortid = require("shortid");
var controller = require('../controller/auth.controller');

var loginValidation = require('../validation/login.validation');

//var validation = require('../validation/a.validation');
var db = require('../db');

var router = express.Router();  

router.get('/login',controller.login);
router.post('/login',controller.postLogin);

module.exports = router;