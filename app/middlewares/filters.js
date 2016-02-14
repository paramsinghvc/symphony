/*
	options = {
	    filters: [{
	        for_ids: [1, 2, 3]
	    }, {
	        name: 'xyz'
	    }, {
	    	for_follower : 23
	    }]
	}
*/

module.exports = function(mongoose) {
    mongoose.Query.prototype.filters = function(options) {
        var query = this;
        if (options && options.filters) {
            var filters = options.filters;
            if (toString.call(filters) !== '[object Object]')
                throw 'Invalid type of filters passed';

            var modelFilters = query.model.getFilters() || [];

            Object.keys(filters).forEach(function(f) {
                if (modelFilters[f]) {
                    modelFilters[f].call(this, query, filters[f]);
                } else if (query.model.schema.path(f)) {
                    if (toString.call(filters[f]) === '[object Array]')
                        query.where(f).in(filters[f]);
                    else
                        query.where(f).equals(filters[f]);
                }
            })
        }
        return query;
    }
}
