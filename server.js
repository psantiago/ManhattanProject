var util = require('util')
  , express = require('express')
  , maincontroller = require('./controllers/maincontroller')
  , admincontroller = require('./controllers/admincontroller')
  , http = require('http')
  , path = require('path')
  , mongodb = require('mongodb')
  , expressValidator = require('express-validator');

var app = express();
//var db = new mongodb.Db('guestbook', new mongodb.Server("itsweb-opserver.hs.wvu-ad.wvu.edu", 27017, {safe:true}));

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hjs');
    app.use(express.favicon());
    app.use(express.logger('dev'));

    //create db middleware
    //app.use(function (req, res, next) {
    //    req.db = db;
    //    next();
    //});

    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.cookieSession({ secret: 'imasecret' }));
    app.use(expressValidator());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

/**** routes ****/
app.get('/', maincontroller.index);
app.get('/addentry', maincontroller.addentry);
app.post('/addentry', maincontroller.postentry);
app.get('/login', admincontroller.login);
app.post('/login', admincontroller.verifyLogin);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
