import React, {Component} from 'react';

// import Get from './containers/Get';
// import Delete from './containers/Delete';
// import Post from './containers/Post';

class Form extends Component {
	constructor(){
		super();

		this.state = {
			topic: "",
      start: 0,
      end: 0,
      saved: false
		};
	};

  handleChange = event => {
    // console.log(event.target.value)
    // console.log(event.target.id)
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  };


  handleSubmit = event => {
  	event.preventDefault()
  	
		this.props.makeRequest(
			this.state.topic,
			this.state.start,
			this.state.end
		)
	};
  
	render() {
		return (
			<div className="container">

			  <form className="form-horizontal">

          <h2><strong>Search</strong></h2>

        	<div className="form-group">
        		<label>Topic</label>
				    <div className="col-lg-10">
				      <input className="form-control" id="topic" value={this.state.topic} type="text" onChange={this.handleChange} required />
				    </div>
				  </div>

				  <div className="form-group">
        		<label>Start Year (YYYYMMDD)</label>
				    <div className="col-lg-10">
				      <input className="form-control" id="start" value={this.state.start} type="number" onChange={this.handleChange} required />
				    </div>
				  </div>

				  <div className="form-group">
        		<label>End Year (YYYYMMDD)</label>
				    <div className="col-lg-10">
				      <input className="form-control" id="end" value={this.state.end} type="number" onChange={this.handleChange} required />
				    </div>
				  </div>

				  <div className="form-group">
  					<div className="col-lg-offset-2 col-lg-10">
    					<button type="button" className="btn btn-default" onClick={this.handleSubmit}>Search</button>
  					</div>
					</div>

         </form>

			</div>		
		)
	}
}

export default Form