/*
	options = {
		paginate : {
			start : 2,
			per_page : 20
		}
	}
*/
var _ = require('lodash');
module.exports = function(mongoose) {
    mongoose.Query.prototype.paginate = function(options, callback) {
        var defaults = {
                start: 0,
                per_page: 10
            },
            query = this;
        if (options && options.paginate) {
            options = _.extend(options.paginate, defaults);
            console.log(options);
            query.model.count(query._conditions, function(err, total) {
                if (err)
                    return callback(err, null);
                query.skip(options.start)
                    .limit(options.per_page)
                    .exec(function(err, results) {
                        if (err) return callback(err, null)
                        var last_page = Math.ceil(total / options.per_page);
                        if (start > last_page) start = last_page;
                        var augmenetedResult = {
                            results: results || [],
                            total: total,
                            current_page: options.start,
                            per_page: options.per_page,
                            last_page: last_page
                        }

                        callback(null, augmenetedResult);
                    })
            })
        } else {
            query.exec(function(err, results) {
                callback(err, results);
            })
        }
    }
}
