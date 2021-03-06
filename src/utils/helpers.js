// Here we will utilize the axios library to perform GET/POST requests
import axios from 'axios';

// Exporting an object with methods for retrieving and posting data to our API

const helper = {

	displayArticles: function() {
		console.log("articles posted")
    return axios.get("/api");
  }, 

  saveArticle: function(articleData) {
  	console.log("articles received")
    return axios.post("/api/post", articleData);
  },

  deleteArticle: function(data) {
  	console.log(data)
    console.log("at helper")
    // return axios.delete("/api/post/"+data, {});
    return axios.delete("/api/post/"+data, {});
  }
};

export default helper;