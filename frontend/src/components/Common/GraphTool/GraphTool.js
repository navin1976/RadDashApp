import React from 'react';
import Wrapper from '../Wrapper';
import Canvas from './Canvas';

class GraphTool extends React.Component{
	constructor(props,context){
		super(props,context);

	}

	render(){
		return(
			<Wrapper>
				<Canvas/>
			</Wrapper>
		);
	}
}

export default GraphTool;