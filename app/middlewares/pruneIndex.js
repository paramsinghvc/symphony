var fields, filters, paginate, sortings;

module.exports = {
    init: function(mongoose) {
        fields = require('./fields')(mongoose);
        filters = require('./filters')(mongoose);
        paginate = require('./paginate')(mongoose);
        sortings = require('./sortings')(mongoose);

        mongoose.Query.prototype.prune = function(options, callback) {
            var query = this;
            query.fields(options)
                .filters(options)
                .sortings(options)
                .paginate(options, callback)
        }
    }
}
