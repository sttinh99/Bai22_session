const express = require("express");
var shortid = require("shortid");
var db = require('../db');

var upload = require('../middleware/multer');
var cloudinary = require('cloudinary');
require('dotenv').config();

module.exports.index = function(req, res) {
    var profile=db.get("users").value();
    var checkAdmin = db.get('users').find({id:req.signedCookies.user}).value();
    if(!checkAdmin.isAdmin){
        var fillUser = profile.filter(function(x){
            return x.email===checkAdmin.email;
        })
        res.render('./users/indexUser',{users: fillUser});
    }
    else
    {
      res.render("./users/indexUser", {
        users: db.get("users").value()
      });
    }
  }
module.exports.getCreate = function(req, res) {
    res.render("./users/createUser");
}
module.exports.postCreate = async function(req, res) {
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    req.body.id = shortid.generate();
    req.body.avatarUrl = result.secure_url;
    db.get("users")
      .push(req.body)
      .write();
    res.redirect("/users");
  }
module.exports.getUpdate = function(req,res){
    var id = req.params.id;
    var user = db.get("users").find({id: id}).value();
    res.render("./users/updateUser",{user: user});
    // router.post("/update",function(req,res){
    //   var x = req.body.title;
    //   book.title = x;
    //   db.get('users').write();
    //   res.redirect("");
    // });   
  }
module.exports.postUpdate = async function(req,res){
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    var id = req.body.id;
    if(!req.body.avatarUrl){
      var x = db.get("users").find({id: id})
      .assign({ name: req.body.name})
      .write();
      x.avatarUrl = result.secure_url;
      db.write();

    }
    else
    {
      var x = db.get("users").find({id: id})
      .assign({ name: req.body.name},{avatarUrl:result.secure_url })
      .write();
    }
    res.redirect("/users");
  }
module.exports.delete = function(req,res){
    var id = req.params.id;
    var user = db.get('users')
    .find({ id: id })
    .value()
    var delUser = db.value().users.map(function(x,index){
        if(x===user){
            db.value().users.splice(index,1);
            db.get('users').write()
        }
    });
    res.redirect('/users');
  }
  module.exports.profile = function(req,res){
    var id = res.locals.user.id
    var user = db.get("users").find({id: id}).value();
    res.render("./users/profile",{user: user});
  }
  module.exports.postProfile = async function(req,res){
    var id = req.body.id;
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    if(!req.body.avatarUrl){
      var x = db.get("users").find({id: id})
      .assign({ name: req.body.name},{age:req.body.age})
      .write();
      // x.avatar = req.file.path.split('\\').slice(1).join("\\")
      x.avatarUrl = result.secure_url;
      db.write();
    }
    else
    {
      var x = db.get("users").find({id: id})
      .assign({ name: req.body.name},{avatarUrl:result.secure_url },{age:req.body.age})
      .write();
    }
    res.redirect("/users");
  }