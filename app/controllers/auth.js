var User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    db = require('../../config/db');

var superSecret = db.secret;

module.exports = {
    check: function(req, res) {
        User.findOne({
                username: req.body.username
            })
            .select('name username password')
            .exec(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.status(404).json({
                        success: false,
                        message: 'Authentication Failed. User Not Found'
                    })
                } else if (user) {
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.status(404).json({
                            success: false,
                            message: 'Authentication Failed. Wrong Password!'
                        })
                    } else {
                        var token = jwt.sign({
                            name: user.name,
                            username: user.username
                        }, secret, {
                            expiresInMinutes: 1440
                        });

                        res.json({
                            success: true,
                            message: 'Here\'s your token!',
                            token: token
                        })
                    }
                }
            })
    },

    validateTokenMiddleware: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err)
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate.'
                    })
                else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.status(403).json({
                success: false,
                message: 'No token provided.'
            });
        }
    },

    getUser: function(req, res) {
        res.json(req.decoded);
    }
}
