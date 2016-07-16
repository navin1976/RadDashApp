import React from 'react';
import connect from 'react-redux';

class Table extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {};
	}

	render(){
		return(
			<h1>Table format!</h1>
		);
	}
}

export default Table;