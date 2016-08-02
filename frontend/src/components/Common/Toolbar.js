import React from 'react';

class Toolbar extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	render(){
		return(
			<div className="toolbar">
				<p>Toolbar</p>
			</div>
		);
	}
}

export default Toolbar;