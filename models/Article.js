// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // publish date of the article
  date: {
    type: Date,
    required: true,
    default: false
  },
  // url is a required string
  url: {
    type: String,
    required: true
  },
  // saved or not
  saved: {
    type: Boolean,
    default: false
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
