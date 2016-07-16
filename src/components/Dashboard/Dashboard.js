import React from 'react';
import connect from 'react-redux';
import ReactGridLayout from 'react-grid-layout';

class Dashboard extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {
		
		};
	}

	render(){
		const layout = [
			{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
			{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
			{i: 'c', x: 4, y: 0, w: 1, h: 2}
		];
		return (
			<ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
				<div key={'a'} className="testCard">a</div>
				<div key={'b'} className="testCard">b</div>
				<div key={'c'} className="testCard">c</div>
			</ReactGridLayout>
		);
	}
}

export default Dashboard;