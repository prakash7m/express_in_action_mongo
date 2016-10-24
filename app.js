var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var setupPassport = require("./setuppassport");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var routes = require("./routes/index")
var app = express();

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

app.use(routes);

if(!module.parent){ 
    app.listen(app.get("port"), function () {
        console.log("Server running at " + app.get("port"));
    }); 
}


module.exports = app;
