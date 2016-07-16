import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
	return(
		<div id="sidebar-wrapper">
			<ul className="sidebar-nav">
				<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
				<li><Link to="/about" activeClassName="active">About</Link></li>
				<li><Link to="/courses" activeClassName="active">Courses</Link></li>
				<li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
			</ul>
		</div>
	);
};

export default Header;