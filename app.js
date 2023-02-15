
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hey, Welcome to B-LOG. Its a Blog website you can read and write anything you love. You cany also use it as a Persornal Diary. If want to post something write /compose just after the URL And you will redirected to posting site. If you love the work please support us by Sharing this website to your friends. If you have some issuses you can contact us anytime.Have a good day B-LOG😜";
const aboutContent = "Hey, I am Vivek Yadav the creator of this website. I am currently persuing Btech Cs in SRMU Lucknow. I had made this blog website to write about my daily routine as a personal Blog website but You can also write Blogs in it. This website was made using CSS,Bootstrap, EJS,Nodejs,Express,mongoDB,Mongoose.To know more about me contact us.";
const contactContent = "You can contact me by given methods:";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
