'use strict';
var response = require('../response');
var connection = require('../connection');
var md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getToken = function (req, res){
    console.log('getToken loading..')
    const user = {
        id: null,
        firstname: null,
        lastname: null,
        email: null
    }

    if (!req.body.email || !req.body.password){
        return res.status(401).send('credential is required');
    }

    connection.query('SELECT id, firstname, lastname, email FROM CUSTOMER WHERE EMAIL = ? AND PASSWORD = ? LIMIT 1',
    [ req.body.email, req.body.password ],
    function (error, rows, fields){
        if(error){
            console.log(error);
            return res.status(500).send('Internal Server Error');
        } else{
            if(rows.length < 1){
                console.log(`rows length : ${rows.length}`);
                return res.status(401).send('User Not Found');
            }
            user.id = rows[0].id;
            user.firstname = rows[0].firstname;
            user.lastname = rows[0].lastname;
            user.email = rows[0].email;

            console.log('getToken success');
            console.log(user);

            jwt.sign({user}, 'letscontrib', { expiresIn: '3000s' }, (err, token) => {
                res.json({
                    token
                });
            });
        }
    });
};

exports.getUser = function(req, res){
    console.log('getUser loading..')
    // Check Header
    // Authorization: Bearer <access_token>
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const access_token = bearer[1];
        req.token = access_token;
        // console.log(req.token); //debug
    } else {
        console.log(typeof bearerHeader);
        return res.sendStatus(403); //forbidden
    }

    // Check JWT
    jwt.verify(req.token, config.secret, (err, authData) => {
        if(err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            console.log("getUser success");
            res.json({
                message: 'Enjoy :)',
                authData
            });
        }
    });
};