var express = require("express");
var app = express();

app.get("/", function(req,res){
   res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animalName", function(req,res){
   var sounds = {
       pig: "Oink",
       dog: "Woof Woof!",
       cat: "Moo"
   }
   
   var animalName = req.params.animalName; 
   var sound = sounds[animalName];
   
    res.send("The " + animalName + " says " + sound);
});

app.get("/repeat/:string/:times", function(req, res){
    var string = req.params.string + " ";
    var times = req.params.times; 
    var content = "";
    for (var i = 0; i<times; i++){
        content+= string;
    }
    
    res.send(content);
});

app.get("*", function(req,res){
   res.send("Sorry, page not found...What are you doing with your life"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!");
})