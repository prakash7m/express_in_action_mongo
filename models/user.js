var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var SALT_FACTOR = 10;
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    displayName: String,
    bio: String,
    facebook: Object
});

userSchema.methods.name = function () {
    return this.displayName || this.username;
}
userSchema.methods.getBio = function () {
    return this.bio || "Not available";
}

userSchema.methods.checkPassword = function (toCheck, done) {
    bcrypt.compare(toCheck, this.password, function (err, isMatch) {
        done(err, isMatch);
    })
}

userSchema.methods.isUnique = function (toCheck, done) {
    
}

userSchema.pre('save', function (done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, function () {}, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        })
    });
});


var User = mongoose.model("User", userSchema);
module.exports = User;