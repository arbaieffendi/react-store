'use strict';

module.exports = function(app) {
    var customer = require('./Controllers/CustomerController');
    var product = require('./Controllers/ProductsController');
    var cart = require('./Controllers/CartController');
    var auth = require('./Controllers/AuthController');

    var middleware = require('./middleware');
    
    //Customer
    app.route('/').get(customer.index);
    app.get('/customer', middleware.checkToken, customer.customers);
    app.get('/customer/:id',middleware.checkToken, customer.findCustomer);
    app.post('/customer', middleware.checkToken, customer.createCustomer);
    app.put('/customer', middleware.checkToken, customer.updateCustomer);
    app.delete('/customer', middleware.checkToken, customer.deleteCustomer);
    
    //Product
    app.get('/product', product.products);
    app.get('/product/:id', product.findProduct);
    app.get('/product/:offset/:limit', product.loadMoreProduct);
    app.post('/product', middleware.checkToken, product.createProduct);
    app.put('/product', middleware.checkToken, product.updateProductStock);
    app.delete('/product', middleware.checkToken, product.deleteProduct);    

    //Cart
    app.get('/cart/:id', middleware.checkToken, cart.getCartList);
    app.post('/cart/checkOut', middleware.checkToken, cart.checkOut);

    //Auth
    app.route('/auth').post(auth.getToken);
    app.post('/auth/getUser', middleware.checkToken, auth.getUser);
};
