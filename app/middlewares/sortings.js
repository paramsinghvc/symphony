/*
	options = {
		sortings : {
			name : 'asc',
			posted_on : 'desc'
		}
	}
*/
module.exports = function(mongoose) {
    mongoose.Query.prototype.sortings = function(options) {
        var query = this;
        if (options && options.sortings) {
        	var sortings = options.sortings;
            Object.keys(sortings).forEach(function(sorting) {
            	var obj = {};
            	obj[sorting] = (sortings[sorting] === 'desc') ? -1 : 1;
            	query.sort(obj);
            })
        }
        return query;
    }
}
