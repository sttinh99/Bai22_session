var db = require('../db');
var User = require('../models/users.model')

module.exports.requireAuth = async function(req,res,next){
    if(!req.signedCookies.user){
        res.redirect('/auth/login');
        return;
    }
  // var user = db.get("users").find({id:req.signedCookies.user}).value();
  var user = await User.findOne({_id:req.signedCookies.user});
    if(!user){
        res.redirect('/auth/login');
        return;
    }
  res.locals.user = user
  next();
}