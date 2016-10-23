var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy; 
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
}));

passport.use("facebook", new FacebookStrategy({
    clientID        : "REMOVED WHEN COMITTING TO GIT",
    clientSecret    : "REMOVED WHEN COMITTING TO GIT",
    callbackURL     : "http://localhost:9000/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'email', 'gender', 'link', 'locale', 'timezone', 'updated_time', 'verified']
}, function (token, refreshToken, profile, done) {
    console.log(profile)
    process.nextTick(function () {
        User.findOne({'facebook.id': profile.id}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            } else {
                var newUser = new User({
                    username: "facebook_" + profile.id + "_" + Math.random(100),
                    displayName: profile.first_name + " " + profile.last_name,
                    bio: profile.bio,
                    password: "VerySecret",
                    facebook: profile._json
                });
                newUser.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser)
                });
            }
        });
    })
}))
module.exports = {
    setup: setup,
    ensureAuthentication: ensureAuthentication
};