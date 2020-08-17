const express = require("express");

var upload = require('../middleware/multer');

var User = require('../models/users.model')

var cloudinary = require('cloudinary');
require('dotenv').config();

module.exports.register = async function(req, res) {
    res.render('register/register');
}
module.exports.postRegister = async function(req, res) {
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    req.body.avatarUrl = result.secure_url;
    req.body.wrongLoginCount = 0;
    await User.create(req.body);
    res.redirect("/users");
  }