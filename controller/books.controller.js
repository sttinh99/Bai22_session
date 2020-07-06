const express = require("express");
var shortid = require("shortid");
var db = require('../db');

var upload = require('../middleware/multer');
var cloudinary = require('cloudinary');
require('dotenv').config();

module.exports.index = function(req, res) {
  var checkAdmin = db.get('users').find({id:req.signedCookies.user}).value();
  if(!checkAdmin){
    checkAdmin=1;
  }
  res.render("./books/index", {
      books: db.get("books").value(),
      checkAdmin: checkAdmin
    });
  };
module.exports.getCreate = function(req, res) {
    res.render("./books/create");
  };
module.exports.postCreate = async function(req, res) {
  var result = await cloudinary.v2.uploader.upload(req.file.path);
    req.body.id = shortid.generate();
    req.body.coverUrl = result.secure_url;
    db.get("books")
      .push(req.body)
      .write();
    res.redirect("/books");
  };
module.exports.getUpdate = function(req,res){
var id = req.params.id;
var book = db.get("books").find({id: id}).value();
res.render("./books/update",{book: book});
// router.post("/update",function(req,res){
//   var x = req.body.title;
//   book.title = x;
//   db.get('books').write();
//   res.redirect("");
// });   
};
module.exports.postUpdate = async function(req,res){
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    var id = req.body.id;
    if(!req.body.coverUrl){
      var x = db.get("books").find({id: id})
      .assign({ title: req.body.title})
      .write();
      x.coverUrl = result.secure_url;
      db.write();
    }
    else
    {
      var x = db.get("users").find({id: id})
      .assign({ title: req.body.title},{coverUrl:result.secure_url })
      .write();
    }
    res.redirect("/books");
  };
module.exports.delete = function(req,res){
    var id = req.params.id;
    console.log(id);
    var book = db.get('books')
    .find({ id: id })
    .value()
    var delBook = db.value().books.map(function(x,index){
        if(x===book){
            db.value().books.splice(index,1);
            db.get('books').write();
        }
    });
    res.redirect("/books");
  }
