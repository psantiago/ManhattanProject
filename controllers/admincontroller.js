var mongodb = require('mongodb');
var model = require('../models/login');
var adminUser = {
    username: 'Admin',
    password: 'Admin'
};

exports.login = function (req, res) {
    res.render('login', { title: 'Manhattan Project | Login' });
};

exports.verifyLogin = function (req, res) {
    req.assert('username', 'required').notEmpty();
    req.assert('password', '6 to 20 characters required').len(6, 20);
    var mappedErrors = req.validationErrors(true);
    
    if (mappedErrors == null) {
        if (req.body.username == adminUser.username && req.body.password == adminUser.password) {
            
        } else {
            mappedErrors = {};
            mappedErrors.login = {param: 'login', msg:'Invalid login'};
        }
        res.render('login',  mappedErrors);
    } else {
        res.render('login',  mappedErrors);
    }
};