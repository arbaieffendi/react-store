var express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser');
    // controller = require('./Controllers/CustomerController');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./routes');
routes(app);
app.listen(port);
console.log('Store Backend Server started on: ' + port + '\nRegards,\nArba');