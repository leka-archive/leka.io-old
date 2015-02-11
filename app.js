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

app.get('/', homeCtrl.get);
app.use(function(req, res, next){
    res.redirect('/');
});

app.listen(config.port);
console.log('app running on port ' + config.port);