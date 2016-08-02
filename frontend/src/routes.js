import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import CoursesPage from './components/Course/CoursesPage';
import Dashboard from './components/Dashboard/Dashboard';
import Table from './components/Table/Table';
import ManageCoursePage from './components/Course/ManageCoursePage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="about" component={AboutPage} />
		<Route path="courses" component={CoursesPage}/>
		<Route path="course" component={ManageCoursePage}/>
		<Route path="course/:id" component={ManageCoursePage}/>
		<Route path="dashboard" component={Dashboard}/>
		<Route path="dashboard/:id" component={Dashboard}/>
		<Route path="table" component={Table}/>
	</Route>
);