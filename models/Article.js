// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  headline: {
    type: String,
    required: true
  },
  // publish date of the article
  url: {
    type: String,
    required: true,
  },
  // url is a required string
  pubDate: {
    type: String,
    required: true
  },
  // saved or not
  saved: {
    type: Boolean
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
