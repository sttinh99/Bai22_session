const express = require("express");

var db = require('../db');

var upload = require('../middleware/multer');

var Book = require('../models/books.model');
var User = require('../models/users.model')

var cloudinary = require('cloudinary');
require('dotenv').config();

module.exports.index = async function(req, res) {
  var checkAdmin = await User.findOne({_id:req.signedCookies.user});
  console.log(checkAdmin)
  if(!checkAdmin.isAdmin){
    checkAdmin.isAdmin=1;
  }
  var page = parseInt(req.query.page) || 1; //n
    var nextPage = page+1;
    var prePage = page-1;
    var perPage = 5; //x
    var start = (page-1)*perPage;
    var end = (page*perPage);
    var take = 5;
    // console.log([prePage,page,nextPage]);
  // res.render("./books/index", {
  //     books: db.get("books").value().slice(start,end),
  //     listPage: [prePage,page,nextPage],
  //     checkAdmin: checkAdmin
  //   });
  var books = await Book.find();
  res.render('./books/index',{
      books: books.slice(start,end),
      listPage: [prePage,page,nextPage],
      checkAdmin: checkAdmin
    });
  };
module.exports.getCreate = function(req, res) {
    res.render("./books/create");
  };
module.exports.postCreate = async function(req, res) {
  // var books = await Book.find();
  var result = await cloudinary.v2.uploader.upload(req.file.path);
    // req.body.id = shortid.generate();
    req.body.coverUrl = result.secure_url;
    await Book.create(req.body);
    res.redirect("/books");
  };
module.exports.getUpdate = async function(req,res){
  var id = req.params.id;
  var book = await Book.findOne({_id: id});
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
      // var x = db.get("books").find({id: id})
      // .assign({ title: req.body.title})
      // .write();
      // x.coverUrl = result.secure_url;
      // db.write();
      var x = await Book.findOne({_id: id})
      await x.updateOne({ title: req.body.title});
      // x.avatar = req.file.path.split('\\').slice(1).join("\\")
      x.coverUrl = result.secure_url;
      await x.save();
    }
    else
    {
      // var x = db.get("users").find({id: id})
      // .assign({ title: req.body.title},{coverUrl:result.secure_url })
      // .write();
      var x = await Book.findOne({_id: id});
      await x.updateOne({ name: req.body.title},{avatarUrl:result.secure_url });
      await x.save();
    }
    res.redirect("/books");
  };
module.exports.delete = async function(req,res){
    var id = req.params.id;
    // console.log(id);
    // var book = db.get('books')
    // .find({ id: id })
    // .value()
    // var delBook = db.value().books.map(function(x,index){
    //     if(x===book){
    //         db.value().books.splice(index,1);
    //         db.get('books').write();
    //     }
    // });
    var book = await Book.findOne({_id: id});
    // await User.delete({_id: user.id});
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
  }
