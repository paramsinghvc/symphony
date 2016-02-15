var User = require('../models/user');
var Photo = require('../models/photo');

module.exports = {

    getAll: function(req, res) {
        console.log(req.query)
        User.find().populate({
            path: 'photo',
            select: 'name -_id'
        }).prune(req.query, function(err, users) {
            if (err) res.status(500).send(err);
            res.json(users);
        })
    },

    store: function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function(err) {
            if (err) {
                if (err.code == 11000)
                    return res.status(400).json({
                        msg: 'Duplicate entry for the username'
                    });
                else
                    return res.status(500).send(err);
            }
            res.json({
                msg: 'User created successfully'
            });
        });
    },

    getOne: function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            res.json(users);
        })
    },

    update: function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);

            if (req.body.username) user.username = req.body.username;
            if (req.body.name) user.name = req.body.name;
            if (req.body.password) user.password = req.body.password;
            user.save(function(err) {
                if (err) res.send(err)

                res.json({
                    msg: 'User updated successfully'
                });
            })
        })
    },

    remove: function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) res.send(err);
            res.json({
                msg: 'User deleted successfully'
            });
        })
    },

    attachPhoto: function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            Photo.findById(req.params.photo_id, function(err, photo) {
                if (err) res.send(err);
                user.photo = photo;
                user.save();
                res.json({
                    msg: 'Saved successfully',
                    user: user
                });
            })
        })
    }
}
