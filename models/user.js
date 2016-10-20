var mongoose = require("mongoose");
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
    bio: String
});

userSchema.methods.name = function () {
    return this.displayName || this.username;
}