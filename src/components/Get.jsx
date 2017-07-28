// Include React
import React from 'react';

import helpers from '../utils/helpers';

class Get extends React.Component {
  constructor(props){
    super(props);

    this.state = {
    	saved: true
    }
  }
  
  saveIt = () => {
  	var newCondition = this.state.saved

  	this.props.appSaveClick(newCondition)

  	// helpers.saveArticle
  	
  }
	
 }