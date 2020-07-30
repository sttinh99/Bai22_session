const express = require("express");
// var shortid = require("shortid");
// var db = require('../db');

var User = require('../models/users.model')
var Tran = require('../models/trans.model');
const Book = require("../models/books.model");

module.exports.index = async function (req,res){
    var takeUser = await User.findOne({_id:req.signedCookies.user});
    var userTrans= await Tran.find();
    if(!takeUser.isAdmin){
        var filTrans = userTrans.filter(function(x){
            return x.idUser===req.signedCookies.user;
        })
        var takeTrans = filTrans.map( async function(item){
            var takeBook = await Book.findOne({_id: item.idBook});
            var takeUser = await User.findOne({_id: item.idUser});
            return{
                // user : db.get("users").find({id: item.idUser}).value().name,
                // book : db.get("books").find({id: item.idBook}).value().title,
                // id: item.id,
                user: takeUser.name,
                book: takeBook.title,
                status: item.isComplete,
                id: item._id
            }
        });
        Promise.all(takeTrans).then(function(values){
            res.render("./transactions/index", {
                trans:values,
                admin:takeUser.isAdmin
            });
        }) 
    }
    else{
        var takeTrans = userTrans.map(async function(item){
            var takeBook = await Book.findOne({_id: item.idBook});
            var takeUser = await User.findOne({_id: item.idUser});
            return {
                user: takeUser.name,
                book: takeBook.title,
                id: item._id,
                status: item.isComplete
            }
        });
        Promise.all(takeTrans).then(function(values){
            res.render("./transactions/index", {
                trans:values,
                admin:takeUser.isAdmin
            });
        })        
    }
};
module.exports.getCreate = async function (req,res) {
    // var books = db.get("books").value();
    // var users = db.get("users").value();
    var books = await Book.find();
    var users = await User.find();
    res.render("./transactions/create",{books: books,users: users,isComplete: false});
};
module.exports.postCreate = async function (req,res) {
    req.body.isComplete = false;
    await Tran.create(req.body);
    res.redirect("/transactions");
};
module.exports.getComplete = async function(req,res){
    var id = req.params.id;
    // var takeId = db.get("trans").value();
    // var checkId = takeId.find(function(item){
    //     return item.id === id?true:false;
    // })
    var errors = "Giao dịch không tồn tại";
    var checkId= await Tran.findOne({_id:id});
    if(checkId===undefined){
        res.render('./transactions/complete',{
            errors: errors
        })
        return;
    }
    Tran.findOneAndUpdate({_id:id}, {$set:{isComplete: true}}, function(err, result){
        if(err){
            console.log(err);
        }
        console.log(result);
    });
    res.render('./transactions/complete');
}