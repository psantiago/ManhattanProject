var mongodb = require('mongodb');
var model = require('../models/entry');

exports.index = function (req, res) {
  res.render('index', { title: 'Express' });
};

exports.addentry = function (req, res) {
    res.render('addentry', { title: 'Express' });
};

exports.postentry = function (req, res) {
    
    req.assert('email', 'required').notEmpty();
    req.assert('email', 'valid email required').isEmail();
    req.assert('name', '6 to 20 characters required').len(6, 20);
    req.assert('message', '6 to 20 characters required').notEmpty().len(5, 500);
    
    var mappedErrors = req.validationErrors(true);
    console.log(mappedErrors);
    if (mappedErrors == null) {
        var entry = model.new(
            req.body.name,
            req.body.email,
            req.body.message,
            false,
            new Date()
        );

        var server = new mongodb.Server("itsweb-opserver.hs.wvu-ad.wvu.edu", 27017, {});
        var client = new mongodb.Db('guestbook', server),
            test = function(err, collection) {
                collection.insert(entry);
            };

        client.open(function(err, p_client) {
            client.collection('entries', test);
        });
        res.render('addentry', { title: 'Express' });
    } else {
        res.render('addentry', mappedErrors);
    }
    
};