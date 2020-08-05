const express = require("express");

var upload = require('../middleware/multer');

var User = require('../models/users.model')

var cloudinary = require('cloudinary');
require('dotenv').config();

module.exports.index = async function(req, res) {
    res.render('register');
}