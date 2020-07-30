var db = require('../db');

var User = require('../models/users.model');

module.exports.getPer = async function(req,res,next){
    var profile= await User.find();
    var checkAdmin = await User.findOne({_id:req.signedCookies.user}).value();
    if(!checkAdmin.isAdmin){
        var fillUser = profile.filter(function(x){
            return x.email===checkAdmin.email;
        })
        res.render('./permission/getPer',{users: fillUser});
    }
    next();
}