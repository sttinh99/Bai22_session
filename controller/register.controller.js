const express = require("express");
var User = require('../models/users.model')
var upload = require('../middleware/multer');
var cloudinary = require('cloudinary');
require('dotenv').config();

module.exports.register = async function(req, res) {
    res.render('./register/register');
}
module.exports.postRegister = async function(req, res, next) {
    let x = await User.findOne({email:req.body.email})
    if(!x){
        var result = await cloudinary.v2.uploader.upload(req.file.path);
        req.body.avatarUrl = result.secure_url;
        req.body.wrongLoginCount = 0;
        req.body.pass = "$2b$10$O2ULVrvXPg/j9onUzRDFWehcOihIcQ1ebpvxAjUyCdwnmTDdSqg9G"
        await User.create(req.body);
        res.redirect("/auth/login");
        next();
    }
    res.render('./register/register',{errors:"email da ton tai"})
  }