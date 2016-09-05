import React,{PropTypes} from 'react';

class GeneralToolbar extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	render(){
		return(
			<div className="toolbar">
				<button id="logout">Logout</button>
			</div>
		);
	}
}

export default GeneralToolbar;