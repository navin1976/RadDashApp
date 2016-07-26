import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
	return(
		<div id="sidebar-wrapper">
			<ul className="sidebar-nav">
				<li className="sidebar-brand"><img id="brand" src="peach_main.svg"/></li>
				<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
				<li><Link to="/about" activeClassName="active">About</Link></li>
				<li><Link to="/courses" activeClassName="active">Courses</Link></li>
				<li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
				<li><Link to="/table" activeClassName="active">Table</Link></li>
				{loading && <li><LoadingDots interval={100} dots={10}/></li>}
			</ul>
		</div>
	);
};

export default Header;