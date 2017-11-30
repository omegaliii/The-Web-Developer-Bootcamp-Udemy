var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
seedDB();

// Campground.create({
//     name: "Concord Hill", 
//     image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//     description: "A nice place."
//     }, function(err,campground){
//     if(err){
//         console.log(err);
//     }
//     else{
    
//         console.log(campground)
//     }
// });

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       } 
       else{
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    Campground.create({
        name: name,
        image: image,
        description: description
    },function(err, newcampground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err){
           console.log(err);
       }
       else{
           res.render("campgrounds/show", {campground:foundCampground});
       }
   });
    
});

//========================
//COMMENT ROUTE
//========================
//NEW
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err){
           console.log(err);
       }
       else{
           res.render("comments/new", {campground:foundCampground});
       }
   });
});

//POST
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment) {
                if (err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});