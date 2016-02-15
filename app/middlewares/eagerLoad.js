/*
	options = {
	    eagerLoad: [{
	        'followers',
	        {
	            'following': 'name -_id username'
	        },
	        'withPhotos'
	    }]
	}
*/	

module.exports = function(mongoose) {
    mongoose.Query.prototype.eagerLoad = function(options) {
        var query = this;
        if (options && options.eagerLoad) {
            var eagerLoad = options.eagerLoad;
            var modelEagerLoads = query.model.getEagerLoads() || [];

            eagerLoad.forEach(function(e) {
                if (typeof e === 'string') {
                    if (query.model.scehma.path(e))
                        query.populate(e);
                    else {
                        if (modelEagerLoads[e]) {
                            modelFilters[e].call(this, query);
                        }
                    }
                } else if (toString.call(e) === '[object Object]') {
                    if (query.model.schema.path(e)) {
                        query.populate({
                            path: e,
                            select: eagerLoad[e]
                        });
                    }
                }
            })
        }
        return query;
    }
}
