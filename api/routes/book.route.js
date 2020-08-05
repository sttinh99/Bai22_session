const express = require("express");

var multer  = require('multer');
require('../../server/cloudinary');
require('dotenv').config();

var upload = require('../../middleware/multer')


var controller = require('../controller/book.controller');
var validation = require("../../validation/books.validation");

var router = express.Router();


router.get("/", controller.index);
router.get("/create",controller.getCreate );
router.post("/create",upload.single('avatar'),validation.postCreate,controller.postCreate );
router.get("/:id/update",controller.getUpdate);
router.post("/update",upload.single('avatar'),controller.postUpdate);  
router.get('/:id/delete',controller.delete);

module.exports = router;