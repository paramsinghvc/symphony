var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');
var schemaConfig = {
    name: String,
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    bio : String,
    location : {
        coords : []
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }
}
var UserSchema = new Schema(schemaConfig);

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}
UserSchema.pre('find', function(){
    this.select('name username location');
});
UserSchema.post('find', function(results, next){
    // console.log(arguments);
    next();    
})
module.exports = mongoose.model('User', UserSchema);
