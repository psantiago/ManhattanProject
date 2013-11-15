
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
var client = new mongodb.Db('test', server),
    test = function (err, collection) {
        collection.insert({ a: 2 }, function (err, docs) {

            collection.count(function (err, count) {
                console.log(count);
            });

            // Locate all the entries using find
            collection.find().toArray(function (err, results) {
                //test.assertEquals(1, results.length);
                //test.assertTrue(results[0].a === 2);

                // Let's close the db
                client.close();
            });
        });
    };

client.open(function(err, p_client) {
  client.collection('test_insert', test);
});
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
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
