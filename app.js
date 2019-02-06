var express = require('express'),
    app = express(),
    PORT = 5000 || process.env.port;

app.get("/", function(req, res){
    res.send("Home page coming soon...");
})

app.listen(PORT, function(err){
    if(err)
        console.log(err);
    else
        console.log("Server started at PORT : "+PORT);
})