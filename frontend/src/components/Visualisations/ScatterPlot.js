/*eslint-disable*/
import React from 'react';
import d3 from 'd3';
import DataCircles from './geometry';
import XYaxis from './axles';
const yMax = (data) => d3.max(data,(d)=>d[1]);
const xMax = (data) => d3.max(data,(d)=>d[0]);

const yScale = (props)=> {
	return d3.scale.linear().domain([0, yMax(props.data)]).range([props.height - props.padding, props.padding]);
};
const xScale = (props) => {
	return d3.scale.linear().domain([0, xMax(props.data)]).range([props.padding,props.width - props.padding*2]);
};

export default(props)=>{
	const scales = { xScale: xScale(props), yScale: yScale(props)};
	return(
		<svg width={props.width} height={props.height}>
			<DataCircles {...props} {...scales} />
			<XYaxis {...props} {...scales} />
		</svg>
	);
}