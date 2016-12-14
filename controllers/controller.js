var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("../models/Article");

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  console.log('root access requested');
  res.sendFile(__dirname + "/public/index.html");
});

// your components will use this to query MongoDB for all saved articles
app.get("/api/saved", function(req, res) {
  // res.send({test: "tom"});

  // We will find all the records, sort it in descending order
  Article.find({}).sort([ ["date", "descending"] ])
  .exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// your components will use this to save an article to the database
app.post("/api/saved", function(req, res) {
  Article.create({
    title: "Test article",
    date: Date.now(),
    url: "http://www.google.com"
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

// your components will use this to delete a saved article in the database
app.delete("/api/saved/:id", function(req, res) {
  Article.findByIdAndRemove(req.params.id, function (err, todo) {  
    if (err) {
      console.log(err);
    } 
    else {
      // Send Success Header
      res.sendStatus(200);
    }
  })
});

module.exports = app;