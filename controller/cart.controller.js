// const db = require("../db");
var shortid = require("shortid");

const Book = require("../models/books.model");
var Session = require('../models/sessions.model');
var Temp = require('../models/temps.model');

const { count } = require("../models/sessions.model");
const User = require("../models/users.model");
const Tran = require("../models/trans.model");

var countSessions = 0;

module.exports.addToCart = async function(req,res,next){
    var bookId = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/books');
        return;
    }
    countSessions+=1;
    // var count = db.get('sessions')
    // .find({id: sessionId})
    // .get('cart.' + bookId, 0).value();
    // db.get('sessions')
    // .find({id: sessionId})
    // .set('cart.' + bookId,count+1).write();
    var dbSession = await Session.findOne({id:sessionId});
    console.log("dbSessions",dbSession);
    var count;
    if(!dbSession.cart){
        count = 0;
    }
    else{
        var takeCart = dbSession.cart;
        for(var key in takeCart){
            if(key===bookId){
                count =  takeCart[key];
                break;
            }
            count = 0
        }
    }
    var x = await (await Session.findOne({id: sessionId})).set('cart.'+bookId,count+1);
    await x.save();
    res.redirect('/books');
    // console.log(x);
    //var count = await Session.findOne({id:sessionId});
}
module.exports.cart = async function(req,res,next){
    var id = req.signedCookies.user;
    var sessionsId = req.signedCookies.sessionId;
    var x=await Temp.find();
    var takeSessions = await Session.findOne({id:sessionsId}); 
    console.log("takeSession",takeSessions);
    if(!takeSessions){
        res.render('./cart/index',{books:x})
    }
    var cartObj = takeSessions.cart;
    var keyObj = Object.keys(takeSessions.cart);
    for(var i=0;i<keyObj.length;i++){
        var takeBook = await Book.findOne({_id:keyObj[i]});
        takeBook.sl = cartObj[keyObj[i]] || 0;
        // db.get('temps').push(takeBook).write();
        console.log(takeBook);
        await Temp.insertMany(takeBook);
    }
    var books = await Temp.find();
    console.log(books);
    // db.get('sessions')
    // .remove({id:sessionsId})
    // .write()
    await (await Session.findOneAndDelete({id:sessionsId})).save();
    res.render('./cart/index',{books: books});
}
module.exports.transBook =async function(req,res,next){
    var bookId = req.params.bookId;
    var idUser = req.signedCookies.user;
    var aTrans = {
        idBook:bookId, 
        idUser:req.signedCookies.user,
        id:shortid.generate(),
        isComplete: false
    }
    await Tran.insertMany(aTrans);
    // var takeUser = db.get('users').find({id:req.signedCookies.user}).value();
    // var userTrans=db.get("trans").value();
    var takeUser = await User.findOne({_id:req.signedCookies.user})
    var userTrans = await Tran.find();
    var filTrans = userTrans.filter(function(x){
        return x.idUser===req.signedCookies.user;
    })
    var takeTrans = filTrans.map( async function(item){
        var takeBook = await Book.findOne({_id: item.idBook});
        var takeUser = await User.findOne({_id: item.idUser});
        return{
            user: takeUser.name,
                book: takeBook.title,
                status: item.isComplete,
                id: item._id
        }
    })
    // db.get('temps')
    // .remove({id:bookId})
    // .write()
    await (await Temp.findOneAndDelete({id:bookId})).save();
    Promise.all(takeTrans).then(function(values){
        res.render("./transactions/index", {
            trans:values,
            admin:takeUser.isAdmin
        });
    })
}