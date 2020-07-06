var db = require('../db');

module.exports.getPer = function(req,res,next){
    var profile=db.get("users").value();
    var checkAdmin = db.get('users').find({id:req.signedCookies.user}).value();
    if(!checkAdmin.isAdmin){
        var fillUser = profile.filter(function(x){
            return x.email===checkAdmin.email;
        })
        res.render('./permission/getPer',{users: fillUser});
    }
    next();
}