const express = require("express");
var shortid = require("shortid");
var db = require('../db');

module.exports.index = function(req, res) {
  var checkAdmin = db.get('users').find({id:req.signedCookies.user}).value();
  res.render("./users/")
  };
module.exports.postUpdate = function(req,res){
var id = req.body.id;
if(!req.body.avatar){
    var x = db.get("users").find({id: id})
    .assign({ name: req.body.name})
    .write();
    x.avatar = req.file.path.split('\\').slice(1).join("\\");
}
else
{
    var x = db.get("users").find({id: id})
    .assign({ name: req.body.name},{avatar:req.file.path.split('\\').slice(1).join("\\") })
    .write();
}
res.redirect("/users");
}