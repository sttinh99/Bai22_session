const db = require("../db");
var shortid = require("shortid");

var countSessions = 0;

module.exports.addToCart = function(req,res,next){
    var bookId = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/books');
        return;
    }
    countSessions+=1;
    var count = db.get('sessions')
    .find({id: sessionId})
    .get('cart.' + bookId, 0).value();
    db.get('sessions')
    .find({id: sessionId})
    .set('cart.' + bookId,count+1).write();
    res.redirect('/books');
}
module.exports.cart = function(req,res,next){
    var id = res.locals.user.id;
    var sessionsId = req.signedCookies.sessionId;
    var temps = db.get('temps').value();
    console.log(temps);
    var takeSessions = db.get('sessions').find({id:sessionsId}).value(); 
    if(!takeSessions){
        res.render('./cart/index',{books:temps})
    }
    var cartObj = takeSessions.cart;
    var keyObj = Object.keys(takeSessions.cart);
    for(var i=0;i<keyObj.length;i++){
        var takeBook = db.get('books').find({id:keyObj[i]}).value();
        takeBook.sl = cartObj[keyObj[i]] || 0;
        db.get('temps').push(takeBook).write();
    }
    var books = db.get('temps').value();
    db.get('sessions')
    .remove({id:sessionsId})
    .write()
    res.render('./cart/index',{books: books});
}
module.exports.transBook = function(req,res,next){
    var bookId = req.params.bookId;
    var idUser = req.signedCookies.user;
    var aTrans = {
        idBook:bookId, 
        idUser:req.signedCookies.user,
        id:shortid.generate(),
        isComplete: false
    }
    db.get("trans").push(aTrans).write();
    var takeUser = db.get('users').find({id:req.signedCookies.user}).value();
    var userTrans=db.get("trans").value();
    var filTrans = userTrans.filter(function(x){
        return x.idUser===req.signedCookies.user;
    })
    var takeTrans = filTrans.map(function(item){
        return{
            user : db.get("users").find({id: item.idUser}).value().name,
            book : db.get("books").find({id: item.idBook}).value().title,
            id: item.id,
            status: item.isComplete
        }
    })
    db.get('temps')
    .remove({id:bookId})
    .write()
    res.render("./transactions/index", {
        trans:takeTrans,
        admin:takeUser.isAdmin
    });
}