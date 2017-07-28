import React, { Component } from 'react'
// import './App.css'
import Form from './components/Form.jsx';

import helpers from './utils/helpers.js';

import axios from 'axios'

var num = 1;
class App extends Component {

	constructor() {
		super()
		this.state = {
			searchResults: [],
			rowCreate: [],
			count: 0,
			saveDisplay: []
		}
		this.appSaveClick = this.appSaveClick.bind(this);
	}

	componentDidMount(){

		helpers.displayArticles().then(function(response){
			console.log(response.data[0])
			var saveArr = []
			for (var i = 0; i < response.data.length; i++) {
		    saveArr.push(
		    	<tr key = {response.data[i]._id}>
		    		<td>
		    			<p><strong>Headline:</strong> {response.data[i].headline}</p>
		    			<p><strong>Web Url:</strong> {response.data[i].url}</p>
		    			<p><strong>Date published:</strong> {response.data[i].pubDate}</p>
		    		</td>
		    		<td>
		    			<button className="btn" 
		    			type="button" 
		    			name={response.data[i]._id}
		    			value = {response.data[i]}
		    			onClick = {this.appDeleteClick}
		    			>
		    			Delete
		    			</button>
		    		</td>
		    	</tr>
		    );
			}
			this.setState({saveDisplay: saveArr})
		}.bind(this));
	}

	appDeleteClick = eve => {
		eve.preventDefault();
		var del = eve.target.name
		console.log(del)
		helpers.deleteArticle(del)
	}


  appSaveClick = e => {
  	e.preventDefault();

  	var test = JSON.parse(e.target.value);

  	console.log(test);

  	if(test['saved'] === false){
  		helpers.saveArticle({
  			headline: test['headline'],
  			url: test['url'],
  			pubDate: test['pubDate'], 
  			saved: true
  		})
  	}
	};


// ===================================================
	makeRequest = (topic, start, end) => {

		console.log(this.state.searchResults)

		var articleArr = [];
		// 1) get search parameters
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
		// 2) make request to NYT with search parameters
    axios.get(url, {params: {
	    'api-key': '6b5dfb73f86c43a0816f76249be1197b',
	    'q': topic,
	    'begin_date': start,
	    'end_date': end
    	}
		// 3) update the state.searchResults with response from NYT
	  }).then(function (response) {  	
	  	var results = response.data.response.docs
	  	for(var i = 0; i<results.length; i++){
	  		articleArr.push({
	  			'headline': results[i].headline.main,
	  			'url': results[i].web_url,
	  			'pubDate': results[i].pub_date,
	  			'saved': false
	  		})
	  		this.setState({
	  			searchResults: articleArr
	  		})
	  	}
   		
   		if(this.state.searchResults.length !== 0){
   			var rows = [];
					for (var l = 0; l < this.state.searchResults.length; l++) {
						this.setState({
	  					count: num++
	  				});
				    rows.push(
				    	<tr key = {this.state.count}>
				    		<td>
				    			<p><strong>Headline:</strong> {this.state.searchResults[l].headline}</p>
				    			<p><strong>Web Url:</strong> {this.state.searchResults[l].url}</p>
				    			<p><strong>Date published:</strong> {this.state.searchResults[l].pubDate}</p>
				    		</td>
				    		<td>
				    			<button className="btn" 
				    			type="button" 
				    			name={this.state.searchResults[l]}
				    			value = {JSON.stringify(this.state.searchResults[l])}
				    			onClick={this.appSaveClick}>
				    			Save
				    			</button>
				    		</td>
				    	</tr>
				    );
			  	}
					this.setState({
						rowCreate: rows
					})
   		}    
   }.bind(this))
	}
// ===================================================



// ========================================================

	render() {
		return (
			<div className="App">
			
				<h1>NY Times Articles</h1>

				<Form makeRequest={this.makeRequest} anotherProp="test" />

				<div className="container">
					<table className="table">
						<thead>
						<tr>
							<th>Article</th>
					    <th>Save</th> 
					  </tr>
					  </thead>
					  <tbody>
					  	{this.state.rowCreate}
					  </tbody>
					 </table>
				</div>

				<div className="container">
					<table className="table">
						<thead>
						<tr>
							<th>Article</th>
					    <th>Delete</th> 
					  </tr>
					  </thead>
					  <tbody>
					  	{this.state.saveDisplay}
					  </tbody>
					 </table>
				</div>
				
			</div>
		)
	}
}


export default App
