'use strict';
var response = require('../response');
var connection = require('../connection');

exports.index = function(req, res) {
    response.ok("The page you might looking for is not here :)", res)
};

// Products
exports.products = function(req, res) {
    connection.query('select * from product', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findProduct = function(req, res) {
    
    var id = req.params.id;
    console.log('findProduct id:'+id);

    connection.query('SELECT * FROM product where id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.loadMoreProduct = function(req, res) {
    var offset = parseInt(req.params.offset);
    var limit = parseInt(req.params.limit);

    console.log('loadMoreProduct offset:' + offset + ' limit:' + limit );

    connection.query('SELECT * FROM PRODUCT LIMIT ?, ?',
    [offset, limit],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
}

exports.createProduct = function(req, res) {

    var name = req.body.firstname;
    var description = req.body.lastname;
    var category = req.body.category;
    var quantity = req.body.quantity;
    var unit = req.body.unit;

    connection.query('INSERT INTO PRODUCT (name, description, category, quantity, unit) values (?,?, ?, ?,?)',
    [ name, description, category, quantity, unit ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Created Successfully!", res)
            console.log(res);
        }
    });

};

exports.updateProductStock = function(req, res) {
    
    var id = req.body.id;
    var stock = req.body.stock;

    connection.query('UPDATE product SET stock = ? WHERE id = ?',
    [ stock, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Updated successfully!", res)
        }
    });
};

exports.deleteProduct = function(req, res) {
    
    var id = req.body.id;

    connection.query('UPDATE product SET ISACTIVE = 0 WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Deleted Successfully!", res)
        }
    });
};