'use strict';
var response = require('../response');
var connection = require('../connection');

exports.getCartList = function(req, res) {

    var id = req.params.id;

    connection.query('SELECT OI.*, P.NAME, P.IMAGE_URL FROM ORDERS O INNER JOIN ORDERITEM OI ON O.ID = OI.ORDERID INNER JOIN PRODUCT P ON OI.PRODUCTID = P.ID WHERE O.CUSTOMERID = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
            console.log(res);
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