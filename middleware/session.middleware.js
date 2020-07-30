var shortid = require("shortid");
// var db = require('../db');

var Session = require('../models/sessions.model')

module.exports =  async function(req,res,next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate()
        res.cookie("sessionId",sessionId,{
            signed: true
        });
        await Session.create({id: sessionId});
    }
    next();
}