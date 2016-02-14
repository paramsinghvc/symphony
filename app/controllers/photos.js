var Photo = require('../models/photo');

module.exports = {
    store: function(req, res) {
        var photo = new Photo();
        photo.name = req.body.name;
        photo.save();
        res.json({
            msg: 'Photo saved successfully',
            photo: photo
        });
    },
    getAll: function(req, res){
    	Photo.find(function(err, photos){
    		if(err) res.send(err);
    		res.json({photos : photos})
    	})
    }
}
