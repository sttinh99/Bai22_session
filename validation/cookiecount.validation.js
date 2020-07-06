var countCookie = 0;
module.exports.cookies = function(req,res,next){
   if(req.cookies.user);
   {
       countCookie++;
   }
   console.log("count:",countCookie);
    next();
}