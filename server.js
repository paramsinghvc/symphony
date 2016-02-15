var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    db = require('./config/db'),
    path = require('path'),
    pruneIndexMiddleware = require('./app/middlewares/pruneIndex');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
})

app.use(morgan('dev'));

mongoose.connect(db.database);

pruneIndexMiddleware.init(mongoose);

app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/api')(app, express);

app.use('/api', apiRoutes);

app.listen(db.port);
console.log('Magic happens on port ' + db.port);
