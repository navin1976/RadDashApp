import React from 'react';
import Wrapper from '../Wrapper';
import OptionPanel from './OptionPanel';

class GraphTool extends React.Component{
	constructor(props,context){
		super(props,context);

	}

	render(){
		return(
			<Wrapper>
				<div>null</div>
				<OptionPanel />
			</Wrapper>
		);
	}
}

export default GraphTool;