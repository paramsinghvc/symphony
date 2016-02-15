/*
	options = {
		fields : 'name username bio' or 'name, username, bio' or 'name,username,bio' or ['name', 'username', 'bio'] or 'name'
	}
*/
module.exports = function(mongoose) {

    mongoose.Query.prototype.fields = function(options) {
        var query = this;
        if (options && options.fields) {
            var fields = options.fields
            if (typeof fields === 'string' && (fields.match(/[\s\,]+/g))) {
             
                fields = fields.split(/[\s\,]+/g);
            
            }
            
            if ((toString.call(fields) === '[object Array]') && (fields.length > 0)) {
                fields.forEach(function(field) {
                    var f = field.trim();
                    if (query.model.schema.path(f))
                        query.select(f);
                })
            }
            else{
            	if(query.model.schema.path(fields)){
            		query.select(fields.trim());
            	}
            }
        }

        return this;
    }
}
