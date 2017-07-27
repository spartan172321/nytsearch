import React, { Component } from 'react'
// import './App.css'
import Form from './components/Form.jsx';

import axios from 'axios'

class App extends Component {

	constructor() {
		super()
		this.state = {
			searchResults: [],
			rowCreate: []
		}
	}

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
	  			'_id': i+1,
	  			'headline': results[i].headline.main,
	  			'url': results[i].web_url,
	  			'pubDate': results[i].pub_date
	  		})

	  		this.setState({
	  			searchResults: articleArr
	  		})
	  	}

   		console.log(this.state.searchResults);

   		if(this.state.searchResults.length !== 0){
   			var rows = [];
   			
					console.log("create rows")
					
					for (var l = 0; l < this.state.searchResults.length; l++) {
				    rows.push(
				    	<tr key = {this.state.searchResults[l]._id}>
				    		<td>
				    			<p><strong>Headline:</strong> {this.state.searchResults[l].headline}</p>
				    			<p><strong>Web Url:</strong> {this.state.searchResults[l].url}</p>
				    			<p><strong>Date published:</strong> {this.state.searchResults[l].pubDate}</p>
				    		</td>
				    		<td>
				    			<button className="btn" type="button">Save</button>
				    		</td>
				    	</tr>
				    );
			  	}
			  	console.log("Article Rows:");
					console.log(rows);
					this.setState({
						rowCreate: rows
					})
				return rows
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
				
			</div>
		)
	}
}


export default App
