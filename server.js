
/**
 * Module dependencies.
 */

var express = require('express')
  , maincontroller = require('./controllers/maincontroller')
  , http = require('http')
  , path = require('path')
  , mongodb = require('mongodb');

var app = express();
var server = new mongodb.Server("itsweb-opserver.hs.wvu-ad.wvu.edu", 27017, {});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', maincontroller.index);
app.get('/addentry', maincontroller.addentry);
app.post('/postentry', maincontroller.postentry);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
