import React from 'react';
import Wrapper from '../Wrapper';
import OptionPanel from './OptionPanel';

class GraphTool extends React.Component{
	constructor(props,context){
		super(props,context);

	}

	render(){
		return(
			<div>
				<OptionPanel />
			</div>
		);
	}
}

export default GraphTool;