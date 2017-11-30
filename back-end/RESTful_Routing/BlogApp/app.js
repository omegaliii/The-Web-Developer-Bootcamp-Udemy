var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

app.use(express.static("public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/blog_app", {useMongoClient: true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

//Set up the campgrounds schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

//Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//INDEX route
app.get("/blogs", function(req, res){
    Blog.find({},function(err,allblogs){
       if(err){
           console.log(err);
       } 
       else{
           res.render("index", {blogs: allblogs});
       }
    });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});

// SHOW - shows more info about one campground
app.get("/blogs/:id", function(req,res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if (err){
           console.log(err);
       }
       else{
           res.render("show", {blog:foundBlog});
       }
   });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
       if (err){
           console.log(err);
       }
       else{
           res.render("edit", {blog:foundBlog});
       }
   });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if (err){
           console.log(err);
       }
       else{
           res.render("show", {blog:updatedBlog});
       }
   });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if (err){
           console.log(err);
       }
       else{
           res.redirect("/blogs");
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Blog App server has started!");
});