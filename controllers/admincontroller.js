var mongodb = require('mongodb');
var model = require('../models/login');
var adminUser = {
    username: 'Admin',
    password: 'Admin'
};

exports.login = function (req, res) {
    if (req.session.loggedin) {
        res.writeHead(302, { 'Location': '/manage' });
        res.end();
    } else {
        res.render('login', { title: 'Manhattan Project | Login' });
    }
    
};

exports.verifyLogin = function (req, res) {
    req.assert('username', 'required').notEmpty();
    req.assert('password', '6 to 20 characters required').len(3, 20);
    var mappedErrors = req.validationErrors(true);
    
    if (mappedErrors == null) {
        if (req.body.username == adminUser.username && req.body.password == adminUser.password) {
            req.session.loggedin = true;
            res.writeHead(302, {'Location': '/manage'});
            res.end();
        } else {
            mappedErrors = {};
            mappedErrors.login = { param: 'login', msg: 'Invalid login' };
            req.session.loggedin = false;
            res.render('login', mappedErrors);
        }
    } else {
        res.render('login',  mappedErrors);
    }
};

exports.manage = function(req, res) {
    if (!req.session.loggedin) {
        res.render('login', { title: 'Manhattan Project | Login' });
    } else {
        var server = new mongodb.Server("itsweb-opserver.hs.wvu-ad.wvu.edu", 27017, {});
        var client = new mongodb.Db('guestbook', server),
            test = function(err, collection) {
                var cursor = collection.find({}, ['name', 'message', 'date', '']);
                cursor.sort({ date: -1 });
                cursor.toArray(function(err, docs) {
                    res.render('manage', { title: 'Manhattan Project | Manage', Model: docs });
                    console.log(docs);
                });
            };
        client.open(function(err) {
            client.collection('entries', test);
        });
    }
};

exports.approve = function(req, res) {
    if (!req.session.loggedin) {
        res.render('login', { title: 'Manhattan Project | Login' });
    } else {
        var server = new mongodb.Server("itsweb-opserver.hs.wvu-ad.wvu.edu", 27017, {});
        var client = new mongodb.Db('guestbook', server),
            test = function (err, collection) {
                console.log(req.query.id);
                collection.update({ '_id': new mongodb.ObjectID(req.query.id) }, { $set: { approved: true } }, { safe: true },
                    function(err) {
                        if (err) console.warn(err.message);
                        else console.log('successfully updated');
                    });
            };
        client.open(function (err) {
            client.collection('entries', test);
            res.end(req.query.id);
        });
    }
};

exports.deny = function(req, res) {
    if (!req.session.loggedin) {
        res.render('login', { title: 'Manhattan Project | Login' });
    } else {
        var server = new mongodb.Server("itsweb-opserver.hs.wvu-ad.wvu.edu", 27017, {});
        var client = new mongodb.Db('guestbook', server),
            test = function (err, collection) {
                collection.update({ '_id': new mongodb.ObjectID(req.query.id) }, { $set: { approved: false } }, { safe: true },
                    function (err) {
                        if (err) console.warn(err.message);
                        else console.log('successfully updated');
                    });
            };
        client.open(function (err) {
            client.collection('entries', test);
            res.end(req.query.id);
        });
    }

};

exports.logout = function(req, res) {
    req.session.loggedin = false;
    res.writeHead(302, { 'Location': '/' });
    res.end();
};