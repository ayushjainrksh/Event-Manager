var express = require('express'),
    app = express(),
    PORT = 5000 || process.env.port,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    
var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
    
app.set("view engine","ejs");

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