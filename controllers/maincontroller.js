var mongodb = require('mongodb');

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
    var mappedErrors = req.validationErrors(true);
    console.log(mappedErrors);
    var entry = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        approved: false,
        date: new Date()
    };

    var server = new mongodb.Server("itsweb-opserver.hs.wvu-ad.wvu.edu", 27017, {});
    var client = new mongodb.Db('guestbook', server),
        test = function (err, collection) {
            collection.insert(entry);
        };

    client.open(function (err, p_client) {
        client.collection('entries', test);
    });
    //req.db.push(req.body.item);
    res.render('addentry', { title: 'Express' });
};