var express = require('express'),
    app = express(),
    PORT = 5000 || process.env.port,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

//Importing passport libraries
var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

app.set("view engine","ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/event_db");


//=====================
//       MODELS
//=====================

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

var User = mongoose.model("User", userSchema);

//Application model
var appSchema = new mongoose.Schema({
    to : String,
    from : String,
    subject : String,
    purpose : String,
    timing : String,
    description : String,
    applicant : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            rel : "User"
        },
        username : String,
        email : String
    }
}, {timestamps : true});

var App = mongoose.model("App", appSchema);

//Express-session setup
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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

//=====================
//       ROUTES
//=====================


//Home route
app.get("/", function(req, res){
    res.render("home");
});

//Application route
app.get("/application", function(req, res){
    res.render("application");
});

app.get("/application/new", function(req, res){
    res.render("newapplication");
});

app.post("/application", function(req, res){

});

// AUTH ROUTES

//Register Route
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    var user = new User({username : req.body.username, club_name : req.body.club_name, club_head_name : req.body.club_head_name, contact : req.body.contact, email : req.body.email});
    User.register(user, req.body.password, function(err, newUser){
        if(err)
           console.log(err);
        else
        {
            passport.authenticate("local")(req, res, function(){
                if(err)
                    console.log(err);
                else
                    res.send("success");
            });
        }
    });
});

//Login Route
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect : "/login"
}));

//Logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
})

app.listen(PORT, function(err){
    if(err)
        console.log(err);
    else
        console.log("Server started at PORT : "+PORT);
});