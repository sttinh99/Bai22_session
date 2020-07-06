const express = require("express");
var db = require('../db');
module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1; //n
    var nextPage = page+1;
    var prePage = page-1;
    var perPage = 8; //x
    var start = (page-1)*perPage;
    var end = (page*perPage);
    var take = 8;
    // console.log([prePage,page,nextPage]);
    res.render("./products/index", {
        // products: db.get("products").value().slice(start,end)
        products: db.get("products").drop(start).take(take).value(),
        listPage: [prePage,page,nextPage]
    });
  };