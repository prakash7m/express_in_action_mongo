var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local").Strategy;
var setup = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, done)
    });
}
var ensureAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}

passport.use("login", new LocalStrategy(function (username, password, done) {
    User.findOne({username:username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: "User not found"});
        }
        user.checkPassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: "Invalid Password"});
            }
        })
    })
}))
module.exports = {
    setup: setup,
    ensureAuthentication: ensureAuthentication
};