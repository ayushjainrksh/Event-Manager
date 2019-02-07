var express = require('express'),
    app = express(),
    PORT = 5000 || process.env.port,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

app.set("view engine","ejs");
app.use(express.static("assets"));
mongoose.connect("mongodb://localhost/event_db");

//User Model
var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    club_name : String,
    club_head_name : String,
    contact : Number,
    email : String
},{timestamps : true});

userSchema.plugin(passportLocalMongoose);

var user = mongoose.model("User", userSchema);

app.use(require("express-session")({
    secret : "I am AJ",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES
app.get("/", function(req, res){
    res.render("home");
});

// app.get("/events", function(req, res){
//     res.send("This will be event route");
// });

app.listen(PORT, function(err){
    if(err)
        console.log(err);
    else
        console.log("Server started at PORT : "+PORT);
});