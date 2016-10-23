var express = require("express");
var router = express.Router();

/* routes */
var user = require("./user.js");
var auth = require("./auth");
var User = require("../models/user");


var passport = require("passport");
var setupPassport = require("../setuppassport");
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.use("/users", setupPassport.ensureAuthentication, user);
router.use("/auth", auth);

router.get("/login", function (req, res, next) {
    res.render("login");
});
router.post("/login", passport.authenticate("login", {
    successRedirect: "/users",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", function (req, res, next) {
    req.logout();
    res.redirect("/login")
});
router.get("/signup", function (req, res, next) {
    res.render("signup")
});
router.post("/signup", function (req, res, next) {
    var username = req.body.username,
        password = req.body.password,
        user = new User({
            username: username,
            password: password
        });

    user.save(function (err) {
        if (err) {
            req.flash("error", "Can not sign up now");
            res.redirect("/signup");
        }
        next();
    });
}, passport.authenticate("login", {
    successRedirect: "/users",
    failureRedirect: "/login",
    failureFlash: true
}))


module.exports = router;