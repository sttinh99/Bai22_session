// var db = require('../db');
var valLogin = require('../../validation/login.validation');
const User = require('../../models/users.model');
module.exports.login = function(req,res){
    res.render('auth/login');
}
module.exports.postLogin = async function(req,res){
    console.log(req.body);
    var user = await User.create(req.body)
    res.json(user);
};