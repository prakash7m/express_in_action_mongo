var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var setupPassport = require("./setuppassport");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var routes = require("./routes/index");
var csrf = require('csurf');
var helmet = require("helmet");
var app = express();

app.disable("x-powered-by");
app.use(helmet.frameguard("sameorigin")); // using same origin policy
app.use(helmet.noSniff()); // Don't let browsers infer the file type
app.use(helmet.xssFilter()); // Against the cross site scripting attack. It does not complety prevents from the attack but provides some safeguards.
mongoose.connect("mongodb://localhost:27017/expressmongo");
setupPassport.setup();

app.set("port", 9000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "My secret key",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(csrf());
app.use(routes);
app.use(function (err, req, res, next) {
    req.flash("error", err.code);
    res.redirect("/")
})

if(!module.parent){ 
    app.listen(app.get("port"), function () {
        console.log("Server running at " + app.get("port"));
    }); 
}


module.exports = app;
