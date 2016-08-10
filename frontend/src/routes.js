import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import CoursesPage from './components/Course/CoursesPage';
import Dashboard from './components/Dashboard/Dashboard';
import ManageCoursePage from './components/Course/ManageCoursePage';
import AdminPage from './components/Admin/AdminPage';
import PermissionPage from './components/Admin/PermissionPage';
import ViewPage from './components/Home/ViewPage';

export default (
	<Route path="/raddash" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="/raddash/about" component={AboutPage} />
		<Route path="/raddash/courses" component={CoursesPage}/>
		<Route path="/raddash/course" component={ManageCoursePage}/>
		<Route path="/raddash/course/:id" component={ManageCoursePage}/>
		<Route path="/raddash/dashboard" component={Dashboard}/>
		<Route path="/raddash/dashboard/:id" component={Dashboard}/>
		<Route path="/raddash/admin" component={AdminPage}/>
		<Route path="/raddash/permissions/:id" component={PermissionPage}/>
		<Route path="/raddash/demovis" component={ViewPage}/>
	</Route>
);