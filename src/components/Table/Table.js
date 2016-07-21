import React from 'react';
import {connect} from 'react-redux';

class Table extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {};
		
		this.displayRows = this.displayRows.bind(this);

		this.decrease = this.decrease.bind(this.k);
		this.increase = this.increase.bind(this.k);
	}

	decrease(k){
		this.props.dispatch(dashboardActions.decrement(k));
	}

	increase(k){
		this.props.dispatch(dashboardActions.increment(k));
	}

	displayRows(el,index){
		return (<div key={el.l.i}>
					<p>{el.n + " - counter: " +el.c}</p>
					<button onClick={() => this.increase(el.l.i)}>+</button>
					<button onClick={() => this.decrease(el.l.i)}>-</button>
				</div>);
	}

	render(){
		return(
			<div className="info-context">
				<h1>Table format!</h1>
				{this.props.layout.map(this.displayRows)}
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return{
		layout: state.layout
	};
}

Table.propTypes = {
	layout: React.PropTypes.array.isRequired,
	dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Table);