'use strict';
var response = require('../response');
var connection = require('../connection');
var auth = require('./AuthController');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getCartList = function(req, res) {

    var id = req.params.id;

    connection.query('SELECT * FROM ORDERS O WHERE O.CUSTOMERID = ? AND STATUS = ? ',
    [ id, 'NEW' ], 
    function (error, rows, fields){
        if(error){
            console.log(error);
        } else{
            response.ok(rows, res);
        }
    });

};

exports.addToCart = function(req,res){
    var customerid = req.body.customerid;
    var productid = req.body.productId;
    var quantity = req.body.quantity;

    connection.query('CALL spAddToCart(?, ?, ?)',
    [ customerid, productid, quantity ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Add To Cart Successfully!", res)
        }
    });
};

exports.checkOut = function(req, res){
    if (!req.decoded) return; // required middleware.CheckToken before

    let user_id = req.decoded.user.id;
    console.log(user_id);

    let cart = req.body;
    console.log(cart);
    console.log(JSON.stringify(cart));
    connection.query('CALL spCheckOut(?,?);',
    [ user_id, JSON.stringify(cart) ], 
    function (error, rows, fields){
        if(error){
            console.log(error);
            res.status(500).send(error);
        } else{
            console.log(res);
            response.ok("Checkout Success!", res);
        }
    });
};

exports.updateCartQuantity = function(req,res){
    var customerid = req.body.customerid;
    var itemid = req.body.itemid;
    var isadd = req.body.isadd;

    connection.query('UPDATE ORDERITEM SET QUANTITY = QUANTITY-1 WHERE PRODUCTID = ? AND ID = ? AND',
    [ isadd, productid, quantity ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Cart Updated Successfully!", res)
        }
    });
};