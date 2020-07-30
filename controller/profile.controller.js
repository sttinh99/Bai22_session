const express = require("express");

var User = require('../models/users.model');

var upload = require('../middleware/multer');
var cloudinary = require('cloudinary');

// var shortid = require("shortid");
// var db = require('../db');

module.exports.index = function(req, res) {
  var checkAdmin = User.findOne({_id:req.signedCookies.user})
  res.render("./users/")
  };
module.exports.postUpdate = async function(req,res){
var id = req.body.id;
if(!req.body.avatar){
    // var x = db.get("users").find({id: id})
    // .assign({ name: req.body.name})
    // .write();
    x = await User.findOne({_id: id});
    await x.updateOne({ name: req.body.name});
    x.avatarUrl = result.secure_url;
    await x.save();
}
else
{
    // var x = db.get("users").find({id: id})
    // .assign({ name: req.body.name},{avatar:req.file.path.split('\\').slice(1).join("\\") })
    // .write();
    x = await User.findOne({_id: id});
    await x.updateOne({ name: req.body.name},{avatarUrl:result.secure_url});
    await x.save();
}
res.redirect("/users");
}