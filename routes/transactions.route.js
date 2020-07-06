const express = require("express");
var shortid = require("shortid");
var db = require('../db');

var controller = require('../controller/transactions.controller');
var validation = require("../validation/transactions.validation");

var router = express.Router();

router.get("/",controller.index);
router.get("/create",controller.getCreate);
router.post("/create",controller.postCreate);
router.get("/:id/complete",validation.getComplete,controller.getComplete);
module.exports = router;