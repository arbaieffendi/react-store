'use strict';
var response = require('../response');
var connection = require('../connection');

exports.index = function(req, res) {
    response.ok("The page you might looking for is not here :)", res)
};

// Customers
exports.customers = function(req, res) {
    connection.query('select * from customer', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findCustomer = function(req, res) {
    
    var id = req.params.id;

    connection.query('SELECT * FROM CUSTOMER where id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createCustomer = function(req, res) {
    
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;

    connection.query('INSERT INTO CUSTOMER (firstname, lastname, email) values (?,?, ?)',
    [ firstname, lastname, email ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Created Successfully!", res)
        }
    });
};

exports.updateCustomer = function(req, res) {
    
    var id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;

    connection.query('UPDATE CUSTOMER SET firstname = ?, lastname = ?, email= ? WHERE id = ?',
    [ firstname, lastname, email, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Updated Successfully!", res)
        }
    });
};

exports.deleteCustomer = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM CUSTOMER WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Deleted Successfully!", res)
        }
    });
}; 