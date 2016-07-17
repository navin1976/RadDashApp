import React from 'react';
import {connect} from 'react-redux';
import ReactGridLayout from 'react-grid-layout';
/*
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
*/
class Dashboard extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {};
	}
	
	tileEntry(tile, index){
		return <div key={tile.l.i} className="testCard">{tile.c + " " +tile.n}</div>;
	}
	
	render(){
		//retrieve layouts from the layout object
		let displayLayout = [];
		for(let i = 0; i<this.props.layout.length;i++){
			displayLayout.push(this.props.layout[i].l);
		}

		return (
			<ReactGridLayout className="layout" layout={displayLayout} cols={12} rowHeight={40} width={1500}>
				{this.props.layout.map(this.tileEntry)}
			</ReactGridLayout>
		);
	}

	/*render(){
		const layout = {
		lg :[
			{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
			{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
			{i: 'c', x: 4, y: 0, w: 1, h: 2}]
    	};
		return (
			<ResponsiveReactGridLayout className="layout" layout={layout} breakpoints={{lg: 1200, md: 996,sm: 768, xs: 480}} cols={{lg: 12, md: 10,sm: 6, xs: 4}}>
				<div key={'a'} className="testCard">a</div>
				<div key={'b'} className="testCard">b</div>
				<div key={'c'} className="testCard">c</div>
			</ResponsiveReactGridLayout>
		);
	}*/
}

function mapStateToProps(state,ownProps){
	return{
		layout: state.layout
	};
}

Dashboard.propTypes = {
	layout: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Dashboard);
