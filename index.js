const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const server = express();
server.use(express.static("public"));

server.use(bodyParser.urlencoded({extended : true}));

server.set("view engine","ejs");

server.listen(process.env.PORT || 3000, function(){
    console.log("Server started...");
});

let taskList = ["Play with Pranshi","order food"];
server.get("/",function(req,res){
    
    let today = new Date();
    let option = {weekday : "long", day : "numeric", month: "long"}
    let day = today.toLocaleDateString("en-US",option)
    console.log(day);
    let jsonData= {
        tasks : taskList
    }
    res.render("list",jsonData);
});

server.post("/",function(req,res){
    console.log(JSON.stringify(req.body));
    let taskName = req.body.taskName;
    taskList.push(taskName);
    res.redirect("/");
});

