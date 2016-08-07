import React from 'react';

class Toolbar extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	render(){
		return(
			<div className="toolbar">
				<button id="logout">Logout</button>
				<div id="toolbarButtonGroup">
					<button className="toolbarButton">+</button>
					<button className="toolbarButton">R</button>
					<button className="toolbarButton">C</button>
				</div>
				
			</div>
		);
	}
}

export default Toolbar;