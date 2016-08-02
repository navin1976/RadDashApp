import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';

import img from './peach_main.svg';

class Header extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	dashboardInstance(dash,index){
		const path = "/dashboard/" + dash.id;
		const title = dash.name;
		return <li key={index}><Link to={path} className="dashChoice" activeClassName="active">{title}</Link></li>
	}

	render(){
		console.log(this.context.store.getState());
		return(
		<div id="sidebar-wrapper">
			<ul className="sidebar-nav">
				<li className="sidebar-brand"><img id="brand" src={img}/></li>
				<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
				<li><Link to="/about" activeClassName="active">About</Link></li>
				<li><Link to="/courses" activeClassName="active">Courses</Link></li>
				<li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
				{this.props.dashboards.map(this.dashboardInstance)}
				<li><Link to="/table" activeClassName="active">Table</Link></li>
			</ul>
		</div>
		);
	}
}

Header.contextTypes = { store: React.PropTypes.object };

function mapStateToProps(state, ownProps){
	let dash = state.dashboards;
	return{
		dashboards:dash
	};
}


export default connect(mapStateToProps)(Header);