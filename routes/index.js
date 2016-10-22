var express = require("express");
var router = express.Router();
var user = require("./user.js");
var passport = require("passport");
var setupPassport = require("../setuppassport");
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.use("/users", setupPassport.ensureAuthentication, user);

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
    res.render("edit", {user: {}})
})

module.exports = router;