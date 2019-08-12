'use strict';
module.exports = function(app) {
    var customer = require('./Controllers/CustomerController');
    app.route('/').get(customer.index);
    app.route('/customer').get(customer.customers);
    app.route('/customer/:id').get(customer.findCustomer);
    app.route('/customer').post(customer.createCustomer);
    app.route('/customer').put(customer.updateCustomer);
    app.route('/customer').delete(customer.deleteCustomer);
    
    app.route('/product').get(customer.products);
    app.route('/product/:id').get(customer.findProduct);
    app.route('/product').post(customer.createProduct);
    app.route('/product').put(customer.updateProductStock);
    app.route('/product').put(customer.deleteProduct);
    app.route('/product/:offset/:limit').get(customer.loadMoreProduct);

    app.route('/cart/:id').get(customer.getCartList);
    app.route('/cart').post(customer.addToCart);
    app.route('/cart/:id/:id/:isAdd').put(customer.updateCartQuantity);

    app.route('/auth/getToken').post(customer.getToken);
    app.route('/auth/getUser').post(customer.getUser);
};
