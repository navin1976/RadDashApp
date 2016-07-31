import React,{PropTypes} from 'react';

class TimeSlot extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			stats = [
				{d: 8, v: 34},
				{d: 9, v: 24},
				{d: 10, v: 2},
				{d: 11, v: 14},
				{d: 12, v: 18},
				{d: 13, v: 6},
			]
		};

	}

	componentWillMount(){
		const width = this.props.width;
		const height = this.props.height;
	}

	render(){

	}
}

TimeSlot.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired
};