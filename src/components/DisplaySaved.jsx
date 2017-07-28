import React from 'react';

class DisplaySaved extends React.Component {
		
	savedArt = () => {

		var newSave = this.props.savedStuff;

		newSave.map(function(newSave){
			console.log(newSave)
			return <li>{newSave}</li>
		})
	};

	render() {
		return (
			<ul>{this.savedArt}</ul>
		)
	};
}

export default DisplaySaved