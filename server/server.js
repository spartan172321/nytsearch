// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var Article = require("./models/Article.js");


// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3001;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("build"));

// -------------------------------------------------


// var MONGODB_URI = "mongodb://heroku_fd0jcg6k:l8kq7i8qtfuchoh9m621uv8l7i@ds127983.mlab.com:27983/heroku_fd0jcg6k"

if (process.env.MONGODB_URI){
  console.log("Connected to mLab");
  mongoose.connect(process.env.MONGODB_URI);
}
else{
  console.log("Not connected to mLab");
  mongoose.connect("mongodb://localhost/nytdb");
}

var db = mongoose.connection;


db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/build/static/index.html");
});


// ROUTES
// ======
app.get("/api", function(req, res) {
  Article.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(doc);
      res.json(doc);
    }
  });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api/post", function(req, res) {
  console.log(req.body)
  var newArticle = new Article(req.body)

  newArticle.save(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Article Saved");
    }
  });
});



app.delete("/api/post/:id", function(req, res) {
  console.log("at server ")
  console.log(req.params)

  console.log(req.params.id)

  Article.remove({_id: req.params.id}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(doc);
      res.json(doc);
    }
  });
});


// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
