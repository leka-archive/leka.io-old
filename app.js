var config = require('./config/config'),
    express = require('express');

var initializer = require('./helpers/initializer'),
    homeCtrl = require('./controllers/home');

// App Setup
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
initializer.start(app);


// EJS Helpers
//Helpers
//var padStr = function(i) {
//    return (i < 10) ? "0" + i : "" + i;
//};
//
//app.locals.dateToDDMMYYYY = function(dte) {
//    if (dte == null)
//        return "-";
//    return padStr(dte.getDate()) + '/' + padStr(1 + dte.getMonth()) + '/' + padStr(dte.getFullYear());
//};

// Routes
//app.get('/', function(req, res) {
//    res.writeHead(301, {Location: '/home'});
//    res.end();
//});
app.get('/home', homeCtrl.get);

app.use(function(req, res, next){
    res.redirect('/home');
});

app.listen(config.port);
console.log('app running on port ' + config.port);