'use strict';

module.exports = function(app) {
    var customer = require('../Controllers/CustomerController');
    var product = require('../Controllers/ProductsController');
    var cart = require('../Controllers/CartController');
    var auth = require('../Controllers/AuthController');

    //Customer
    app.route('/').get(customer.index);
    app.route('/customer').get(customer.customers);
    app.route('/customer/:id').get(customer.findCustomer);
    app.route('/customer').post(customer.createCustomer);
    app.route('/customer').put(customer.updateCustomer);
    app.route('/customer').delete(customer.deleteCustomer);
    
    //Product
    app.route('/product').get(product.products);
    app.route('/product/:id').get(product.findProduct);
    app.route('/product').post(product.createProduct);
    app.route('/product').put(product.updateProductStock);
    app.route('/product').delete(product.deleteProduct);
    app.route('/product/:offset/:limit').get(product.loadMoreProduct);

    //Cart
    app.route('/cart/:id').get(cart.getCartList);
    app.route('/cart').post(cart.addToCart);
    app.route('/cart/:id/:id/:isAdd').put(cart.updateCartQuantity);

    //Auth
    app.route('/auth').post(auth.getToken);
    app.route('/auth/getUser').post(auth.getUser);
};
