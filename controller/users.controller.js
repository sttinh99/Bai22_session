const express = require("express");
// var shortid = require("shortid");

var User = require('../models/users.model')

// var db = require('../db');

var upload = require('../middleware/multer');
var cloudinary = require('cloudinary');
require('dotenv').config();

module.exports.index = async function(req, res) {
    var profile=await User.find();
    var checkAdmin = await User.findOne({_id:req.signedCookies.user});
    if(!checkAdmin.isAdmin){
        var fillUser = profile.filter(function(x){
            return x.email===checkAdmin.email;
        })
        res.render('./users/indexUser',{users: fillUser});
    }
    else
    {
      res.render("./users/indexUser", {
        // users: db.get("users").value()
        users: profile
      });
    }
  }
module.exports.getCreate = function(req, res) {
    res.render("./users/createUser");
}
module.exports.postCreate = async function(req, res) {
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    req.body.avatarUrl = result.secure_url;
    req.body.wrongLoginCount = 0;
    await User.create(req.body);
    res.redirect("/users");
  }
module.exports.getUpdate = async function(req,res){
    var id = req.params.id;
    console.log(id)
    var user = await User.findOne({_id: id});
    res.render("./users/updateUser",{user: user});
    // router.post("/update",function(req,res){
    //   var x = req.body.title;
    //   book.title = x;
    //   db.get('users').write();
    //   res.redirect("");
    // });
  }
module.exports.postUpdate = async function(req,res){
  var id = req.body.id;
  var user = await User.find();
  var result = await cloudinary.v2.uploader.upload(req.file.path);
  if(!req.body.avatarUrl){
    var x = await User.findOne({_id: id})
    await x.updateOne({ name: req.body.name});
    // x.avatar = req.file.path.split('\\').slice(1).join("\\")
    x.avatarUrl = result.secure_url;
    await x.save();
  }
  else
  {
    // var x = db.get("users").find({id: id})
    // .assign({ name: req.body.name},{avatarUrl:result.secure_url },{age:req.body.age})
    // .write();
    var x = await User.findOne({_id: id});
    await x.updateOne({ name: req.body.name},{avatarUrl:result.secure_url });
    await x.save();
  }
    res.redirect("/users");
  }
module.exports.delete = async function(req,res){
    var id = req.params._id;
    console.log(id)
    var user = await User.findOne({_id: id});
    // await User.delete({_id: user.id});
    await User.findByIdAndDelete(id);
    res.redirect('/users');
  }
  module.exports.profile = async function(req,res){
    var id = res.locals.user.id//route
    // var user = db.get("users").find({_id: id}).value();
    var user = await User.findOne({_id: id});
    res.render("./users/profile",{user: user});
  }
  module.exports.postProfile = async function(req,res){
    var id = req.body.id;
    var user = await User.find();
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    if(!req.body.avatarUrl){
      var x = await User.findOne({_id: id});
      await x.updateOne({ name: req.body.name},{age:req.body.age});
      // x.avatar = req.file.path.split('\\').slice(1).join("\\")
      x.avatarUrl = result.secure_url;
      await x.save();
    }
    else
    {
      // var x = db.get("users").find({id: id})
      // .assign({ name: req.body.name},{avatarUrl:result.secure_url },{age:req.body.age})
      // .write();
      var x = await User.findOne({_id: id});
      await x.updateOne({ name: req.body.name},{avatarUrl:result.secure_url },{age:req.body.age});
      await x.save();
    }
    res.redirect("/users");
  }