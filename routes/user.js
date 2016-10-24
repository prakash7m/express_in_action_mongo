var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");



router.get("/", function (req, res, next) {
    User.find().sort({createdAt: "ascending"}).exec(function (err, users) {
        if (err) { return next(err); }
        if (!users) { return next(404); }
        res.render("index", {users: users})
    });
});


router.get("/edit", function (req, res, next) {
    res.render("edit", {user: {}, csrfToken: req.csrfToken()});
});

router.get("/edit/:username", function (req, res, next) {
    User.findOne({username: req.params.username}).exec(function (err, user) {
        if (user) {
            console.log(user)
            res.render("edit", {user: user, csrfToken: req.csrfToken()})
        } else {
            req.flash("error", "User does not exists");
            res.redirect("/users/edit")
        }
    });
})

router.post("/edit", function (req, res, next) {
    var username = req.body.username,
        password = req.body.password,
        displayName = req.body.displayName,
        bio = req.body.bio,
        id = req.body.id,
        createUpdateUser = function (user) {
            if (!id) {
                user.username = username;
                user.password = password;
            }
            user.displayName = displayName;
            user.bio = bio;
            user.save(function (err) {
                if (err) {
                    req.flash("error", err.message);
                    res.redirect("/users/signup");
                } else {
                    req.flash("info", id ? "User edited successfully" : "User added successfully");
                    res.redirect("/users");
                }
            });
        };
    
    if (id) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                createUpdateUser(user);
            } else {
                req.flash("error", "User does not exists");
                res.redirect("/users/edit/" + username);
            }
        })
    } else {
        var user = new User();
        createUpdateUser(user);
    }
});

router.get("/:username", function (req, res, next) {
    User.findOne({username: req.params.username}).exec(function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(404); }
        res.render("profile", {user: user, csrfToken: req.csrfToken()})
    });
});

router.get("/delete/:username", function (req, res, next) {
    User.findOne({username: req.params.username}).exec(function (err, user) {
        if (err) { return next(err);}
        if (!user) {
            req.flash('error', 'User does not exists');
            res.redirect("/users")
        }
        user.remove(function (err) {
            req.flash('info', 'User deleted successfully');
            res.redirect("/users");
        });
    })
})



module.exports = router;