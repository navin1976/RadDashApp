import React from 'react';
import d3 from 'd3';

export default class Axis extends React.Component{
	componentDidMount(){
		this.renderAxis();
	}

	componentDidUpdate(){
		this.renderAxis();
	}

	renderAxis(){
		let n = this.refs.axis;
		let a = d3.svg.axis().orient(this.props.orient).ticks(5).scale(this.props.scale);
		d3.select(n).call(a);
	}

	render(){
		return <g className="axis" ref="axis" transform={this.props.translate}></g>;
	}
}