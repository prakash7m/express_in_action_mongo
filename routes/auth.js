var express = require("express"),
    router = express.Router(),
    passport = require("passport");

router.get("/facebook", passport.authenticate("facebook", {
    scope: ['public_profile', 'user_friends']
}));

router.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/users",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/facebook/deauthorize", function (req, res, next) {
    console.log("deauthorized")
});

module.exports = router;

